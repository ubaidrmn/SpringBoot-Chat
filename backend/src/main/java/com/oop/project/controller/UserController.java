package com.oop.project.controller;
import org.springframework.ui.Model;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.oop.project.models.Chat;
import com.oop.project.service.ChatService;
import com.oop.project.service.UserService;

@Controller
@RequestMapping("users")
public class UserController {

	private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

	@RequestMapping(value="")
	public String index() {	
		return "index";
	}
	
	@MessageMapping("/hello")
	@SendTo("/topic/greetings")
	public Greeting greeting(HelloMessage message) throws Exception {
	System.out.println(message.getName());
	  Thread.sleep(1000); // simulated delay
	  return new Greeting("Hello How are you!!");
	}

}

class Greeting {

	private String content;
  
	public Greeting() {
	}
  
	public Greeting(String content) {
	  this.content = content;
	}
  
	public String getContent() {
	  return content;
	}
  
  }
  
class HelloMessage {

	private String name;
  
	public HelloMessage() {
	}
  
	public HelloMessage(String name) {
	  this.name = name;
	}
  
	public String getName() {
	  return name;
	}
  
	public void setName(String name) {
	  this.name = name;
	}
  }