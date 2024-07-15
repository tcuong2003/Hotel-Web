import React, { useState } from 'react'
import { addRoom } from '../utils/ApiFunctions';
import RoomTypeSelector from '../common/RoomTypeSelector';
import { Link } from 'react-router-dom'
const AddRoom = () => {
  
  const[newRoom, setNewRoom] = useState({
    photo : null,
    roomType : "",
    roomPrice: ""
  });

  const[imagePreview, setImagePreview] = useState("");
  const[successMessage, setSuccessMessage] = useState("");
  const[errorMessage, setErrorMessage] = useState("");

  //e.target.name: Lấy tên của trường nhập liệu đang được thay đổi.
  //e.target.value: Lấy giá trị hiện tại của trường nhập liệu.
  const handleRoomInputChange = (e) => {
     const name = e.target.name
     let value = e.target.value

     if (value == "Add New") {
      value = "";
     }

    //{...newRoom, [name]: value}: Cập nhật đối tượng newRoom bằng cách sao chép các thuộc tính hiện có của newRoom và cập nhật thuộc tính có tên là name với giá trị mới.
    //...newRoom: Sao chép tất cả các thuộc tính hiện có của newRoom.
    //[name]: value: Cập nhật thuộc tính có tên là name với giá trị mới.
    setNewRoom({...newRoom, [name]: value})
  }

  const handlePriceChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;

    //!isNaN(value): Kiểm tra xem giá trị không phải là NaN (Not a Number), tức là một số hợp lệ.
     //Nếu đúng, chuyển đổi giá trị sang kiểu số nguyên (parseInt(value)).
     //Nếu sai, đặt giá trị thành chuỗi rỗng ("").
    if (name ==='roomPrice'){
      if (!isNaN(value)) {
        value = parseInt(value)
      } else {
        value = ""
      }
    }
    setNewRoom({...newRoom, [name]: value})
  }

  const handleImageChange = (e) => {
    //e.target.files[0]: Lấy ảnh đầu tiên từ danh sách các file mà người dùng đã chọn (trong trường hợp này, chỉ có một file).  
    const selectedImage = e.target.files[0]
    setNewRoom({...newRoom, photo : selectedImage})
    //URL.createObjectURL(selectedImage): Tạo một URL tạm thời để xem trước ảnh đã chọn. URL này sẽ chỉ tồn tại trong phiên làm việc hiện tại và sẽ bị thu hồi (revoke) khi không còn cần thiết.
    setImagePreview(URL.createObjectURL(selectedImage)) 
  }

  const handleSubmit = async (e) => { 
    //Ngăn chặn hành động mặc định của trình duyệt khi form được gửi (submit). Điều này giúp tránh việc trang web bị tải lại.
    e.preventDefault()
    try {
      const success = await addRoom(newRoom.photo, newRoom.roomType, newRoom.roomPrice);
      if (success !== undefined){ 
        setSuccessMessage("A new room was added to the database")
        setNewRoom({photo: null, roomType: "", roomPrice: ""})
        setImagePreview("")
        setErrorMessage("")
      }
      else{
        setErrorMessage("Error adding new room")
      }
    }catch(error) {
        errorMessage
    }
    setTimeout(() => {
      setSuccessMessage("")
      setErrorMessage("")
    }, 3000)
  }


  return (
    <>
    {/*section giúp phân đoạn và nhóm các nội dung liên quan với nhau  */}
    <section className='container mt-5 mb-5'>
      <div className='row justify-content-center'>
       
       {/*col-md-8: phần tử chiếm 8 cột trên lưới khi kích thước từ md'medium' trở lên */
       /*col-lg-6: phần tử chiếm 8 cột trên lưới khi kích thước từ lg'large' trở lên*/
       /*lớp này kích hoạt thì lớp kia không có hiệu lực */}
       <div className='col-md-8 col-lg-6'>
          <h2 className='mt-5 mb-2'>Add a New Room</h2>

          {/*Biểu thức điều kiện JSX trong React: Nếu successMessage có giá trị 
          'không phải null, undefined, hoặc false', thì phần tử bên trong sẽ được hiển thị. */}
          {successMessage && (
            <div className='alert alert-success fade show'>{successMessage}</div>
          )}

          {errorMessage && 
            <div className='alert alert-danger fade show'>{errorMessage}</div>
          }

          <form onSubmit={handleSubmit}> 
            
            <div className='mb-3'>
              <label htmlFor='roomType' className='form-label'> Room Type</label>
              <div> 
                {/*RoomTypeSelector là component cha, handleRoomInputChange, newRoom là component con*/}
                <RoomTypeSelector handleRoomInputChange={handleRoomInputChange}
                newRoom={newRoom}
                />
              </div>
            </div>

            <div className='mb-3'>
              <label htmlFor='roomPrice' className='form-label'> Room Price</label>
              {/* value hiện tại của input được liên kết với newRoom.roomPrice, đảm bảo rằng input sẽ hiển thị giá trị hiện tại của roomPrice trong state newRoom. */
              /* handleRoomInputChange cập nhật giá trị cho state newRoom*/}
              <input className='form-control' required id="roomPrice" type='number' name='roomPrice' value={newRoom.roomPrice } onChange={handlePriceChange}/>
            </div>

            <div className='mb-3'>
              <label htmlFor='photo' className='form-label'> Room Photo</label>
              <input id="photo" name='photo' type='file' className="form-control" onChange={handleImageChange}/>
              {imagePreview && (
                <img src={imagePreview} alt='Preview Room Photo' style={{maxWidth:"400px", maxHeight:"400px"}} className='mb-3'></img>
              )}
            </div>
              
            <div className='d-grid d-md-flex mt-2'>
              <Link to={"/existing-rooms"} className="btn btn-outline-info">
                Back
              </Link>
              <button className='btn btn-outline-primary ml-5'>Save Room</button>
            </div>

          </form>
        </div>
      </div>

    </section>
    
    
    </>
  )
}

export default AddRoom
