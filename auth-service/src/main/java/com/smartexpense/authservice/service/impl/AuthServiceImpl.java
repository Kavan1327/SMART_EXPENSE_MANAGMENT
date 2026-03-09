package com.smartexpense.authservice.service.impl;

import com.smartexpense.authservice.dto.request.LoginRequest;
import com.smartexpense.authservice.dto.request.RegisterRequest;
import com.smartexpense.authservice.dto.response.ApiResponse;
import com.smartexpense.authservice.dto.response.AuthResponse;
import com.smartexpense.authservice.dto.response.UserResponse;
import com.smartexpense.authservice.entity.Role;
import com.smartexpense.authservice.entity.RoleType;
import com.smartexpense.authservice.entity.User;
import com.smartexpense.authservice.repository.RoleRepository;
import com.smartexpense.authservice.repository.UserRepository;
import com.smartexpense.authservice.security.JwtTokenProvider;
import com.smartexpense.authservice.security.TokenBlacklistService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthServiceImpl implements com.smartexpense.authservice.service.AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
        private final TokenBlacklistService tokenBlacklistService;

    @Override
    public ApiResponse<UserResponse> register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            return ApiResponse.<UserResponse>builder()
                    .success(false)
                    .message("Email is already in use")
                    .build();
        }

        Role userRole = roleRepository.findByName(RoleType.ROLE_USER)
                .orElseGet(() -> roleRepository.save(Role.builder().name(RoleType.ROLE_USER).build()));

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .roles(Set.of(userRole))
                .build();

        User savedUser = userRepository.save(user);

        UserResponse userResponse = UserResponse.builder()
                .id(savedUser.getId())
                .name(savedUser.getName())
                .email(savedUser.getEmail())
                .roles(savedUser.getRoles().stream()
                        .map(role -> role.getName().name())
                        .collect(Collectors.toSet()))
                .build();

        return ApiResponse.<UserResponse>builder()
                .success(true)
                .message("User registered successfully")
                .data(userResponse)
                .build();
    }

    @Override
    public ApiResponse<AuthResponse> login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalStateException("Authenticated user not found"));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtTokenProvider.generateToken(authentication);

        RoleType role = authentication.getAuthorities().stream()
                .findFirst()
                .map(grantedAuthority -> RoleType.valueOf(grantedAuthority.getAuthority()))
                .orElse(RoleType.ROLE_USER);

        AuthResponse authResponse = AuthResponse.builder()
                .accessToken(token)
                .tokenType("Bearer")
                .role(role.name())
                .userId(user.getId())
                .build();

        return ApiResponse.<AuthResponse>builder()
                .success(true)
                .message("Login successful")
                .data(authResponse)
                .build();
    }

        @Override
        public ApiResponse<Void> logout(String token) {
                if (token == null || token.isBlank()) {
                        return ApiResponse.<Void>builder()
                                        .success(false)
                                        .message("Authorization token is required")
                                        .build();
                }

                if (!jwtTokenProvider.validateToken(token)) {
                        return ApiResponse.<Void>builder()
                                        .success(false)
                                        .message("Invalid or expired token")
                                        .build();
                }

                tokenBlacklistService.blacklistToken(token, jwtTokenProvider.getExpiryDateFromToken(token).toInstant());
                SecurityContextHolder.clearContext();

                return ApiResponse.<Void>builder()
                                .success(true)
                                .message("Logout successful")
                                .build();
        }
}
