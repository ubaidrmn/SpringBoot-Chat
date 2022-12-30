package com.oop.project.repository;

import org.springframework.data.repository.CrudRepository;

import com.oop.project.models.Message;

public interface MessageRepository extends CrudRepository<Message, Integer> {

}
