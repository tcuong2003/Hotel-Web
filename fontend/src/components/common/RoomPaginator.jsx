import React from 'react'

const RoomPaginator = ({currentPage, totalPages, onPageChange}) => {
    //một mảng pageNumbers chứa các số trang từ 1 đến totalPages
    //Hàm Array.from() được sử dụng để tạo mảng từ một đối tượng giống mảng hoặc một iterable, trong trường hợp này là một object có độ dài là totalPages
    //Mỗi phần tử trong mảng sẽ tương ứng với một số trang, bắt đầu từ 1
    const pageNumbers = Array.from({length: totalPages}, (_, i) => i+1)
  return (
    <nav aria-label="Page navigation">
        <ul className='pagination justify-content-center'>
            {pageNumbers.map((pageNumber) => (
                <li key={pageNumber} 
                    className={`page-item ${currentPage === pageNumber ? "active" : ""}`}>
                    <button className='page-link' onClick={() => onPageChange(pageNumber)}>{pageNumber}</button>
                </li>
            ))}
        </ul>
    </nav>
  )
}

export default RoomPaginator
