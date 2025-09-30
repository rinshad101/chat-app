package com.chat_application.chat.app.model;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
@Document("rooms")
public class Room {
    @Id
    private String id;
    @Indexed
    private String name;
    // "PUBLIC" or "PRIVATE" for clarity
    private String type;
    // userId list
    @Builder.Default
    private List<String> members = new ArrayList<>();
    private String createdBy;
    private Instant createdAt;
    private Instant updatedAt;
}
//id
//discription - optional
//name
//privacy
//category 4 types
//count
