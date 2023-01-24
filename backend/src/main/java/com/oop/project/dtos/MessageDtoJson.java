package com.oop.project.dtos;

import com.oop.project.models.Message;

import lombok.Data;

@Data
public class MessageDtoJson {
    private String content, sender, senderEmail, senderPicture;

    public MessageDtoJson(Message message) {
        this.content = message.getContent();
        this.sender = message.getSender().getUsername();
        this.senderEmail = message.getSender().getEmail();
        this.senderPicture = message.getSender().getProfilePic();
    }
}
