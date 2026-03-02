package com.smartexpense.expenseservice.service;

public interface BudgetService {

    void checkAndNotifyBudgetExceeded(Long userId, Long categoryId, int year, int month);
}
