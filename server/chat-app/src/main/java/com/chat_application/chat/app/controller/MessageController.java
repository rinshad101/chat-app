package com.chat_application.chat.app.controller;

import com.chat_application.chat.app.dto.SendMessageRequest;
import com.chat_application.chat.app.service.MessageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/rooms/{roomId}/messages")
@RequiredArgsConstructor
public class MessageController {
    private final MessageService service;

    // GET /rooms/{roomId}/messages?userId=...&page=1&limit=20
    @GetMapping
    public ResponseEntity<Map<String, Object>> list(@PathVariable String roomId,
                                                    @RequestParam String userId,
                                                    @RequestParam(defaultValue
                                                            = "1") int page,
                                                    @RequestParam(defaultValue
                                                            = "20") int limit) {
        var res = service.list(userId, roomId, page, limit);
        return ResponseEntity.ok(res);
    }

    // POST /rooms/{roomId}/messages?userId=...
    @PostMapping
    public ResponseEntity<?> send(@PathVariable String roomId,
                                  @RequestParam String userId,
                                  @Valid @RequestBody SendMessageRequest req) {
        var res = service.send(userId, roomId, req);
        return ResponseEntity.status(201).body(res);
    }
}
