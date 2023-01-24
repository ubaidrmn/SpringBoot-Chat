package com.oop.project.dtos;

public class NotificationDto {
    private String text;

    public String getText() {
        return this.text;
    }

    public NotificationDto(String text) {
        this.text = text;
    }
}
