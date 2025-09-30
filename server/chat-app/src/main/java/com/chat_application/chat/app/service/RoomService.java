package com.chat_application.chat.app.service;

import com.chat_application.chat.app.dto.RoomDtos.*;
import com.chat_application.chat.app.model.Room;
import com.chat_application.chat.app.repository.MessageRepository;
import com.chat_application.chat.app.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.Instant;
import java.util.*;
import java.util.stream.Collectors;
@Service
@RequiredArgsConstructor
public class RoomService {
    private final RoomRepository roomRepo;
    private final MessageRepository msgRepo;
    @Transactional(readOnly = true)
    public List<RoomResponse> listRoomsForUser(String userId){
        var rooms = roomRepo.findByMembersContaining(userId);
        return rooms.stream().map(r -> {
            var last = msgRepo.findTop1ByRoomIdOrderByTimestampDesc(r.getId());
            MessageSummary lm = null;
            if (last != null) lm = MessageSummary.builder()
                    .id(last.getId()).senderId(last.getSenderId())
                    .content(last.getContent()).timestamp(last.getTimestamp())
                    .build();
            return RoomResponse.builder()
                    .id(r.getId()).name(r.getName()).type(r.getType())
                    .membersCount(r.getMembers() == null ? 0 : r.getMembers().size())
                    .lastMessage(lm)
                    .createdAt(r.getCreatedAt()).updatedAt(r.getUpdatedAt())
                    .build();
        }).collect(Collectors.toList());
    }
    @Transactional
    public Room create(String creatorId, CreateRoomRequest req){
        var room = Room.builder()
                .name(req.getName())
                .type(req.getType())
                .members(new ArrayList<>())
                .createdBy(creatorId)
                .createdAt(Instant.now())
                .updatedAt(Instant.now())
                .build();
        room.getMembers().add(creatorId);
        if (req.getMembers() != null) {
            for (var uid : new HashSet<>(req.getMembers()))
                if (!creatorId.equals(uid) && !room.getMembers().contains(uid))
                    room.getMembers().add(uid);
        }
        return roomRepo.save(room);
    }
    @Transactional(readOnly = true)
    public Room get(String userId, String roomId){
        var room = roomRepo.findById(roomId).orElseThrow(() -> new
                NoSuchElementException("Room not found"));
        ensureMember(userId, room);
        return room;
    }
    @Transactional
    public Room update(String userId, String roomId, UpdateRoomRequest req){
        var room = roomRepo.findById(roomId).orElseThrow(() -> new
                NoSuchElementException("Room not found"));
        ensureMember(userId, room); // or enforce admin if you track roles
        room.setName(req.getName());
        room.setUpdatedAt(Instant.now());
        return roomRepo.save(room);
    }
    @Transactional
    public void delete(String userId, String roomId){
        var room = roomRepo.findById(roomId).orElseThrow();
        ensureMember(userId, room);
        roomRepo.deleteById(roomId);
    }
    @Transactional
    public Room addMembers(String userId, String roomId, AddMembersRequest req)
    {
        var room = roomRepo.findById(roomId).orElseThrow();
        ensureMember(userId, room);
        var set = new LinkedHashSet<>(room.getMembers());
        set.addAll(req.getMembers());
        room.setMembers(new ArrayList<>(set));
        room.setUpdatedAt(Instant.now());
        return roomRepo.save(room);
    }
    @Transactional
    public void removeMember(String userId, String roomId, String removeUserId)
    {
        var room = roomRepo.findById(roomId).orElseThrow();
        ensureMember(userId, room);
        room.getMembers().remove(removeUserId);
        room.setUpdatedAt(Instant.now());
        roomRepo.save(room);
    }
    private void ensureMember(String userId, Room room){
        if (room.getMembers() == null || !room.getMembers().contains(userId))
            throw new SecurityException("Not a member of this room");
    }
}
