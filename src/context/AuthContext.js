// src/context/AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const login = async (inputUsername, inputPassword) => {
        const username = process.env.REACT_APP_PROD_USER;
        const password = process.env.REACT_APP_PROD_PASSWORD;

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
