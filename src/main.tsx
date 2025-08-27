import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { registerSW } from 'virtual:pwa-register';

// Enregistrement immédiat du SW pour garantir qu'il a un fetch handler
registerSW({
  immediate: true,
  onNeedRefresh() {
    // Optionnel : afficher une bannière pour recharger
    console.log('Nouvelle version disponible');
  },
  onOfflineReady() {
    // Optionnel : indiquer que l’app est prête hors ligne
    console.log('Application prête à fonctionner hors connexion');
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
