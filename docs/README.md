# Documentation Plan A' - SOS Cotation

## Vue d'ensemble

Ce dossier contient toute la documentation du **Plan A'** : développement d'une application mobile complète avec Capacitor qui génère des factures pré-remplies SANS stocker l'identité des patients, puis proposition de démo à Stellair.

---

## Documents disponibles

### 📋 [PLAN_A_PRIME.md](./PLAN_A_PRIME.md)
**Vision générale du projet**

Contenu :
- Concept clé : RGPD simplifié (pas de données patients)
- Principe de fonctionnement
- Avantages stratégiques
- Stratégie de sortie Stellair
- Budget estimé

**À lire en premier** pour comprendre la vision globale.

---

### 🗺️ [ROADMAP.md](./ROADMAP.md)
**Feuille de route détaillée (7 phases)**

Contenu :
- Timeline globale (3-4 mois)
- Phase 1 : Backend & Authentification (2-3 semaines)
- Phase 2 : Migration Capacitor (1-2 semaines)
- Phase 3 : Caméra + OCR (2-3 semaines)
- Phase 4 : Générateur Factures Word/PDF (2 semaines)
- Phase 5 : Envoi Emails (1 semaine)
- Phase 6 : Tests Utilisateurs (2-3 semaines)
- Phase 7 : Préparation Démo Stellair (1 semaine)
- Checkpoints de validation
- Risques et contingences

**À consulter** pour planifier le développement étape par étape.

---

### 🔧 [TECH_STACK.md](./TECH_STACK.md)
**Stack technique et architecture**

Contenu :
- Architecture globale (schéma)
- Frontend Mobile (React + Capacitor)
  - Plugins Capacitor
  - Librairies (OCR, génération docs)
  - Structure projet
- Backend API (Node.js + Express)
  - Routes documentées
  - Schéma base de données
  - Services externes
- Sécurité (JWT, bcrypt, CORS, etc.)
- Tests (Vitest, Jest)
- Build & Déploiement
- Monitoring (Sentry)

**À consulter** pendant le développement pour les détails techniques.

---

### 🔒 [RGPD_COMPLIANCE.md](./RGPD_COMPLIANCE.md)
**Conformité RGPD simplifiée**

Contenu :
- Données traitées (médecins uniquement, pas de patients)
- Obligations RGPD applicables
  - Registre des traitements (template inclus)
  - Politique de confidentialité (template inclus)
  - Consentement explicite
  - Sécurité technique
  - Droits des personnes (code fourni)
  - Procédure violation de données
- Sous-traitants (Supabase, Brevo, Railway)
- Checklist conformité
- Comparaison avec hébergement HDS

**À consulter** pour assurer la conformité légale.

---

### 💼 [STELLAIR_PITCH.md](./STELLAIR_PITCH.md)
**Préparation démo Stellair (Phase 7)**

Contenu :
- Valeur ajoutée pour Stellair
- Stratégie d'approche (3 phases)
  - Identification contact
  - Premier email (template fourni)
  - Présentation démo (déroulé complet)
- Documents à préparer
  - One-pager (structure)
  - Vidéo démo (script)
  - Deck présentation (10 slides)
  - Documentation technique
- NDA (template)
- Valorisation commerciale (fourchettes de prix)
- Checklist préparation
- Plan B (autres partenaires)

**À consulter** en Phase 7 pour l'approche Stellair.

---

### 💰 [BUDGET.md](./BUDGET.md)
**Budget détaillé**

Contenu :
- Coûts développement
  - Infrastructure (0 €/mois grâce aux plans gratuits)
  - Outils (tous gratuits)
  - Distribution app (25-124 €)
  - Domaine (10 €)
- Budget total Année 1 : **35-134 €**
- Coûts optionnels (monitoring, marketing)
- Évolution coûts si croissance
- Comparaison Plan A' vs HDS (économie 5400-7200 €)
- ROI estimé (25 000x - 75 000x)
- Recommandations financières

**À consulter** pour la planification financière.

---

## Comment utiliser cette documentation

