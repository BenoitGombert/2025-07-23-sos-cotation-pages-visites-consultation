# Feuille de Route - Plan A'

## Timeline globale

**Durée totale estimée** : 3-4 mois (Décembre 2024 - Mars 2025)

```
Nov 2024        Dec 2024        Jan 2025        Feb 2025        Mar 2025
   │               │               │               │               │
   │    Phase 1    │    Phase 2    │   Phase 3-4   │   Phase 5-6   │  Phase 7
   │   Backend     │  Capacitor    │   OCR+Docs    │  Email+Tests  │  Stellair
   └───────────────┴───────────────┴───────────────┴───────────────┴─────────►
```

---

## Phase 1 : Backend & Authentification (2-3 semaines)

**Objectif** : Créer l'API backend avec gestion multi-médecins

### Tâches

- [ ] Initialiser projet backend Node.js + Express
- [ ] Configurer base de données Supabase (PostgreSQL)
- [ ] Implémenter authentification JWT
- [ ] Créer routes API :
  - `POST /auth/register` - Inscription médecin
  - `POST /auth/login` - Connexion
  - `GET /auth/me` - Profil utilisateur
  - `POST /factures` - Créer facture brouillon
  - `GET /factures` - Liste factures médecin
  - `DELETE /factures/:id` - Supprimer facture
- [ ] Sécurisation (bcrypt pour mots de passe, validation inputs)
- [ ] Tests API (Postman/Insomnia)
- [ ] Déploiement sur Railway/Render

### Livrables
✅ API fonctionnelle
✅ Base de données opérationnelle
✅ Documentation API (Swagger optionnel)

### Technologies
- Node.js 20+
- Express 4.x
- Supabase (PostgreSQL)
- JWT (jsonwebtoken)
- bcrypt

---

## Phase 2 : Migration Capacitor (1-2 semaines)

**Objectif** : Transformer l'app React actuelle en app mobile native

### Tâches

- [ ] Installation Capacitor
  ```bash
  npm install @capacitor/core @capacitor/cli
  npx cap init
  ```
- [ ] Configuration `capacitor.config.ts`
- [ ] Ajout plateformes
  ```bash
  npm install @capacitor/android @capacitor/ios
  npx cap add android
  npx cap add ios  # Si Mac disponible
  ```
- [ ] Installation plugins essentiels
  ```bash
  npm install @capacitor/camera
  npm install @capacitor/filesystem
  npm install @capacitor/share
  npm install @capacitor/preferences
  ```
- [ ] Adaptation du code React :
  - Remplacer `localStorage` par `Preferences`
  - Tester gestes tactiles
  - Adapter tailles boutons pour mobile
- [ ] Build et test
  ```bash
  npm run build
  npx cap sync
  npx cap open android
  ```
- [ ] Tests sur émulateur/device physique

### Livrables
✅ App installable sur Android (.apk)
✅ Tests fonctionnels sur mobile
✅ Interface adaptée tactile

### Technologies
- Capacitor 5.x
- Android Studio (pour tests)
- Xcode (optionnel si iOS)

---

## Phase 3 : Intégration Caméra + OCR (2-3 semaines)

**Objectif** : Permettre le scan de documents établissements

### Tâches

- [ ] Installer Tesseract.js
  ```bash
  npm install tesseract.js
  ```
- [ ] Créer composant `ScanDocument.tsx`
- [ ] Implémenter capture photo
  ```typescript
  const takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });
    return image.webPath;
  };
  ```
- [ ] Intégrer OCR
  ```typescript
  const scanText = async (imagePath) => {
    const { data: { text } } = await Tesseract.recognize(
      imagePath,
      'fra',
      { logger: m => console.log(m) }
    );
    return text;
  };
  ```
- [ ] Créer extracteurs de données (regex)
  - Nom établissement
  - Adresse
  - Autres infos pertinentes
- [ ] Interface utilisateur :
  - Bouton "Scanner document"
  - Prévisualisation image
  - Extraction données affichée
  - Validation/correction manuelle
- [ ] Tests avec vrais documents établissements

### Livrables
✅ Scan photo fonctionnel
✅ OCR reconnaissance texte français
✅ Extraction données fiable (>80%)
✅ Interface intuitive

### Technologies
- @capacitor/camera
- Tesseract.js
- Regex pour extraction données

---

## Phase 4 : Générateur Factures Word/PDF (2 semaines)

**Objectif** : Créer factures pré-remplies modifiables

### Tâches

- [ ] Installer librairies
  ```bash
  npm install docxtemplater pizzip
  npm install pdf-lib  # Alternative PDF
  ```
- [ ] Créer template Word `facture_template.docx`
  - Placeholders pour données pré-remplies
  - Champs vides pour identité patient
  - Mise en forme professionnelle
- [ ] Implémenter générateur
  ```typescript
  const genererFacture = async (cotationData) => {
    const doc = new Docxtemplater(templateZip);
    doc.render({
      date: new Date().toLocaleDateString('fr-FR'),
      medecin: currentUser.nom,
      actes: cotationData.actes.join(' + '),
      total: cotationData.total.toFixed(2),
      // Champs vides patients
      nomPatient: '___________________',
      prenomPatient: '___________________',
    });
    return doc.getZip().generate({ type: 'blob' });
  };
  ```
- [ ] Sauvegarde locale (mobile)
  ```typescript
  await Filesystem.writeFile({
    path: `facture_${Date.now()}.docx`,
    data: base64Data,
    directory: Directory.Documents
  });
  ```
- [ ] Fonctionnalité partage
  ```typescript
  await Share.share({
    title: 'Facture SOS Médecins',
    files: [fileUri]
  });
  ```
- [ ] Tests génération avec tous types actes

