package com.chatApp.user_service.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Data
public class RegisterRequest {
    private String username;
    private String password;
    private String email;

}