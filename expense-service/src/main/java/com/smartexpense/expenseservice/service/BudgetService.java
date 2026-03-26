package com.smartexpense.expenseservice.service;

import com.smartexpense.expenseservice.entity.Budget;

import java.util.List;

public interface BudgetService {

    Budget saveBudget(Budget budget);

    List<Budget> getBudgetsByUserId(Long userId);

    void checkAndNotifyBudgetExceeded(Long userId, Long categoryId, int year, int month);
}
