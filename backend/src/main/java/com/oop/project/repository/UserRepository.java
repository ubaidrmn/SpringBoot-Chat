package com.oop.project.repository;

import org.springframework.data.repository.CrudRepository;

import com.oop.project.models.User;

public interface UserRepository extends CrudRepository<User, Integer> {

}