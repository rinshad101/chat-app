package com.chat_application.chat.app.service;

import com.chat_application.chat.app.model.Room;
import com.chat_application.chat.app.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RoomService {
    private final RoomRepository roomRepository;

    public List<Room> getUserRooms(String userId) {
        return roomRepository.findByMembersContaining(userId);
    }

    public Room createRoom(Room room, String userId) {
        room.setCreatedBy(userId);
        room.setCreatedAt(Instant.now());
        room.getMembers().add(userId);
        return roomRepository.save(room);
    }

    public Optional<Room> getRoom(String id) {
        return roomRepository.findById(id);
    }

    public Room updateRoom(String id, Room update) {
        return roomRepository.findById(id).map(r -> {
            r.setName(update.getName());
            r.setType(update.getType());
            return roomRepository.save(r);
        }).orElseThrow(() -> new RuntimeException("Room not found"));
    }

    public void deleteRoom(String id) {
        roomRepository.deleteById(id);
    }

    public Room addMember(String roomId, String userId) {
        Room r = roomRepository.findById(roomId).orElseThrow();
        if (!r.getMembers().contains(userId)) {
            r.getMembers().add(userId);
        }
        return roomRepository.save(r);
    }

    public Room removeMember(String roomId, String userId) {
        Room r = roomRepository.findById(roomId).orElseThrow();
        r.getMembers().remove(userId);
        return roomRepository.save(r);
    }
}
