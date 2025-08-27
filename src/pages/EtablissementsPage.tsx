// src/pages/EtablissementsPage.tsx
import React, { useState } from 'react';
import { communesData, Commune, Etablissement } from '../data/etablissementsData';
import styles from '../components/Button.module.css';

// Définir les types d'états pour plus de clarté
type ChoixInitial = 'Foyer logement' | 'Établissement' | null;
type Periode = 'Journée de semaine' | 'Soir 20h-00h et 6h-8h' | 'Nuit profonde 00h-6h' | 'Samedi 12h-20h' | 'Dimanche 8h-20h' | null;
type Age = '> 80 ans' | '< 80 ans' | null;

// Définition des valeurs de cotation
const cotations = {
  YYYY010: 48,
  M: 26.88,
  CRS_CRD: 26.5,
  CRN: 42.5,
  CRM: 51.5,
  DEQP003_DEMI: 7.26,
  MOP: 5,
  VRS_VRD: 30,
  VRN: 46,
  VRM: 59.5,
  IK: 0.61,
};

// CORRECTION : L'interface onRedirectToVisites attend maintenant 2 arguments
interface EtablissementsPageProps {
  onRedirectToVisites: (
    preselectedActe: 'Visite' | 'Consultation' | null,
    preselectedCommune: string | null
  ) => void;
}

