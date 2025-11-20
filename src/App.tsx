// src/App.tsx
import React, { useState, useEffect } from 'react';
import CotationPage from './pages/CotationPage';
import EtablissementsPage from './pages/EtablissementsPage';
import CCAMPage from './pages/CCAMPage';
import LoginPage from './pages/LoginPage';
import styles from './components/Button.module.css';

type Page = 'visites' | 'etablissements' | 'ccam';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('visites');
  const [preselectedActe, setPreselectedActe] = useState<'Visite' | 'Consultation' | null>(null);
  const [preselectedCommune, setPreselectedCommune] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleRedirectToVisites = (preselectedAct: 'Visite' | 'Consultation' | null, preselectedCom: string | null) => {
    setPreselectedActe(preselectedAct);
    setPreselectedCommune(preselectedCom);
    setCurrentPage('visites');
  };
  
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };
  
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsLoggedIn(false);
  };

  const pageColors = {
    visites: '#e0f0ff',
    etablissements: '#e6ffec',
    ccam: '#fff5e6',
  };
  
  if (!isLoggedIn) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

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
        <button
          onClick={() => setCurrentPage('ccam')}
          className={`${styles.button} ${currentPage === 'ccam' ? styles.selectedVisites : ''}`}
        >
          CCAM
        </button>
        <button onClick={handleLogout} className={styles.button}>
          Déconnexion
        </button>
      </header>

      <main style={{ backgroundColor: pageColors[currentPage] }}>
        {currentPage === 'visites' && <CotationPage preselectedActe={preselectedActe} preselectedCommune={preselectedCommune} />}
        {currentPage === 'etablissements' && <EtablissementsPage onRedirectToVisites={handleRedirectToVisites} />}
        {currentPage === 'ccam' && <CCAMPage />}
        
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button onClick={handleLogout} className={styles.button}>
            Déconnexion
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;