### Pour démarrer le projet

1. **Lire** [PLAN_A_PRIME.md](./PLAN_A_PRIME.md) → Comprendre la vision
2. **Consulter** [ROADMAP.md](./ROADMAP.md) → Planifier les phases
3. **Vérifier** [BUDGET.md](./BUDGET.md) → Prévoir les coûts
4. **Commencer Phase 1** → Suivre [TECH_STACK.md](./TECH_STACK.md)

### Pendant le développement

- **Phases 1-5** : Se référer à [TECH_STACK.md](./TECH_STACK.md) et [ROADMAP.md](./ROADMAP.md)
- **Questions RGPD** : Consulter [RGPD_COMPLIANCE.md](./RGPD_COMPLIANCE.md)
- **Doutes techniques** : Voir exemples de code dans [TECH_STACK.md](./TECH_STACK.md)

### Phase 6 (Tests)

- Suivre checklist dans [ROADMAP.md](./ROADMAP.md) Phase 6
- Compiler retours pour [STELLAIR_PITCH.md](./STELLAIR_PITCH.md)

### Phase 7 (Stellair)

- **Tout est dans** [STELLAIR_PITCH.md](./STELLAIR_PITCH.md) :
  - Email de contact
  - Déroulé de démo
  - Documents à créer
  - Valorisation commerciale

---

## Résumé Rapide

### Concept
Application mobile (Capacitor) qui calcule cotations NGAP/IK et génère factures Word **SANS stocker identité patients** → RGPD ultra-simplifié.

### Timeline
**3-4 mois** (Décembre 2024 - Mars 2025)

### Budget
**35-134 €** Année 1 (infrastructure quasi-gratuite)

### Objectif Final
Démo à **Stellair** → Licence/Rachat estimé **30-60k€**

### ROI
**25 000x - 75 000x** sur investissement cash

---

## Stack Technique (Résumé)

```
Frontend Mobile:
  React 19 + TypeScript + Vite + Capacitor
  Plugins: Camera, Filesystem, Share, Preferences
  Libs: Tesseract.js (OCR), docxtemplater (Word)

Backend:
  Node.js + Express + TypeScript
  Base: Supabase PostgreSQL (gratuit 500 MB)
  Auth: JWT + bcrypt
  Email: Brevo (gratuit 300/jour)

Hébergement:
  Backend: Railway/Render (gratuit 500h/mois)
  Mobile: Google Play (25€) + Apple Store (99€/an optionnel)
```

---

## Contacts & Support

### Créateur du projet
[Votre nom]
- Email : [Votre email]
- GitHub : [Votre profil]

### Ressources Officielles
- **CNIL - RGPD** : https://www.cnil.fr/fr/rgpd-de-quoi-parle-t-on
- **Capacitor Docs** : https://capacitorjs.com/docs
- **Supabase Docs** : https://supabase.com/docs
- **Brevo API** : https://developers.brevo.com/

---

## Statut Documentation

| Document | Statut | Dernière MAJ |
|----------|--------|--------------|
| PLAN_A_PRIME.md | ✅ Complet | Nov 2024 |
| ROADMAP.md | ✅ Complet | Nov 2024 |
| TECH_STACK.md | ✅ Complet | Nov 2024 |
| RGPD_COMPLIANCE.md | ✅ Complet | Nov 2024 |
| STELLAIR_PITCH.md | ✅ Complet | Nov 2024 |
| BUDGET.md | ✅ Complet | Nov 2024 |

---

## Changelog

### Novembre 2024
- ✅ Création documentation complète Plan A'
- ✅ 6 documents thématiques
- ✅ Templates et exemples de code
- ✅ Checklist et timelines détaillées

---

## Prochaines Étapes

- [ ] Lire documentation complète
- [ ] Créer comptes services (Supabase, Railway, Brevo)
- [ ] Démarrer Phase 1 : Backend & Authentification

**Bonne chance pour le développement ! 🚀**

---

*Cette documentation est vivante et sera mise à jour au fur et à mesure de l'avancement du projet.*
