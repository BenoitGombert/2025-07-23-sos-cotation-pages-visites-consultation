# Plan A' - Vision Générale

## Vue d'ensemble

**Objectif** : Développer une application mobile complète avec Capacitor qui génère des factures pré-remplies SANS stocker l'identité des patients, puis proposer une démo à Stellair.

## Concept clé : RGPD simplifié

### Ce que l'app FAIT ✅
- Login individuel par médecin
- Calculs de cotation NGAP/IK automatisés
- Scan OCR de documents établissements
- Génération de factures au format Word/PDF modifiable
- Envoi automatique par email au médecin

### Ce que l'app NE FAIT PAS ❌
- **Aucun stockage d'identité patient** (nom, prénom, n° sécu, etc.)
- Pas de données de santé personnelles
- Pas de lien entre actes et patients identifiables

## Principe de fonctionnement

```
┌─────────────────────────────────────────────────────────┐
│           APP MOBILE (Capacitor)                         │
│                                                          │
│  1. Médecin fait ses calculs de cotation               │
│  2. Scan OCR documents (optionnel)                     │
│  3. Génération facture Word SANS identité patient      │
│  4. Envoi email au médecin                             │
│                                                          │
│  ❌ PAS de données patients stockées                    │
└────────────────┬────────────────────────────────────────┘
                 │
                 │ Email avec facture pré-remplie
                 ▼
┌─────────────────────────────────────────────────────────┐
│              MÉDECIN (Email personnel)                   │
│                                                          │
│  1. Reçoit facture Word avec champs vides patient      │
│  2. Complète manuellement identité patient (2 min)     │
│  3. Envoie lui-même à CPAM/Patient/Compta              │
└─────────────────────────────────────────────────────────┘
```

## Avantages stratégiques

### 1. Conformité RGPD ultra-simplifiée
- Pas d'hébergement HDS obligatoire (économie ~100€/mois)
- Pas d'AIPD complexe
- Responsabilité juridique minimale
- Pas de DPO nécessaire

### 2. Valeur ajoutée conservée
Le médecin gagne encore énormément de temps :
- Sélection actes automatisée
- Calculs complexes IK automatisés
- Règles CDS/PDS appliquées automatiquement
- Template facture professionnel
- **Temps gagné : 10 min → 3 min par facture**

### 3. Démo parfaite pour Stellair
- Application fonctionnelle et testée
- Retours utilisateurs réels
- Code production-ready
- Valorisation x2-3 en négociation
- Crédibilité maximale

### 4. Coûts minimaux
- Hébergement : 0-25€/mois (vs 100€+ HDS)
- Pas de frais juridiques/DPO
- Infrastructure simple

## Stratégie de sortie : Stellair

### Phase 1-6 : Développement (3-4 mois)
Créer une application complète et fonctionnelle

### Phase 7 : Approche Stellair (Mars 2025)
Présenter une démo avec :
- Application installée et utilisée par SOS Saint-Malo
- Retours utilisateurs positifs
- Documentation technique complète
- Proposition de partenariat

### Valorisation estimée
- Sans démo : 15-30k€
- **Avec démo fonctionnelle : 30-60k€**
- Royalties possibles : 5-10% ou 6-12k€/an

## Données stockées (conformité RGPD)

### Données personnelles médecins (simple)
- Email
- Nom
- Mot de passe hashé

### Données métier (anonymes)
- Actes NGAP (codes : G, VG, MEG, etc.)
- Montants calculés
- Dates/heures visites
- Noms établissements/communes

### Données patients
- **AUCUNE** ❌

## Budget total estimé

### Développement (votre temps)
- 3-4 mois de développement

### Infrastructure annuelle
- Hébergement backend : 0€/mois (Railway/Render gratuit)
- Base de données : 0€/mois (Supabase gratuit)
- Envoi emails : 0€/mois (Brevo 300/jour gratuit)
- Nom de domaine : 10€/an
- Google Play : 25€ (one-time)
- Apple Store : 99€/an (optionnel)
- **Total : ~130€/an**

## Risques et mitigation

### Risque 1 : Stellair pas intéressé
**Mitigation** : Vous avez une app fonctionnelle utilisable par SOS Médecins et potentiellement d'autres associations

### Risque 2 : Complexité technique
**Mitigation** : Stack simple et éprouvée (React + Capacitor + Node.js)

### Risque 3 : Adoption utilisateurs
**Mitigation** : Beta-test avec 2-3 médecins avant déploiement complet

## Prochaines étapes

Voir [ROADMAP.md](./ROADMAP.md) pour le plan détaillé des 7 phases.

## Documents associés

- [ROADMAP.md](./ROADMAP.md) - Feuille de route détaillée (7 phases)
- [TECH_STACK.md](./TECH_STACK.md) - Choix techniques et architecture
- [RGPD_COMPLIANCE.md](./RGPD_COMPLIANCE.md) - Conformité RGPD simplifiée
- [STELLAIR_PITCH.md](./STELLAIR_PITCH.md) - Préparation démo future
- [BUDGET.md](./BUDGET.md) - Détail des coûts

---

**Date de création** : Novembre 2024
**Statut** : Plan validé - Prêt pour développement
