// src/pages/EtablissementsPage.tsx
import React, { useState } from 'react';
import { communesData, Commune, Etablissement } from '../data/etablissementsData';

// Définir les types d'états pour plus de clarté
type ChoixInitial = 'Foyer logement' | 'Établissement' | null;
type Periode = 'Journée de semaine' | 'Soir 20h-00h et 6h-8h' | 'Nuit profonde 00h-6h' | 'Samedi 12h-20h' | 'Dimanche 8h-20h' | null;
type Age = '> 80 ans' | '< 80 ans' | null;

const EtablissementsPage: React.FC = () => {
  const [choixInitial, setChoixInitial] = useState<ChoixInitial>(null);
  const [communeSelectionnee, setCommuneSelectionnee] = useState<Commune | null>(null);
  const [etablissementSelectionne, setEtablissementSelectionne] = useState<Etablissement | null>(null);

  const [periodeSelectionnee, setPeriodeSelectionnee] = useState<Periode>(null);
  const [ageSelectionne, setAgeSelectionne] = useState<Age>(null);
  const [ecgActive, setEcgActive] = useState<boolean>(false);
  const [actesSuivants, setActesSuivants] = useState<boolean>(false);

  const handleChoixInitial = (choix: ChoixInitial) => {
    setChoixInitial(choix);
    setCommuneSelectionnee(null);
    setEtablissementSelectionne(null);
  };

  const handleCommuneSelection = (commune: Commune) => {
    setCommuneSelectionnee(commune);
    setEtablissementSelectionne(null);
  };

  const handleEtablissementSelection = (etablissement: Etablissement) => {
    setEtablissementSelectionne(etablissement);
  };

  // Tri des communes et des établissements juste avant le rendu
  const sortedCommunes = [...communesData].sort((a, b) => a.nom.localeCompare(b.nom));
  const sortedEtablissements = communeSelectionnee 
    ? [...communeSelectionnee.etablissements].sort((a, b) => a.nom.localeCompare(b.nom)) 
    : [];

  return (
    <div className="etablissements-container">
      <h1>Page Établissements</h1>

      {/* 1. Choix Initial */}
      {!choixInitial && (
        <div className="choix-initial">
          <button onClick={() => handleChoixInitial('Foyer logement')}>Foyer logement</button>
          <button onClick={() => handleChoixInitial('Établissement')}>Établissement (EHPAD, hôpital, etc.)</button>
        </div>
      )}

      {/* 2. Si "Établissement" est choisi : Afficher la liste des communes */}
      {choixInitial === 'Établissement' && !communeSelectionnee && (
        <div className="communes-list">
          <h2>Sélectionnez une commune</h2>
          {sortedCommunes.map((commune) => (
            <button key={commune.nom} onClick={() => handleCommuneSelection(commune)}>
              {commune.nom}
            </button>
          ))}
        </div>
      )}

      {/* 3. Si une commune est sélectionnée : Afficher la liste des établissements */}
      {choixInitial === 'Établissement' && communeSelectionnee && !etablissementSelectionne && (
        <div className="etablissements-list">
          <h2>Établissements à {communeSelectionnee.nom}</h2>
          {sortedEtablissements.map((etablissement) => (
            <button key={etablissement.nom} onClick={() => handleEtablissementSelection(etablissement)}>
              {etablissement.nom}
            </button>
          ))}
        </div>
      )}

      {/* 4. Logique en fonction de l'établissement sélectionné */}
      {etablissementSelectionne && (
        <div className="resultats-etablissement">
          <h3>Établissement sélectionné : {etablissementSelectionne.nom}</h3>
          {/* Ici viendra le code pour les catégories A, B, C, D, E */}
        </div>
      )}

      {/* Pour revenir en arrière */}
      {choixInitial && (
        <button onClick={() => {
          setChoixInitial(null);
          setCommuneSelectionnee(null);
          setEtablissementSelectionne(null);
        }}>
          Retour au choix initial
        </button>
      )}
    </div>
  );
};

export default EtablissementsPage;