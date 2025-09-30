package com.chat_application.chat.app.repository;

import com.chat_application.chat.app.model.Message;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MessageRepository extends MongoRepository<Message, String> {
    Page<Message> findByRoomIdOrderByTimestampDesc(String roomId, Pageable pageable);

    Message findTop1ByRoomIdOrderByTimestampDesc(String roomId);
}