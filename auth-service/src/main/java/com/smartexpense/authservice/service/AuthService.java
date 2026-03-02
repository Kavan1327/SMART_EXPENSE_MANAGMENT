package com.smartexpense.authservice.service;

import com.smartexpense.authservice.dto.request.LoginRequest;
import com.smartexpense.authservice.dto.request.RegisterRequest;
import com.smartexpense.authservice.dto.response.ApiResponse;
import com.smartexpense.authservice.dto.response.AuthResponse;
import com.smartexpense.authservice.dto.response.UserResponse;

public interface AuthService {

    ApiResponse<UserResponse> register(RegisterRequest request);

    ApiResponse<AuthResponse> login(LoginRequest request);
}
