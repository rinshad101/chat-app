package com.chat_application.chat.app.repository;

import com.chat_application.chat.app.model.Room;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface RoomRepository extends MongoRepository<Room, String> {
    List<Room> findByMembersContaining(String userId);
}