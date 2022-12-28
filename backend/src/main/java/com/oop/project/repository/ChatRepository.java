package com.oop.project.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.oop.project.models.Chat;

public interface ChatRepository extends CrudRepository<Chat, Integer> {

}
