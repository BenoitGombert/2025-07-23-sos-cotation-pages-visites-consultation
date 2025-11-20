// src/pages/CotationPage.tsx
import React, { useState, useEffect } from 'react';
import { communesIK, actesValues } from '../data/visiteConsultationData';
import styles from '../components/Button.module.css';

interface CotationPageProps {
  preselectedActe: 'Visite' | 'Consultation' | null;
  preselectedCommune: string | null;
}

const CotationPage: React.FC<CotationPageProps> = ({ preselectedActe, preselectedCommune }) => {
  const [typeActe, setTypeActe] = useState<'Visite' | 'Consultation' | null>(null);
  const [periode, setPeriode] = useState<'CDS' | 'PDS' | null>(null);
  const [periodePDS, setPeriodePDS] = useState<string | null>(null);
  const [regulation15, setRegulation15] = useState<boolean | null>(null);
  const [demandeSoignant, setDemandeSoignant] = useState<boolean | null>(null);
  const [age, setAge] = useState<string | null>(null);
  const [ecg, setEcg] = useState<boolean>(false);
  const [commune, setCommune] = useState<string | null>(null);

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
    } else if (period === 'CDS') {
      setPeriodePDS(null);
    }
  };
  
  const handleCommuneChange = (com: string) => setCommune(com);
  const handleAgeChange = (a: string) => setAge(a);

  const calculateTotal = () => {
    let totalHorsIK = 0;
    let actes: string[] = [];
    let montants: number[] = [];

    if (typeActe) {
      if (typeActe === 'Consultation') {
        actes.push('G');
        montants.push(actesValues.G);
        totalHorsIK += actesValues.G;
      } else if (typeActe === 'Visite') {
        actes.push('VG');
        montants.push(actesValues.VG);
        totalHorsIK += actesValues.VG;
      }
    }

    if (periode === 'PDS' && typeActe) {
      if (typeActe === 'Consultation') {
        if (periodePDS === 'CRN') { actes.push('CRN'); montants.push(actesValues.CRN); totalHorsIK += actesValues.CRN; }
        if (periodePDS === 'CRM') { actes.push('CRM'); montants.push(actesValues.CRM); totalHorsIK += actesValues.CRM; }
        if (periodePDS === 'CRS') { actes.push('CRS'); montants.push(actesValues.CRS); totalHorsIK += actesValues.CRS; }
        if (periodePDS === 'CRD') { actes.push('CRD'); montants.push(actesValues.CRD); totalHorsIK += actesValues.CRD; }
      } else if (typeActe === 'Visite') {
        if (periodePDS === 'VRN') { actes.push('VRN'); montants.push(actesValues.VRN); totalHorsIK += actesValues.VRN; }
        if (periodePDS === 'VRM') { actes.push('VRM'); montants.push(actesValues.VRM); totalHorsIK += actesValues.VRM; }
        if (periodePDS === 'VRS') { actes.push('VRS'); montants.push(actesValues.VRS); totalHorsIK += actesValues.VRS; }
        if (periodePDS === 'VRD') { actes.push('VRD'); montants.push(actesValues.VRD); totalHorsIK += actesValues.VRD; }
      }
    }

    if (periode === 'CDS' && typeActe) {
        if (typeActe === 'Visite' && regulation15) { actes.push('MD'); montants.push(actesValues.MD); totalHorsIK += actesValues.MD; }
        if (regulation15) { actes.push('SNP'); montants.push(actesValues.SNP); totalHorsIK += actesValues.SNP; }
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

    if (age === '0-6 ans') { actes.push('MEG'); montants.push(actesValues.MEG); totalHorsIK += actesValues.MEG; }
    else if (age === '> 80 ans') { actes.push('MOP'); montants.push(actesValues.MOP); totalHorsIK += actesValues.MOP; }

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

  return (
    <div className="cotation-page" style={{ paddingBottom: '120px' }}>
      <h1>Page de cotation</h1>
      
      <div>
        <h2>Type d'acte</h2>
        <div className={styles.buttonGroup}>
          <button onClick={() => handleTypeActeChange('Visite')} className={`${styles.button} ${typeActe === 'Visite' ? styles.selectedVisites : ''}`}>
            Visite
          </button>
          <button onClick={() => handleTypeActeChange('Consultation')} className={`${styles.button} ${typeActe === 'Consultation' ? styles.selectedVisites : ''}`}>
            Consultation
          </button>
        </div>
      </div>

      {typeActe && (
        <>
          <div>
            <h2>Période</h2>
            <div className={styles.buttonGroup}>
              <button onClick={() => handlePeriodeChange('CDS')} className={`${styles.button} ${periode === 'CDS' ? styles.selectedVisites : ''}`}>
                CDS
              </button>
              <button onClick={() => handlePeriodeChange('PDS')} className={`${styles.button} ${periode === 'PDS' ? styles.selectedVisites : ''}`}>
                PDS
              </button>
            </div>
          </div>

          {periode === 'CDS' && (
            <div>
              <h2>Régulation 15</h2>
              <div className={styles.buttonGroup}>
                <button onClick={() => setRegulation15(true)} className={`${styles.button} ${regulation15 === true ? styles.selectedVisites : ''}`}>
                  Oui
                </button>
                <button onClick={() => setRegulation15(false)} className={`${styles.button} ${regulation15 === false ? styles.selectedVisites : ''}`}>
                  Non
                </button>
              </div>
            </div>
          )}

          {typeActe === 'Visite' && periode === 'CDS' && regulation15 === false && (
            <div>
              <h2>Demande d'un soignant</h2>
              <div className={styles.buttonGroup}>
                <button onClick={() => setDemandeSoignant(true)} className={`${styles.button} ${demandeSoignant === true ? styles.selectedVisites : ''}`}>
                  Oui
                </button>
                <button onClick={() => setDemandeSoignant(false)} className={`${styles.button} ${demandeSoignant === false ? styles.selectedVisites : ''}`}>
                  Non
                </button>
              </div>
            </div>
          )}

          {periode === 'PDS' && (
            <div>
              <h2>Détail PDS</h2>
              <div className={styles.buttonGroup}>
                <button onClick={() => setPeriodePDS(typeActe === 'Consultation' ? 'CRN' : 'VRN')} className={`${styles.button} ${periodePDS?.includes('N') ? styles.selectedVisites : ''}`}>
                  20h–00h / 6h–8h
                </button>
                <button onClick={() => setPeriodePDS(typeActe === 'Consultation' ? 'CRM' : 'VRM')} className={`${styles.button} ${periodePDS?.includes('M') ? styles.selectedVisites : ''}`}>
                  00h–6h
                </button>
                <button onClick={() => setPeriodePDS(typeActe === 'Consultation' ? 'CRS' : 'VRS')} className={`${styles.button} ${periodePDS?.includes('S') ? styles.selectedVisites : ''}`}>
                  Samedi 12h–20h
                </button>
                <button onClick={() => setPeriodePDS(typeActe === 'Consultation' ? 'CRD' : 'VRD')} className={`${styles.button} ${periodePDS?.includes('D') ? styles.selectedVisites : ''}`}>
                  Dimanche 8h–20h
                </button>
              </div>
            </div>
          )}

          <div>
            <h2>Âge du patient</h2>
            <div className={styles.buttonGroup}>
              <button onClick={() => setAge('0-6 ans')} className={`${styles.button} ${age === '0-6 ans' ? styles.selectedVisites : ''}`}>
                0-6 ans (MEG)
              </button>
              <button onClick={() => setAge('> 80 ans')} className={`${styles.button} ${age === '> 80 ans' ? styles.selectedVisites : ''}`}>
                + de 80 ans (MOP)
              </button>
              <button onClick={() => setAge('Autre')} className={`${styles.button} ${age === 'Autre' ? styles.selectedVisites : ''}`}>
                Autre
              </button>
            </div>
          </div>

          <div>
            <h2>ECG</h2>
            <div className={styles.buttonGroup}>
              <button onClick={() => setEcg(!ecg)} className={`${styles.button} ${ecg ? styles.selectedVisites : ''}`}>
                Oui
              </button>
            </div>
          </div>

          {typeActe === 'Visite' && (
            <div>
              <h2>Commune (IK)</h2>
              <div className={styles.buttonGroup}>
                <select onChange={(e) => handleCommuneChange(e.target.value)} value={commune || ''} className={styles.button}>
                  <option value="" disabled>Sélectionnez une commune</option>
                  {sortedCommunes.map((c) => (
                    <option key={c.commune} value={c.commune}>
                      {c.commune}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
          
          <div className="result-section">
            <h2>Récapitulatif et calcul</h2>
            <p>Actes : {actes.join(' + ')}</p>
            <p style={{ fontSize: '0.9em', color: '#555', marginTop: '-0.5rem' }}>
              Détail : {montants.map(m => m.toFixed(2) + ' €').join(' + ')}
            </p>
            <p>Montant total : {isNaN(total) ? 'NaN' : total.toFixed(2)} €</p>
            <p>Part AMO : {isNaN(amo) ? 'NaN' : amo.toFixed(2)} €</p>
            <p>Part AMC : {isNaN(amc) ? 'NaN' : amc.toFixed(2)} €</p>
          </div>
        </>
      )}

      {typeActe && (
        <div style={{
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
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.9rem', marginBottom: '0.25rem' }}>Total</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{total.toFixed(2)} €</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.9rem', marginBottom: '0.25rem' }}>AMO</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{amo.toFixed(2)} €</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.9rem', marginBottom: '0.25rem' }}>AMC</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{amc.toFixed(2)} €</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CotationPage;