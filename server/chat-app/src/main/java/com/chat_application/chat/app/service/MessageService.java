package com.chat_application.chat.app.service;

import com.chat_application.chat.app.dto.RoomDtos.MessageSummary;
import com.chat_application.chat.app.dto.SendMessageRequest;
import com.chat_application.chat.app.model.Message;
import com.chat_application.chat.app.model.Room;
import com.chat_application.chat.app.repository.MessageRepository;
import com.chat_application.chat.app.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.*;

@Service
@RequiredArgsConstructor
public class MessageService {
    private final RoomRepository roomRepo;
    private final MessageRepository messageRepo;
    private final SimpMessagingTemplate ws;

    private Room ensureMember(String userId, String roomId) {
        var room = roomRepo.findById(roomId).orElseThrow(() -> new
                NoSuchElementException("Room not found"));
        if (room.getMembers() == null || !room.getMembers().contains(userId))
            throw new SecurityException("Not a member of this room");
        return room;
    }

    @Transactional(readOnly = true)
    public Map<String, Object> list(String userId, String roomId, int page,
                                    int limit) {
        ensureMember(userId, roomId);
        var p = messageRepo.findByRoomIdOrderByTimestampDesc(roomId,
                PageRequest.of(Math.max(page - 1, 0), limit));
        var items = p.getContent().stream().map(m -> new
                MessageSummary(m.getId(), m.getSenderId(), m.getContent(),
                m.getTimestamp())).toList();
        return Map.of("roomId", roomId, "page", page, "limit", limit, "items",
                items);
    }

    @Transactional
    public Message send(String userId, String roomId, SendMessageRequest req) {
        ensureMember(userId, roomId);
        var msg = Message.builder()
                .roomId(roomId)
                .senderId(req.getSenderId())
                .content(req.getContent())
                .timestamp(Instant.now())
                .build();
        var saved = messageRepo.save(msg);
        ws.convertAndSend("/topic/rooms." + roomId, saved);
        return saved;
    }
}
