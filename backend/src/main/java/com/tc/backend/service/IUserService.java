package com.tc.backend.service;

import com.tc.backend.model.User;

import java.util.List;

public interface IUserService {
    User registerUser(User user);

    List<User> getUsers();

    void deleteUser(String email);

    User getUser(String email);
}
