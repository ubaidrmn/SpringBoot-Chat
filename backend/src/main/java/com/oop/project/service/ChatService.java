package com.oop.project.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.oop.project.models.Chat;
import com.oop.project.repository.ChatRepository;

@Service
public class ChatService {
    
    @Autowired
    private ChatRepository chatRepository;

    public void save(String name) {
        Chat chat = new Chat(name);
        this.chatRepository.save(chat);
    }
}
