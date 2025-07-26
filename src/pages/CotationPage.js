import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import styles from '../components/Button.module.css';
const getActesEtMajorations = (acte, ecg, age, periode, plagePds, regulation15, demandeSoignant) => {
    const result = [];
    // Acte de base
    if (acte === 'visite')
        result.push('VG');
    if (acte === 'consultation')
        result.push('G');
    // ECG
    if (ecg) {
        result.push('DEQP003');
        if (acte === 'visite')
            result.push('YYYY490');
    }
    // Majoration âge
    if (age === '0-6')
        result.push('MEG');
    if (age === '>80')
        result.push('MOP');
    // CDS
    if (periode === 'CDS') {
        if (acte === 'visite') {
            if (regulation15) {
                result.push('MD');
                result.push('SNP');
            }
            else if (demandeSoignant) {
                result.push('MU');
            }
            else {
                result.push('MD');
            }
        }
        if (acte === 'consultation' && regulation15) {
            result.push('SNP');
        }
    }
    // PDS
    if (periode === 'PDS') {
        switch (plagePds) {
            case 'nuit':
                result.push(acte === 'visite' ? 'VRM' : 'CRM');
                break;
            case 'soir':
                result.push(acte === 'visite' ? 'VRN' : 'CRN');
                break;
            case 'samedi':
                result.push(acte === 'visite' ? 'VRS' : 'CRS');
                break;
            case 'dimanche':
                result.push(acte === 'visite' ? 'VRD' : 'CRD');
                break;
        }
    }
    return result;
};
function CotationPage() {
    const [acte, setActe] = useState(null);
    // Période principale
    const [periode, setPeriode] = useState(null);
    // Plages CDS (utilisées uniquement si periode === 'CDS')
    const [regulation15, setRegulation15] = useState(null);
    const [demandeSoignant, setDemandeSoignant] = useState(null);
    // Plages PDS (utilisées uniquement si periode === 'PDS')
    const [plagePds, setPlagePds] = useState(null);
    const [mu, setMu] = useState(null);
    const [age, setAge] = useState('autre');
    const [ecg, setEcg] = useState(false);
    const [commune, setCommune] = useState('Saint-Malo');
    useEffect(() => {
        if (periode === 'CDS') {
            setPlagePds(null); // désactive les choix PDS
            setRegulation15(null);
            setDemandeSoignant(null);
        }
        else if (periode === 'PDS') {
            setRegulation15(null);
            setDemandeSoignant(null);
        }
    }, [periode]);
    const handleActe = (nouvelActe) => {
        // Réinitialisation complète à chaque clic sur un bouton acte (même si déjà sélectionné)
        setActe(nouvelActe);
        setAge('autre');
        setEcg(false);
        setCommune('Saint-Malo');
        setPeriode(null);
        setRegulation15(null);
    };
    const handlePeriode = (p) => {
        setPeriode(p);
        setRegulation15(null);
        setMu(null);
    };
    const handleRegulation = (value) => {
        setRegulation15(value);
        setMu(null);
    };
    const montants = {
        G: 30,
        VG: 30,
        MD: 10,
        SNP: 15,
        MU: 22.6,
        MEG: 5,
        MOP: 5,
        DEQP003: 14.52,
        YYYY490: 9.6,
        CRN: 42.5,
        CRM: 51.5,
        CRS: 26.5,
        CRD: 26.5,
        VRN: 46,
        VRM: 59.5,
        VRS: 30,
        VRD: 30
    };
    const communes = [
        { nom: 'Cancale', ik: 26 },
        { nom: 'Chateau-Malo', ik: 0 },
        { nom: 'Chateauneuf', ik: 22 },
        { nom: 'Dinard', ik: 18 },
        { nom: 'La gouesnière', ik: 24 },
        { nom: 'La richardais', ik: 13 },
        { nom: 'La ville es Nonais', ik: 28 },
        { nom: 'Langrolay', ik: 28 },
        { nom: 'Le Minihic s/Rance', ik: 22 },
        { nom: 'Miniac Morvan', ik: 36 },
        { nom: 'Pleurtuit', ik: 22 },
        { nom: 'Saint-Benoît des ondes', ik: 28 },
        { nom: 'Saint-Briac', ik: 26 },
        { nom: 'Saint-Coulomb', ik: 16 },
        { nom: 'Saint-Guinoux', ik: 30 },
        { nom: 'Saint-Jouan des guérets', ik: 12 },
        { nom: 'Saint-Lunaire', ik: 26 },
        { nom: 'Saint-Malo', ik: 0 },
        { nom: 'Saint-Méloir des ondes', ik: 18 },
        { nom: 'Saint-Père Marc en poulet', ik: 18 },
        { nom: 'Saint-Suliac', ik: 22 },
        { nom: 'Tréméreuc', ik: 30 }
    ];
    const communeObj = communes.find(c => c.nom === commune);
    const ikCount = communeObj?.ik ?? 0;
    const ikMontant = ikCount * 0.61;
    const actes = getActesEtMajorations(acte, ecg, age, periode, plagePds, regulation15 ?? false, demandeSoignant ?? false);
    const montantTotal = actes.reduce((acc, code) => acc + (montants[code] || 0), 0) + ikMontant;
    const partAmo = (montantTotal - ikMontant) * 0.7 + ikMontant;
    const partAmc = (montantTotal - ikMontant) * 0.3;
    return (_jsxs("div", { style: { padding: '1rem', fontFamily: 'sans-serif' }, children: [_jsx("h2", { children: "Type d'acte" }), _jsxs("div", { className: styles.buttonGroup, children: [_jsx("button", { className: `${styles.button} ${acte === 'visite' ? styles.selected : ''}`, onClick: () => handleActe('visite'), children: "Visite" }), _jsx("button", { className: `${styles.button} ${acte === 'consultation' ? styles.selected : ''}`, onClick: () => handleActe('consultation'), children: "Consultation" })] }), acte && (_jsxs(_Fragment, { children: [_jsx("h2", { style: { marginTop: '2rem' }, children: "P\u00E9riode" }), _jsxs("div", { className: styles.buttonGroup, children: [_jsx("button", { className: `${styles.button} ${periode === 'CDS' ? styles.selected : ''}`, onClick: () => handlePeriode('CDS'), children: "CDS" }), _jsx("button", { className: `${styles.button} ${periode === 'PDS' ? styles.selected : ''}`, onClick: () => handlePeriode('PDS'), children: "PDS" })] }), periode === 'PDS' && acte !== null && (_jsxs("div", { children: [_jsx("p", { children: _jsx("strong", { children: "Tranche horaire" }) }), _jsxs("div", { className: styles.buttonGroup, children: [_jsxs("button", { className: `${styles.button} ${plagePds === 'soir' ? styles.selected : ''}`, onClick: () => setPlagePds('soir'), children: ["Soir", _jsx("br", {}), _jsx("small", { children: "20h\u201300h / 6h\u20138h" })] }), _jsxs("button", { className: `${styles.button} ${plagePds === 'nuit' ? styles.selected : ''}`, onClick: () => setPlagePds('nuit'), children: ["Nuit", _jsx("br", {}), _jsx("small", { children: "00h\u20136h" })] }), _jsxs("button", { className: `${styles.button} ${plagePds === 'samedi' ? styles.selected : ''}`, onClick: () => setPlagePds('samedi'), children: ["Samedi", _jsx("br", {}), _jsx("small", { children: "12h\u201320h" })] }), _jsxs("button", { className: `${styles.button} ${plagePds === 'dimanche' ? styles.selected : ''}`, onClick: () => setPlagePds('dimanche'), children: ["Dimanche", _jsx("br", {}), _jsx("small", { children: "8h\u201320h" })] })] })] }))] })), periode === 'CDS' && (_jsxs(_Fragment, { children: [_jsx("h2", { style: { marginTop: '2rem' }, children: "R\u00E9gulation 15" }), _jsxs("div", { className: styles.buttonGroup, children: [_jsx("button", { className: `${styles.button} ${regulation15 === true ? styles.selected : ''}`, onClick: () => handleRegulation(true), children: "Oui" }), _jsx("button", { className: `${styles.button} ${regulation15 === false ? styles.selected : ''}`, onClick: () => handleRegulation(false), children: "Non" })] })] })), acte === 'visite' && periode === 'CDS' && regulation15 === false && (_jsxs(_Fragment, { children: [_jsx("h2", { style: { marginTop: '2rem' }, children: "Demande d\u2019un soignant" }), _jsxs("div", { className: styles.buttonGroup, children: [_jsx("button", { className: `${styles.button} ${mu === true ? styles.selected : ''}`, onClick: () => setMu(true), children: "Oui" }), _jsx("button", { className: `${styles.button} ${mu === false ? styles.selected : ''}`, onClick: () => setMu(false), children: "Non" })] })] })), periode && (_jsxs(_Fragment, { children: [_jsx("h2", { style: { marginTop: '2rem' }, children: "\u00C2ge du patient" }), _jsxs("div", { className: styles.buttonGroup, children: [_jsx("button", { className: `${styles.button} ${age === '0-6' ? styles.selected : ''}`, onClick: () => setAge('0-6'), children: "0\u20136 ans" }), _jsx("button", { className: `${styles.button} ${age === '>80' ? styles.selected : ''}`, onClick: () => setAge('>80'), children: "> 80 ans" }), _jsx("button", { className: `${styles.button} ${age === 'autre' ? styles.selected : ''}`, onClick: () => setAge('autre'), children: "Autre" })] })] })), _jsx("h2", { style: { marginTop: '2rem' }, children: "ECG" }), _jsx("div", { className: styles.buttonGroup, children: _jsx("button", { className: `${styles.button} ${ecg ? styles.selected : ''}`, onClick: () => setEcg(!ecg), children: "ECG" }) }), acte === 'visite' && (_jsxs(_Fragment, { children: [_jsx("h2", { style: { marginTop: '2rem' }, children: "Commune" }), _jsx("select", { value: commune, onChange: (e) => setCommune(e.target.value), style: { padding: '0.5rem', fontSize: '1rem', borderRadius: '0.5rem', border: '1px solid #ccc', width: '100%' }, children: communes.map((c) => (_jsx("option", { value: c.nom, children: c.nom }, c.nom))) })] })), _jsxs("div", { style: { marginTop: '2rem', borderTop: '1px solid #ccc', paddingTop: '1rem' }, children: [_jsx("h2", { children: "R\u00E9sum\u00E9 de la cotation" }), _jsxs("p", { children: [_jsx("strong", { children: "Actes & majorations :" }), ' ', (() => {
                                const actes = getActesEtMajorations(acte, ecg, age, periode, plagePds, regulation15 ?? false, demandeSoignant ?? false);
                                const suffix = acte === 'visite' && ikCount > 0 ? ` + ${ikCount}IK` : '';
                                return actes.length > 0 ? actes.join(' + ') + suffix : '—';
                            })()] }), _jsxs("p", { children: [_jsx("strong", { children: "Montant total :" }), " ", montantTotal.toFixed(2), " \u20AC", ikMontant > 0 && ` (dont IK : ${ikMontant.toFixed(2)} €)`] }), _jsxs("p", { children: [_jsx("strong", { children: "Part AMO :" }), " ", partAmo.toFixed(2), " \u20AC"] }), _jsxs("p", { children: [_jsx("strong", { children: "Part AMC :" }), " ", partAmc.toFixed(2), " \u20AC"] })] })] }));
}
export default CotationPage;
