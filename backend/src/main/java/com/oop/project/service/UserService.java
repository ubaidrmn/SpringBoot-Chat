package com.oop.project.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.oop.project.models.User;
import com.oop.project.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User get(int id) throws Exception {
        Optional<User> user = this.userRepository.findById(id);
        if (user.isPresent()) {
            return user.get();
        } else {
            throw new Exception("user not found");
        }
    }

    public void create(String username, String email) {
        User user = new User(username, email);
        this.userRepository.save(user);
    }
}
