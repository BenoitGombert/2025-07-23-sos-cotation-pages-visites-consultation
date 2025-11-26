import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// src/pages/CotationPage.tsx
import { useState, useEffect } from 'react';
import { communesIK, actesValues } from '../data/visiteConsultationData';
import styles from '../components/Button.module.css';
import FeedbackButton from '../components/FeedbackButton';
const CotationPage = ({ preselectedActe, preselectedCommune }) => {
    const [typeActe, setTypeActe] = useState(null);
    const [periode, setPeriode] = useState(null);
    const [periodePDS, setPeriodePDS] = useState(null);
    const [regulation15, setRegulation15] = useState(null);
    const [demandeSoignant, setDemandeSoignant] = useState(null);
    const [age, setAge] = useState(null);
    const [ecg, setEcg] = useState(false);
    const [commune, setCommune] = useState(null);
    useEffect(() => {
        if (preselectedActe && typeActe === null) {
            setTypeActe(preselectedActe);
        }
        if (preselectedCommune && commune === null) {
            setCommune(preselectedCommune);
        }
    }, [preselectedActe, preselectedCommune, typeActe, commune]);
    const resetAllStates = () => {
        setPeriode(null);
        setPeriodePDS(null);
        setRegulation15(null);
        setDemandeSoignant(null);
        setAge(null);
        setEcg(false);
        setCommune(null);
    };
    const handleTypeActeChange = (act) => {
        if (typeActe !== act) {
            setTypeActe(act);
            resetAllStates();
            if (act === 'Visite') {
                setCommune('Saint-Malo');
            }
        }
    };
    const handlePeriodeChange = (period) => {
        setPeriode(period);
        if (period === 'PDS') {
            setRegulation15(null);
            setDemandeSoignant(null);
        }
        else if (period === 'CDS') {
            setPeriodePDS(null);
        }
    };
    const handleCommuneChange = (com) => setCommune(com);
    const handleAgeChange = (a) => setAge(a);
    const calculateTotal = () => {
        let totalHorsIK = 0;
        let actes = [];
        let montants = [];
        if (typeActe) {
            if (typeActe === 'Consultation') {
                actes.push('G');
                montants.push(actesValues.G);
                totalHorsIK += actesValues.G;
            }
            else if (typeActe === 'Visite') {
                actes.push('VG');
                montants.push(actesValues.VG);
                totalHorsIK += actesValues.VG;
            }
        }
        if (periode === 'PDS' && typeActe) {
            if (typeActe === 'Consultation') {
                if (periodePDS === 'CRN') {
                    actes.push('CRN');
                    montants.push(actesValues.CRN);
                    totalHorsIK += actesValues.CRN;
                }
                if (periodePDS === 'CRM') {
                    actes.push('CRM');
                    montants.push(actesValues.CRM);
                    totalHorsIK += actesValues.CRM;
                }
                if (periodePDS === 'CRS') {
                    actes.push('CRS');
                    montants.push(actesValues.CRS);
                    totalHorsIK += actesValues.CRS;
                }
                if (periodePDS === 'CRD') {
                    actes.push('CRD');
                    montants.push(actesValues.CRD);
                    totalHorsIK += actesValues.CRD;
                }
            }
            else if (typeActe === 'Visite') {
                if (periodePDS === 'VRN') {
                    actes.push('VRN');
                    montants.push(actesValues.VRN);
                    totalHorsIK += actesValues.VRN;
                }
                if (periodePDS === 'VRM') {
                    actes.push('VRM');
                    montants.push(actesValues.VRM);
                    totalHorsIK += actesValues.VRM;
                }
                if (periodePDS === 'VRS') {
                    actes.push('VRS');
                    montants.push(actesValues.VRS);
                    totalHorsIK += actesValues.VRS;
                }
                if (periodePDS === 'VRD') {
                    actes.push('VRD');
                    montants.push(actesValues.VRD);
                    totalHorsIK += actesValues.VRD;
                }
            }
        }
        if (periode === 'CDS' && typeActe) {
            if (typeActe === 'Visite' && regulation15) {
                actes.push('MD');
                montants.push(actesValues.MD);
                totalHorsIK += actesValues.MD;
            }
            if (regulation15) {
                actes.push('SNP');
                montants.push(actesValues.SNP);
                totalHorsIK += actesValues.SNP;
            }
            if (typeActe === 'Visite' && periode === 'CDS' && regulation15 === false && demandeSoignant) {
                actes.push('MU');
                montants.push(actesValues.MU);
                totalHorsIK += actesValues.MU;
            }
            if (typeActe === 'Visite' && periode === 'CDS' && regulation15 === false && demandeSoignant === false) {
                actes.push('MD');
                montants.push(actesValues.MD);
                totalHorsIK += actesValues.MD;
            }
        }
        if (age === '0-6 ans') {
            actes.push('MEG');
            montants.push(actesValues.MEG);
            totalHorsIK += actesValues.MEG;
        }
        else if (age === '> 80 ans') {
            actes.push('MOP');
            montants.push(actesValues.MOP);
            totalHorsIK += actesValues.MOP;
        }
        if (ecg && typeActe) {
            if (typeActe === 'Consultation') {
                actes.push('DEQP003');
                montants.push(actesValues.DEQP003_CONSULTATION);
                totalHorsIK += actesValues.DEQP003_CONSULTATION;
            }
            if (typeActe === 'Visite') {
                actes.push('DEQP003 + YYYY490');
                montants.push(actesValues.ECG_VISITE);
                totalHorsIK += actesValues.ECG_VISITE;
            }
        }
        const communeIKValue = communesIK.find(c => c.commune === commune)?.ik || 0;
        const ikTotal = typeActe === 'Visite' ? communeIKValue * actesValues.IK : 0;
        if (ikTotal > 0) {
            actes.push(`${communeIKValue} IK`);
            montants.push(ikTotal);
        }
        const total = totalHorsIK + ikTotal;
        const amo = (totalHorsIK * 0.7) + ikTotal;
        const amc = totalHorsIK * 0.3;
        return { total, actes, montants, amo, amc };
    };
    const { total, actes, montants, amo, amc } = calculateTotal();
    const sortedCommunes = [...communesIK].sort((a, b) => a.commune.localeCompare(b.commune));
    return (_jsxs("div", { className: "cotation-page", style: { paddingBottom: '120px' }, children: [_jsx("h1", { children: "Page de cotation" }), _jsxs("div", { children: [_jsx("h2", { children: "Type d'acte" }), _jsxs("div", { className: styles.buttonGroup, children: [_jsx("button", { onClick: () => handleTypeActeChange('Visite'), className: `${styles.button} ${typeActe === 'Visite' ? styles.selectedVisites : ''}`, children: "Visite" }), _jsx("button", { onClick: () => handleTypeActeChange('Consultation'), className: `${styles.button} ${typeActe === 'Consultation' ? styles.selectedVisites : ''}`, children: "Consultation" })] })] }), typeActe && (_jsxs(_Fragment, { children: [_jsxs("div", { children: [_jsx("h2", { children: "P\u00E9riode" }), _jsxs("div", { className: styles.buttonGroup, children: [_jsx("button", { onClick: () => handlePeriodeChange('CDS'), className: `${styles.button} ${periode === 'CDS' ? styles.selectedVisites : ''}`, children: "CDS" }), _jsx("button", { onClick: () => handlePeriodeChange('PDS'), className: `${styles.button} ${periode === 'PDS' ? styles.selectedVisites : ''}`, children: "PDS" })] })] }), periode === 'CDS' && (_jsxs("div", { children: [_jsx("h2", { children: "R\u00E9gulation 15" }), _jsxs("div", { className: styles.buttonGroup, children: [_jsx("button", { onClick: () => setRegulation15(true), className: `${styles.button} ${regulation15 === true ? styles.selectedVisites : ''}`, children: "Oui" }), _jsx("button", { onClick: () => setRegulation15(false), className: `${styles.button} ${regulation15 === false ? styles.selectedVisites : ''}`, children: "Non" })] })] })), typeActe === 'Visite' && periode === 'CDS' && regulation15 === false && (_jsxs("div", { children: [_jsx("h2", { children: "Demande d'un soignant" }), _jsxs("div", { className: styles.buttonGroup, children: [_jsx("button", { onClick: () => setDemandeSoignant(true), className: `${styles.button} ${demandeSoignant === true ? styles.selectedVisites : ''}`, children: "Oui" }), _jsx("button", { onClick: () => setDemandeSoignant(false), className: `${styles.button} ${demandeSoignant === false ? styles.selectedVisites : ''}`, children: "Non" })] })] })), periode === 'PDS' && (_jsxs("div", { children: [_jsx("h2", { children: "D\u00E9tail PDS" }), _jsxs("div", { className: styles.buttonGroup, children: [_jsx("button", { onClick: () => setPeriodePDS(typeActe === 'Consultation' ? 'CRN' : 'VRN'), className: `${styles.button} ${periodePDS?.includes('N') ? styles.selectedVisites : ''}`, children: "20h\u201300h / 6h\u20138h" }), _jsx("button", { onClick: () => setPeriodePDS(typeActe === 'Consultation' ? 'CRM' : 'VRM'), className: `${styles.button} ${periodePDS?.includes('M') ? styles.selectedVisites : ''}`, children: "00h\u20136h" }), _jsx("button", { onClick: () => setPeriodePDS(typeActe === 'Consultation' ? 'CRS' : 'VRS'), className: `${styles.button} ${periodePDS?.includes('S') ? styles.selectedVisites : ''}`, children: "Samedi 12h\u201320h" }), _jsx("button", { onClick: () => setPeriodePDS(typeActe === 'Consultation' ? 'CRD' : 'VRD'), className: `${styles.button} ${periodePDS?.includes('D') ? styles.selectedVisites : ''}`, children: "Dimanche 8h\u201320h" })] })] })), _jsxs("div", { children: [_jsx("h2", { children: "\u00C2ge du patient" }), _jsxs("div", { className: styles.buttonGroup, children: [_jsx("button", { onClick: () => setAge('0-6 ans'), className: `${styles.button} ${age === '0-6 ans' ? styles.selectedVisites : ''}`, children: "0-6 ans (MEG)" }), _jsx("button", { onClick: () => setAge('> 80 ans'), className: `${styles.button} ${age === '> 80 ans' ? styles.selectedVisites : ''}`, children: "+ de 80 ans (MOP)" }), _jsx("button", { onClick: () => setAge('Autre'), className: `${styles.button} ${age === 'Autre' ? styles.selectedVisites : ''}`, children: "Autre" })] })] }), _jsxs("div", { children: [_jsx("h2", { children: "ECG" }), _jsx("div", { className: styles.buttonGroup, children: _jsx("button", { onClick: () => setEcg(!ecg), className: `${styles.button} ${ecg ? styles.selectedVisites : ''}`, children: "Oui" }) })] }), typeActe === 'Visite' && (_jsxs("div", { children: [_jsx("h2", { children: "Commune (IK)" }), _jsx("div", { className: styles.buttonGroup, children: _jsxs("select", { onChange: (e) => handleCommuneChange(e.target.value), value: commune || '', className: styles.button, children: [_jsx("option", { value: "", disabled: true, children: "S\u00E9lectionnez une commune" }), sortedCommunes.map((c) => (_jsx("option", { value: c.commune, children: c.commune }, c.commune)))] }) })] })), _jsxs("div", { className: "result-section", children: [_jsx("h2", { children: "R\u00E9capitulatif et calcul" }), _jsxs("p", { children: ["Actes : ", actes.join(' + ')] }), _jsxs("p", { style: { fontSize: '0.9em', color: '#555', marginTop: '-0.5rem' }, children: ["D\u00E9tail : ", montants.map(m => m.toFixed(2) + ' €').join(' + ')] }), _jsxs("p", { children: ["Montant total : ", isNaN(total) ? 'NaN' : total.toFixed(2), " \u20AC"] }), _jsxs("p", { children: ["Part AMO : ", isNaN(amo) ? 'NaN' : amo.toFixed(2), " \u20AC"] }), _jsxs("p", { children: ["Part AMC : ", isNaN(amc) ? 'NaN' : amc.toFixed(2), " \u20AC"] })] }), periode && (_jsx(FeedbackButton, { type: "contextual", pageContext: `${typeActe} ${periode}${periodePDS ? ` - ${periodePDS}` : ''}${commune ? ` - ${commune}` : ''}`, pageType: "visites" }))] })), typeActe && (_jsxs("div", { style: {
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: '#0066cc',
                    color: 'white',
                    padding: '1rem',
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
                    zIndex: 1000
                }, children: [_jsxs("div", { style: { textAlign: 'center' }, children: [_jsx("div", { style: { fontSize: '0.9rem', marginBottom: '0.25rem' }, children: "Total" }), _jsxs("div", { style: { fontSize: '1.8rem', fontWeight: 'bold' }, children: [total.toFixed(2), " \u20AC"] })] }), _jsxs("div", { style: { textAlign: 'center' }, children: [_jsx("div", { style: { fontSize: '0.9rem', marginBottom: '0.25rem' }, children: "AMO" }), _jsxs("div", { style: { fontSize: '1.8rem', fontWeight: 'bold' }, children: [amo.toFixed(2), " \u20AC"] })] }), _jsxs("div", { style: { textAlign: 'center' }, children: [_jsx("div", { style: { fontSize: '0.9rem', marginBottom: '0.25rem' }, children: "AMC" }), _jsxs("div", { style: { fontSize: '1.8rem', fontWeight: 'bold' }, children: [amc.toFixed(2), " \u20AC"] })] })] }))] }));
};
export default CotationPage;
