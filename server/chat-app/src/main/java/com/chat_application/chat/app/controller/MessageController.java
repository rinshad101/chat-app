package com.chat_application.chat.app.controller;

import com.chat_application.chat.app.model.Message;
import com.chat_application.chat.app.service.MessageService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rooms/{roomId}/messages")
public class MessageController {
    private final MessageService messageService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @GetMapping
    public List<Message> getMessages(@PathVariable String roomId) {
        return messageService.getMessages(roomId);
    }

    @PostMapping
    public Message sendMessage(@PathVariable String roomId, @RequestBody Message message) {
        message.setRoomId(roomId);
        return messageService.sendMessage(message);
    }
}
