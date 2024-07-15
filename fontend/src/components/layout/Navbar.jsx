import React, { useContext, useState } from "react"
import { NavLink, Link } from "react-router-dom"
import Logout from "../auth/Logout"



const Navbar = () => {

	const [showAccount, setShowAccount] = useState(false)

	const handleAccountClick = () => {
		setShowAccount(!showAccount) // true
	}
	// check status user login, localStorage là API save data type key-value local, không có ngày hết hạn, 
	// lấy value của key token từ localStorage đã save khi user login success thì isLoggedIn sẽ chứa value, ngược lại thì null
	const isLoggedIn = localStorage.getItem("token")
	//role là vai trò của user khi đăng nhập (admin, user, editor)
	const userRole = localStorage.getItem('userRole')

  return (
    <nav className='navbar navbar-expand-lg bg-body-tertiary px-5 shadow mt-5 sticky-top'>
        <div className='container-fluid'>
            {/*Link như tag <a> và Navlink auto áp dụng CSS để đánh dấu link hiện tại (active link)*/}
			<Link to={"/"} className="navbar-brand">
                <span className='hotel-color'>Hotel App</span>
            </Link>
            <button className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarScroll"
					aria-controls="navbarScroll"
					aria-expanded="false"
					aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
            </button>

			<div className="collapse navbar-collapse" id="navbarScroll">
				<ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
					<li className="nav-item">
						<NavLink className="nav-link" aria-current="page" to={"/browse-all-rooms"}>
							Browse all rooms
						</NavLink>
					</li>
					{isLoggedIn && userRole === 'ROLE_ADMIN' && (
					<li className="nav-item">
						<NavLink className="nav-link" aria-current="page" to={"/admin"}>
							Admin
						</NavLink>
					</li>
					)}
				</ul>

				<ul className="d-flex navbar-nav">
					<li className="nav-item">
						<NavLink className="nav-link" to={"/find-booking"}>
							Find My Booking
						</NavLink>
					</li>

					<li className="nav-item dropdown">
						<a
							className={`nav-link dropdown-toggle ${showAccount ? "show" : ""}`}
							href="#"
							role="button"
							data-bs-toggle="dropdown"
							aria-expanded="false"
							onClick={handleAccountClick}>
							{" "}
							Account
						</a>

						<ul className={`dropdown-menu ${showAccount ? "show" : ""}`}
								aria-labelledby="navbarDropdown">
							{isLoggedIn ? (
									<Logout />
								) : (
									<li>
										<Link className="dropdown-item" to={"/login"}>
											Login
										</Link>
									</li>
								)}
						</ul>
					</li>
				</ul>

			</div>
        </div>
    </nav>
  )
}

export default Navbar
