package com.chat_application.chat.app.repository;

import com.chat_application.chat.app.model.Message;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface MessageRepository extends MongoRepository<Message, String> {
    List<Message> findByRoomIdOrderByTimestampAsc(String roomId);
}
