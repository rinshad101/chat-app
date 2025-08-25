package com.chat_application.chat.app.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.List;

@Document(collection = "rooms")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Room {
    @Id
    private String id;

    private String name;
    private String type; // public/private
    private List<String> members; // userIds
    private String createdBy;
    private Instant createdAt;
}
