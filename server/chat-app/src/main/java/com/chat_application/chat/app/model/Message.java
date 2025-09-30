package com.chat_application.chat.app.model;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.Instant;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document("messages")
public class Message {
    @Id
    private String id;
    @Indexed
    private String roomId;
    private String senderId;
    private String content;
    @Indexed
    private Instant timestamp;
}

