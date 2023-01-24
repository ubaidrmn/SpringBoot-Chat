package com.oop.project.dtos;

import java.util.ArrayList;
import java.util.List;

import com.oop.project.models.Chat;
import com.oop.project.models.Message;
import com.oop.project.models.User;

import lombok.Data;

@Data
public class ChatDto {
    int id;
    List<MessageDtoJson> messages;
    List<String> memberEmails;
    String title;

    public ChatDto(Chat chat) {
        this.id = chat.getId();
        this.messages = new ArrayList<>();
        List<Message> messages = chat.getMessages();
        for (int i=0;i<messages.size();i++) {
            this.messages.add(new MessageDtoJson(messages.get(i)));
        }
        this.memberEmails = new ArrayList<>();
        this.title = "";
        List<User> members = chat.getMembers();
        for (int i=0;i<members.size();i++){
            this.memberEmails.add(members.get(i).getEmail());
            this.title += members.get(i).getUsername() + ", ";
        }
        this.title = this.title.substring(0, this.title.length() - 2);
    }
}
