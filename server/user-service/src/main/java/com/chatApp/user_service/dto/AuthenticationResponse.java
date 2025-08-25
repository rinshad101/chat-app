package com.chatApp.user_service.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AuthenticationResponse {
    private String accessToken;

    public AuthenticationResponse(String accessToken) {
        this.accessToken = accessToken;
    }
}