package com.oop.project.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.oop.project.models.Chat;
import com.oop.project.models.Message;
import com.oop.project.models.User;
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

    public void createChat(String name) {
        Chat chat = new Chat(name);
        this.chatRepository.save(chat);
    }

    public void addMessage(int chatId, int senderId, String content) {
        try {
            Optional<Chat> chat = this.chatRepository.findById(chatId);
            Optional<User> sender = this.userService.get(senderId);
            if (chat.isPresent() && sender.isPresent()) {
                Message message = new Message(sender.get(), chat.get(), content);
                this.messageRepository.save(message);
            }
        } catch (Exception e) {
            
        }
    }
}
