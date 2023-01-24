package com.oop.project.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;

import com.google.api.client.auth.openidconnect.IdToken.Payload;
import com.oop.project.dtos.FriendDto;
import com.oop.project.dtos.NotificationDto;
import com.oop.project.service.UserService;

@RestController
@RequestMapping("users")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3006"})
public class UserController {

	private UserService userService;
    private SimpMessagingTemplate simpMessagingTemplate;

	@Autowired
    public UserController(UserService userService, SimpMessagingTemplate simpMessagingTemplate) {
        this.userService = userService;
		this.simpMessagingTemplate = simpMessagingTemplate;
    }

	@RequestMapping(value="get-friends")
	public HashMap<String, List<FriendDto>> getFriends(@RequestParam String token) throws Exception {		
		return this.userService.getFriends(token);
	}
	
	@RequestMapping(value="add-friend")
	public HashMap<String, String> addFriend(@RequestParam String token, @RequestParam String email) throws Exception {
		this.userService.addFriend(token, email);
		HashMap<String, String> map = new HashMap<>();
		map.put("status", "success");
		return map;
	}

	@RequestMapping(value="accept-request")
	public HashMap<String, String> acceptRequest(@RequestParam String token, @RequestParam String email) throws Exception {
		this.userService.acceptRequest(token, email);
		HashMap<String, String> map = new HashMap<>();
		map.put("status", "success");
		return map;
	}

	@RequestMapping(value="login")
	public Map<String, String> login(@RequestParam String token) throws Exception{
			Payload payload = this.userService.login(token);
			String name = (String) payload.get("name");
			String picture = (String) payload.get("picture");
			String email = (String) payload.get("email");
			HashMap<String, String> map = new HashMap<String, String>();
			map.put("email", email);
			map.put("name", name);
			map.put("picture", picture);
			return map;
	}

}