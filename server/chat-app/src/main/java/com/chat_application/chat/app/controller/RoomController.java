package com.chat_application.chat.app.controller;

import com.chat_application.chat.app.model.Room;
import com.chat_application.chat.app.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rooms")
@RequiredArgsConstructor
public class RoomController {
    private final RoomService roomService;

    @GetMapping
    public List<Room> getRooms(@RequestParam String userId) {
        return roomService.getUserRooms(userId);
    }

    @PostMapping
    public Room createRoom(@RequestBody Room room, @RequestParam String userId) {
        return roomService.createRoom(room, userId);
    }

    @GetMapping("/{id}")
    public Room getRoom(@PathVariable String id) {
        return roomService.getRoom(id).orElseThrow();
    }

    @PutMapping("/{id}")
    public Room updateRoom(@PathVariable String id, @RequestBody Room update) {
        return roomService.updateRoom(id, update);
    }

    @DeleteMapping("/{id}")
    public void deleteRoom(@PathVariable String id) {
        roomService.deleteRoom(id);
    }

    @PostMapping("/{id}/members")
    public Room addMember(@PathVariable String id, @RequestParam String userId) {
        return roomService.addMember(id, userId);
    }

    @DeleteMapping("/{id}/members/{userId}")
    public Room removeMember(@PathVariable String id, @PathVariable String userId) {
        return roomService.removeMember(id, userId);
    }
}
