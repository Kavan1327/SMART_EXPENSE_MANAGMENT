package com.smartexpense.authservice.exception;

import com.smartexpense.authservice.dto.response.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Map<String, String>>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach(error -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });

        ApiResponse<Map<String, String>> response = ApiResponse.<Map<String, String>>builder()
                .success(false)
                .message("Validation failed")
                .data(errors)
                .build();

        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ApiResponse<Object>> handleBadCredentials(BadCredentialsException ex) {
        ApiResponse<Object> response = ApiResponse.builder()
                .success(false)
                .message("Invalid email or password")
                .build();
        return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<ApiResponse<Object>> handleUserNotFound(UsernameNotFoundException ex) {
        ApiResponse<Object> response = ApiResponse.builder()
                .success(false)
                .message(ex.getMessage())
                .build();
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Object>> handleAllExceptions(Exception ex) {
        ApiResponse<Object> response = ApiResponse.builder()
                .success(false)
                .message("Internal server error")
                .build();
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
