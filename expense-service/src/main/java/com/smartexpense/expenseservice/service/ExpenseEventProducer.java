package com.smartexpense.expenseservice.service;

import com.smartexpense.expenseservice.entity.Expense;

public interface ExpenseEventProducer {

    void sendExpenseCreatedEvent(Expense expense);
}
