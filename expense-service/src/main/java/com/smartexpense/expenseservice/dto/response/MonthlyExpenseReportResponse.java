package com.smartexpense.expenseservice.dto.response;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class MonthlyExpenseReportResponse {

    private int year;
    private int month;
    private BigDecimal totalAmount;
}
