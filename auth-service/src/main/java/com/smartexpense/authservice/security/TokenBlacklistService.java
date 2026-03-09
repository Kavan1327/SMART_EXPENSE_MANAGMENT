package com.smartexpense.authservice.security;

import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class TokenBlacklistService {

    private final Map<String, Instant> blacklistedTokens = new ConcurrentHashMap<>();

    public void blacklistToken(String token, Instant expiresAt) {
        if (token == null || token.isBlank()) {
            return;
        }
        blacklistedTokens.put(token, expiresAt == null ? Instant.now() : expiresAt);
    }

    public boolean isTokenBlacklisted(String token) {
        if (token == null || token.isBlank()) {
            return false;
        }

        Instant expiry = blacklistedTokens.get(token);
        if (expiry == null) {
            return false;
        }

        if (expiry.isBefore(Instant.now())) {
            blacklistedTokens.remove(token);
            return false;
        }

        return true;
    }
}
