// src/pages/EtablissementsPage.tsx
import React, { useState } from 'react';
import { communesData, Commune, Etablissement } from '../data/etablissementsData';
import styles from '../components/Button.module.css';
import FeedbackButton from '../components/FeedbackButton';

// ... (tous vos types, constantes, et interfaces restent les mêmes)
type ChoixInitial = 'Foyer logement' | 'Établissement' | null;
type Periode = 'Journée de semaine' | 'Soir 20h-00h et 6h-8h' | 'Nuit profonde 00h-6h' | 'Samedi 12h-20h' | 'Dimanche 8h-20h' | null;
type Age = '> 80 ans' | '< 80 ans' | null;

const cotations = {
  YYYY010: 48, M: 26.88, CRS_CRD: 26.5, CRN: 42.5, CRM: 51.5,
  DEQP003_DEMI: 7.26, MOP: 5, VRS_VRD: 30, VRN: 46, VRM: 59.5, IK: 0.61,
};

interface EtablissementsPageProps {
  onRedirectToVisites: (
    preselectedActe: 'Visite' | 'Consultation' | null,
    preselectedCommune: string | null
  ) => void;
}


const EtablissementsPage: React.FC<EtablissementsPageProps> = ({ onRedirectToVisites }) => {
  // ... (tous vos états et fonctions "handle" restent les mêmes)
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

  const handlePeriodeSelection = (periode: Periode) => setPeriodeSelectionnee(periode);
  const handleAgeSelection = (age: Age) => setAgeSelectionne(age);
  const handleEcgToggle = () => setEcgActive(!ecgActive);

  const calculerMontant = () => {
    if (!etablissementSelectionne || !communeSelectionnee) return { montant: 0, actes: [], montants: [] };

    let montant = cotations.YYYY010;
    let actes = ['YYYY010'];
    let montants = [cotations.YYYY010];

    if (etablissementSelectionne.categorie === 'A' || (etablissementSelectionne.categorie === 'E' && !isPremierActe)) {
      montant += cotations.M;
      actes.push('M');
      montants.push(cotations.M);
      if (periodeSelectionnee === 'Soir 20h-00h et 6h-8h') { montant += cotations.CRN; actes.push('CRN'); montants.push(cotations.CRN); }
      else if (periodeSelectionnee === 'Nuit profonde 00h-6h') { montant += cotations.CRM; actes.push('CRM'); montants.push(cotations.CRM); }
      else if (periodeSelectionnee === 'Samedi 12h-20h') { montant += cotations.CRS_CRD; actes.push('CRS'); montants.push(cotations.CRS_CRD); }
      else if (periodeSelectionnee === 'Dimanche 8h-20h') { montant += cotations.CRS_CRD; actes.push('CRD'); montants.push(cotations.CRS_CRD); }
    } else if (etablissementSelectionne.categorie === 'E' && isPremierActe) {
      if (periodeSelectionnee === 'Soir 20h-00h et 6h-8h') { montant += cotations.VRN; actes.push('VRN'); montants.push(cotations.VRN); }
      else if (periodeSelectionnee === 'Nuit profonde 00h-6h') { montant += cotations.VRM; actes.push('VRM'); montants.push(cotations.VRM); }
      else if (periodeSelectionnee === 'Samedi 12h-20h') { montant += cotations.VRS_VRD; actes.push('VRS'); montants.push(cotations.VRS_VRD); }
      else if (periodeSelectionnee === 'Dimanche 8h-20h') { montant += cotations.VRS_VRD; actes.push('VRD'); montants.push(cotations.VRS_VRD); }
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
  
  return (
    <div className="etablissements-container" style={{ paddingBottom: '140px' }}>
      <h1>Page Établissements</h1>

      {!choixInitial && (
        <div className={styles.buttonGroup}>
          <button onClick={() => handleChoixInitial('Foyer logement')} className={styles.button}>
            Foyer logement
          </button>
          <button onClick={() => handleChoixInitial('Établissement')} className={styles.button}>
            Établissement
          </button>
        </div>
      )}
      {/* 👆👆 FIN DU BLOC AJOUTÉ 👆👆 */}

      {/* Le reste de votre code est parfait et reste inchangé */}
      {choixInitial === 'Foyer logement' && (
        <div style={{ textAlign: 'center' }}>
          {/* ... (votre code pour Foyer Logement) ... */}
          <p>Foyer logement, médico-social = cotation habituelle = prendre la carte vitale</p>
          <div className={styles.buttonGroup}>
            <button 
              onClick={() => onRedirectToVisites('Visite', 'Saint-Malo')} 
              className={`${styles.button} ${styles.actionButton}`}
            >
              Orientation vers la page Visite Consultation
            </button>
            <button 
              onClick={() => handleChoixInitial(null)} 
              className={styles.button}
            >
              Retour au choix initial
            </button>
          </div>
        </div>
      )}

      {/* ... (tout le reste de votre logique d'affichage est correct) ... */}
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

      {etablissementSelectionne && (
        <div className="resultats-etablissement">
          <h3>Établissement sélectionné : {etablissementSelectionne.nom}</h3>
          <p>{etablissementSelectionne.details?.message || ''}</p>
          {etablissementSelectionne.details?.email && (
            <p>Envoyer la facture à : {etablissementSelectionne.details.email}</p>
          )}

          {(etablissementSelectionne.categorie === 'B' || etablissementSelectionne.categorie === 'C' || etablissementSelectionne.categorie === 'D') && (
            <button 
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
                <p style={{ fontSize: '0.9em', color: '#555', marginTop: '-0.5rem' }}>
                  Détail : {montants.map(m => m.toFixed(2) + ' €').join(' + ')}
                </p>
                <p>Montant : {isNaN(montant) ? 'NaN' : montant.toFixed(2)} €</p>
              </div>

              {/* Bouton feedback contextuel */}
              {periodeSelectionnee && (
                <FeedbackButton
                  type="contextual"
                  pageContext={`Établissement ${etablissementSelectionne.nom} (cat. ${etablissementSelectionne.categorie}) - ${communeSelectionnee?.nom} - ${periodeSelectionnee}`}
                  pageType="etablissements"
                />
              )}
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

      {/* Barre de résumé fixe en bas (seulement pour catégories A et E avec calculs) */}
      {etablissementSelectionne &&
       (etablissementSelectionne.categorie === 'A' || etablissementSelectionne.categorie === 'E') &&
       periodeSelectionnee && (
        <div style={{
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
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.9rem', marginBottom: '0.25rem' }}>Actes</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>{actes.join(' + ')}</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.9rem', marginBottom: '0.25rem' }}>Total</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{montant.toFixed(2)} €</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EtablissementsPage;