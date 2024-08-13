import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const navigate = useNavigate();

    const login = (inputUsername, inputPassword) => {
        const username = process.env.REACT_APP_ADMIN_USERNAME;
        const password = process.env.REACT_APP_ADMIN_PASSWORD;

        if (inputUsername === username && inputPassword === password) {
            const loggedInUser = { displayName: inputUsername };
            setUser(loggedInUser);
            localStorage.setItem('user', JSON.stringify(loggedInUser));
            navigate('/'); 
        } else {
            console.error("Credenciais inválidas.");
            alert("Credenciais inválidas.");
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        navigate('/login');
    };

    useEffect(() => {
        const unprotectedRoutes = ['/login', '/public'];
        if (!user && !unprotectedRoutes.includes(window.location.pathname)) {
            navigate('/login');
        }
    }, [user, navigate]);    

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
