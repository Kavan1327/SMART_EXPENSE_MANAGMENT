package com.smartexpense.authservice.controller;

import com.smartexpense.authservice.dto.response.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    @GetMapping("/me")
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<ApiResponse<String>> getCurrentUser() {
        ApiResponse<String> response = ApiResponse.<String>builder()
                .success(true)
                .message("Current user endpoint")
                .data("This is a protected USER/ADMIN endpoint")
                .build();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<String>> adminEndpoint() {
        ApiResponse<String> response = ApiResponse.<String>builder()
                .success(true)
                .message("Admin endpoint")
                .data("This is a protected ADMIN endpoint")
                .build();
        return ResponseEntity.ok(response);
    }
}
