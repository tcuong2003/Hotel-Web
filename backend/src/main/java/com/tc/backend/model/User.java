package com.tc.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ManyToAny;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;


@Entity
@Getter
@Setter
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;

    @ManyToMany(fetch = FetchType.EAGER, //tải dữ liệu cùng lúc khi user được lấy từ csdl thì tất cả role liên quan cũng được tải
            cascade = { //các thao tác cascade trên csdl user sẽ ảnh hưởng đến role
                    CascadeType.PERSIST, //lưu user thì role liên quan sẽ được lưu
                    CascadeType.MERGE,  //cập nhật user thì role liên quan sẽ được cập nhật
                    CascadeType.DETACH //tách user ra khỏi context thì role liên quan sẽ được tách
            })
    @JoinTable(name = "user_roles", //bảng trung gian
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"), //cột user_id trong bảng user_roles liên kết với cột id trong bảng user
            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id")) // role_id trong bảng user_roles liên kết đến cột id trong bảng Role
    private Collection<Role> roles = new HashSet<>();



}