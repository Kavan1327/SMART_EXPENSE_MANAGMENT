package com.smartexpense.authservice.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ApiResponse<T> {

    private boolean success;
    private String message;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private T data;

    @Builder.Default
    private LocalDateTime timestamp = LocalDateTime.now();
}
