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

    @Size(max = 255)
    private String subject;

    @Size(max = 255)
    private String merchant;

    @Size(max = 10)
    private String currency;

    private Boolean reimbursable;

    private Boolean addToReport;

    @Size(max = 1024)
    private String receiptUrl;

    @Size(max = 50)
    private String status;

    @NotNull
    private LocalDate expenseDate;
}
