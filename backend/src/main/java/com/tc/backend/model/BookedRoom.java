package com.tc.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookedRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingId;

    @Column(name = "Check_In")
    private LocalDate checkInDate;

    @Column(name = "Check_Out")
    private LocalDate checkOutDate;

    @Column(name = "Guest_FullName")
    private String guestFullName;

    @Column(name = "Guest_Email")
    private String guestEmail;

    @Column(name = "Adults")
    private int numOfAdults;

    @Column(name = "Children")
    private int numOfChildren;

    @Column(name = "Total_Guest")
    private int totalNumOfGuest;

    @Setter
    @Column(name = "Confirmation_Code")
    private String bookingConfirmationCode;

    @ManyToOne(fetch = FetchType.LAZY) //chỉ tải dữ liệu khi cần thiết, tiết kiệm bộ nhớ thực thi
    //name = "Room_Id" đặt tên cho cột ngoại khoá, và nó sẽ trỏ đến cột Room_Id trong bảng BookedRoom. Điều này xác định rằng mỗi BookedRoom sẽ được liên kết với một Room thông qua cột Room_Id
    @JoinColumn(name = "Room_Id")
    private Room room;

    public void calculationTotalNumberOfGuest() {
        this.totalNumOfGuest = this.numOfAdults + this.numOfChildren;
    }


    //khi nhập dữ liệu mới thì tự động set lại
    public void setNumOfAdults(int numOfAdults) {
        this.numOfAdults = numOfAdults;
        calculationTotalNumberOfGuest();
    }

    public void setNumOfChildren(int numOfChildren) {
        this.numOfChildren = numOfChildren;
        calculationTotalNumberOfGuest();
    }

}
