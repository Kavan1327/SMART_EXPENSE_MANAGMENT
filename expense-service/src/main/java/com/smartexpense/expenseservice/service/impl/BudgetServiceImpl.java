package com.smartexpense.expenseservice.service.impl;

import com.smartexpense.expenseservice.entity.Budget;
import com.smartexpense.expenseservice.event.BudgetExceededEvent;
import com.smartexpense.expenseservice.repository.BudgetRepository;
import com.smartexpense.expenseservice.repository.ExpenseRepository;
import com.smartexpense.expenseservice.service.BudgetService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class BudgetServiceImpl implements BudgetService {

    private final BudgetRepository budgetRepository;
    private final ExpenseRepository expenseRepository;
    private final KafkaTemplate<String, BudgetExceededEvent> budgetExceededKafkaTemplate;

    @Value("${kafka.topic.budget-exceeded}")
    private String budgetExceededTopic;

    @Override
    public Budget saveBudget(Budget budget) {
        Optional<Budget> existingBudget = budgetRepository.findByUserIdAndCategoryIdAndYearAndMonth(
                budget.getUserId(),
                budget.getCategoryId(),
                budget.getYear(),
                budget.getMonth()
        );

        if (existingBudget.isPresent()) {
            Budget current = existingBudget.get();
            current.setMonthlyLimit(budget.getMonthlyLimit());
            return budgetRepository.save(current);
        }

        return budgetRepository.save(budget);
    }

    @Override
    public List<Budget> getBudgetsByUserId(Long userId) {
        return budgetRepository.findByUserIdOrderByYearDescMonthDescCategoryIdAsc(userId);
    }

    @Override
    public void checkAndNotifyBudgetExceeded(Long userId, Long categoryId, int year, int month) {
        YearMonth ym = YearMonth.of(year, month);
        LocalDate start = ym.atDay(1);
        LocalDate end = ym.atEndOfMonth();

        Optional<Budget> budgetOpt = budgetRepository.findByUserIdAndCategoryIdAndYearAndMonth(userId, categoryId, year, month);
        if (budgetOpt.isEmpty()) {
            return; // no budget set for this category/month
        }

        Budget budget = budgetOpt.get();
        BigDecimal currentTotal = expenseRepository.getTotalForUserCategoryAndDateRange(userId, categoryId, start, end);

        if (currentTotal.compareTo(budget.getMonthlyLimit()) > 0) {
            BudgetExceededEvent event = BudgetExceededEvent.builder()
                    .userId(userId)
                    .categoryId(categoryId)
                    .currentAmount(currentTotal)
                    .limit(budget.getMonthlyLimit())
                    .build();

            budgetExceededKafkaTemplate.send(budgetExceededTopic, userId.toString(), event);
            log.info("Budget exceeded for user {} category {}: {}/{}", userId, categoryId, currentTotal, budget.getMonthlyLimit());
        }
    }
}
