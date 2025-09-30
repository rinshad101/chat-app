package com.chat_application.chat.app.dto;
import jakarta.validation.constraints.*;
import lombok.*;
import java.time.Instant;
import java.util.List;
public class RoomDtos {
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class CreateRoomRequest {
        @NotBlank
        @Size(max = 100)
        private String name;
        @NotBlank
        private String type; // PUBLIC / PRIVATE
        private List<@NotBlank String> members; // optional extra members
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class UpdateRoomRequest {
        @NotBlank
        @Size(max = 100)
        private String name;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class AddMembersRequest {
        @NotEmpty
        private List<@NotBlank String> members;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class RoomResponse {
        private String id;
        private String name;
        private String type;
        private int membersCount;
        private MessageSummary lastMessage; // nullable
        private Instant createdAt;
        private Instant updatedAt;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class MessageSummary {
        private String id;
        private String senderId;
        private String content;
        private Instant timestamp;
    }
}