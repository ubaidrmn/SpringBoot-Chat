package com.oop.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.oop.project.models.Message;
import com.oop.project.service.ChatService;

@RestController
@RequestMapping("chat")
public class ChatController {
    
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;
	
    @Autowired
    private ChatService chatService;

    @RequestMapping("get")
    public String get() {
        return "";
    }

    // @MessageMapping("/send")
	// @SendTo("/websocket/receive")
	// public HelloMessage greeting(HelloMessage message) throws Exception {
	// System.out.println(message.getName());
	//   Thread.sleep(1000); // simulated delay
	//   return new HelloMessage("Hello How are you!");
	// }

    @MessageMapping("/hello")
	public void receive(HelloMessage message) throws Exception {
	  System.out.println(message);
      send();
	}

    public void send() throws Exception {
        this.simpMessagingTemplate.convertAndSend("/topic/greetings", new HelloMessage("hahahubaid hoon mai"));;
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