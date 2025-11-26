import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// src/App.tsx
import { useState, useEffect } from 'react';
import CotationPage from './pages/CotationPage';
import EtablissementsPage from './pages/EtablissementsPage';
import CCAMPage from './pages/CCAMPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ParametresPage from './pages/ParametresPage';
import styles from './components/Button.module.css';
function App() {
    const [currentPage, setCurrentPage] = useState('home');
    const [preselectedActe, setPreselectedActe] = useState(null);
    const [preselectedCommune, setPreselectedCommune] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        if (isAuthenticated === 'true') {
            setIsLoggedIn(true);
        }
    }, []);
    const handleRedirectToVisites = (preselectedAct, preselectedCom) => {
        setPreselectedActe(preselectedAct);
        setPreselectedCommune(preselectedCom);
        setCurrentPage('visites');
    };
    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
    };
    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        setIsLoggedIn(false);
        setCurrentPage('home');
    };
    const handleNavigate = (page) => {
        setCurrentPage(page);
    };
    const handleBackToHome = () => {
        setCurrentPage('home');
    };
    if (!isLoggedIn) {
        return _jsx(LoginPage, { onLoginSuccess: handleLoginSuccess });
    }
    // Page d'accueil avec tuiles
    if (currentPage === 'home') {
        return (_jsxs("div", { className: "App", children: [_jsx(HomePage, { onNavigate: handleNavigate }), _jsx("div", { style: { position: 'fixed', top: '1rem', right: '1rem' }, children: _jsx("button", { onClick: handleLogout, className: styles.button, children: "D\u00E9connexion" }) })] }));
    }
    // Pages individuelles (sans navigation header)
    return (_jsxs("div", { className: "App", children: [currentPage === 'visites' && (_jsxs(_Fragment, { children: [_jsx("div", { style: { padding: '1rem', backgroundColor: '#e0f0ff' }, children: _jsx("button", { onClick: handleBackToHome, className: styles.button, children: "\u2190 Accueil" }) }), _jsx(CotationPage, { preselectedActe: preselectedActe, preselectedCommune: preselectedCommune })] })), currentPage === 'etablissements' && (_jsxs(_Fragment, { children: [_jsx("div", { style: { padding: '1rem', backgroundColor: '#e6ffec' }, children: _jsx("button", { onClick: handleBackToHome, className: styles.button, children: "\u2190 Accueil" }) }), _jsx(EtablissementsPage, { onRedirectToVisites: handleRedirectToVisites })] })), currentPage === 'ccam' && (_jsxs(_Fragment, { children: [_jsx("div", { style: { padding: '1rem', backgroundColor: '#fff5e6' }, children: _jsx("button", { onClick: handleBackToHome, className: styles.button, children: "\u2190 Accueil" }) }), _jsx(CCAMPage, {})] })), currentPage === 'parametres' && (_jsx(ParametresPage, { onBack: handleBackToHome }))] }));
}
export default App;
