package com.smartexpense.expenseservice.event;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ExpenseCreatedEvent {

    private Long userId;
    private Long expenseId;
    private BigDecimal amount;
    private Long categoryId;
    private LocalDateTime timestamp;
}
