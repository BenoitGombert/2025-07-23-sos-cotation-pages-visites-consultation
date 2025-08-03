// src/pages/LoginPage.tsx
import React, { useState } from 'react';
import styles from '../components/Button.module.css';
import { AUTH_PASSWORD } from '../config/auth'; // Import du mot de passe

interface LoginPageProps {
  onLoginSuccess: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === AUTH_PASSWORD) {
      localStorage.setItem('isAuthenticated', 'true');
      onLoginSuccess();
    } else {
      setError('Mot de passe incorrect.');
    }
  };

  return (
    <div className="login-container" style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Connexion</h1>
      <p>Veuillez entrer le mot de passe de l'association SOS Médecins Saint-Malo.</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="password">Mot de passe :</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input} // Vous pouvez utiliser une classe de style ici
            style={{ padding: '0.5rem', fontSize: '1rem', marginLeft: '0.5rem' }}
          />
        </div>
        {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
        <button type="submit" className={styles.button} style={{ marginTop: '1rem' }}>
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default LoginPage;