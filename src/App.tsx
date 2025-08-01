// src/App.tsx
// Forcer la mise à jour
import React, { useState } from 'react';
import CotationPage from './pages/CotationPage';
import EtablissementsPage from './pages/EtablissementsPage';
import styles from './components/Button.module.css';

type Page = 'visites' | 'etablissements';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('visites');
  const [preselectedActe, setPreselectedActe] = useState<'Visite' | 'Consultation' | null>(null);

  const handleRedirectToVisites = (preselectedAct: 'Visite' | 'Consultation' | null) => {
    setPreselectedActe(preselectedAct);
    setCurrentPage('visites');
  };

  const pageColors = {
    visites: '#e0f0ff',
    etablissements: '#e6ffec',
  };

  return (
    <div className="App">
      <header className={styles.appHeader}>
        <button 
          onClick={() => setCurrentPage('visites')}
          className={`${styles.button} ${currentPage === 'visites' ? styles.selectedVisites : ''}`}
        >
          Visites Consultation
        </button>
        <button 
          onClick={() => setCurrentPage('etablissements')}
          className={`${styles.button} ${currentPage === 'etablissements' ? styles.selectedEtablissements : ''}`}
        >
          Établissements
        </button>
      </header>

      <main style={{ backgroundColor: pageColors[currentPage] }}>
        {currentPage === 'visites' && <CotationPage preselectedActe={preselectedActe} />}
        {currentPage === 'etablissements' && <EtablissementsPage onRedirectToVisites={handleRedirectToVisites} />}
      </main>
    </div>
  );
}

export default App;