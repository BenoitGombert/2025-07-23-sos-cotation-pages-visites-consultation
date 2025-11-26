import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/HomePage.tsx
import styles from './HomePage.module.css';
import FeedbackButton from '../components/FeedbackButton';
function HomePage({ onNavigate }) {
    const tiles = [
        {
            id: 'visites',
            title: 'Visites & Consultations',
            description: 'Calcul de cotations NGAP',
            icon: '🏥',
            color: '#e0f0ff',
            available: true,
        },
        {
            id: 'etablissements',
            title: 'Établissements',
            description: 'Cotations spécifiques établissements',
            icon: '🏢',
            color: '#e6ffec',
            available: true,
        },
        {
            id: 'ccam',
            title: 'CCAM',
            description: 'Codes et actes techniques',
            icon: '⚕️',
            color: '#fff5e6',
            available: true,
        },
        {
            id: 'parametres',
            title: 'Paramètres',
            description: 'Configuration de l\'application',
            icon: '⚙️',
            color: '#f0f0f0',
            available: false,
        },
    ];
    return (_jsxs("div", { className: styles.homePage, children: [_jsxs("header", { className: styles.header, children: [_jsx("h1", { className: styles.title, children: "SOS Cotation" }), _jsx("p", { className: styles.subtitle, children: "Choisissez un outil de cotation" })] }), _jsx("div", { className: styles.tilesContainer, children: tiles.map((tile) => (_jsxs("button", { className: `${styles.tile} ${!tile.available ? styles.tileDisabled : ''}`, onClick: () => tile.available && onNavigate(tile.id), disabled: !tile.available, style: { backgroundColor: tile.color }, children: [_jsx("div", { className: styles.tileIcon, children: tile.icon }), _jsx("h2", { className: styles.tileTitle, children: tile.title }), _jsx("p", { className: styles.tileDescription, children: tile.description }), !tile.available && (_jsx("span", { className: styles.badge, children: "En construction" }))] }, tile.id))) }), _jsx(FeedbackButton, { type: "general", pageType: "general", showAsFloating: true })] }));
}
export default HomePage;
