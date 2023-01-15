package com.oop.project.models;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name="Message")
@Data
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String content;

    @ManyToOne
    @JoinColumn(name="chat_id")
    private Chat chat;

    @ManyToOne
    @JoinColumn(name="sender_id")
    private User sender;

    public Message(User sender, Chat chat, String content) {
        this.chat = chat;
        this.content = content;
        this.sender = sender;
    }

    public Message(String jwt, String content, int chatId) {
        // decode jwt, verify token, check if user is a member of this chat ids chat
        // if yes then store the message
    }
}
