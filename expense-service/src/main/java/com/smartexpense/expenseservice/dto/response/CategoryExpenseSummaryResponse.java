package com.smartexpense.expenseservice.dto.response;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class CategoryExpenseSummaryResponse {

    private Long categoryId;
    private BigDecimal totalAmount;
}
