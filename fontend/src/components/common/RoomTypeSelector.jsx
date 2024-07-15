import React, { useEffect, useState } from 'react'
import { getRoomTypes } from '../utils/ApiFunctions'

const RoomTypeSelector = ({handleRoomInputChange, newRoom}) => {
    const[roomTypes, setRoomTypes] = useState([""])
    const[showNewRoomTypeInput, setShowNewRoomTypeInput] = useState(false)
    const[newRoomType, setNewRoomType] = useState("")

    /*useEffect(() => { ... }, []): là hàm callback được truyền vào useEffect sẽ được thi sau khi component được render lần đầu tiên 
    []: side effect chỉ nên chạy một lần sau lần render đầu tiên */
    useEffect(() => {
        getRoomTypes().then((data) => {
            setRoomTypes(data)
        }) 
    }, [])

    const handleNewRoomTypeInputChange = (e) => {
        setNewRoomType(e.target.value);
    }

    const handleAddNewRoomType = () => {
        if (newRoomType !== "") {
            setRoomTypes([...roomTypes, newRoomType])
            setNewRoomType("")
            setShowNewRoomTypeInput(false);
        }
    }
  return (
    <>
    {(roomTypes.length > 0 || roomTypes.length == 0) && (
        <div>
            <select
            required
            className='form-select'
            name='roomType'
            onChange={(e) =>{
                if(e.target.value === "Add New") {
                    setShowNewRoomTypeInput(true);
                    handleRoomInputChange(e) 
                } else {
                    handleRoomInputChange(e)
                    setShowNewRoomTypeInput(false); 
                }
            }}
            value={newRoom.roomType}>
                <option value={""}>Select a room type</option>
                <option value={"Add New"}>Add New</option>
                {roomTypes.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                ))}
            </select>

            {showNewRoomTypeInput && (
                <div className='mt-2'>
                <div className='input-group'>
                    <input
                    className='form-control'
                    type='text'
                    placeholder='Enter a new room type'
                    value={newRoomType}
                    onChange={handleNewRoomTypeInputChange}/>
                    <button className='btn btn-hotel' type='button' onClick={handleAddNewRoomType}>Add</button>
                </div>
                </div>
            )}
        </div>
    )} 
    </>
  )
}

export default RoomTypeSelector
