package com.smartexpense.expenseservice.controller;

import com.smartexpense.expenseservice.dto.request.ExpenseRequest;
import com.smartexpense.expenseservice.dto.response.CategoryExpenseSummaryResponse;
import com.smartexpense.expenseservice.dto.response.ExpenseResponse;
import com.smartexpense.expenseservice.dto.response.MonthlyExpenseReportResponse;
import com.smartexpense.expenseservice.service.ExpenseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@RequiredArgsConstructor
public class ExpenseController {

    private final ExpenseService expenseService;

    @PostMapping
    public ResponseEntity<ExpenseResponse> addExpense(@Valid @RequestBody ExpenseRequest request) {
        ExpenseResponse response = expenseService.addExpense(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ExpenseResponse> updateExpense(@PathVariable Long id,
                                                         @Valid @RequestBody ExpenseRequest request) {
        ExpenseResponse response = expenseService.updateExpense(id, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExpense(@PathVariable Long id) {
        expenseService.deleteExpense(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ExpenseResponse>> getUserExpenses(@PathVariable Long userId) {
        List<ExpenseResponse> expenses = expenseService.getUserExpenses(userId);
        return ResponseEntity.ok(expenses);
    }

    @GetMapping("/user/{userId}/report")
    public ResponseEntity<MonthlyExpenseReportResponse> getMonthlyReport(@PathVariable Long userId,
                                                                         @RequestParam int year,
                                                                         @RequestParam int month) {
        MonthlyExpenseReportResponse report = expenseService.getMonthlyReport(userId, year, month);
        return ResponseEntity.ok(report);
    }

    @GetMapping("/monthly-report")
    public ResponseEntity<List<CategoryExpenseSummaryResponse>> getMonthlyReportByCategory(@RequestParam Long userId,
                                                                                           @RequestParam int year,
                                                                                           @RequestParam int month) {
        List<CategoryExpenseSummaryResponse> report = expenseService.getMonthlyReportByCategory(userId, year, month);
        return ResponseEntity.ok(report);
    }
}
