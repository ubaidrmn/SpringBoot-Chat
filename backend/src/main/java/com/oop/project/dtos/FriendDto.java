package com.oop.project.dtos;

import com.oop.project.models.User;

import lombok.Data;

@Data
public class FriendDto {
    String username, email, picture;

    public FriendDto(User friend) {
        this.username = friend.getUsername();
        this.email = friend.getEmail();
        this.picture = friend.getProfilePic();
    }
}
