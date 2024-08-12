import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const login = (username, password) => {
        const adminUsername = process.env.REACT_APP_ADMIN_USERNAME;
        const adminPassword = process.env.REACT_APP_ADMIN_PASSWORD;

        if (username === adminUsername && password === adminPassword) {
            setUser({ username, role: 'admin' });
            navigate('/');
        } else {
            alert('Credenciais inválidas');
        }
    };

    const logout = () => {
        setUser(null);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
