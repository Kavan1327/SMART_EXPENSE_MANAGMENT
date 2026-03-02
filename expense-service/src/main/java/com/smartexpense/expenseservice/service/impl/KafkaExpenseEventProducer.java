package com.smartexpense.expenseservice.service.impl;

import com.smartexpense.expenseservice.entity.Expense;
import com.smartexpense.expenseservice.event.ExpenseCreatedEvent;
import com.smartexpense.expenseservice.service.ExpenseEventProducer;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class KafkaExpenseEventProducer implements ExpenseEventProducer {

    private final KafkaTemplate<String, ExpenseCreatedEvent> kafkaTemplate;

    @Value("${kafka.topic.expense-created}")
    private String expenseCreatedTopic;

    @Override
    public void sendExpenseCreatedEvent(Expense expense) {
        ExpenseCreatedEvent event = ExpenseCreatedEvent.builder()
                .userId(expense.getUserId())
                .expenseId(expense.getId())
                .amount(expense.getAmount())
                .categoryId(expense.getCategoryId())
                .timestamp(expense.getCreatedAt())
                .build();

        kafkaTemplate.send(expenseCreatedTopic, expense.getUserId().toString(), event);
        log.info("Sent expense created event for expense id {}", expense.getId());
    }
}
