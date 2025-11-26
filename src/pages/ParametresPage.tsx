// src/pages/ParametresPage.tsx
import styles from './ParametresPage.module.css';

interface ParametresPageProps {
  onBack: () => void;
}

function ParametresPage({ onBack }: ParametresPageProps) {
  return (
    <div className={styles.parametresPage}>
      <header className={styles.header}>
        <button onClick={onBack} className={styles.backButton}>
          ← Retour
        </button>
        <h1>Paramètres</h1>
      </header>

      <div className={styles.content}>
        <div className={styles.constructionBanner}>
          <div className={styles.constructionIcon}>🚧</div>
          <h2>Page en construction</h2>
          <p>Cette fonctionnalité sera bientôt disponible.</p>
        </div>

        <div className={styles.comingSoonSection}>
          <h3>Fonctionnalités à venir :</h3>
          <ul>
            <li>Gestion des barèmes et tarifs</li>
            <li>Personnalisation de l'interface</li>
            <li>Export des données</li>
            <li>Historique des cotations</li>
            <li>Paramètres de l'application</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ParametresPage;
