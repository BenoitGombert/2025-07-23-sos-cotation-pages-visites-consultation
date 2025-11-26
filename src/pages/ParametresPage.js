import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/ParametresPage.tsx
import styles from './ParametresPage.module.css';
function ParametresPage({ onBack }) {
    return (_jsxs("div", { className: styles.parametresPage, children: [_jsxs("header", { className: styles.header, children: [_jsx("button", { onClick: onBack, className: styles.backButton, children: "\u2190 Retour" }), _jsx("h1", { children: "Param\u00E8tres" })] }), _jsxs("div", { className: styles.content, children: [_jsxs("div", { className: styles.constructionBanner, children: [_jsx("div", { className: styles.constructionIcon, children: "\uD83D\uDEA7" }), _jsx("h2", { children: "Page en construction" }), _jsx("p", { children: "Cette fonctionnalit\u00E9 sera bient\u00F4t disponible." })] }), _jsxs("div", { className: styles.comingSoonSection, children: [_jsx("h3", { children: "Fonctionnalit\u00E9s \u00E0 venir :" }), _jsxs("ul", { children: [_jsx("li", { children: "Gestion des bar\u00E8mes et tarifs" }), _jsx("li", { children: "Personnalisation de l'interface" }), _jsx("li", { children: "Export des donn\u00E9es" }), _jsx("li", { children: "Historique des cotations" }), _jsx("li", { children: "Param\u00E8tres de l'application" })] })] })] })] }));
}
export default ParametresPage;
