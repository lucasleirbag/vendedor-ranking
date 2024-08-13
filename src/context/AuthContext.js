// src/context/AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const login = (inputUsername, inputPassword) => {
        const username = process.env.REACT_APP_ADMIN_USERNAME;
        const password = process.env.REACT_APP_ADMIN_PASSWORD;

        if (inputUsername === username && inputPassword === password) {
            setUser({ displayName: inputUsername });
            navigate('/'); // Redirecionar para a home após login bem-sucedido
        } else {
            console.error("Credenciais inválidas.");
            alert("Credenciais inválidas.");
        }
    };

    const logout = () => {
        setUser(null);
        navigate('/login'); // Redirecionar para a página de login após logout
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
