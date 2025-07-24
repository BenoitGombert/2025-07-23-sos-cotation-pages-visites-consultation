import { useState, useEffect } from 'react'; // import { useState, useEffect } from 'react'; // React non requis avec Vite

import styles from '../components/Button.module.css'

// Juste avant getActesEtMajorations

const tarifs: Record<string, number> = {
  // Actes de base
  VG: 30,
  G: 30,

  // Majoration âge
  MEG: 5,
  MOP: 5,

  // CDS – Visite
  MD: 10,
  SNP: 15,
  MU: 22.6,

  // PDS – Visite
  VRN: 46,
  VRM: 59.5,
  VRS: 30,
  VRD: 30,

  // PDS – Consultation
  CRN: 42.5,
  CRM: 51.5,
  CRS: 26.5,
  CRD: 26.5,

  // ECG
  DEQP003: 14.52,
  YYYY490: 9.6
}; // const tarifs = { ... };



const getActesEtMajorations = (
  acte: 'visite' | 'consultation' | null,
  ecg: boolean,
  age: '0-6' | '>80' | 'autre',
  periode: 'CDS' | 'PDS' | null,
  plagePds: 'soir' | 'nuit' | 'samedi' | 'dimanche' | null,
  regulation15: boolean,
  demandeSoignant: boolean
): string[] => {
  const result: string[] = [];

  // Acte de base
  if (acte === 'visite') result.push('VG');
  if (acte === 'consultation') result.push('G');

  // ECG
  if (ecg) {
    result.push('DEQP003');
    if (acte === 'visite') result.push('YYYY490');
  }

  // Majoration âge
  if (age === '0-6') result.push('MEG');
  if (age === '>80') result.push('MOP');

  // CDS
  if (periode === 'CDS') {
    if (acte === 'visite') {
      if (regulation15) {
        result.push('MD');
        result.push('SNP');
      } else if (demandeSoignant) {
        result.push('MU');
      } else {
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
  const [acte, setActe] = useState<'visite' | 'consultation' | null>(null)
  // Période principale
const [periode, setPeriode] = useState<'CDS' | 'PDS' | null>(null);

// Plages CDS (utilisées uniquement si periode === 'CDS')
const [regulation15, setRegulation15] = useState<boolean | null>(null);
const [demandeSoignant, setDemandeSoignant] = useState<boolean | null>(null);

// Plages PDS (utilisées uniquement si periode === 'PDS')
const [plagePds, setPlagePds] = useState<'soir' | 'nuit' | 'samedi' | 'dimanche' | null>(null);

  const [mu, setMu] = useState<boolean | null>(null)
  const [age, setAge] = useState<'0-6' | '>80' | 'autre'>('autre')
  const [ecg, setEcg] = useState<boolean>(false)
  const [commune, setCommune] = useState<string>('Saint-Malo');

useEffect(() => {
  if (periode === 'CDS') {
    setPlagePds(null); // désactive les choix PDS
    setRegulation15(null);
    setDemandeSoignant(null);
  } else if (periode === 'PDS') {
    setRegulation15(null);
    setDemandeSoignant(null);
  }
}, [periode]);




const handleActe = (nouvelActe: 'visite' | 'consultation') => {
  // Réinitialisation complète à chaque clic sur un bouton acte (même si déjà sélectionné)
  setActe(nouvelActe);
  setAge('autre');
  setEcg(false);
  setCommune('Saint-Malo');
  setPeriode(null);
  setRegulation15(null);
};


  const handlePeriode = (p: 'CDS' | 'PDS') => {
    setPeriode(p)
    setRegulation15(null)
    setMu(null)
  }

  const handleRegulation = (value: boolean) => {
    setRegulation15(value)
    setMu(null)
  }

const montants: Record<string, number> = {
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

const ikKm = commune ? communes.find(c => c.nom === commune)?.ik || 0 : 0; // const ikKm = ...

const communeObj = communes.find(c => c.nom === commune);
const ikCount = communeObj?.ik ?? 0;
const ikMontant = ikCount * 0.61;



const actes = getActesEtMajorations(acte, ecg, age, periode, plagePds, regulation15 ?? false, demandeSoignant ?? false);
const montantTotal = actes.reduce((acc, code) => acc + (montants[code] || 0), 0) + ikMontant;
const partAmo = (montantTotal - ikMontant) * 0.7 + ikMontant;
const partAmc = (montantTotal - ikMontant) * 0.3;


  return (
    <div style={{ padding: '1rem', fontFamily: 'sans-serif' }}>
      <h2>Type d'acte</h2>
      <div className={styles.buttonGroup}>
  <button
    className={`${styles.button} ${acte === 'visite' ? styles.selected : ''}`}
    onClick={() => handleActe('visite')}
  >
    Visite
  </button>
  <button
    className={`${styles.button} ${acte === 'consultation' ? styles.selected : ''}`}
    onClick={() => handleActe('consultation')}
  >
    Consultation
  </button>
</div>


      {acte && (
        <>
          <h2 style={{ marginTop: '2rem' }}>Période</h2>
          <div className={styles.buttonGroup}>
            <button
              className={`${styles.button} ${periode === 'CDS' ? styles.selected : ''}`}
              onClick={() => handlePeriode('CDS')}
            >
              CDS
            </button>
            <button
              className={`${styles.button} ${periode === 'PDS' ? styles.selected : ''}`}
              onClick={() => handlePeriode('PDS')}
            >
              PDS
            </button>
          </div>
   {periode === 'PDS' && acte !== null && (
  <div>
    <p><strong>Tranche horaire</strong></p>
    <div className={styles.buttonGroup}>
      <button
        className={`${styles.button} ${plagePds === 'soir' ? styles.selected : ''}`}
        onClick={() => setPlagePds('soir')}
      >
        Soir<br /><small>20h–00h / 6h–8h</small>
      </button>
      <button
        className={`${styles.button} ${plagePds === 'nuit' ? styles.selected : ''}`}
        onClick={() => setPlagePds('nuit')}
      >
        Nuit<br /><small>00h–6h</small>
      </button>
      <button
        className={`${styles.button} ${plagePds === 'samedi' ? styles.selected : ''}`}
        onClick={() => setPlagePds('samedi')}
      >
        Samedi<br /><small>12h–20h</small>
      </button>
      <button
        className={`${styles.button} ${plagePds === 'dimanche' ? styles.selected : ''}`}
        onClick={() => setPlagePds('dimanche')}
      >
        Dimanche<br /><small>8h–20h</small>
      </button>
    </div>
  </div>
)}


        </>
      )}


      {periode === 'CDS' && (
        <>
          <h2 style={{ marginTop: '2rem' }}>Régulation 15</h2>
          <div className={styles.buttonGroup}>
            <button
              className={`${styles.button} ${regulation15 === true ? styles.selected : ''}`}
              onClick={() => handleRegulation(true)}
            >
              Oui
            </button>
            <button
              className={`${styles.button} ${regulation15 === false ? styles.selected : ''}`}
              onClick={() => handleRegulation(false)}
            >
              Non
            </button>
          </div>
        </>
      )}

      {acte === 'visite' && periode === 'CDS' && regulation15 === false && (
        <>
          <h2 style={{ marginTop: '2rem' }}>Demande d’un soignant</h2>
          <div className={styles.buttonGroup}>
            <button
              className={`${styles.button} ${mu === true ? styles.selected : ''}`}
              onClick={() => setMu(true)}
            >
              Oui
            </button>
            <button
              className={`${styles.button} ${mu === false ? styles.selected : ''}`}
              onClick={() => setMu(false)}
            >
              Non
            </button>
          </div>
        </>
      )}
      {periode && (
  <>
    <h2 style={{ marginTop: '2rem' }}>Âge du patient</h2>
    <div className={styles.buttonGroup}>
      <button
        className={`${styles.button} ${age === '0-6' ? styles.selected : ''}`}
        onClick={() => setAge('0-6')}
      >
        0–6 ans
      </button>
      <button
        className={`${styles.button} ${age === '>80' ? styles.selected : ''}`}
        onClick={() => setAge('>80')}
      >
        &gt; 80 ans
      </button>
      <button
        className={`${styles.button} ${age === 'autre' ? styles.selected : ''}`}
        onClick={() => setAge('autre')}
      >
        Autre
      </button>
    </div>
  </>
)}
      <h2 style={{ marginTop: '2rem' }}>ECG</h2>
<div className={styles.buttonGroup}>
  <button
    className={`${styles.button} ${ecg ? styles.selected : ''}`}
    onClick={() => setEcg(!ecg)}
  >
    ECG
  </button>
</div>

{acte === 'visite' && (
  <>
    <h2 style={{ marginTop: '2rem' }}>Commune</h2>
    <select
      value={commune}
      onChange={(e) => setCommune(e.target.value)}
      style={{ padding: '0.5rem', fontSize: '1rem', borderRadius: '0.5rem', border: '1px solid #ccc', width: '100%' }}
    >
      {communes.map((c) => (
        <option key={c.nom} value={c.nom}>
          {c.nom}
        </option>
      ))}
    </select>
  </>
)}

{/* Section Résumé des actes */}
<div style={{ marginTop: '2rem', borderTop: '1px solid #ccc', paddingTop: '1rem' }}>
  <h2>Résumé de la cotation</h2>
 <p>
  <strong>Actes & majorations :</strong>{' '}
  {(() => {
    const actes = getActesEtMajorations(
      acte,
      ecg,
      age,
      periode,
      plagePds,
      regulation15 ?? false,
      demandeSoignant ?? false
    );
    const suffix = acte === 'visite' && ikCount > 0 ? ` + ${ikCount}IK` : '';
    return actes.length > 0 ? actes.join(' + ') + suffix : '—';
  })()}
</p>




<p><strong>Montant total :</strong> {montantTotal.toFixed(2)} €
{ikMontant > 0 && ` (dont IK : ${ikMontant.toFixed(2)} €)`}</p>
<p><strong>Part AMO :</strong> {partAmo.toFixed(2)} €</p>
<p><strong>Part AMC :</strong> {partAmc.toFixed(2)} €</p>

</div>


    </div>
  )
}

export default CotationPage
