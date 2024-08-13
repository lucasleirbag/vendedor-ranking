// src/context/AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
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
const auth = getAuth(app);

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const login = async (inputUsername, inputPassword) => {
        let email;
        let password;

        if (process.env.NODE_ENV === 'development') {
            // Modo de desenvolvimento: verifica se as credenciais de desenvolvimento são válidas
            if (inputUsername === 'admin' && inputPassword === 'admin') {
                setUser({ displayName: 'admin' });
                navigate('/'); // Redirecionar para a home após login bem-sucedido
            } else {
                console.error("Credenciais de desenvolvimento inválidas.");
            }
        } else {
            // Modo de produção: usa autenticação Firebase com email e senha
            email = process.env.REACT_APP_PROD_USER;
            password = process.env.REACT_APP_PROD_PASSWORD;

            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                setUser(userCredential.user);
                navigate('/'); // Redirecionar para a home após login bem-sucedido
            } catch (error) {
                console.error("Erro ao fazer login:", error.message);
            }
        }
    };

    const logout = () => {
        auth.signOut();
        setUser(null);
        navigate('/login'); // Redirecionar para a página de login após logout
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