### Livrables
✅ Template Word professionnel
✅ Génération factures fonctionnelle
✅ Champs patients vides et éditables
✅ Partage/envoi facile

### Technologies
- docxtemplater
- pizzip
- @capacitor/filesystem
- @capacitor/share

---

## Phase 5 : Système d'Envoi Emails (1 semaine)

**Objectif** : Envoi automatique factures par email

### Tâches

- [ ] Créer compte Brevo (gratuit 300 emails/jour)
- [ ] Configurer API Brevo côté backend
  ```bash
  npm install @sendinblue/client
  ```
- [ ] Implémenter route API `/factures/send`
  ```typescript
  POST /factures/send
  Body: {
    medecinEmail: string,
    fichierBase64: string,
    cotationData: object
  }
  ```
- [ ] Créer template email HTML
  ```html
  Bonjour Dr {nom},

  Voici votre facture pré-remplie pour la visite du {date}.

  À compléter : Identité du patient

  Cordialement,
  SOS Cotation
  ```
- [ ] Gestion erreurs envoi (retry, logs)
- [ ] Interface mobile : bouton "Envoyer par email"
- [ ] Tests envoi réels

### Livrables
✅ Envoi emails fonctionnel
✅ Factures en pièce jointe
✅ Template email professionnel
✅ Gestion erreurs robuste

### Technologies
- Brevo (Sendinblue)
- @sendinblue/client
- Templates HTML emails

---

## Phase 6 : Tests Utilisateurs (2-3 semaines)

**Objectif** : Validation terrain avec médecins SOS Saint-Malo

### Tâches

- [ ] Recrutement 2-3 médecins beta-testeurs
- [ ] Installation app sur leurs téléphones
- [ ] Formation rapide (15 min)
- [ ] Période test : 2 semaines minimum
- [ ] Recueil feedbacks :
  - Questionnaire de satisfaction
  - Bugs rencontrés
  - Suggestions améliorations
  - Temps moyen par facture
- [ ] Itérations corrections bugs
- [ ] Ajustements UX selon retours
- [ ] Validation finale workflow complet
- [ ] Documentation utilisateur (guide rapide)

### Livrables
✅ App testée en conditions réelles
✅ Bugs critiques corrigés
✅ Taux satisfaction > 80%
✅ Témoignages utilisateurs (pour Stellair)
✅ Guide utilisateur

### Métriques de succès
- Temps moyen création facture : < 5 min ✅
- Taux d'adoption : > 70% des testeurs
- Bugs bloquants : 0
- Note satisfaction : > 4/5

---

## Phase 7 : Préparation Démo Stellair (1 semaine)

**Objectif** : Préparer présentation professionnelle pour Stellair

### Tâches

- [ ] Créer vidéo démo (3-5 min)
  - Parcours utilisateur complet
  - Points forts mis en avant
  - Interface fluide et intuitive
- [ ] Préparer slides présentation (10 slides)
  - Problème résolu
  - Solution apportée
  - Démo live
  - Retours utilisateurs
  - Proposition partenariat
- [ ] Compiler retours utilisateurs
  - Témoignages médecins
  - Métriques d'usage
  - Temps gagné
- [ ] Documentation technique complète
  - Architecture
  - Stack technique
  - Code quality (tests, etc.)
- [ ] Proposition commerciale
  - Options partenariat
  - Valorisation
  - Termes licence
- [ ] Identifier contact Stellair
  - Direction Innovation
  - Responsable produit Permanences de soins
- [ ] Rédiger email de premier contact
- [ ] Préparer NDA (accord confidentialité)

### Livrables
✅ Vidéo démo professionnelle
✅ Deck présentation complet
✅ Documentation technique
✅ Témoignages utilisateurs
✅ Proposition commerciale
✅ Dossier de presse complet

### Documents à créer
- `demo_video.mp4`
- `presentation_stellair.pdf`
- `user_testimonials.pdf`
- `technical_documentation.pdf`
- `commercial_proposal.pdf`

---

## Checkpoints de validation

### Fin Phase 1
- [ ] API répond correctement (tests Postman OK)
- [ ] Authentification fonctionne
- [ ] Base données accessible

### Fin Phase 2
- [ ] App s'installe sur Android
- [ ] Interface tactile fluide
- [ ] Navigation fonctionnelle

### Fin Phase 3
- [ ] Scan photo réussi
- [ ] OCR reconnaît texte français
- [ ] Extraction données >80% fiabilité

### Fin Phase 4
- [ ] Génération Word sans erreur
- [ ] Template professionnel
- [ ] Champs patients éditables

### Fin Phase 5
- [ ] Emails envoyés et reçus
- [ ] Pièces jointes correctes
- [ ] Template email clair

### Fin Phase 6
- [ ] Bugs critiques = 0
- [ ] Satisfaction > 80%
- [ ] Témoignages positifs obtenus

### Fin Phase 7
- [ ] Dossier complet prêt
- [ ] Contact Stellair identifié
- [ ] Email envoyé

---

## Risques et contingences

### Risque : OCR pas assez fiable
**Plan B** : Saisie manuelle assistée (champs pré-remplis partiellement)

### Risque : Génération Word complexe
**Plan B** : PDF simple avec annotations

### Risque : Envoi emails bloqués
**Plan B** : Sauvegarde locale + partage manuel

### Risque : Adoption utilisateurs faible
**Plan B** : Itérations UX supplémentaires, formation renforcée

---

## Prochaine action immédiate

🎯 **Démarrer Phase 1** : Créer le backend avec authentification

Voir [TECH_STACK.md](./TECH_STACK.md) pour les détails d'implémentation.

---

**Dernière mise à jour** : Novembre 2024
**Statut global** : Phase 0 (Planification) ✅ Complétée
