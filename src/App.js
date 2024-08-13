import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import PublicPage from './pages/PublicPage';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CssBaseline } from '@mui/material';
import './styles/styles.css';

// Define a rota privada
function PrivateRoute({ children }) {
    const { user } = useAuth();
    return user ? children : <Navigate to="/login" />;
}

function App() {
    return (
        <Router>
            <AuthProvider>
                <CssBaseline />
                <Routes>
                    {/* Rota pública, não requer autenticação */}
                    <Route path="/public" element={<PublicPage />} /> 
                    
                    {/* Rota de login */}
                    <Route path="/login" element={<LoginPage />} />
                    
                    {/* Rota privada, requer autenticação */}
                    <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;
