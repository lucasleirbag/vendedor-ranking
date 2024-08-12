import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import PublicPage from './pages/PublicPage';
import { AuthProvider, useAuth } from './context/AuthContext'; // Certifique-se de que o useAuth está sendo importado
import { CssBaseline } from '@mui/material';
import './styles/styles.css';

function PrivateRoute({ children }) {
    const { user } = useAuth(); // useAuth deve ser importado corretamente para funcionar
    return user ? children : <Navigate to="/login" />;
}

function App() {
    return (
        <Router>
            <AuthProvider>
                <CssBaseline />
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/public" element={<PublicPage />} />
                    <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;
