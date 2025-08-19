package com.chat_application.chat.app.controller;

import com.chat_application.chat.app.model.ChatMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    @MessageMapping("/sendMessage")      // client sends to /app/sendMessage
    @SendTo("/topic/messages")           // all subscribers receive from /topic/messages
    public ChatMessage send(ChatMessage message) {
        return message; // just broadcast
    }
}
