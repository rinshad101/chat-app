package com.chat_application.chat.app.api;

import java.time.Instant;

public record ApiError(String error, String message, int status, Instant timestamp) {
    public static ApiError of(String error, String message, int status) {
        return new ApiError(error, message, status, Instant.now());
    }
}