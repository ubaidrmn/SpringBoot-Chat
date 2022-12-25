package com.oop.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.oop.project.service.UserService;

@RestController
@RequestMapping("users")
public class UserController {

	private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

	@GetMapping("/")
	public String index() {
		this.userService.create("Ubaid", "rehmanubaid2003@gmail.com");
		return "Hello Friend";
	}

}