import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/CCAMPage.tsx
import { useState } from 'react';
import { actesSpecifiques, trouverActeSuture, cotationsSutures } from '../data/suturesData';
import { communesIK } from '../data/visiteConsultationData';
import styles from '../components/Button.module.css';
import FeedbackButton from '../components/FeedbackButton';
const CCAMPage = () => {
    const [nombreSutures, setNombreSutures] = useState(null);
    const [typeSuture, setTypeSuture] = useState(null);
    const [localisation, setLocalisation] = useState(null);
    const [sousLocalisationVisage, setSousLocalisationVisage] = useState(null);
    const [sousLocalisationMain, setSousLocalisationMain] = useState(null);
    const [profondeur, setProfondeur] = useState(null);
    const [taille, setTaille] = useState(null);
    const [typeIntervention, setTypeIntervention] = useState(null);
    const [communeSelectionnee, setCommuneSelectionnee] = useState(null);
    const [periode, setPeriode] = useState(null);
    const [periodePDS, setPeriodePDS] = useState(null);
    const reinitialiser = () => {
        setNombreSutures(null);
        setTypeSuture(null);
        setLocalisation(null);
        setSousLocalisationVisage(null);
        setSousLocalisationMain(null);
        setProfondeur(null);
        setTaille(null);
        setTypeIntervention(null);
        setCommuneSelectionnee(null);
        setPeriode(null);
        setPeriodePDS(null);
    };
    const getActeCCAM = () => {
        if (localisation === 'visage' && sousLocalisationVisage) {
            if (sousLocalisationVisage === 'nez')
                return actesSpecifiques.nez;
            if (sousLocalisationVisage === 'sourcil')
                return actesSpecifiques.sourcil;
            if (sousLocalisationVisage === 'auricule')
                return actesSpecifiques.auricule;
            if (sousLocalisationVisage === 'levre_cutanee')
                return actesSpecifiques.levre_cutanee;
            if (sousLocalisationVisage === 'levre_muqueuse')
                return actesSpecifiques.levre_muqueuse;
            if (sousLocalisationVisage === 'levre_transfixiante')
                return actesSpecifiques.levre_transfixiante;
            if (sousLocalisationVisage === 'autre' && profondeur && taille) {
                return trouverActeSuture('face', profondeur, taille) || null;
            }
        }
        if (localisation === 'mains' && sousLocalisationMain) {
            if (sousLocalisationMain === 'pulpo_unique')
                return actesSpecifiques.pulpo_unique;
            if (sousLocalisationMain === 'pulpo_multiples')
                return actesSpecifiques.pulpo_multiples;
            if (sousLocalisationMain === 'autre' && profondeur && taille) {
                return trouverActeSuture('main', profondeur, taille) || null;
            }
        }
        if (localisation === 'corps' && profondeur && taille) {
            return trouverActeSuture('corps', profondeur, taille) || null;
        }
        return null;
    };
    const calculerMontant = () => {
        const acteCCAM = getActeCCAM();
        if (!acteCCAM || !typeIntervention || !periode)
            return { montant: 0, actes: [], montants: [], amo: 0, amc: 0 };
        let montant = acteCCAM.tarif;
        const actes = [acteCCAM.code];
        const montants = [acteCCAM.tarif];
        let amo = 0;
        let amc = 0;
        if (periode === 'CDS') {
            if (typeIntervention === 'consultation') {
                montant += cotationsSutures.M;
                actes.push('M');
                montants.push(cotationsSutures.M);
                amo = montant * 0.7;
                amc = montant * 0.3;
            }
            else {
                const communeData = communesIK.find(c => c.commune === communeSelectionnee);
                const ik = communeData ? communeData.ik * cotationsSutures.IK : 0;
                montant += cotationsSutures.M + cotationsSutures.ID + ik;
                actes.push('M', 'ID');
                montants.push(cotationsSutures.M, cotationsSutures.ID);
                if (communeData) {
                    actes.push(`${communeData.ik} IK`);
                    montants.push(ik);
                }
                amo = (acteCCAM.tarif + cotationsSutures.M + cotationsSutures.ID) * 0.7 + ik;
                amc = (acteCCAM.tarif + cotationsSutures.M + cotationsSutures.ID) * 0.3;
            }
        }
        else if (periode === 'PDS' && periodePDS) {
            const majorations = { soir: { C: cotationsSutures.CRN, V: cotationsSutures.VRN, code: { C: 'CRN', V: 'VRN' } },
                nuit: { C: cotationsSutures.CRM, V: cotationsSutures.VRM, code: { C: 'CRM', V: 'VRM' } },
                samedi: { C: cotationsSutures.CRS, V: cotationsSutures.VRS, code: { C: 'CRS', V: 'VRS' } },
                dimanche: { C: cotationsSutures.CRD, V: cotationsSutures.VRD, code: { C: 'CRD', V: 'VRD' } } };
            const maj = majorations[periodePDS];
            if (typeIntervention === 'consultation') {
                montant += cotationsSutures.M + maj.C;
                actes.push('M', maj.code.C);
                montants.push(cotationsSutures.M, maj.C);
                amo = montant * 0.7;
                amc = montant * 0.3;
            }
            else {
                const communeData = communesIK.find(c => c.commune === communeSelectionnee);
                const ik = communeData ? communeData.ik * cotationsSutures.IK : 0;
                montant += maj.V + ik;
                actes.push(maj.code.V);
                montants.push(maj.V);
                if (communeData) {
                    actes.push(`${communeData.ik} IK`);
                    montants.push(ik);
                }
                amo = (acteCCAM.tarif + maj.V) * 0.7 + ik;
                amc = (acteCCAM.tarif + maj.V) * 0.3;
            }
        }
        return { montant, actes, montants, amo, amc };
    };
    const { montant, actes, montants, amo, amc } = calculerMontant();
    const acteCCAM = getActeCCAM();
    const sortedCommunes = communesIK ? [...communesIK].sort((a, b) => a.commune.localeCompare(b.commune)) : [];
    return (_jsxs("div", { style: { padding: '1rem', paddingBottom: '140px' }, children: [_jsx("h1", { children: "Page CCAM - Actes Techniques" }), !nombreSutures && (_jsxs("div", { children: [_jsx("h2", { children: "Type d'acte" }), _jsx("div", { className: styles.buttonGroup, children: _jsx("button", { onClick: () => setNombreSutures('une'), className: styles.button, children: "Sutures" }) })] })), nombreSutures && !typeSuture && (_jsxs("div", { children: [_jsx("h2", { children: "Nombre de sutures" }), _jsxs("div", { className: styles.buttonGroup, children: [_jsx("button", { onClick: () => setTypeSuture('une'), className: styles.button, children: "Une seule suture" }), _jsx("button", { className: styles.button, disabled: true, style: { opacity: 0.5, cursor: 'not-allowed' }, children: "Plusieurs sutures (en cours de d\u00E9veloppement)" })] }), _jsx("button", { onClick: reinitialiser, className: styles.button, style: { marginTop: '1rem' }, children: "Retour" })] })), typeSuture === 'une' && !localisation && (_jsxs("div", { children: [_jsx("h2", { children: "Localisation" }), _jsxs("div", { className: styles.buttonGroup, children: [_jsx("button", { onClick: () => setLocalisation('visage'), className: `${styles.button} ${localisation === 'visage' ? styles.selectedVisites : ''}`, children: "Visage" }), _jsx("button", { onClick: () => setLocalisation('mains'), className: `${styles.button} ${localisation === 'mains' ? styles.selectedVisites : ''}`, children: "Mains" }), _jsx("button", { onClick: () => setLocalisation('corps'), className: `${styles.button} ${localisation === 'corps' ? styles.selectedVisites : ''}`, children: "Reste du corps" })] }), _jsx("button", { onClick: () => setTypeSuture(null), className: styles.button, style: { marginTop: '1rem' }, children: "Retour" })] })), localisation === 'visage' && !sousLocalisationVisage && (_jsxs("div", { children: [_jsx("h2", { children: "Sous-localisation visage" }), _jsxs("div", { className: styles.buttonGroup, children: [_jsx("button", { onClick: () => setSousLocalisationVisage('nez'), className: styles.button, children: "Nez" }), _jsx("button", { onClick: () => setSousLocalisationVisage('sourcil'), className: styles.button, children: "Sourcil" }), _jsx("button", { onClick: () => setSousLocalisationVisage('auricule'), className: styles.button, children: "Auricule (oreille)" }), _jsx("button", { onClick: () => setSousLocalisationVisage('levre_cutanee'), className: styles.button, children: "L\u00E8vre - plaie cutan\u00E9e non transfixiante" }), _jsx("button", { onClick: () => setSousLocalisationVisage('levre_muqueuse'), className: styles.button, children: "L\u00E8vre - plaie de la muqueuse" }), _jsx("button", { onClick: () => setSousLocalisationVisage('levre_transfixiante'), className: styles.button, children: "L\u00E8vre - plaie transfixiante" }), _jsx("button", { onClick: () => setSousLocalisationVisage('autre'), className: styles.button, children: "Autre plaie du visage" })] }), _jsx("button", { onClick: () => setLocalisation(null), className: styles.button, style: { marginTop: '1rem' }, children: "Retour" })] })), localisation === 'mains' && !sousLocalisationMain && (_jsxs("div", { children: [_jsx("h2", { children: "Type de plaie main" }), _jsxs("div", { className: styles.buttonGroup, children: [_jsxs("button", { onClick: () => setSousLocalisationMain('pulpo_unique'), className: styles.button, children: ["Plaie pulpoungu\u00E9ale unique", _jsx("br", {}), _jsx("em", { style: { fontSize: '0.9em' }, children: "repositionnement de la tablette" })] }), _jsxs("button", { onClick: () => setSousLocalisationMain('pulpo_multiples'), className: styles.button, children: ["Plaies pulpoungu\u00E9ales multiples", _jsx("br", {}), _jsx("em", { style: { fontSize: '0.9em' }, children: "repositionnement de la tablette" })] }), _jsx("button", { onClick: () => setSousLocalisationMain('autre'), className: styles.button, children: "Autre plaie de la main" })] }), _jsx("button", { onClick: () => setLocalisation(null), className: styles.button, style: { marginTop: '1rem' }, children: "Retour" })] })), ((sousLocalisationVisage === 'autre') || (sousLocalisationMain === 'autre') || localisation === 'corps') && !profondeur && (_jsxs("div", { children: [_jsx("h2", { children: "Profondeur de la plaie" }), _jsxs("div", { className: styles.buttonGroup, children: [_jsx("button", { onClick: () => setProfondeur('superficielle'), className: styles.button, children: "Superficielle" }), _jsx("button", { onClick: () => setProfondeur('profonde'), className: styles.button, children: "Profonde" })] }), _jsx("button", { onClick: () => { setSousLocalisationVisage(null); setSousLocalisationMain(null); setLocalisation(null); }, className: styles.button, style: { marginTop: '1rem' }, children: "Retour" })] })), profondeur && !taille && (_jsxs("div", { children: [_jsx("h2", { children: "Taille de la plaie" }), _jsxs("div", { className: styles.buttonGroup, children: [_jsx("button", { onClick: () => setTaille('<3cm'), className: styles.button, children: '< 3 cm' }), _jsx("button", { onClick: () => setTaille('3-10cm'), className: styles.button, children: "3 \u00E0 10 cm" }), _jsx("button", { onClick: () => setTaille('>10cm'), className: styles.button, children: '> 10 cm' })] }), _jsx("button", { onClick: () => setProfondeur(null), className: styles.button, style: { marginTop: '1rem' }, children: "Retour" })] })), acteCCAM && !typeIntervention && (_jsxs("div", { children: [_jsx("h2", { children: "Type d'intervention" }), _jsxs("p", { children: [_jsx("strong", { children: "Acte s\u00E9lectionn\u00E9 :" }), " ", acteCCAM.code, " - ", acteCCAM.description, " (", acteCCAM.tarif.toFixed(2), " \u20AC)"] }), _jsxs("div", { className: styles.buttonGroup, children: [_jsx("button", { onClick: () => setTypeIntervention('consultation'), className: styles.button, children: "Consultation" }), _jsx("button", { onClick: () => setTypeIntervention('visite'), className: styles.button, children: "Visite" })] }), _jsx("button", { onClick: () => setTaille(null), className: styles.button, style: { marginTop: '1rem' }, children: "Retour" })] })), typeIntervention === 'visite' && !communeSelectionnee && !periode && (_jsxs("div", { children: [_jsx("h2", { children: "S\u00E9lection de la commune" }), _jsx("div", { className: styles.buttonGroup, children: sortedCommunes.map(c => (_jsx("button", { onClick: () => setCommuneSelectionnee(c.commune), className: styles.button, children: c.commune }, c.commune))) }), _jsx("button", { onClick: () => setTypeIntervention(null), className: styles.button, style: { marginTop: '1rem' }, children: "Retour" })] })), typeIntervention && (typeIntervention === 'consultation' || communeSelectionnee) && !periode && (_jsxs("div", { children: [_jsx("h2", { children: "P\u00E9riode" }), _jsxs("div", { className: styles.buttonGroup, children: [_jsx("button", { onClick: () => setPeriode('CDS'), className: styles.button, children: "CDS" }), _jsx("button", { onClick: () => setPeriode('PDS'), className: styles.button, children: "PDS" })] }), _jsx("button", { onClick: () => { setTypeIntervention(null); setCommuneSelectionnee(null); }, className: styles.button, style: { marginTop: '1rem' }, children: "Retour" })] })), periode === 'PDS' && !periodePDS && (_jsxs("div", { children: [_jsx("h2", { children: "Tranche horaire PDS" }), _jsxs("div", { className: styles.buttonGroup, children: [_jsx("button", { onClick: () => setPeriodePDS('soir'), className: styles.button, children: "Soir (20h-00h et 6h-8h)" }), _jsx("button", { onClick: () => setPeriodePDS('nuit'), className: styles.button, children: "Nuit profonde (00h-6h)" }), _jsx("button", { onClick: () => setPeriodePDS('samedi'), className: styles.button, children: "Samedi (12h-20h)" }), _jsx("button", { onClick: () => setPeriodePDS('dimanche'), className: styles.button, children: "Dimanche (8h-20h)" })] }), _jsx("button", { onClick: () => setPeriode(null), className: styles.button, style: { marginTop: '1rem' }, children: "Retour" })] })), (periode === 'CDS' || (periode === 'PDS' && periodePDS)) && (_jsxs("div", { style: { marginTop: '2rem', borderTop: '1px solid #ccc', paddingTop: '1rem' }, children: [_jsx("h2", { children: "R\u00E9sum\u00E9 de la cotation" }), _jsxs("p", { children: [_jsx("strong", { children: "Actes :" }), " ", actes.join(' + ')] }), _jsxs("p", { style: { fontSize: '0.9em', color: '#555', marginTop: '-0.5rem', marginLeft: '1rem' }, children: ["D\u00E9tail : ", montants.map(m => m.toFixed(2) + ' €').join(' + ')] }), _jsxs("p", { children: [_jsx("strong", { children: "Montant total :" }), " ", montant.toFixed(2), " \u20AC"] }), _jsxs("p", { children: [_jsx("strong", { children: "Part AMO :" }), " ", amo.toFixed(2), " \u20AC"] }), _jsxs("p", { children: [_jsx("strong", { children: "Part AMC :" }), " ", amc.toFixed(2), " \u20AC"] }), _jsx(FeedbackButton, { type: "contextual", pageContext: `CCAM - ${acteCCAM?.description || 'Suture'} - ${typeIntervention || ''} ${periode || ''}${periodePDS ? ` ${periodePDS}` : ''}${communeSelectionnee ? ` - ${communeSelectionnee}` : ''}`, pageType: "ccam" })] })), _jsx("div", { style: { marginTop: '2rem' }, children: _jsx("button", { onClick: reinitialiser, className: styles.button, children: "Recommencer" }) }), (periode === 'CDS' || (periode === 'PDS' && periodePDS)) && (_jsxs("div", { style: {
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: '#ffcc80',
                    color: 'black',
                    padding: '1rem',
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
                    zIndex: 1000
                }, children: [_jsxs("div", { style: { textAlign: 'center' }, children: [_jsx("div", { style: { fontSize: '0.9rem', marginBottom: '0.25rem' }, children: "Total" }), _jsxs("div", { style: { fontSize: '1.8rem', fontWeight: 'bold' }, children: [montant.toFixed(2), " \u20AC"] })] }), _jsxs("div", { style: { textAlign: 'center' }, children: [_jsx("div", { style: { fontSize: '0.9rem', marginBottom: '0.25rem' }, children: "AMO" }), _jsxs("div", { style: { fontSize: '1.8rem', fontWeight: 'bold' }, children: [amo.toFixed(2), " \u20AC"] })] }), _jsxs("div", { style: { textAlign: 'center' }, children: [_jsx("div", { style: { fontSize: '0.9rem', marginBottom: '0.25rem' }, children: "AMC" }), _jsxs("div", { style: { fontSize: '1.8rem', fontWeight: 'bold' }, children: [amc.toFixed(2), " \u20AC"] })] })] }))] }));
};
export default CCAMPage;
