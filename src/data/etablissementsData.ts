// src/data/etablissementsData.ts

export interface Etablissement {
  nom: string;
  categorie: 'A' | 'B' | 'C' | 'D' | 'E';
  details?: {
    message?: string;
    email?: string;
    facturationType?: 'CHGR' | 'Hors Secteur';
  };
}

export interface Commune {
  nom: string;
  ik: number;
  etablissements: Etablissement[];
}

export const communesData: Commune[] = [
  {
    nom: 'Saint-Malo',
    ik: 0,
    etablissements: [
      { nom: 'CH Broussais', categorie: 'A', details: { facturationType: 'CHGR' } },
      { nom: 'Prison', categorie: 'A', details: { facturationType: 'CHGR' } },
      { nom: 'La Briantais', categorie: 'A', details: { facturationType: 'CHGR' } },
      { nom: 'La Haize', categorie: 'A', details: { facturationType: 'CHGR' } },
      { nom: 'Les Corbières', categorie: 'A', details: { facturationType: 'CHGR' } },
      { nom: 'Yves Pélicier', categorie: 'A', details: { facturationType: 'CHGR' } },
      { nom: 'Plessis Pont-Pinel', categorie: 'B', details: { message: 'Prendre la carte vitale' } },
      { nom: 'Aolys « La Fontaine »', categorie: 'B', details: { message: 'Prendre la carte vitale' } },
      { nom: 'Edilys « La Vallée »', categorie: 'B', details: { message: 'Prendre la carte vitale' } },
      { nom: 'Rothéneuf « la sainte famille »', categorie: 'B', details: { message: 'Prendre la carte vitale' } },
      { nom: 'Notre Dame des Chênes', categorie: 'B', details: { message: 'Prendre la carte vitale' } },
      { nom: 'Korian « le solidor »', categorie: 'C', details: { message: 'Laisser une FSP sur place' } },
      { nom: 'Boris Antonoff', categorie: 'C', details: { message: 'Laisser une FSP sur place' } },
    ],
  },
  {
    nom: 'Cancale',
    ik: 2,
    etablissements: [
      { nom: 'Les Près Bosgers', categorie: 'A', details: { facturationType: 'CHGR' } },
    ],
  },
  {
    nom: 'Pleudihen',
    ik: 5,
    etablissements: [
      { nom: 'La Consolation', categorie: 'B', details: { message: 'Prendre la carte vitale' } },
    ],
  },
  {
    nom: 'Pleurtuit',
    ik: 3,
    etablissements: [
      { nom: 'La Sagesse Pl', categorie: 'B', details: { message: 'Prendre la carte vitale' } },
    ],
  },
  {
    nom: 'Saint-Briac',
    ik: 4,
    etablissements: [
      { nom: 'La Sagesse SB', categorie: 'B', details: { message: 'Prendre la carte vitale' } },
    ],
  },
  {
    nom: 'Saint-Méloir',
    ik: 6,
    etablissements: [
      { nom: 'EHPAD de la Baie', categorie: 'B', details: { message: 'Prendre la carte vitale' } },
    ],
  },
  {
    nom: 'Dinard',
    ik: 2,
    etablissements: [
      { nom: 'Korian « La Balnéaire »', categorie: 'D', details: { message: 'Compléter fiche dédiée' } },
      { nom: 'EHPAD Gardiner', categorie: 'D', details: { message: 'Compléter fiche dédiée' } },
    ],
  },
  {
    nom: 'Le Minihic',
    ik: 3,
    etablissements: [
      { nom: 'Thomas Boursin', categorie: 'C', details: { message: 'Laisser une FSP sur place' } },
    ],
  },
  {
    nom: 'Baguer-Morvan',
    ik: 8,
    etablissements: [
      { nom: 'HSTV', categorie: 'E', details: { email: 'emmanuelle.salmon@hstv.fr', facturationType: 'Hors Secteur' } },
    ],
  },
  {
    nom: 'Dol de Bretagne',
    ik: 9,
    etablissements: [
      { nom: 'L’Abbaye', categorie: 'E', details: { email: 'compta.dol@g2a.bzh', facturationType: 'Hors Secteur' } },
      { nom: 'La Parentèle', categorie: 'E', details: { email: 'compta@residence-laparentele-dol.bzh', facturationType: 'Hors Secteur' } },
    ],
  },
  {
    nom: 'Le Tronchet',
    ik: 7,
    etablissements: [
      { nom: 'L’Orée du bois', categorie: 'E', details: { email: 'compta.tronchet@g2a.bzh', facturationType: 'Hors Secteur' } },
    ],
  },
];