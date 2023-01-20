package com.oop.project.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.oop.project.models.Chat;
import com.oop.project.models.Message;
import com.oop.project.service.ChatService;

@RestController
@RequestMapping("chat")
public class ChatController {
    
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;
	
    @Autowired
    private ChatService chatService;

	@RequestMapping(method=RequestMethod.POST,consumes = MediaType.APPLICATION_JSON_VALUE,path="/create")
	public HashMap<String, String> create(@RequestBody Map<String, List<String>> payload) {
		this.chatService.create(payload.get("emails"));
		HashMap<String, String> map = new HashMap<String, String>();
		map.put("status", "success");
		return map;
	}

	// WEB SOCKET END POINTS

    @MessageMapping("/send")
	public void receive(HelloMessage message) throws Exception {
	  System.out.println(message);
	  System.out.println("AHAAHAHHAH");
      send();
	}

    public void send() throws Exception {
        this.simpMessagingTemplate.convertAndSend("/chat", new HelloMessage("hahahubaid hoon mai"));;
    }
	
}

class HelloMessage {

	private String name;
  
	public HelloMessage() {
	}
  
	public HelloMessage(String content) {
	  this.name = content;
	}
  
	public String getName() {
	  return name;
	}
  
	public void setName(String name) {
	  this.name = name;
	}
  }