// src/pages/CotationPage.tsx
import React, { useState } from 'react';
import { communesIK, actesValues } from '../data/visiteConsultationData';
// Import du style des boutons si nécessaire, en fonction de votre structure
import styles from '../components/Button.module.css';

const CotationPage: React.FC = () => {
  // États pour les choix de l'utilisateur
  const [typeActe, setTypeActe] = useState<'Visite' | 'Consultation' | null>(null);
  const [periode, setPeriode] = useState<'CDS' | 'PDS' | null>(null);
  const [periodePDS, setPeriodePDS] = useState<string | null>(null);
  const [regulation15, setRegulation15] = useState<boolean | null>(null);
  const [demandeSoignant, setDemandeSoignant] = useState<boolean | null>(null);
  const [age, setAge] = useState<string | null>(null);
  const [ecg, setEcg] = useState<boolean>(false);
  const [commune, setCommune] = useState<string | null>(null);

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
  
  // Correction de la réinitialisation
  const handleTypeActeChange = (act: 'Visite' | 'Consultation') => {
    if (typeActe !== act) {
      setTypeActe(act);
      resetAllStates(); // Réinitialise tout l'algorithme
      // Si "Visite" est sélectionné, la commune par défaut est Saint-Malo
      if (act === 'Visite') {
        setCommune('Saint-Malo');
      }
    }
  };

  // Les autres gestionnaires de changement
  const handlePeriodeChange = (period: 'CDS' | 'PDS') => {
    setPeriode(period);
    // Si PDS, réinitialiser la régulation et la demande soignant
    if (period === 'PDS') {
      setRegulation15(null);
      setDemandeSoignant(null);
    }
  };
  const handleCommuneChange = (com: string) => setCommune(com);
  const handleAgeChange = (a: string) => setAge(a);

  // Logique de calcul complète
  const calculateTotal = () => {
    let totalHorsIK = 0;
    let actes: string[] = [];

    // --- Acte de base et majorations PDS ---
    if (typeActe) {
      // Nouvelle règle : l'acte de base est toujours présent
      if (typeActe === 'Consultation') {
        actes.push('G');
        totalHorsIK += actesValues.G;
      } else if (typeActe === 'Visite') {
        actes.push('VG');
        totalHorsIK += actesValues.VG;
      }
    }

    // Ajout des majorations PDS si la période est PDS
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
    
    // --- Majorations CDS (si la période est CDS) ---
    if (periode === 'CDS' && typeActe) {
        // Majoration MD (Visite régulée par le 15)
        if (typeActe === 'Visite' && regulation15) { actes.push('MD'); totalHorsIK += actesValues.MD; }
        // Majoration SNP (CDS + régulation 15)
        if (regulation15) { actes.push('SNP'); totalHorsIK += actesValues.SNP; }
        // Majoration MU (Visite + CDS + régulation NON + demande soignant OUI)
        if (typeActe === 'Visite' && regulation15 === false && demandeSoignant) {
          actes.push('MU');
          totalHorsIK += actesValues.MU;
        }
    }
    
    // --- Majorations d'âge ---
    // Les majorations MEG et MOP ne se cumulent pas
    if (age === '0-6 ans') { actes.push('MEG'); totalHorsIK += actesValues.MEG; }
    else if (age === '> 80 ans') { actes.push('MOP'); totalHorsIK += actesValues.MOP; }
    
    // --- ECG ---
    if (ecg && typeActe) {
      if (typeActe === 'Consultation') { 
        actes.push('DEQP003'); 
        totalHorsIK += actesValues.DEQP003_CONSULTATION; 
      }
      if (typeActe === 'Visite') { 
        // Correction de l'affichage de l'acte
        actes.push('DEQP003 + YYYY490'); 
        totalHorsIK += actesValues.ECG_VISITE; 
      }
    }

    // --- IK ---
    const communeIKValue = communesIK.find(c => c.commune === commune)?.ik || 0;
    const ikTotal = typeActe === 'Visite' ? communeIKValue * actesValues.IK : 0;
    if (ikTotal > 0) {
      actes.push(`${communeIKValue} IK`);
    }

    const total = totalHorsIK + ikTotal;
    
    // --- Répartition AMO / AMC ---
    const amo = (totalHorsIK * 0.7) + ikTotal;
    const amc = totalHorsIK * 0.3;

    return { total, actes, amo, amc };
  };

  const { total, actes, amo, amc } = calculateTotal();
  
  // Tri des communes pour l'affichage
  const sortedCommunes = [...communesIK].sort((a, b) => a.commune.localeCompare(b.commune));

  return (
    <div className="cotation-page">
      <h1>Page de cotation</h1>
      
      {/* 1. Type d'acte */}
      <div>
        <h2>Type d'acte</h2>
        <button onClick={() => handleTypeActeChange('Visite')} className={typeActe === 'Visite' ? styles.selected : ''}>Visite</button>
        <button onClick={() => handleTypeActeChange('Consultation')} className={typeActe === 'Consultation' ? styles.selected : ''}>Consultation</button>
      </div>

      {typeActe && (
        <>
          {/* 2. Période */}
          <div>
            <h2>Période</h2>
            <button onClick={() => handlePeriodeChange('CDS')} className={periode === 'CDS' ? styles.selected : ''}>CDS</button>
            <button onClick={() => setPeriode('PDS')} className={periode === 'PDS' ? styles.selected : ''}>PDS</button>
          </div>

          {/* 3.1. Régulation 15 (si CDS) */}
          {periode === 'CDS' && (
            <div>
              <h2>Régulation 15</h2>
              <button onClick={() => setRegulation15(true)} className={regulation15 === true ? styles.selected : ''}>Oui</button>
              <button onClick={() => setRegulation15(false)} className={regulation15 === false ? styles.selected : ''}>Non</button>
            </div>
          )}

          {/* 3.2. Demande soignant (si Visite + CDS + Régulation NON) */}
          {typeActe === 'Visite' && periode === 'CDS' && regulation15 === false && (
            <div>
              <h2>Demande d'un soignant</h2>
              <button onClick={() => setDemandeSoignant(true)} className={demandeSoignant === true ? styles.selected : ''}>Oui</button>
              <button onClick={() => setDemandeSoignant(false)} className={demandeSoignant === false ? styles.selected : ''}>Non</button>
            </div>
          )}

          {/* 3.3. Périodes PDS (si PDS) */}
          {periode === 'PDS' && (
            <div>
              <h2>Détail PDS</h2>
              <button onClick={() => setPeriodePDS(typeActe === 'Consultation' ? 'CRN' : 'VRN')} className={periodePDS?.includes('N') ? styles.selected : ''}>20h–00h / 6h–8h</button>
              <button onClick={() => setPeriodePDS(typeActe === 'Consultation' ? 'CRM' : 'VRM')} className={periodePDS?.includes('M') ? styles.selected : ''}>00h–6h</button>
              <button onClick={() => setPeriodePDS(typeActe === 'Consultation' ? 'CRS' : 'VRS')} className={periodePDS?.includes('S') ? 'selected' : ''}>Samedi 12h–20h</button>
              <button onClick={() => setPeriodePDS(typeActe === 'Consultation' ? 'CRD' : 'VRD')} className={periodePDS?.includes('D') ? 'selected' : ''}>Dimanche 8h–20h</button>
            </div>
          )}

          {/* 4. Âge du patient */}
          <div>
            <h2>Âge du patient</h2>
            <button onClick={() => setAge('0-6 ans')} className={age === '0-6 ans' ? styles.selected : ''}>0-6 ans (MEG)</button>
            <button onClick={() => setAge('> 80 ans')} className={age === '> 80 ans' ? styles.selected : ''}>+ de 80 ans (MOP)</button>
            <button onClick={() => setAge('Autre')} className={age === 'Autre' ? styles.selected : ''}>Autre</button>
          </div>

          {/* 5. ECG */}
          <div>
            <h2>ECG</h2>
            <button onClick={() => setEcg(!ecg)} className={ecg ? styles.selected : ''}>Oui</button>
          </div>

          {/* 6. Commune (IK) */}
          {typeActe === 'Visite' && (
            <div>
              <h2>Commune (IK)</h2>
              {sortedCommunes.map((c) => (
                <button key={c.commune} onClick={() => setCommune(c.commune)} className={commune === c.commune ? styles.selected : ''}>
                  {c.commune} ({c.ik} IK)
                </button>
              ))}
            </div>
          )}
          
          {/* 7. Affichage du résultat */}
          <div className="result-section">
            <h2>Récapitulatif et calcul</h2>
            <p>Actes : {actes.join(' + ')}</p>
            <p>Montant total : {total.toFixed(2)} €</p>
            <p>Part AMO : {amo.toFixed(2)} €</p>
            <p>Part AMC : {amc.toFixed(2)} €</p>
          </div>
        </>
      )}
    </div>
  );
};

export default CotationPage;