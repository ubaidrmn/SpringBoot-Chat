package com.oop.project.dtos;

public class MessageDto {
    private String content, senderEmail, jwt, sender;
    private int chatId;

    public String getContent() {
        return this.content;
    }

    public String getJwt() {
        return this.jwt;
    }
    
    public String getSenderEmail() {
        return this.senderEmail;
    }

    public String getSender() {
        return this.sender;
    }

    public int getChatId() {
        return this.chatId;
    }

    public MessageDto(String content, int chatId, String senderEmail, String jwt) {
        this.content = content;
        this.chatId = chatId;
        this.senderEmail = senderEmail;
        this.jwt = jwt;
    }

}