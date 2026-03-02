package com.smartexpense.expenseservice.repository;

import com.smartexpense.expenseservice.entity.Budget;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BudgetRepository extends JpaRepository<Budget, Long> {

    Optional<Budget> findByUserIdAndCategoryIdAndYearAndMonth(Long userId, Long categoryId, Integer year, Integer month);
}
