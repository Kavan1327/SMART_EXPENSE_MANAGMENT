package com.smartexpense.expenseservice.event;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BudgetExceededEvent {

    private Long userId;
    private Long categoryId;
    private BigDecimal currentAmount;
    private BigDecimal limit;
}
