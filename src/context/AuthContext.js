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
    
        if (!username || !password) {
            console.error("Variáveis de ambiente não estão carregadas corretamente.");
        } else {
            console.log("Usuário e senha das variáveis de ambiente foram carregados com sucesso.");
        }
    
        if (inputUsername === username && inputPassword === password) {
            console.log("Login bem-sucedido");
            setUser({ displayName: inputUsername });
            navigate('/');
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
