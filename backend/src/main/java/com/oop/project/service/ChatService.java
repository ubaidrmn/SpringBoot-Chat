package com.oop.project.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.oop.project.models.Chat;
import com.oop.project.repository.ChatRepository;
import com.oop.project.repository.MessageRepository;

@Service
public class ChatService {
    
    @Autowired
    private ChatRepository chatRepository;
    @Autowired
    private MessageRepository messageRepository;
    @Autowired
    private UserService userService;

    public void create() {
        Chat chat = new Chat();
        this.chatRepository.save(chat);
    }

}
