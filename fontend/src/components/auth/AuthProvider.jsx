import React, { createContext, useState, useContext } from "react";
// Sử dụng named export thay vì default nếu cần
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext({
	user: null,
	handleLogin: (token) => {},
	handleLogout: () => {}
});

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	const handleLogin = (token) => {
		const decodedUser = jwtDecode(token); // Sử dụng default export
		localStorage.setItem("userId", decodedUser.sub);
		localStorage.setItem("userRole", decodedUser.roles);
		localStorage.setItem("token", token);
		setUser(decodedUser);
	};

	const handleLogout = () => {
		localStorage.removeItem("userId");
		localStorage.removeItem("userRole");
		localStorage.removeItem("token");
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	return useContext(AuthContext);
};
