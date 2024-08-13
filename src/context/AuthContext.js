// src/context/AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const login = (inputUsername, inputPassword) => {
        // Adiciona logs para verificar as variáveis de ambiente
        console.log("Variáveis de ambiente:");
        console.log("REACT_APP_ADMIN_USERNAME:", process.env.REACT_APP_ADMIN_USERNAME);
        console.log("REACT_APP_ADMIN_PASSWORD:", process.env.REACT_APP_ADMIN_PASSWORD);

        const username = process.env.REACT_APP_ADMIN_USERNAME;
        const password = process.env.REACT_APP_ADMIN_PASSWORD;

        // Adiciona logs para verificar os valores de entrada
        console.log("Valores de entrada:");
        console.log("inputUsername:", inputUsername);
        console.log("inputPassword:", inputPassword);

        if (inputUsername === username && inputPassword === password) {
            console.log("Login bem-sucedido");
            setUser({ displayName: inputUsername });
            navigate('/'); // Redirecionar para a home após login bem-sucedido
        } else {
            console.error("Credenciais inválidas.");
            alert("Credenciais inválidas.");
        }
    };

    const logout = () => {
        console.log("Usuário fez logout");
        setUser(null);
        navigate('/login'); // Redirecionar para a página de login após logout
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
