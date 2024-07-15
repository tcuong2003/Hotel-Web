package com.tc.backend.service;

import com.tc.backend.model.Role;
import com.tc.backend.model.User;
import com.tc.backend.exception.UserAlreadyExistsException;
import com.tc.backend.repository.IRoleRepository;
import com.tc.backend.repository.IUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {
    private final IUserRepository iUserRepository;
    private final PasswordEncoder passwordEncoder;
    private final IRoleRepository iRoleRepository;

    @Override
    public User registerUser(User user) {
        if (iUserRepository.existsByEmail(user.getEmail())){
            throw new UserAlreadyExistsException(user.getEmail() + " already exists");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        System.out.println(user.getPassword());
        Role userRole = iRoleRepository.findByName("ROLE_USER").get(); //tìm vai trò với tên là "ROLE_USER" và lấy ra
        user.setRoles(Collections.singletonList(userRole)); //gán vai trò cho user và tạo danh sách chỉ chứa 1 phần tử
        return iUserRepository.save(user);
    }

    @Override
    public List<User> getUsers() {
        return iUserRepository.findAll();
    }

    @Transactional
    @Override
    public void deleteUser(String email) {
        User theUser = getUser(email);
        if (theUser != null){
            iUserRepository.deleteByEmail(email);
        }

    }

    @Override
    public User getUser(String email) {
        return iUserRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }
}
