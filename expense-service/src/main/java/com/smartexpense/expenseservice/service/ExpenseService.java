package com.smartexpense.expenseservice.service;

import com.smartexpense.expenseservice.dto.request.ExpenseRequest;
import com.smartexpense.expenseservice.dto.response.CategoryExpenseSummaryResponse;
import com.smartexpense.expenseservice.dto.response.ExpenseResponse;
import com.smartexpense.expenseservice.dto.response.MonthlyExpenseReportResponse;

import java.util.List;

public interface ExpenseService {

    ExpenseResponse addExpense(ExpenseRequest request);

    ExpenseResponse updateExpense(Long id, ExpenseRequest request);

    void deleteExpense(Long id);

    List<ExpenseResponse> getUserExpenses(Long userId);

    MonthlyExpenseReportResponse getMonthlyReport(Long userId, int year, int month);

    List<CategoryExpenseSummaryResponse> getMonthlyReportByCategory(Long userId, int year, int month);
}
