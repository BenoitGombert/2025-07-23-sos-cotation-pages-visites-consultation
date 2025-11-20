// src/pages/CCAMPage.tsx
import React, { useState } from 'react';
import { actesSpecifiques, trouverActeSuture, cotationsSutures, ActeCCAM } from '../data/suturesData';
import { communesIK } from '../data/visiteConsultationData';
import styles from '../components/Button.module.css';

type NombreSutures = 'une' | 'plusieurs' | null;
type Localisation = 'visage' | 'mains' | 'corps' | null;
type SousLocalisationVisage = 'nez' | 'sourcil' | 'auricule' | 'levre_cutanee' | 'levre_muqueuse' | 'levre_transfixiante' | 'autre' | null;
type SousLocalisationMain = 'pulpo_unique' | 'pulpo_multiples' | 'autre' | null;
type Profondeur = 'superficielle' | 'profonde' | null;
type Taille = '<3cm' | '3-10cm' | '>10cm' | null;
type TypeIntervention = 'consultation' | 'visite' | null;
type Periode = 'CDS' | 'PDS' | null;
type PeriodePDS = 'soir' | 'nuit' | 'samedi' | 'dimanche' | null;

const CCAMPage: React.FC = () => {
  const [nombreSutures, setNombreSutures] = useState<NombreSutures>(null);
  const [typeSuture, setTypeSuture] = useState<'une' | 'plusieurs' | null>(null);
  const [localisation, setLocalisation] = useState<Localisation>(null);
  const [sousLocalisationVisage, setSousLocalisationVisage] = useState<SousLocalisationVisage>(null);
  const [sousLocalisationMain, setSousLocalisationMain] = useState<SousLocalisationMain>(null);
  const [profondeur, setProfondeur] = useState<Profondeur>(null);
  const [taille, setTaille] = useState<Taille>(null);
  const [typeIntervention, setTypeIntervention] = useState<TypeIntervention>(null);
  const [communeSelectionnee, setCommuneSelectionnee] = useState<string | null>(null);
  const [periode, setPeriode] = useState<Periode>(null);
  const [periodePDS, setPeriodePDS] = useState<PeriodePDS>(null);

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

  const getActeCCAM = (): ActeCCAM | null => {
    if (localisation === 'visage' && sousLocalisationVisage) {
      if (sousLocalisationVisage === 'nez') return actesSpecifiques.nez;
      if (sousLocalisationVisage === 'sourcil') return actesSpecifiques.sourcil;
      if (sousLocalisationVisage === 'auricule') return actesSpecifiques.auricule;
      if (sousLocalisationVisage === 'levre_cutanee') return actesSpecifiques.levre_cutanee;
      if (sousLocalisationVisage === 'levre_muqueuse') return actesSpecifiques.levre_muqueuse;
      if (sousLocalisationVisage === 'levre_transfixiante') return actesSpecifiques.levre_transfixiante;
      if (sousLocalisationVisage === 'autre' && profondeur && taille) {
        return trouverActeSuture('face', profondeur, taille) || null;
      }
    }

    if (localisation === 'mains' && sousLocalisationMain) {
      if (sousLocalisationMain === 'pulpo_unique') return actesSpecifiques.pulpo_unique;
      if (sousLocalisationMain === 'pulpo_multiples') return actesSpecifiques.pulpo_multiples;
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
    if (!acteCCAM || !typeIntervention || !periode) return { montant: 0, actes: [], montants: [], amo: 0, amc: 0 };

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
      } else {
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
    } else if (periode === 'PDS' && periodePDS) {
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
      } else {
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

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Page CCAM - Actes Techniques</h1>

      {!nombreSutures && (
        <div>
          <h2>Type d'acte</h2>
          <div className={styles.buttonGroup}>
            <button onClick={() => setNombreSutures('une')} className={styles.button}>Sutures</button>
          </div>
        </div>
      )}

      {nombreSutures && !typeSuture && (
        <div>
          <h2>Nombre de sutures</h2>
          <div className={styles.buttonGroup}>
            <button onClick={() => setTypeSuture('une')} className={styles.button}>Une seule suture</button>
            <button className={styles.button} disabled style={{ opacity: 0.5, cursor: 'not-allowed' }}>
              Plusieurs sutures (en cours de développement)
            </button>
          </div>
          <button onClick={reinitialiser} className={styles.button} style={{ marginTop: '1rem' }}>Retour</button>
        </div>
      )}

      {typeSuture === 'une' && !localisation && (
        <div>
          <h2>Localisation</h2>
          <div className={styles.buttonGroup}>
            <button onClick={() => setLocalisation('visage')} className={`${styles.button} ${localisation === 'visage' ? styles.selectedVisites : ''}`}>Visage</button>
            <button onClick={() => setLocalisation('mains')} className={`${styles.button} ${localisation === 'mains' ? styles.selectedVisites : ''}`}>Mains</button>
            <button onClick={() => setLocalisation('corps')} className={`${styles.button} ${localisation === 'corps' ? styles.selectedVisites : ''}`}>Reste du corps</button>
          </div>
          <button onClick={() => setTypeSuture(null)} className={styles.button} style={{ marginTop: '1rem' }}>Retour</button>
        </div>
      )}

      {localisation === 'visage' && !sousLocalisationVisage && (
        <div>
          <h2>Sous-localisation visage</h2>
          <div className={styles.buttonGroup}>
            <button onClick={() => setSousLocalisationVisage('nez')} className={styles.button}>Nez</button>
            <button onClick={() => setSousLocalisationVisage('sourcil')} className={styles.button}>Sourcil</button>
            <button onClick={() => setSousLocalisationVisage('auricule')} className={styles.button}>Auricule (oreille)</button>
            <button onClick={() => setSousLocalisationVisage('levre_cutanee')} className={styles.button}>Lèvre - plaie cutanée non transfixiante</button>
            <button onClick={() => setSousLocalisationVisage('levre_muqueuse')} className={styles.button}>Lèvre - plaie de la muqueuse</button>
            <button onClick={() => setSousLocalisationVisage('levre_transfixiante')} className={styles.button}>Lèvre - plaie transfixiante</button>
            <button onClick={() => setSousLocalisationVisage('autre')} className={styles.button}>Autre plaie du visage</button>
          </div>
          <button onClick={() => setLocalisation(null)} className={styles.button} style={{ marginTop: '1rem' }}>Retour</button>
        </div>
      )}

      {localisation === 'mains' && !sousLocalisationMain && (
        <div>
          <h2>Type de plaie main</h2>
          <div className={styles.buttonGroup}>
            <button onClick={() => setSousLocalisationMain('pulpo_unique')} className={styles.button}>
              Plaie pulpounguéale unique<br/><em style={{ fontSize: '0.9em' }}>repositionnement de la tablette</em>
            </button>
            <button onClick={() => setSousLocalisationMain('pulpo_multiples')} className={styles.button}>
              Plaies pulpounguéales multiples<br/><em style={{ fontSize: '0.9em' }}>repositionnement de la tablette</em>
            </button>
            <button onClick={() => setSousLocalisationMain('autre')} className={styles.button}>Autre plaie de la main</button>
          </div>
          <button onClick={() => setLocalisation(null)} className={styles.button} style={{ marginTop: '1rem' }}>Retour</button>
        </div>
      )}

      {((sousLocalisationVisage === 'autre') || (sousLocalisationMain === 'autre') || localisation === 'corps') && !profondeur && (
        <div>
          <h2>Profondeur de la plaie</h2>
          <div className={styles.buttonGroup}>
            <button onClick={() => setProfondeur('superficielle')} className={styles.button}>Superficielle</button>
            <button onClick={() => setProfondeur('profonde')} className={styles.button}>Profonde</button>
          </div>
          <button onClick={() => { setSousLocalisationVisage(null); setSousLocalisationMain(null); setLocalisation(null); }} className={styles.button} style={{ marginTop: '1rem' }}>Retour</button>
        </div>
      )}

      {profondeur && !taille && (
        <div>
          <h2>Taille de la plaie</h2>
          <div className={styles.buttonGroup}>
            <button onClick={() => setTaille('<3cm')} className={styles.button}>{'< 3 cm'}</button>
            <button onClick={() => setTaille('3-10cm')} className={styles.button}>3 à 10 cm</button>
            <button onClick={() => setTaille('>10cm')} className={styles.button}>{'> 10 cm'}</button>
          </div>
          <button onClick={() => setProfondeur(null)} className={styles.button} style={{ marginTop: '1rem' }}>Retour</button>
        </div>
      )}

      {acteCCAM && !typeIntervention && (
        <div>
          <h2>Type d'intervention</h2>
          <p><strong>Acte sélectionné :</strong> {acteCCAM.code} - {acteCCAM.description} ({acteCCAM.tarif.toFixed(2)} €)</p>
          <div className={styles.buttonGroup}>
            <button onClick={() => setTypeIntervention('consultation')} className={styles.button}>Consultation</button>
            <button onClick={() => setTypeIntervention('visite')} className={styles.button}>Visite</button>
          </div>
          <button onClick={() => setTaille(null)} className={styles.button} style={{ marginTop: '1rem' }}>Retour</button>
        </div>
      )}

      {typeIntervention === 'visite' && !communeSelectionnee && !periode && (
        <div>
          <h2>Sélection de la commune</h2>
          <div className={styles.buttonGroup}>
            {sortedCommunes.map(c => (
              <button key={c.commune} onClick={() => setCommuneSelectionnee(c.commune)} className={styles.button}>{c.commune}</button>
            ))}
          </div>
          <button onClick={() => setTypeIntervention(null)} className={styles.button} style={{ marginTop: '1rem' }}>Retour</button>
        </div>
      )}

      {typeIntervention && (typeIntervention === 'consultation' || communeSelectionnee) && !periode && (
        <div>
          <h2>Période</h2>
          <div className={styles.buttonGroup}>
            <button onClick={() => setPeriode('CDS')} className={styles.button}>CDS</button>
            <button onClick={() => setPeriode('PDS')} className={styles.button}>PDS</button>
          </div>
          <button onClick={() => { setTypeIntervention(null); setCommuneSelectionnee(null); }} className={styles.button} style={{ marginTop: '1rem' }}>Retour</button>
        </div>
      )}

      {periode === 'PDS' && !periodePDS && (
        <div>
          <h2>Tranche horaire PDS</h2>
          <div className={styles.buttonGroup}>
            <button onClick={() => setPeriodePDS('soir')} className={styles.button}>Soir (20h-00h et 6h-8h)</button>
            <button onClick={() => setPeriodePDS('nuit')} className={styles.button}>Nuit profonde (00h-6h)</button>
            <button onClick={() => setPeriodePDS('samedi')} className={styles.button}>Samedi (12h-20h)</button>
            <button onClick={() => setPeriodePDS('dimanche')} className={styles.button}>Dimanche (8h-20h)</button>
          </div>
          <button onClick={() => setPeriode(null)} className={styles.button} style={{ marginTop: '1rem' }}>Retour</button>
        </div>
      )}

      {(periode === 'CDS' || (periode === 'PDS' && periodePDS)) && (
        <div style={{ marginTop: '2rem', borderTop: '1px solid #ccc', paddingTop: '1rem' }}>
          <h2>Résumé de la cotation</h2>
          <p><strong>Actes :</strong> {actes.join(' + ')}</p>
          <p style={{ fontSize: '0.9em', color: '#555', marginTop: '-0.5rem', marginLeft: '1rem' }}>
            Détail : {montants.map(m => m.toFixed(2) + ' €').join(' + ')}
          </p>
          <p><strong>Montant total :</strong> {montant.toFixed(2)} €</p>
          <p><strong>Part AMO :</strong> {amo.toFixed(2)} €</p>
          <p><strong>Part AMC :</strong> {amc.toFixed(2)} €</p>
        </div>
      )}

      <div style={{ marginTop: '2rem' }}>
        <button onClick={reinitialiser} className={styles.button}>Recommencer</button>
      </div>
    </div>
  );
};

export default CCAMPage;
