package com.smartexpense.expenseservice.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "budgets", indexes = {
        @Index(name = "idx_budget_user_category_month_year", columnList = "user_id, category_id, year, month", unique = true)
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Budget {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(nullable = false)
    private Long userId;

    @Column(nullable = true)
    private Long categoryId;

    @NotNull
    @Column(nullable = false)
    private BigDecimal monthlyLimit;

    @NotNull
    @Column(nullable = false)
    private Integer month; // 1-12

    @NotNull
    @Column(nullable = false)
    private Integer year;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
