// src/pages/CotationPage.tsx
import React, { useState } from 'react';
import { communesIK, actesValues } from '../data/visiteConsultationData';
// L'importation de '../App.css' a été retirée

const CotationPage: React.FC = () => {
  // ... le reste de votre code de la page CotationPage.tsx
  // ... qui ne change pas par rapport à la version précédente

  // États pour les choix de l'utilisateur
  const [typeActe, setTypeActe] = useState<'Visite' | 'Consultation' | null>(null);
  const [periode, setPeriode] = useState<'CDS' | 'PDS' | null>(null);
  const [periodePDS, setPeriodePDS] = useState<string | null>(null);
  const [regulation15, setRegulation15] = useState<boolean | null>(null);
  const [demandeSoignant, setDemandeSoignant] = useState<boolean | null>(null);
  const [age, setAge] = useState<string | null>(null);
  const [ecg, setEcg] = useState<boolean>(false);
  const [commune, setCommune] = useState<string | null>(null);

  // Fonction pour réinitialiser les états dépendants
  const resetAfterTypeActeChange = () => {
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
      resetAfterTypeActeChange();
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

  const handleCommuneChange = (com: string) => {
    setCommune(com);
  }

  const handleAgeChange = (a: string) => {
    setAge(a);
  }
  
  // Logique de calcul complète
  const calculateTotal = () => {
    let total = 0;
    let actes: string[] = [];

    let totalHorsIK = 0;
    
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
    else if (typeActe) {
      if (typeActe === 'Consultation') { actes.push('G'); totalHorsIK += actesValues.G; }
      if (typeActe === 'Visite') { actes.push('VG'); totalHorsIK += actesValues.VG; }

      if (typeActe === 'Visite' && regulation15) { actes.push('MD'); totalHorsIK += actesValues.MD; }

      if (periode === 'CDS' && regulation15) { actes.push('SNP'); totalHorsIK += actesValues.SNP; }

      if (typeActe === 'Visite' && periode === 'CDS' && regulation15 === false && demandeSoignant) {
        actes.push('MU');
        totalHorsIK += actesValues.MU;
      }
    }
    
    if (age === '0-6 ans') { actes.push('MEG'); totalHorsIK += actesValues.MEG; }
    if (age === '> 80 ans') { actes.push('MOP'); totalHorsIK += actesValues.MOP; }
    
    if (ecg && typeActe) {
      if (typeActe === 'Consultation') { actes.push('DEQP003'); totalHorsIK += actesValues.DEQP003_CONSULTATION; }
      if (typeActe === 'Visite') { actes.push('ECG'); totalHorsIK += actesValues.ECG_VISITE; }
    }

    const communeIKValue = communesIK.find(c => c.commune === commune)?.ik || 0;
    const ikTotal = typeActe === 'Visite' ? communeIKValue * actesValues.IK : 0;
    if (ikTotal > 0) {
      actes.push(`${communeIKValue} IK`);
    }

    total = totalHorsIK + ikTotal;
    
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
        <button onClick={() => handleTypeActeChange('Visite')} className={typeActe === 'Visite' ? 'selected' : ''}>Visite</button>
        <button onClick={() => handleTypeActeChange('Consultation')} className={typeActe === 'Consultation' ? 'selected' : ''}>Consultation</button>
      </div>

      {typeActe && (
        <>
          <div>
            <h2>Période</h2>
            <button onClick={() => handlePeriodeChange('CDS')} className={periode === 'CDS' ? 'selected' : ''}>CDS</button>
            <button onClick={() => handlePeriodeChange('PDS')} className={periode === 'PDS' ? 'selected' : ''}>PDS</button>
          </div>

          {periode === 'CDS' && (
            <div>
              <h2>Régulation 15</h2>
              <button onClick={() => setRegulation15(true)} className={regulation15 === true ? 'selected' : ''}>Oui</button>
              <button onClick={() => setRegulation15(false)} className={regulation15 === false ? 'selected' : ''}>Non</button>
            </div>
          )}

          {typeActe === 'Visite' && periode === 'CDS' && regulation15 === false && (
            <div>
              <h2>Demande d'un soignant</h2>
              <button onClick={() => setDemandeSoignant(true)} className={demandeSoignant === true ? 'selected' : ''}>Oui</button>
              <button onClick={() => setDemandeSoignant(false)} className={demandeSoignant === false ? 'selected' : ''}>Non</button>
            </div>
          )}

          {periode === 'PDS' && (
            <div>
              <h2>Détail PDS</h2>
              <button onClick={() => setPeriodePDS(typeActe === 'Consultation' ? 'CRN' : 'VRN')} className={periodePDS?.includes('N') ? 'selected' : ''}>20h–00h / 6h–8h</button>
              <button onClick={() => setPeriodePDS(typeActe === 'Consultation' ? 'CRM' : 'VRM')} className={periodePDS?.includes('M') ? 'selected' : ''}>00h–6h</button>
              <button onClick={() => setPeriodePDS(typeActe === 'Consultation' ? 'CRS' : 'VRS')} className={periodePDS?.includes('S') ? 'selected' : ''}>Samedi 12h–20h</button>
              <button onClick={() => setPeriodePDS(typeActe === 'Consultation' ? 'CRD' : 'VRD')} className={periodePDS?.includes('D') ? 'selected' : ''}>Dimanche 8h–20h</button>
            </div>
          )}

          <div>
            <h2>Âge du patient</h2>
            <button onClick={() => setAge('0-6 ans')} className={age === '0-6 ans' ? 'selected' : ''}>0-6 ans (MEG)</button>
            <button onClick={() => setAge('> 80 ans')} className={age === '> 80 ans' ? 'selected' : ''}>+ de 80 ans (MOP)</button>
          </div>

          <div>
            <h2>ECG</h2>
            <button onClick={() => setEcg(!ecg)} className={ecg ? 'selected' : ''}>Oui</button>
          </div>

          {typeActe === 'Visite' && (
            <div>
              <h2>Commune (IK)</h2>
              {sortedCommunes.map((c) => (
                <button key={c.commune} onClick={() => setCommune(c.commune)} className={commune === c.commune ? 'selected' : ''}>
                  {c.commune} ({c.ik} IK)
                </button>
              ))}
            </div>
          )}
          
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