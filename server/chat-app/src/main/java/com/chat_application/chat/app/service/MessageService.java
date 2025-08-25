package com.chat_application.chat.app.service;

import com.chat_application.chat.app.model.Message;
import com.chat_application.chat.app.repository.MessageRepository;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService {
    private final MessageRepository messageRepository;
    private final SimpMessagingTemplate messagingTemplate;

    public MessageService(MessageRepository messageRepository, SimpMessagingTemplate messagingTemplate) {
        this.messageRepository = messageRepository;
        this.messagingTemplate = messagingTemplate;
    }

    public List<Message> getMessages(String roomId) {
        return messageRepository.findByRoomIdOrderByTimestampAsc(roomId);
    }

    public Message sendMessage(Message message) {
        Message saved = messageRepository.save(message);
        messagingTemplate.convertAndSend("/topic/rooms." + message.getRoomId(), saved);
        return saved;
    }
}
