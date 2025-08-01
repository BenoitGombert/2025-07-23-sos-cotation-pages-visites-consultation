// src/pages/CotationPage.tsx
import React, { useState, useEffect } from 'react'; // Ajout de useEffect
import { communesIK, actesValues } from '../data/visiteConsultationData';
import styles from '../components/Button.module.css';

// Définition des propriétés que le composant attend
interface CotationPageProps {
  preselectedActe: 'Visite' | 'Consultation' | null;
}

const CotationPage: React.FC<CotationPageProps> = ({ preselectedActe }) => {
  // États pour les choix de l'utilisateur
  const [typeActe, setTypeActe] = useState<'Visite' | 'Consultation' | null>(null);
  const [periode, setPeriode] = useState<'CDS' | 'PDS' | null>(null);
  const [periodePDS, setPeriodePDS] = useState<string | null>(null);
  const [regulation15, setRegulation15] = useState<boolean | null>(null);
  const [demandeSoignant, setDemandeSoignant] = useState<boolean | null>(null);
  const [age, setAge] = useState<string | null>(null);
  const [ecg, setEcg] = useState<boolean>(false);
  const [commune, setCommune] = useState<string | null>(null);

  // Utilisation de useEffect pour gérer l'acte pré-sélectionné
  useEffect(() => {
    if (preselectedActe && typeActe === null) {
      setTypeActe(preselectedActe);
      if (preselectedActe === 'Visite') {
        setCommune('Saint-Malo');
      }
    }
  }, [preselectedActe, typeActe]);

  // Fonction pour réinitialiser tous les états liés à la cotation
  const resetAllStates = () => {
    setPeriode(null);
    setPeriodePDS(null);
    setRegulation15(null);
    setDemandeSoignant(null);
    setAge(null);
    setEcg(false);
    setCommune(null);
  };
  
  const handleTypeActeChange = (act: 'Visite' | 'Consultation') => {
    if (typeActe !== act) {
      setTypeActe(act);
      resetAllStates();
      if (act === 'Visite') {
        setCommune('Saint-Malo');
      }
    }
  };

  const handlePeriodeChange = (period: 'CDS' | 'PDS') => {
    setPeriode(period);
    if (period === 'PDS') {
      setRegulation15(null);
      setDemandeSoignant(null);
    }
  };
  
  const handleCommuneChange = (com: string) => setCommune(com);
  const handleAgeChange = (a: string) => setAge(a);

  // Logique de calcul complète (pas de changement ici)
  const calculateTotal = () => {
    let totalHorsIK = 0;
    let actes: string[] = [];

    if (typeActe) {
      if (typeActe === 'Consultation') {
        actes.push('G');
        totalHorsIK += actesValues.G;
      } else if (typeActe === 'Visite') {
        actes.push('VG');
        totalHorsIK += actesValues.VG;
      }
    }

    if (periode === 'PDS' && typeActe) {
      if (typeActe === 'Consultation') {
        if (periodePDS === 'CRN') { actes.push('CRN'); totalHorsIK += actesValues.CRN; }
        if (periodePDS === 'CRM') { actes.push('CRM'); totalHorsIK += actesValues.CRM; }
        if (periodePDS === 'CRS') { actes.push('CRS'); totalHorsIK += actesValues.CRS; }
        if (periodePDS === 'CRD') { actes.push('CRD'); totalHorsIK += actesValues.CRD; }
      } else if (typeActe === 'Visite') {
        if (periodePDS === 'VRN') { actes.push('VRN'); totalHorsIK += actesValues.VRN; }
        if (periodePDS === 'VRM') { actes.push('VRM'); totalHorsIK += actesValues.VRM; }
        if (periodePDS === 'VRS') { actes.push('VRS'); totalHorsIK += actesValues.VRS; }
        if (periodePDS === 'VRD') { actes.push('VRD'); totalHorsIK += actesValues.VRD; }
      }
    }
    
    if (periode === 'CDS' && typeActe) {
        if (typeActe === 'Visite' && regulation15) { actes.push('MD'); totalHorsIK += actesValues.MD; }
        if (regulation15) { actes.push('SNP'); totalHorsIK += actesValues.SNP; }
        if (typeActe === 'Visite' && periode === 'CDS' && regulation15 === false && demandeSoignant) {
          actes.push('MU');
          totalHorsIK += actesValues.MU;
        }
        if (typeActe === 'Visite' && periode === 'CDS' && regulation15 === false && demandeSoignant === false) {
          actes.push('MD');
          totalHorsIK += actesValues.MD;
        }
    }
    
    if (age === '0-6 ans') { actes.push('MEG'); totalHorsIK += actesValues.MEG; }
    else if (age === '> 80 ans') { actes.push('MOP'); totalHorsIK += actesValues.MOP; }
    
    if (ecg && typeActe) {
      if (typeActe === 'Consultation') { 
        actes.push('DEQP003'); 
        totalHorsIK += actesValues.DEQP003_CONSULTATION; 
      }
      if (typeActe === 'Visite') { 
        actes.push('DEQP003 + YYYY490'); 
        totalHorsIK += actesValues.ECG_VISITE; 
      }
    }

    const communeIKValue = communesIK.find(c => c.commune === commune)?.ik || 0;
    const ikTotal = typeActe === 'Visite' ? communeIKValue * actesValues.IK : 0;
    if (ikTotal > 0) {
      actes.push(`${communeIKValue} IK`);
    }

    const total = totalHorsIK + ikTotal;
    
    const amo = (totalHorsIK * 0.7) + ikTotal;
    const amc = totalHorsIK * 0.3;

    return { total, actes, amo, amc };
  };

  const { total, actes, amo, amc } = calculateTotal();
  
  const sortedCommunes = [...communesIK].sort((a, b) => a.commune.localeCompare(b.commune));

  return (
    <div className="cotation-page">
      <h1>Page de cotation</h1>
      
      <div>
        <h2>Type d'acte</h2>
        <button onClick={() => handleTypeActeChange('Visite')} className={typeActe === 'Visite' ? styles.selectedVisites : ''}>Visite</button>
        <button onClick={() => handleTypeActeChange('Consultation')} className={typeActe === 'Consultation' ? styles.selectedVisites : ''}>Consultation</button>
      </div>

      {typeActe && (
        <>
          <div>
            <h2>Période</h2>
            <button onClick={() => handlePeriodeChange('CDS')} className={periode === 'CDS' ? styles.selectedVisites : ''}>CDS</button>
            <button onClick={() => setPeriode('PDS')} className={periode === 'PDS' ? styles.selectedVisites : ''}>PDS</button>
          </div>

          {periode === 'CDS' && (
            <div>
              <h2>Régulation 15</h2>
              <button onClick={() => setRegulation15(true)} className={regulation15 === true ? styles.selectedVisites : ''}>Oui</button>
              <button onClick={() => setRegulation15(false)} className={regulation15 === false ? styles.selectedVisites : ''}>Non</button>
            </div>
          )}

          {typeActe === 'Visite' && periode === 'CDS' && regulation15 === false && (
            <div>
              <h2>Demande d'un soignant</h2>
              <button onClick={() => setDemandeSoignant(true)} className={demandeSoignant === true ? styles.selectedVisites : ''}>Oui</button>
              <button onClick={() => setDemandeSoignant(false)} className={demandeSoignant === false ? styles.selectedVisites : ''}>Non</button>
            </div>
          )}

          {periode === 'PDS' && (
            <div>
              <h2>Détail PDS</h2>
              <button onClick={() => setPeriodePDS(typeActe === 'Consultation' ? 'CRN' : 'VRN')} className={periodePDS?.includes('N') ? styles.selectedVisites : ''}>20h–00h / 6h–8h</button>
              <button onClick={() => setPeriodePDS(typeActe === 'Consultation' ? 'CRM' : 'VRM')} className={periodePDS?.includes('M') ? 'selectedVisites' : ''}>00h–6h</button>
              <button onClick={() => setPeriodePDS(typeActe === 'Consultation' ? 'CRS' : 'VRS')} className={periodePDS?.includes('S') ? 'selectedVisites' : ''}>Samedi 12h–20h</button>
              <button onClick={() => setPeriodePDS(typeActe === 'Consultation' ? 'CRD' : 'VRD')} className={periodePDS?.includes('D') ? 'selectedVisites' : ''}>Dimanche 8h–20h</button>
            </div>
          )}

          <div>
            <h2>Âge du patient</h2>
            <button onClick={() => setAge('0-6 ans')} className={age === '0-6 ans' ? styles.selectedVisites : ''}>0-6 ans (MEG)</button>
            <button onClick={() => setAge('> 80 ans')} className={age === '> 80 ans' ? styles.selectedVisites : ''}>+ de 80 ans (MOP)</button>
            <button onClick={() => setAge('Autre')} className={age === 'Autre' ? styles.selectedVisites : ''}>Autre</button>
          </div>

          <div>
            <h2>ECG</h2>
            <button onClick={() => setEcg(!ecg)} className={ecg ? styles.selectedVisites : ''}>Oui</button>
          </div>

          {typeActe === 'Visite' && (
            <div>
              <h2>Commune (IK)</h2>
              <select onChange={(e) => handleCommuneChange(e.target.value)} value={commune || ''}>
                <option value="" disabled>Sélectionnez une commune</option>
                {sortedCommunes.map((c) => (
                  <option key={c.commune} value={c.commune}>
                    {c.commune}
                  </option>
                ))}
              </select>
            </div>
          )}
          
          <div className="result-section">
            <h2>Récapitulatif et calcul</h2>
            <p>Actes : {actes.join(' + ')}</p>
            <p>Montant total : {isNaN(total) ? 'NaN' : total.toFixed(2)} €</p>
            <p>Part AMO : {isNaN(amo) ? 'NaN' : amo.toFixed(2)} €</p>
            <p>Part AMC : {isNaN(amc) ? 'NaN' : amc.toFixed(2)} €</p>
          </div>
        </>
      )}
    </div>
  );
};

export default CotationPage;