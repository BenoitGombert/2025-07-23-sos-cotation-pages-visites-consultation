// src/App.tsx
import React, { useState, useEffect } from 'react';
import CotationPage from './pages/CotationPage';
import EtablissementsPage from './pages/EtablissementsPage';
import LoginPage from './pages/LoginPage'; // Import de la page de connexion
import styles from './components/Button.module.css';

type Page = 'visites' | 'etablissements';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('visites');
  const [preselectedActe, setPreselectedActe] = useState<'Visite' | 'Consultation' | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Vérifie si l'utilisateur est déjà connecté au chargement de l'appli
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleRedirectToVisites = (preselectedAct: 'Visite' | 'Consultation' | null) => {
    setPreselectedActe(preselectedAct);
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
  };
  
  // Affichage conditionnel de l'application ou de la page de connexion
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
        <button onClick={handleLogout} className={styles.button}>
          Déconnexion
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