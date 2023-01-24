package com.oop.project.models;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name="User")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String username, email, googleSubId, profilePic;

    @OneToMany(mappedBy = "sender")
    private List<Message> messages;
    
    @ManyToMany(mappedBy = "members", fetch = FetchType.EAGER)
    private List<Chat> chats;

    @ManyToMany(fetch = FetchType.EAGER)
    private List<User> friends;

    @ManyToMany(fetch = FetchType.EAGER)
    private List<User> requests;
    
    public User(String username, String email, String googleSubId, String profilePic) {
        this.username = username;
        this.email = email;
        this.googleSubId = googleSubId;
        this.profilePic = profilePic;
    }

    public User() {}
}
