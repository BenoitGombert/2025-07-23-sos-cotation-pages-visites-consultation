// src/data/suturesData.ts

export interface ActeCCAM {
  code: string;
  description: string;
  tarif: number;
}

// Constantes pour les cotations
export const cotationsSutures = {
  M: 26.88,
  ID: 3.5,
  IK: 0.61,
  CRN: 42.5,
  CRM: 51.5,
  CRS: 26.5,
  CRD: 26.5,
  VRN: 46,
  VRM: 59.5,
  VRS: 30,
  VRD: 30,
};

// Actes spécifiques (codes directs sans profondeur/taille)
export const actesSpecifiques: Record<string, ActeCCAM> = {
  // Visage spécifique
  'nez': { code: 'GAJA002', description: 'Nez : plaie du nez', tarif: 55.02 },
  'sourcil': { code: 'BACA008', description: 'Sourcil : suture du sourcil', tarif: 29.68 },
  'auricule': { code: 'CAJA002', description: 'Auricule : plaie de l\'oreille', tarif: 47.78 },

  // Lèvre
  'levre_cutanee': { code: 'HAJA003', description: 'Lèvre : plaie cutanée non transfixiante', tarif: 34.75 },
  'levre_muqueuse': { code: 'HAJA010', description: 'Lèvre : plaie de la muqueuse', tarif: 33.3 },
  'levre_transfixiante': { code: 'HAJA006', description: 'Lèvre : plaie transfixiante', tarif: 56.47 },

  // Main spécifique
  'pulpo_unique': { code: 'QZJA022', description: 'Main : plaie pulpounguéale unique (repositionnement de la tablette)', tarif: 82.54 },
  'pulpo_multiples': { code: 'QZJA021', description: 'Main : plaies pulpounguéales multiples (repositionnement de la tablette)', tarif: 144.80 },
};

// Actes par localisation, profondeur et taille
export interface ActeSuture {
  localisation: 'face' | 'main' | 'corps';
  profondeur: 'superficielle' | 'profonde';
  taille: '<3cm' | '3-10cm' | '>10cm';
  acte: ActeCCAM;
}

export const actesSutures: ActeSuture[] = [
  // Face
  { localisation: 'face', profondeur: 'superficielle', taille: '<3cm', acte: { code: 'QAJA013', description: 'Face : plaie superficielle < 3 cm', tarif: 31.35 } },
  { localisation: 'face', profondeur: 'superficielle', taille: '3-10cm', acte: { code: 'QAJA005', description: 'Face : plaie superficielle 3-10 cm', tarif: 76.02 } },
  { localisation: 'face', profondeur: 'superficielle', taille: '>10cm', acte: { code: 'QAJA002', description: 'Face : plaie superficielle > 10 cm', tarif: 84.71 } },
  { localisation: 'face', profondeur: 'profonde', taille: '<3cm', acte: { code: 'QAJA004', description: 'Face : plaie profonde < 3 cm', tarif: 62.7 } },

  // Main
  { localisation: 'main', profondeur: 'superficielle', taille: '<3cm', acte: { code: 'QZJA002', description: 'Main : plaie superficielle < 3 cm', tarif: 26.06 } },
  { localisation: 'main', profondeur: 'superficielle', taille: '3-10cm', acte: { code: 'QZJA017', description: 'Main : plaie superficielle 3-10 cm', tarif: 52.85 } },
  { localisation: 'main', profondeur: 'superficielle', taille: '>10cm', acte: { code: 'QZJA015', description: 'Main : plaie superficielle > 10 cm', tarif: 62.99 } },

  // Corps
  { localisation: 'corps', profondeur: 'superficielle', taille: '<3cm', acte: { code: 'QZJA002', description: 'Corps : plaie superficielle < 3 cm', tarif: 26.06 } },
  { localisation: 'corps', profondeur: 'superficielle', taille: '3-10cm', acte: { code: 'QZJA017', description: 'Corps : plaie superficielle 3-10 cm', tarif: 52.85 } },
  { localisation: 'corps', profondeur: 'superficielle', taille: '>10cm', acte: { code: 'QZJA015', description: 'Corps : plaie superficielle > 10 cm', tarif: 62.99 } },
  { localisation: 'corps', profondeur: 'profonde', taille: '<3cm', acte: { code: 'QZJA016', description: 'Corps : plaie profonde < 3 cm', tarif: 49.96 } },
  { localisation: 'corps', profondeur: 'profonde', taille: '3-10cm', acte: { code: 'QZJA012', description: 'Corps : plaie profonde 3-10 cm', tarif: 62.99 } },
  { localisation: 'corps', profondeur: 'profonde', taille: '>10cm', acte: { code: 'QZJA001', description: 'Corps : plaie profonde > 10 cm', tarif: 86.88 } },
];

// Fonction helper pour trouver un acte
export function trouverActeSuture(
  localisation: 'face' | 'main' | 'corps',
  profondeur: 'superficielle' | 'profonde',
  taille: '<3cm' | '3-10cm' | '>10cm'
): ActeCCAM | undefined {
  const acte = actesSutures.find(
    a => a.localisation === localisation && a.profondeur === profondeur && a.taille === taille
  );
  return acte?.acte;
}
