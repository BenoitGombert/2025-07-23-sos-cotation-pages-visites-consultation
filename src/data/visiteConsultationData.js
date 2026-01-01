// src/data/visiteConsultationData.ts
// Valeurs de cotation des actes et majorations
export const actesValues = {
    // Actes de base
    G: 30,
    VG: 30,
    // Majorations selon situation
    MD: 10,
    SNP: 15,
    MEG: 5,
    MOP: 5,
    MU: 22.60,
    // Majorations PDS
    CRN: 42.5,
    VRN: 52.5,
    CRM: 51.5,
    VRM: 66,
    CRS: 26.5,
    VRS: 36.5,
    CRD: 26.5,
    VRD: 36.5,
    // ECG
    DEQP003_CONSULTATION: 14.52,
    ECG_VISITE: 24.12, // DEQP003 + YYYY490
    // IK
    IK: 0.61,
};
// Liste des communes avec leur valeur d'IK
export const communesIK = [
    { commune: 'Saint-Malo', ik: 0 },
    { commune: 'Chateau-Malo', ik: 0 },
    { commune: 'Cancale', ik: 26 },
    { commune: 'Pleudihen', ik: 36 },
    { commune: 'Pleurtuit', ik: 22 },
    { commune: 'Saint-Briac', ik: 26 },
    { commune: 'Saint-Méloir', ik: 18 },
    { commune: 'Dinard', ik: 18 },
    { commune: 'Le Minihic', ik: 22 },
    { commune: 'Baguer-Morvan', ik: 96 },
    { commune: 'Dol de Bretagne', ik: 100 },
    { commune: 'Le Tronchet', ik: 92 },
    { commune: 'Miniac Morvan', ik: 36 },
    { commune: 'Saint-Jouan des Guérets', ik: 12 },
    { commune: 'La Ville-és-Nonais', ik: 28 },
    { commune: 'Saint-Benoit', ik: 28 },
    { commune: 'Saint-Coulomb', ik: 16 },
    { commune: 'Saint-Guinoux', ik: 30 },
    { commune: 'Saint-Lunaire', ik: 26 },
    { commune: 'Saint-Père', ik: 18 },
    { commune: 'Saint-Suliac', ik: 22 },
    { commune: 'Châteauneuf', ik: 22 },
    { commune: 'La Gouesnière', ik: 24 },
    { commune: 'Langrolay', ik: 28 },
    { commune: 'La Richardais', ik: 13 },
    { commune: 'Trémereuc', ik: 30 },
];
