package com.oop.project.dtos;

public class WSResponseMessageDto {

    private String content, senderEmail, sender, senderPicture;
    private int chatId;

    public String getContent() {
        return this.content;
    }
    
    public String getSenderEmail() {
        return this.senderEmail;
    }
    
    public String getSenderPicture() {
        return this.senderPicture;
    }

    public String getSender() {
        return this.sender;
    }

    public int getChatId() {
        return this.chatId;
    }

    public WSResponseMessageDto(String content, int chatId, String senderEmail, String sender, String senderPicture) {
        this.content = content;
        this.chatId = chatId;
        this.senderEmail = senderEmail;
        this.sender = sender;
        this.senderPicture = senderPicture;
    }

}