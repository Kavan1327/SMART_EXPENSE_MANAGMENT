package com.smartexpense.expenseservice.dto.response;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
public class ExpenseResponse {

    private Long id;
    private Long userId;
    private BigDecimal amount;
    private Long categoryId;
    private String description;
    private LocalDate expenseDate;
    private LocalDateTime createdAt;
}
