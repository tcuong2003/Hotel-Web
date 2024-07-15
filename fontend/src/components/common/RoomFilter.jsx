import React, { useState } from 'react'

// Thành phần này nhận hai props là data (dữ liệu phòng) và setFilteredData (hàm để đặt dữ liệu đã lọc).
const RoomFilter = ({data, setFilteredData}) => {
    const[filter, setFilter] = useState("");

    const handleSelectChange = (e) => {
        //lấy giá trị khi chọn trong dropdown
        const selectedRoomType = e.target.value
        //set name trên thanh filter
        setFilter(selectedRoomType)
        //lọc các dữ liệu trùng với giá trị 
        const filteredRooms = data.filter((room) => room.roomType.toLowerCase().includes(selectedRoomType.toLowerCase()))
        //hiển thị các dữ liệu trùng với giá trị
        setFilteredData(filteredRooms)
    }
    //xóa bộ lọc và hiển thị lại tất cả các loại phòng.
    const clearFilter = () => {
        setFilter("") //thanh lọc giá trị đưa về rỗng
        setFilteredData(data) //hiển thị lại toàn bộ dữ liệu
    }

    //chuyển đổi mỗi phần tử trong mảng data thành một phần tử mới, lấy ra giá trị của thuộc tính roomType từ mỗi phần tử.
    //mảng đã chuyển thành Set chỉ lưu trữ các giá trị duy nhất, tức là mỗi giá trị chỉ xuất hiện một lần trong Set.
    //... được sử dụng để spread cấu trúc của Set thành một mảng, biến đổi Set thành một mảng bình thường chứa các giá trị duy nhất
    //[""]: Thêm một chuỗi rỗng vào đầu mảng để tạo ra một lựa chọn trống trong dropdown, cho phép người dùng chọn để xem tất cả các loại phòng
    const roomTypes = ["", ...new Set(data.map((room) => room.roomType))] 
  return (
    <div className='input-group mb-3'>
        <span className='input-group-text' id='room-type-filter'>Filter room by type</span>
        <select className='form-select' value={filter} onChange={handleSelectChange}>
            <option value={"all"}>select a room type to filter...</option>
            {roomTypes.map((type, index) => (
                <option key={index} value={String(type)}>{String(type)}</option> //String(type) => type as string 
            ))}
        </select> 
        <button className='btn btn-hotel' type='button' onClick={clearFilter}>Clear Filter</button>
    </div>
  )
}

export default RoomFilter
