package com.oop.project.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.api.client.auth.openidconnect.IdToken.Payload;
import com.oop.project.models.Chat;
import com.oop.project.models.Message;
import com.oop.project.models.User;
import com.oop.project.repository.ChatRepository;
import com.oop.project.repository.MessageRepository;
import com.oop.project.repository.UserRepository;

@Service
public class ChatService {
    
    @Autowired
    private ChatRepository chatRepository;
    @Autowired
    private MessageRepository messageRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;

    public Optional<Chat> get(int id) {
        return this.chatRepository.findById(id);
    }

    public void create(List<String> memberEmails) {
        List<User> members = new ArrayList<User>();
        for (int i=0;i<memberEmails.size();i++) {
            User user = this.userRepository.findByEmail(memberEmails.get(i));
            if (user != null) {
                members.add(user);
            }
        }
        Chat chat = new Chat(new ArrayList<>(), members);
        this.chatRepository.save(chat);
    }

    public void saveMessage(String jwt, String content, int chatId) {
        try {
            Payload payload = this.userService.login(jwt);
            User user = this.userRepository.findByGoogleSubId((String) payload.get("sub"));
            Optional<Chat> chat = this.chatRepository.findById(chatId);
            if (chat.isPresent()) {
                Message message = new Message(user, chat.get(), content);
                this.messageRepository.save(message);
            }
        } catch (Exception e) {
            System.out.println(e);
        }
    }

}
