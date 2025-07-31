// src/data/visiteConsultationData.ts

// Interface pour les valeurs de cotation
export interface CotationValues {
  [key: string]: number;
}

// Interface pour les communes et leurs IK
export interface CommuneIK {
  commune: string;
  ik: number;
}

// Valeurs de cotation des actes (à compléter si besoin)
export const actesValues: CotationValues = {
  G: 25,
  C: 23,
  APC: 50,
  IK: 0.61,
};

// Liste des communes avec leur valeur d'IK
// L'ordre sera géré dans le composant d'affichage
export const communesIK: CommuneIK[] = [
  { commune: 'Saint-Malo', ik: 0 },
  { commune: 'Cancale', ik: 2 },
  { commune: 'Pleudihen', ik: 5 },
  { commune: 'Pleurtuit', ik: 3 },
  { commune: 'Saint-Briac', ik: 4 },
  { commune: 'Saint-Méloir', ik: 6 },
  { commune: 'Dinard', ik: 2 },
  { commune: 'Le Minihic', ik: 3 },
  { commune: 'Baguer-Morvan', ik: 8 },
  { commune: 'Dol de Bretagne', ik: 9 },
  { commune: 'Le Tronchet', ik: 7 },
  { commune: 'Miniac Morvan', ik: 8 },
  { commune: 'La Vicomté sur Rance', ik: 7 },
  { commune: 'Plouër sur Rance', ik: 6 },
  { commune: 'Saint-Jouan des Guérets', ik: 1 },
];