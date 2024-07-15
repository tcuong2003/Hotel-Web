package com.tc.backend.service;

import com.tc.backend.exception.RoleAlreadyExistException;
import com.tc.backend.model.Role;
import com.tc.backend.model.User;
import com.tc.backend.exception.UserAlreadyExistsException;
import com.tc.backend.repository.IRoleRepository;
import com.tc.backend.repository.IUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * @author Simpson Alfred
 */

@Service
@RequiredArgsConstructor
public class RoleService implements IRoleService {
    private final IRoleRepository iRoleRepository;
    private final IUserRepository iUserRepository;

    @Override
    public List<Role> getRoles() {
        return iRoleRepository.findAll();
    }

    @Override
    public Role createRole(Role theRole) {
        String roleName = "ROLE_"+theRole.getName().toUpperCase();
        Role role = new Role(roleName);
        if (iRoleRepository.existsByName(roleName)){
            throw new RoleAlreadyExistException(theRole.getName()+" role already exists");
        }
        return iRoleRepository.save(role);
    }

    @Override
    public void deleteRole(Long roleId) {
        this.removeAllUsersFromRole(roleId);
        iRoleRepository.deleteById(roleId);
    }

    @Override
    public Role findByName(String name) {
        return iRoleRepository.findByName(name).get();
    }

    @Override
    public User removeUserFromRole(Long userId, Long roleId) {
        Optional<User> user = iUserRepository.findById(userId);
        Optional<Role>  role = iRoleRepository.findById(roleId);
        if (role.isPresent() && role.get().getUsers().contains(user.get())){
            role.get().removeUserFromRole(user.get());
            iRoleRepository.save(role.get());
            return user.get();
        }
        throw new UsernameNotFoundException("User not found");
    }

    @Override
    public User assignRoleToUser(Long userId, Long roleId) {
        Optional<User> user = iUserRepository.findById(userId);
        Optional<Role>  role = iRoleRepository.findById(roleId);
        if (user.isPresent() && user.get().getRoles().contains(role.get())){
            throw new UserAlreadyExistsException(
                    user.get().getFirstName()+ " is already assigned to the" + role.get().getName()+ " role");
        }
        if (role.isPresent()){
            role.get().assignRoleToUser(user.get());
            iRoleRepository.save(role.get());
        }
        return user.get();
    }

    @Override
    public Role removeAllUsersFromRole(Long roleId) {
        Optional<Role> role = iRoleRepository.findById(roleId);
        role.ifPresent(Role::removeAllUsersFromRole);
        return iRoleRepository.save(role.get());
    }
}
