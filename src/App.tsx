// src/App.tsx
import React, { useState } from 'react';

// Importation de vos pages et des styles CSS Modules
import CotationPage from './pages/CotationPage';
import EtablissementsPage from './pages/EtablissementsPage';
import styles from './components/Button.module.css';

// Définir les types des pages pour l'état
type Page = 'visites' | 'etablissements';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('visites');

  // Définir les couleurs de fond de la page
  const pageColors = {
    visites: '#e0f0ff', // Bleu très très clair
    etablissements: '#e6ffec', // Vert très très clair
  };

  return (
    <div className="App">
      {/* Barre de navigation en haut de l'écran */}
      <header className={styles.appHeader}>
        <button 
          onClick={() => setCurrentPage('visites')}
          // Utilisation des classes CSS Modules
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

      {/* Utilisation d'un style en ligne pour le fond de page */}
      <main style={{ backgroundColor: pageColors[currentPage] }}>
        {/* Affichage de la page sélectionnée */}
        {currentPage === 'visites' && <CotationPage />}
        {currentPage === 'etablissements' && <EtablissementsPage />}
      </main>
    </div>
  );
}

export default App;