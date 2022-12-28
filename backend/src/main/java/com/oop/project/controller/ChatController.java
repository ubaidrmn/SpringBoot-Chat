package com.oop.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.oop.project.service.ChatService;

@RestController
@RequestMapping("chat")
public class ChatController {
    
    @Autowired
    private ChatService chatService;

    @RequestMapping("get")
    public String get() {
        return "";
    }

}