const EtablissementsPage: React.FC<EtablissementsPageProps> = ({ onRedirectToVisites }) => {
  const [choixInitial, setChoixInitial] = useState<ChoixInitial>(null);
  const [communeSelectionnee, setCommuneSelectionnee] = useState<Commune | null>(null);
  const [etablissementSelectionne, setEtablissementSelectionne] = useState<Etablissement | null>(null);

  const [periodeSelectionnee, setPeriodeSelectionnee] = useState<Periode>(null);
  const [ageSelectionne, setAgeSelectionne] = useState<Age>(null);
  const [ecgActive, setEcgActive] = useState<boolean>(false);
  const [isPremierActe, setIsPremierActe] = useState<boolean>(true);

  const handleChoixInitial = (choix: ChoixInitial) => {
    setChoixInitial(choix);
    setCommuneSelectionnee(null);
    setEtablissementSelectionne(null);
  };

  const handleCommuneSelection = (commune: Commune) => {
    setCommuneSelectionnee(commune);
    setEtablissementSelectionne(null);
  };

  const handleEtablissementSelection = (etablissement: Etablissement) => {
    setEtablissementSelectionne(etablissement);
  };

  const handlePeriodeSelection = (periode: Periode) => {
    setPeriodeSelectionnee(periode);
  };
  
  const handleAgeSelection = (age: Age) => {
    setAgeSelectionne(age);
  };

  const handleEcgToggle = () => {
    setEcgActive(!ecgActive);
  };

  const calculerMontant = () => {
    // CORRECTION: Vérification si l'établissement et la commune sont sélectionnés
    if (!etablissementSelectionne || !communeSelectionnee) return { montant: 0, actes: [] };
    
    let montant = 0;
    let actes = ['YYYY010'];

    // CORRECTION: La faute de frappe a été corrigée ici
    if (etablissementSelectionne.categorie === 'A' || (etablissementSelectionne.categorie === 'E' && !isPremierActe)) {
      montant += cotations.YYYY010 + cotations.M;
      actes.push('M');
      if (periodeSelectionnee === 'Soir 20h-00h et 6h-8h') { montant += cotations.CRN; actes.push('CRN'); }
      if (periodeSelectionnee === 'Nuit profonde 00h-6h') { montant += cotations.CRM; actes.push('CRM'); }
      if (periodeSelectionnee === 'Samedi 12h-20h') { montant += cotations.CRS_CRD; actes.push('CRS'); }
      if (periodeSelectionnee === 'Dimanche 8h-20h') { montant += cotations.CRS_CRD; actes.push('CRD'); }
    } else if (etablissementSelectionne.categorie === 'E' && isPremierActe) {
      montant += cotations.YYYY010;
      if (periodeSelectionnee === 'Soir 20h-00h et 6h-8h') { montant += cotations.VRN; actes.push('VRN'); }
      if (periodeSelectionnee === 'Nuit profonde 00h-6h') { montant += cotations.VRM; actes.push('VRM'); }
      if (periodeSelectionnee === 'Samedi 12h-20h') { montant += cotations.VRS_VRD; actes.push('VRS'); }
      if (periodeSelectionnee === 'Dimanche 8h-20h') { montant += cotations.VRS_VRD; actes.push('VRD'); }
      if (communeSelectionnee) {
        montant += communeSelectionnee.ik * cotations.IK;
        actes.push(`${communeSelectionnee.ik} IK`);
      }
    }

    if (ecgActive) {
      montant += cotations.DEQP003_DEMI;
      actes.push('1/2 DEQP003');
    }
    if (ageSelectionne === '> 80 ans') {
      montant += cotations.MOP;
      actes.push('MOP');
    }
    
    return { montant, actes };
  };

  const { montant, actes } = calculerMontant();

  const sortedCommunes = [...communesData].sort((a, b) => a.nom.localeCompare(b.nom));
  const sortedEtablissements = communeSelectionnee 
    ? [...communeSelectionnee.etablissements].sort((a, b) => a.nom.localeCompare(b.nom)) 
    : [];
  
  return (
    <div className="etablissements-container">
      <h1>Page Établissements</h1>

      {/* 1. Choix Initial */}
        {choixInitial === 'Foyer logement' && (
        <div style={{ textAlign: 'center' }}>
          <p>Foyer logement, médico-social = cotation habituelle = prendre la carte vitale</p>
          
          <div className={styles.buttonGroup}>
            <button 
              onClick={() => onRedirectToVisites('Visite', 'Saint-Malo')} 
              // 👇 MODIFICATION ICI : ajout de la classe .actionButton
              className={`${styles.button} ${styles.actionButton}`}
            >
              Orientation vers la page Visite Consultation
            </button>

            <button 
              // Ce bouton remet le choix initial à zéro pour revenir en arrière
              onClick={() => handleChoixInitial(null)} 
              className={styles.button} // Ce bouton garde la taille normale
            >
              Retour au choix initial
            </button>
          </div>
        </div>
      )}

      {/* Logique Établissement : Sélection de commune */}
      {choixInitial === 'Établissement' && !communeSelectionnee && (
        <div className="communes-list">
          <h2>Sélectionnez une commune</h2>
          <div className={styles.buttonGroup}>
            {sortedCommunes.map((commune) => (
              <button 
                key={commune.nom} 
                onClick={() => handleCommuneSelection(commune)} 
                className={styles.button}
              >
                {commune.nom}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Logique Établissement : Sélection d'établissement */}
      {choixInitial === 'Établissement' && communeSelectionnee && !etablissementSelectionne && (
        <div className="etablissements-list">
          <h2>Établissements à {communeSelectionnee.nom}</h2>
          <div className={styles.buttonGroup}>
            {sortedEtablissements.map((etablissement) => (
              <button 
                key={etablissement.nom} 
                onClick={() => handleEtablissementSelection(etablissement)}
                className={styles.button}
              >
                {etablissement.nom}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Logique Établissement : Affichage des options de cotation (corrigé) */}
      {etablissementSelectionne && (
        <div className="resultats-etablissement">
          <h3>Établissement sélectionné : {etablissementSelectionne.nom}</h3>
          <p>{etablissementSelectionne.details?.message || ''}</p>
          {etablissementSelectionne.details?.email && (
            <p>Envoyer la facture à : {etablissementSelectionne.details.email}</p>
          )}

          {/* Logique de redirection pour les catégories B, C, D */}
          {(etablissementSelectionne.categorie === 'B' || etablissementSelectionne.categorie === 'C' || etablissementSelectionne.categorie === 'D') && (
            <button 
              // CORRECTION: Ajout d'une vérification pour que communeSelectionnee ne soit pas null
              onClick={() => {
                if (communeSelectionnee) {
                  onRedirectToVisites('Visite', communeSelectionnee.nom);
                }
              }}
              className={`${styles.button} ${styles.selectedEtablissements}`}
            >
              Cotation habituelle
            </button>
          )}

          {/* Calculateur pour les catégories A et E */}
          {(etablissementSelectionne.categorie === 'A' || etablissementSelectionne.categorie === 'E') && (
            <>
              {etablissementSelectionne.categorie === 'A' && <p>Facturations particulières CHGR</p>}
              {etablissementSelectionne.categorie === 'E' && (
                <div className={styles.buttonGroup}>
                  <button onClick={() => setIsPremierActe(true)} className={`${styles.button} ${isPremierActe ? styles.selectedEtablissements : ''}`}>Premier acte</button>
                  <button onClick={() => setIsPremierActe(false)} className={`${styles.button} ${!isPremierActe ? styles.selectedEtablissements : ''}`}>Actes suivants</button>
                </div>
              )}
              
              <div className={styles.buttonGroup}>
                <h4>Période</h4>
                {['Journée de semaine', 'Soir 20h-00h et 6h-8h', 'Nuit profonde 00h-6h', 'Samedi 12h-20h', 'Dimanche 8h-20h'].map((p) => (
                  <button key={p} onClick={() => handlePeriodeSelection(p as Periode)} className={`${styles.button} ${periodeSelectionnee === p ? styles.selectedEtablissements : ''}`}>
                    {p}
                  </button>
                ))}
              </div>
              <div className={styles.buttonGroup}>
                <h4>Âge</h4>
                {['> 80 ans', '< 80 ans'].map((a) => (
                  <button key={a} onClick={() => handleAgeSelection(a as Age)} className={`${styles.button} ${ageSelectionne === a ? styles.selectedEtablissements : ''}`}>
                    {a}
                  </button>
                ))}
              </div>
              <div className={styles.buttonGroup}>
                <h4>Autres</h4>
                <button onClick={handleEcgToggle} className={`${styles.button} ${ecgActive ? styles.selectedEtablissements : ''}`}>
                  ECG
                </button>
                <button onClick={() => alert('Redirection vers la page Actes techniques CCAM')} className={styles.button}>
                  Actes techniques CCAM
                </button>
              </div>
              <div>
                <h4>Total</h4>
                <p>Actes : {actes.join(' + ')}</p>
                <p>Montant : {isNaN(montant) ? 'NaN' : montant.toFixed(2)} €</p>
              </div>
            </>
          )}

          <button 
            onClick={() => {
              setEtablissementSelectionne(null);
              setPeriodeSelectionnee(null);
              setAgeSelectionne(null);
              setEcgActive(false);
              setIsPremierActe(true);
            }} 
            className={styles.button}
          >
            Retour au choix de l'établissement
          </button>
        </div>
      )}

      {choixInitial && !etablissementSelectionne && (
        <button 
          onClick={() => {
            setChoixInitial(null);
            setCommuneSelectionnee(null);
          }} 
          className={styles.button}
        >
          Retour au choix initial
        </button>
      )}

    </div>
  );
};

export default EtablissementsPage;