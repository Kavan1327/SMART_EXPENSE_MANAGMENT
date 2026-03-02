package com.smartexpense.expenseservice.repository;

import com.smartexpense.expenseservice.entity.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    interface CategoryTotalProjection {
        Long getCategoryId();
        BigDecimal getTotalAmount();
    }

    List<Expense> findByUserId(Long userId);

    @Query("SELECT COALESCE(SUM(e.amount), 0) FROM Expense e WHERE e.userId = :userId AND e.expenseDate BETWEEN :start AND :end")
    BigDecimal getTotalForUserAndDateRange(@Param("userId") Long userId,
                                           @Param("start") LocalDate start,
                                           @Param("end") LocalDate end);

    @Query("SELECT COALESCE(SUM(e.amount), 0) FROM Expense e WHERE e.userId = :userId AND e.categoryId = :categoryId AND e.expenseDate BETWEEN :start AND :end")
    BigDecimal getTotalForUserCategoryAndDateRange(@Param("userId") Long userId,
                                                   @Param("categoryId") Long categoryId,
                                                   @Param("start") LocalDate start,
                                                   @Param("end") LocalDate end);

    @Query("SELECT e.categoryId AS categoryId, COALESCE(SUM(e.amount), 0) AS totalAmount " +
            "FROM Expense e WHERE e.userId = :userId AND e.expenseDate BETWEEN :start AND :end " +
            "GROUP BY e.categoryId")
    List<CategoryTotalProjection> getCategoryTotalsForUserAndDateRange(@Param("userId") Long userId,
                                                                       @Param("start") LocalDate start,
                                                                       @Param("end") LocalDate end);
}
