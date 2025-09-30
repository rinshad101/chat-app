package com.chat_application.chat.app.controller;

import com.chat_application.chat.app.dto.RoomDtos.*;
import com.chat_application.chat.app.model.Room;
import com.chat_application.chat.app.service.RoomService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/rooms")
@RequiredArgsConstructor
public class RoomController {
    private final RoomService service;

    // GET /rooms?userId=...
    @GetMapping
    public ResponseEntity<Map<String, Object>> list(@RequestParam String
                                                            userId) {
        var rooms = service.listRoomsForUser(userId);
        return ResponseEntity.ok(Map.of("rooms", rooms));
    }

    // POST /rooms?userId=...
    @PostMapping
    public ResponseEntity<Room> create(@RequestParam String userId, @Valid
    @RequestBody CreateRoomRequest req) {
        var res = service.create(userId, req);
        return ResponseEntity.status(201).body(res);
    }

    // GET /rooms/{id}?userId=...
    @GetMapping("/{id}")
    public ResponseEntity<Room> get(@PathVariable String id, @RequestParam
    String userId) {
        var res = service.get(userId, id);
        return ResponseEntity.ok(res);
    }

    // PUT /rooms/{id}?userId=...
    @PutMapping("/{id}")
    public ResponseEntity<Room> update(@PathVariable String id, @RequestParam
    String userId, @Valid @RequestBody UpdateRoomRequest req) {
        var res = service.update(userId, id, req);
        return ResponseEntity.ok(res);
    }

    // DELETE /rooms/{id}?userId=...
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> delete(@PathVariable String id,
                                                      @RequestParam String userId) {
        service.delete(userId, id);
        return ResponseEntity.ok(Map.of("message", "Room deleted successfully"," roomId", id));
    }

    // POST /rooms/{id}/members?userId=...
    @PostMapping("/{id}/members")
    public ResponseEntity<Room> addMembers(@PathVariable String id,
                                           @RequestParam String userId, @Valid @RequestBody AddMembersRequest req) {
        var res = service.addMembers(userId, id, req);
        return ResponseEntity.ok(res);
    }

    // DELETE /rooms/{id}/members/{removeUserId}?userId=...
    @DeleteMapping("/{id}/members/{removeUserId}")
    public ResponseEntity<Map<String, String>> removeMember(@PathVariable
                                                            String id, @PathVariable String removeUserId, @RequestParam String userId) {
        service.removeMember(userId, id, removeUserId);
        return ResponseEntity.ok(Map.of("message", "Member removed successfully"," roomId", id, " userId", removeUserId));
    }
}
