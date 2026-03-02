package com.smartexpense.authservice.repository;

import com.smartexpense.authservice.entity.Role;
import com.smartexpense.authservice.entity.RoleType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findByName(RoleType name);
}
