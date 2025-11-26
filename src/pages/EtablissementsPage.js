import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// src/pages/EtablissementsPage.tsx
import { useState } from 'react';
import { communesData } from '../data/etablissementsData';
import styles from '../components/Button.module.css';
import FeedbackButton from '../components/FeedbackButton';
const cotations = {
    YYYY010: 48, M: 26.88, CRS_CRD: 26.5, CRN: 42.5, CRM: 51.5,
    DEQP003_DEMI: 7.26, MOP: 5, VRS_VRD: 30, VRN: 46, VRM: 59.5, IK: 0.61,
};
const EtablissementsPage = ({ onRedirectToVisites }) => {
    // ... (tous vos états et fonctions "handle" restent les mêmes)
    const [choixInitial, setChoixInitial] = useState(null);
    const [communeSelectionnee, setCommuneSelectionnee] = useState(null);
    const [etablissementSelectionne, setEtablissementSelectionne] = useState(null);
    const [periodeSelectionnee, setPeriodeSelectionnee] = useState(null);
    const [ageSelectionne, setAgeSelectionne] = useState(null);
    const [ecgActive, setEcgActive] = useState(false);
    const [isPremierActe, setIsPremierActe] = useState(true);
    const handleChoixInitial = (choix) => {
        setChoixInitial(choix);
        setCommuneSelectionnee(null);
        setEtablissementSelectionne(null);
    };
    const handleCommuneSelection = (commune) => {
        setCommuneSelectionnee(commune);
        setEtablissementSelectionne(null);
    };
    const handleEtablissementSelection = (etablissement) => {
        setEtablissementSelectionne(etablissement);
    };
    const handlePeriodeSelection = (periode) => setPeriodeSelectionnee(periode);
    const handleAgeSelection = (age) => setAgeSelectionne(age);
    const handleEcgToggle = () => setEcgActive(!ecgActive);
    const calculerMontant = () => {
        if (!etablissementSelectionne || !communeSelectionnee)
            return { montant: 0, actes: [], montants: [] };
        let montant = cotations.YYYY010;
        let actes = ['YYYY010'];
        let montants = [cotations.YYYY010];
        if (etablissementSelectionne.categorie === 'A' || (etablissementSelectionne.categorie === 'E' && !isPremierActe)) {
            montant += cotations.M;
            actes.push('M');
            montants.push(cotations.M);
            if (periodeSelectionnee === 'Soir 20h-00h et 6h-8h') {
                montant += cotations.CRN;
                actes.push('CRN');
                montants.push(cotations.CRN);
            }
            else if (periodeSelectionnee === 'Nuit profonde 00h-6h') {
                montant += cotations.CRM;
                actes.push('CRM');
                montants.push(cotations.CRM);
            }
            else if (periodeSelectionnee === 'Samedi 12h-20h') {
                montant += cotations.CRS_CRD;
                actes.push('CRS');
                montants.push(cotations.CRS_CRD);
            }
            else if (periodeSelectionnee === 'Dimanche 8h-20h') {
                montant += cotations.CRS_CRD;
                actes.push('CRD');
                montants.push(cotations.CRS_CRD);
            }
        }
        else if (etablissementSelectionne.categorie === 'E' && isPremierActe) {
            if (periodeSelectionnee === 'Soir 20h-00h et 6h-8h') {
                montant += cotations.VRN;
                actes.push('VRN');
                montants.push(cotations.VRN);
            }
            else if (periodeSelectionnee === 'Nuit profonde 00h-6h') {
                montant += cotations.VRM;
                actes.push('VRM');
                montants.push(cotations.VRM);
            }
            else if (periodeSelectionnee === 'Samedi 12h-20h') {
                montant += cotations.VRS_VRD;
                actes.push('VRS');
                montants.push(cotations.VRS_VRD);
            }
            else if (periodeSelectionnee === 'Dimanche 8h-20h') {
                montant += cotations.VRS_VRD;
                actes.push('VRD');
                montants.push(cotations.VRS_VRD);
            }
            if (communeSelectionnee) {
                const ikTotal = communeSelectionnee.ik * cotations.IK;
                montant += ikTotal;
                actes.push(`${communeSelectionnee.ik} IK`);
                montants.push(ikTotal);
            }
        }
        if (ecgActive) {
            montant += cotations.DEQP003_DEMI;
            actes.push('1/2 DEQP003');
            montants.push(cotations.DEQP003_DEMI);
        }
        if (ageSelectionne === '> 80 ans') {
            montant += cotations.MOP;
            actes.push('MOP');
            montants.push(cotations.MOP);
        }
        return { montant, actes, montants };
    };
    const { montant, actes, montants } = calculerMontant();
    const sortedCommunes = [...communesData].sort((a, b) => a.nom.localeCompare(b.nom));
    const sortedEtablissements = communeSelectionnee
        ? [...communeSelectionnee.etablissements].sort((a, b) => a.nom.localeCompare(b.nom))
        : [];
    return (_jsxs("div", { className: "etablissements-container", style: { paddingBottom: '140px' }, children: [_jsx("h1", { children: "Page \u00C9tablissements" }), !choixInitial && (_jsxs("div", { className: styles.buttonGroup, children: [_jsx("button", { onClick: () => handleChoixInitial('Foyer logement'), className: styles.button, children: "Foyer logement" }), _jsx("button", { onClick: () => handleChoixInitial('Établissement'), className: styles.button, children: "\u00C9tablissement" })] })), choixInitial === 'Foyer logement' && (_jsxs("div", { style: { textAlign: 'center' }, children: [_jsx("p", { children: "Foyer logement, m\u00E9dico-social = cotation habituelle = prendre la carte vitale" }), _jsxs("div", { className: styles.buttonGroup, children: [_jsx("button", { onClick: () => onRedirectToVisites('Visite', 'Saint-Malo'), className: `${styles.button} ${styles.actionButton}`, children: "Orientation vers la page Visite Consultation" }), _jsx("button", { onClick: () => handleChoixInitial(null), className: styles.button, children: "Retour au choix initial" })] })] })), choixInitial === 'Établissement' && !communeSelectionnee && (_jsxs("div", { className: "communes-list", children: [_jsx("h2", { children: "S\u00E9lectionnez une commune" }), _jsx("div", { className: styles.buttonGroup, children: sortedCommunes.map((commune) => (_jsx("button", { onClick: () => handleCommuneSelection(commune), className: styles.button, children: commune.nom }, commune.nom))) })] })), choixInitial === 'Établissement' && communeSelectionnee && !etablissementSelectionne && (_jsxs("div", { className: "etablissements-list", children: [_jsxs("h2", { children: ["\u00C9tablissements \u00E0 ", communeSelectionnee.nom] }), _jsx("div", { className: styles.buttonGroup, children: sortedEtablissements.map((etablissement) => (_jsx("button", { onClick: () => handleEtablissementSelection(etablissement), className: styles.button, children: etablissement.nom }, etablissement.nom))) })] })), etablissementSelectionne && (_jsxs("div", { className: "resultats-etablissement", children: [_jsxs("h3", { children: ["\u00C9tablissement s\u00E9lectionn\u00E9 : ", etablissementSelectionne.nom] }), _jsx("p", { children: etablissementSelectionne.details?.message || '' }), etablissementSelectionne.details?.email && (_jsxs("p", { children: ["Envoyer la facture \u00E0 : ", etablissementSelectionne.details.email] })), (etablissementSelectionne.categorie === 'B' || etablissementSelectionne.categorie === 'C' || etablissementSelectionne.categorie === 'D') && (_jsx("button", { onClick: () => {
                            if (communeSelectionnee) {
                                onRedirectToVisites('Visite', communeSelectionnee.nom);
                            }
                        }, className: `${styles.button} ${styles.selectedEtablissements}`, children: "Cotation habituelle" })), (etablissementSelectionne.categorie === 'A' || etablissementSelectionne.categorie === 'E') && (_jsxs(_Fragment, { children: [etablissementSelectionne.categorie === 'A' && _jsx("p", { children: "Facturations particuli\u00E8res CHGR" }), etablissementSelectionne.categorie === 'E' && (_jsxs("div", { className: styles.buttonGroup, children: [_jsx("button", { onClick: () => setIsPremierActe(true), className: `${styles.button} ${isPremierActe ? styles.selectedEtablissements : ''}`, children: "Premier acte" }), _jsx("button", { onClick: () => setIsPremierActe(false), className: `${styles.button} ${!isPremierActe ? styles.selectedEtablissements : ''}`, children: "Actes suivants" })] })), _jsxs("div", { className: styles.buttonGroup, children: [_jsx("h4", { children: "P\u00E9riode" }), ['Journée de semaine', 'Soir 20h-00h et 6h-8h', 'Nuit profonde 00h-6h', 'Samedi 12h-20h', 'Dimanche 8h-20h'].map((p) => (_jsx("button", { onClick: () => handlePeriodeSelection(p), className: `${styles.button} ${periodeSelectionnee === p ? styles.selectedEtablissements : ''}`, children: p }, p)))] }), _jsxs("div", { className: styles.buttonGroup, children: [_jsx("h4", { children: "\u00C2ge" }), ['> 80 ans', '< 80 ans'].map((a) => (_jsx("button", { onClick: () => handleAgeSelection(a), className: `${styles.button} ${ageSelectionne === a ? styles.selectedEtablissements : ''}`, children: a }, a)))] }), _jsxs("div", { className: styles.buttonGroup, children: [_jsx("h4", { children: "Autres" }), _jsx("button", { onClick: handleEcgToggle, className: `${styles.button} ${ecgActive ? styles.selectedEtablissements : ''}`, children: "ECG" }), _jsx("button", { onClick: () => alert('Redirection vers la page Actes techniques CCAM'), className: styles.button, children: "Actes techniques CCAM" })] }), _jsxs("div", { children: [_jsx("h4", { children: "Total" }), _jsxs("p", { children: ["Actes : ", actes.join(' + ')] }), _jsxs("p", { style: { fontSize: '0.9em', color: '#555', marginTop: '-0.5rem' }, children: ["D\u00E9tail : ", montants.map(m => m.toFixed(2) + ' €').join(' + ')] }), _jsxs("p", { children: ["Montant : ", isNaN(montant) ? 'NaN' : montant.toFixed(2), " \u20AC"] })] }), periodeSelectionnee && (_jsx(FeedbackButton, { type: "contextual", pageContext: `Établissement ${etablissementSelectionne.nom} (cat. ${etablissementSelectionne.categorie}) - ${communeSelectionnee?.nom} - ${periodeSelectionnee}`, pageType: "etablissements" }))] })), _jsx("button", { onClick: () => {
                            setEtablissementSelectionne(null);
                            setPeriodeSelectionnee(null);
                            setAgeSelectionne(null);
                            setEcgActive(false);
                            setIsPremierActe(true);
                        }, className: styles.button, children: "Retour au choix de l'\u00E9tablissement" })] })), choixInitial && !etablissementSelectionne && (_jsx("button", { onClick: () => {
                    setChoixInitial(null);
                    setCommuneSelectionnee(null);
                }, className: styles.button, children: "Retour au choix initial" })), etablissementSelectionne &&
                (etablissementSelectionne.categorie === 'A' || etablissementSelectionne.categorie === 'E') &&
                periodeSelectionnee && (_jsxs("div", { style: {
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: '#90ee90',
                    color: 'black',
                    padding: '1rem',
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
                    zIndex: 1000
                }, children: [_jsxs("div", { style: { textAlign: 'center' }, children: [_jsx("div", { style: { fontSize: '0.9rem', marginBottom: '0.25rem' }, children: "Actes" }), _jsx("div", { style: { fontSize: '1.3rem', fontWeight: 'bold' }, children: actes.join(' + ') })] }), _jsxs("div", { style: { textAlign: 'center' }, children: [_jsx("div", { style: { fontSize: '0.9rem', marginBottom: '0.25rem' }, children: "Total" }), _jsxs("div", { style: { fontSize: '1.8rem', fontWeight: 'bold' }, children: [montant.toFixed(2), " \u20AC"] })] })] }))] }));
};
export default EtablissementsPage;
