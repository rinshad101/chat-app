package com.chat_application.chat.app.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document(collection = "messages")
@Data
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Message {
    @Id
    private String id;

    private String roomId;
    private String senderId;
    private String content;
    private Instant timestamp;
}
