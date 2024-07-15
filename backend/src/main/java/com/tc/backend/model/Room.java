package com.tc.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang3.RandomStringUtils;

import java.math.BigDecimal;
import java.sql.Blob;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
//Model của CSDL
public class Room {
    @Id
    //tự động tăng id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String roomType;
    private BigDecimal roomPrice;
    private boolean isBooked = false;
    @Lob //photo được đánh dấu là một đối tượng lớn, được lưu trữ dưới dạng một mảng các byte.
    //Blob là một kiểu dữ liệu trong Java Persistence API (JPA) đại diện cho các đối tượng lớn như hình ảnh, video, hoặc các tệp dữ liệu khác
    private Blob photo;

    //fetch = FetchType.LAZY: bookings của một Room, dữ liệu từ các BookedRoom chỉ sẽ được tải vào bộ nhớ khi bạn thực sự truy cập vào danh sách đặt phòng đó. Điều này giúp tránh tải quá nhiều dữ liệu không cần thiết và tăng hiệu suất ứng dụng.
    //mappedBy trong @OneToMany, bạn đang ánh xạ quan hệ ngược từ BookedRoom đến Room. Vì vậy, mappedBy = "room" nghĩa là trong BookedRoom, có một trường tham chiếu room mà nó sẽ ánh xạ đến phòng mà đặt phòng này thuộc về.
    //mọi thay đổi trong đối tượng Room sẽ được tự động lan truyền đến tất cả các đặt phòng (BookedRoom) liên quan, bao gồm CRUD
    @OneToMany(mappedBy = "room", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<BookedRoom> bookings;

    public Room() {
        this.bookings = new ArrayList<>();
    } 

    public void addBooking(BookedRoom booking) {
        if (bookings == null) {
            bookings = new ArrayList<>();
        }
        bookings.add(booking);
        //Đặt trường room của đặt phòng này thành phòng hiện tại (this), đảm bảo rằng quan hệ giữa phòng và đặt phòng được thiết lập đúng cách
        booking.setRoom(this);
        isBooked = true;
        String bookingCode = RandomStringUtils.randomNumeric(10);
        booking.setBookingConfirmationCode(bookingCode);
    }
}
