import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/LoginPage.tsx
import { useState } from 'react';
import styles from '../components/Button.module.css';
import { AUTH_PASSWORD } from '../config/auth'; // Import du mot de passe
const LoginPage = ({ onLoginSuccess }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === AUTH_PASSWORD) {
            localStorage.setItem('isAuthenticated', 'true');
            onLoginSuccess();
        }
        else {
            setError('Mot de passe incorrect.');
        }
    };
    return (_jsxs("div", { className: "login-container", style: { textAlign: 'center', marginTop: '100px' }, children: [_jsx("h1", { children: "Connexion" }), _jsx("p", { children: "Veuillez entrer le mot de passe de l'association SOS M\u00E9decins Saint-Malo." }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "password", children: "Mot de passe :" }), _jsx("input", { type: "password", id: "password", value: password, onChange: (e) => setPassword(e.target.value), className: styles.input, style: { padding: '0.5rem', fontSize: '1rem', marginLeft: '0.5rem' } })] }), error && _jsx("p", { style: { color: 'red', marginTop: '1rem' }, children: error }), _jsx("button", { type: "submit", className: styles.button, style: { marginTop: '1rem' }, children: "Se connecter" })] })] }));
};
export default LoginPage;
