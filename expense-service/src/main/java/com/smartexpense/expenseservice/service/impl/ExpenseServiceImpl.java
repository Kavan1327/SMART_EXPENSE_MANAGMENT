package com.smartexpense.expenseservice.service.impl;

import com.smartexpense.expenseservice.dto.request.ExpenseRequest;
import com.smartexpense.expenseservice.dto.response.CategoryExpenseSummaryResponse;
import com.smartexpense.expenseservice.dto.response.ExpenseResponse;
import com.smartexpense.expenseservice.dto.response.MonthlyExpenseReportResponse;
import com.smartexpense.expenseservice.entity.Expense;
import com.smartexpense.expenseservice.exception.ResourceNotFoundException;
import com.smartexpense.expenseservice.repository.ExpenseRepository;
import com.smartexpense.expenseservice.service.BudgetService;
// import com.smartexpense.expenseservice.service.ExpenseEventProducer;
import com.smartexpense.expenseservice.service.ExpenseService;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ExpenseServiceImpl implements ExpenseService {

    private final ExpenseRepository expenseRepository;
    // private final ExpenseEventProducer expenseEventProducer;
    private final BudgetService budgetService;

    @Override
    @CacheEvict(value = "user-expenses", key = "#request.userId")
    public ExpenseResponse addExpense(ExpenseRequest request) {
        Expense expense = mapToEntity(request);
        Expense saved = expenseRepository.save(expense);

        // expenseEventProducer.sendExpenseCreatedEvent(saved);

        budgetService.checkAndNotifyBudgetExceeded(
            saved.getUserId(),
            saved.getCategoryId(),
            saved.getExpenseDate().getYear(),
            saved.getExpenseDate().getMonthValue()
        );

        return mapToResponse(saved);
    }

    @Override
    @CacheEvict(value = "user-expenses", key = "#request.userId")
    public ExpenseResponse updateExpense(Long id, ExpenseRequest request) {
        Expense existing = expenseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Expense not found with id: " + id));

        existing.setAmount(request.getAmount());
        existing.setCategoryId(request.getCategoryId());
        existing.setDescription(request.getDescription());
        existing.setSubject(request.getSubject());
        existing.setMerchant(request.getMerchant());
        existing.setCurrency(request.getCurrency());
        existing.setReimbursable(Boolean.TRUE.equals(request.getReimbursable()));
        existing.setAddToReport(Boolean.TRUE.equals(request.getAddToReport()));
        existing.setReceiptUrl(request.getReceiptUrl());
        existing.setStatus(resolveStatus(request.getStatus()));
        existing.setExpenseDate(request.getExpenseDate());

        Expense updated = expenseRepository.save(existing);
        budgetService.checkAndNotifyBudgetExceeded(
            updated.getUserId(),
            updated.getCategoryId(),
            updated.getExpenseDate().getYear(),
            updated.getExpenseDate().getMonthValue()
        );
        return mapToResponse(updated);
    }

    @Override
    @CacheEvict(value = "user-expenses", allEntries = true)
    public void deleteExpense(Long id) {
        if (!expenseRepository.existsById(id)) {
            throw new ResourceNotFoundException("Expense not found with id: " + id);
        }
        expenseRepository.deleteById(id);
    }

    @Override
    @Cacheable(value = "user-expenses", key = "#userId")
    public List<ExpenseResponse> getUserExpenses(Long userId) {
        return expenseRepository.findByUserId(userId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }
    
    @Override
    public MonthlyExpenseReportResponse getMonthlyReport(Long userId, int year, int month) {
        YearMonth ym = YearMonth.of(year, month);
        LocalDate start = ym.atDay(1);
        LocalDate end = ym.atEndOfMonth();

        BigDecimal total = expenseRepository.getTotalForUserAndDateRange(userId, start, end);

        return MonthlyExpenseReportResponse.builder()
                .year(year)
                .month(month)
                .totalAmount(total)
                .build();
    }

            @Override
            public List<CategoryExpenseSummaryResponse> getMonthlyReportByCategory(Long userId, int year, int month) {
            YearMonth ym = YearMonth.of(year, month);
            LocalDate start = ym.atDay(1);
            LocalDate end = ym.atEndOfMonth();

            return expenseRepository.getCategoryTotalsForUserAndDateRange(userId, start, end).stream()
                .map(p -> CategoryExpenseSummaryResponse.builder()
                    .categoryId(p.getCategoryId())
                    .totalAmount(p.getTotalAmount())
                    .build())
                .collect(Collectors.toList());
            }

    private Expense mapToEntity(ExpenseRequest request) {
        return Expense.builder()
                .userId(request.getUserId())
                .amount(request.getAmount())
                .categoryId(request.getCategoryId())
                .description(request.getDescription())
                .subject(request.getSubject())
                .merchant(request.getMerchant())
                .currency(request.getCurrency())
                .reimbursable(Boolean.TRUE.equals(request.getReimbursable()))
                .addToReport(Boolean.TRUE.equals(request.getAddToReport()))
                .receiptUrl(request.getReceiptUrl())
                .status(resolveStatus(request.getStatus()))
                .expenseDate(request.getExpenseDate())
                .build();
    }

    private ExpenseResponse mapToResponse(Expense expense) {
        return ExpenseResponse.builder()
                .id(expense.getId())
                .userId(expense.getUserId())
                .amount(expense.getAmount())
                .categoryId(expense.getCategoryId())
                .description(expense.getDescription())
                .subject(expense.getSubject())
                .merchant(expense.getMerchant())
                .currency(expense.getCurrency())
                .reimbursable(expense.getReimbursable())
                .addToReport(expense.getAddToReport())
                .receiptUrl(expense.getReceiptUrl())
                .status(expense.getStatus())
                .expenseDate(expense.getExpenseDate())
                .createdAt(expense.getCreatedAt())
                .build();
    }

    private String resolveStatus(String status) {
        if (status == null || status.isBlank()) {
            return "SUBMITTED";
        }
        return status;
    }
}
