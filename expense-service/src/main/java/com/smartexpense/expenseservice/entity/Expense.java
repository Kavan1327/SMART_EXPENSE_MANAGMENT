package com.smartexpense.expenseservice.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "expenses", indexes = {
    @Index(name = "idx_expense_user_id", columnList = "user_id"),
    @Index(name = "idx_expense_date", columnList = "expense_date")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Expense {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(nullable = false)
    private Long userId;

    @NotNull
    @Column(nullable = false)
    private BigDecimal amount;

    @NotNull
    @Column(nullable = false)
    private Long categoryId;

    @Size(max = 255)
    private String description;

    @Size(max = 255)
    @Column(length = 255)
    private String subject;

    @Size(max = 255)
    @Column(length = 255)
    private String merchant;

    @Size(max = 10)
    @Column(length = 10)
    private String currency;

    private Boolean reimbursable;

    private Boolean addToReport;

    @Size(max = 1024)
    @Column(length = 1024)
    private String receiptUrl;

    @NotNull
    @Size(max = 50)
    @Column(nullable = false, length = 50)
    private String status;

    @NotNull
    @Column(nullable = false)
    private LocalDate expenseDate;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        if (this.status == null || this.status.isBlank()) {
            this.status = "SUBMITTED";
        }
        if (this.reimbursable == null) {
            this.reimbursable = Boolean.FALSE;
        }
        if (this.addToReport == null) {
            this.addToReport = Boolean.FALSE;
        }
    }
}
