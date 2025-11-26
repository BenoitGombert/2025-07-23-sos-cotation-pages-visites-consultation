// src/pages/HomePage.tsx
import styles from './HomePage.module.css';
import FeedbackButton from '../components/FeedbackButton';

interface HomePageProps {
  onNavigate: (page: 'visites' | 'etablissements' | 'ccam' | 'parametres') => void;
}

function HomePage({ onNavigate }: HomePageProps) {
  const tiles = [
    {
      id: 'visites',
      title: 'Visites & Consultations',
      description: 'Calcul de cotations NGAP',
      icon: '🏥',
      color: '#e0f0ff',
      available: true,
    },
    {
      id: 'etablissements',
      title: 'Établissements',
      description: 'Cotations spécifiques établissements',
      icon: '🏢',
      color: '#e6ffec',
      available: true,
    },
    {
      id: 'ccam',
      title: 'CCAM',
      description: 'Codes et actes techniques',
      icon: '⚕️',
      color: '#fff5e6',
      available: true,
    },
    {
      id: 'parametres',
      title: 'Paramètres',
      description: 'Configuration de l\'application',
      icon: '⚙️',
      color: '#f0f0f0',
      available: false,
    },
  ];

  return (
    <div className={styles.homePage}>
      <header className={styles.header}>
        <h1 className={styles.title}>SOS Cotation</h1>
        <p className={styles.subtitle}>Choisissez un outil de cotation</p>
      </header>

      <div className={styles.tilesContainer}>
        {tiles.map((tile) => (
          <button
            key={tile.id}
            className={`${styles.tile} ${!tile.available ? styles.tileDisabled : ''}`}
            onClick={() => tile.available && onNavigate(tile.id as any)}
            disabled={!tile.available}
            style={{ backgroundColor: tile.color }}
          >
            <div className={styles.tileIcon}>{tile.icon}</div>
            <h2 className={styles.tileTitle}>{tile.title}</h2>
            <p className={styles.tileDescription}>{tile.description}</p>
            {!tile.available && (
              <span className={styles.badge}>En construction</span>
            )}
          </button>
        ))}
      </div>

      {/* Bouton feedback général flottant */}
      <FeedbackButton
        type="general"
        pageType="general"
        showAsFloating={true}
      />
    </div>
  );
}

export default HomePage;
