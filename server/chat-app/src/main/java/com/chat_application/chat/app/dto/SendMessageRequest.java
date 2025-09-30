package com.chat_application.chat.app.dto;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SendMessageRequest {
    @NotBlank
    private String senderId;
    @NotBlank
    private String content;
}
