package com.smartexpense.apigateway.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import reactor.core.publisher.Mono;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public Mono<Map<String, Object>> handleAllExceptions(Exception ex) {
        Map<String, Object> body = new HashMap<>();
        body.put("success", false);
        body.put("message", "Internal server error");
        body.put("error", ex.getMessage());
        body.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());
        return Mono.just(body);
    }
}
