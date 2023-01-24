package com.oop.project.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.google.api.client.auth.openidconnect.IdToken.Payload;
import com.oop.project.dtos.ChatDto;
import com.oop.project.dtos.MessageDto;
import com.oop.project.dtos.WSResponseMessageDto;
import com.oop.project.models.Chat;
import com.oop.project.models.User;
import com.oop.project.service.ChatService;
import com.oop.project.service.UserService;

@RestController
@RequestMapping("chat")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3006"})
public class ChatController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;
	@Autowired
	private UserService userService;
	
    @Autowired
    private ChatService chatService;

	@RequestMapping(method=RequestMethod.GET, path="/get")
	public List<ChatDto> get(@RequestParam String  email) {
		System.out.println(email);
		User user = this.userService.getByEmail(email);
		List<Chat> chats = user.getChats();
		List<ChatDto> response = new ArrayList<>();
		for (int i=0;i<chats.size();i++) {
			response.add(new ChatDto(chats.get(i)));
		}
		return response;
	}

	@RequestMapping(method=RequestMethod.POST,consumes = MediaType.APPLICATION_JSON_VALUE,path="/create")
	public HashMap<String, String> create(@RequestBody Map<String, List<String>> payload) {
		this.chatService.create(payload.get("emails"));
		HashMap<String, String> map = new HashMap<String, String>();
		map.put("status", "success");
		return map;
	}

	// WEB SOCKET END POINTS

    @MessageMapping("/send")
	public void receive(MessageDto message) {
		try {
			//check if the jwt email is same as sender mail
			Payload payload = this.userService.login(message.getJwt());
			if (((String) payload.get("email")).equals(message.getSenderEmail())) {
				this.chatService.saveMessage(message.getJwt(), message.getContent(), message.getChatId());
				User user = this.userService.getByEmail((String) payload.get("email"));
				send(message, user);
			}
		} catch (Exception err) {
			System.out.println(err);
		}
	}

    public void send(MessageDto message, User sender) throws Exception {
		Optional<Chat> chat = this.chatService.get(message.getChatId());
		if (chat.isPresent()) {
			List<User> members = chat.get().getMembers();
			for (int i=0;i<members.size();i++) {
				try {
					this.simpMessagingTemplate.convertAndSend("/chat"+members.get(i).getEmail(), new WSResponseMessageDto(message.getContent(), message.getChatId(), message.getSenderEmail(), sender.getUsername(), sender.getProfilePic()));
				} catch (Exception err) {}
			}
		}

    }
	
}