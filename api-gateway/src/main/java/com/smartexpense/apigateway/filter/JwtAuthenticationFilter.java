package com.smartexpense.apigateway.filter;

import com.smartexpense.apigateway.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.nio.charset.StandardCharsets;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter implements GlobalFilter, Ordered {

    private final JwtUtil jwtUtil;

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        String path = exchange.getRequest().getPath().value();

        // Skip only login and register endpoints from JWT check
        if (isPublicPath(path)) {
            return chain.filter(exchange);
        }

        String authHeader = exchange.getRequest().getHeaders().getFirst(HttpHeaders.AUTHORIZATION);
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return unauthorized(exchange, "Missing or invalid Authorization header");
        }

        String token = authHeader.substring(7);
        if (!jwtUtil.validateToken(token)) {
            return unauthorized(exchange, "Invalid or expired token");
        }

        String username = jwtUtil.getUsernameFromToken(token);

        ServerWebExchange mutatedExchange = exchange.mutate()
                .request(builder -> builder.header("X-User-Email", username))
                .build();

        return chain.filter(mutatedExchange);
    }

    private boolean isPublicPath(String path) {
        return "/auth/login".equals(path) || "/auth/register".equals(path);
    }

    private Mono<Void> unauthorized(ServerWebExchange exchange, String message) {
        exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
        exchange.getResponse().getHeaders().setContentType(MediaType.APPLICATION_JSON);

        String body = String.format("{\"success\":false,\"message\":\"%s\"}", message);
        byte[] bytes = body.getBytes(StandardCharsets.UTF_8);

        return exchange.getResponse().writeWith(Mono.just(exchange.getResponse()
                .bufferFactory()
                .wrap(bytes)));
    }

    @Override
    public int getOrder() {
        return -1; // Run early
    }
}
