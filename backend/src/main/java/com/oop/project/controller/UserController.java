package com.oop.project.controller;
import org.springframework.ui.Model;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;

import com.google.api.client.auth.openidconnect.IdToken.Payload;
import com.oop.project.service.UserService;

@RestController
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

	
	@CrossOrigin(origins = "http://localhost:3000")
	@RequestMapping(value="login")
	public Map<String, String> login(@RequestParam String token) {
		try {
			Payload payload = this.userService.login(token);
			String name = (String) payload.get("name");
			String picture = (String) payload.get("picture");
			String email = (String) payload.get("email");
			HashMap<String, String> map = new HashMap<String, String>();
			map.put("email", email);
			map.put("name", name);
			map.put("picture", picture);
			return map;
		} catch (Exception e) {
			Map<String, String> map = new HashMap<String, String>();
			map.put("status", "failed");
			return map;
		}
	}

}