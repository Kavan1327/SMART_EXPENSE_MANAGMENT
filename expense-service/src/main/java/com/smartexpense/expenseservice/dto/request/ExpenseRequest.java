package com.smartexpense.expenseservice.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class ExpenseRequest {

    @NotNull
    private Long userId;

    @NotNull
    private BigDecimal amount;

    @NotNull
    private Long categoryId;

    @Size(max = 255)
    private String description;

    @NotNull
    private LocalDate expenseDate;
}
