// src/App.tsx
import React, { useState, useEffect } from 'react';
import CotationPage from './pages/CotationPage';
import EtablissementsPage from './pages/EtablissementsPage';
import CCAMPage from './pages/CCAMPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ParametresPage from './pages/ParametresPage';
import styles from './components/Button.module.css';

type Page = 'home' | 'visites' | 'etablissements' | 'ccam' | 'parametres';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
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
    setCurrentPage('home');
  };

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
  };

  if (!isLoggedIn) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  // Page d'accueil avec tuiles
  if (currentPage === 'home') {
    return (
      <div className="App">
        <HomePage onNavigate={handleNavigate} />
        <div style={{ position: 'fixed', top: '1rem', right: '1rem' }}>
          <button onClick={handleLogout} className={styles.button}>
            Déconnexion
          </button>
        </div>
      </div>
    );
  }

  // Pages individuelles (sans navigation header)
  return (
    <div className="App">
      {currentPage === 'visites' && (
        <>
          <div style={{ padding: '1rem', backgroundColor: '#e0f0ff' }}>
            <button onClick={handleBackToHome} className={styles.button}>
              ← Accueil
            </button>
          </div>
          <CotationPage preselectedActe={preselectedActe} preselectedCommune={preselectedCommune} />
        </>
      )}
      {currentPage === 'etablissements' && (
        <>
          <div style={{ padding: '1rem', backgroundColor: '#e6ffec' }}>
            <button onClick={handleBackToHome} className={styles.button}>
              ← Accueil
            </button>
          </div>
          <EtablissementsPage onRedirectToVisites={handleRedirectToVisites} />
        </>
      )}
      {currentPage === 'ccam' && (
        <>
          <div style={{ padding: '1rem', backgroundColor: '#fff5e6' }}>
            <button onClick={handleBackToHome} className={styles.button}>
              ← Accueil
            </button>
          </div>
          <CCAMPage />
        </>
      )}
      {currentPage === 'parametres' && (
        <ParametresPage onBack={handleBackToHome} />
      )}
    </div>
  );
}

export default App;