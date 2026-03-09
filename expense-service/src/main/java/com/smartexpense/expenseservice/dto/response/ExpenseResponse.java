package com.smartexpense.expenseservice.dto.response;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.io.Serial;
import java.io.Serializable;

@Data
@Builder
public class ExpenseResponse implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    private Long id;
    private Long userId;
    private BigDecimal amount;
    private Long categoryId;
    private String description;
    private String subject;
    private String merchant;
    private String currency;
    private Boolean reimbursable;
    private Boolean addToReport;
    private String receiptUrl;
    private String status;
    private LocalDate expenseDate;
    private LocalDateTime createdAt;
}
