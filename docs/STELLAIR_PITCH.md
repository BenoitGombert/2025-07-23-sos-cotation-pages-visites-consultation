# Préparation Démo Stellair

## Objectif

Présenter une **démo convaincante** de l'application SOS Cotation à Stellair (groupe Cegedim) en vue d'un **partenariat commercial** (licence exclusive, co-développement, ou rachat).

---

## Valeur Ajoutée pour Stellair

### 1. Marché Ciblé : Permanences de Soins

**Problématique** :
- Les associations SOS Médecins ont des besoins spécifiques (calculs IK, majorations CDS/PDS, établissements hors secteur)
- Pas de solution mobile optimisée pour la facturation terrain
- Calculs manuels chronophages et sources d'erreurs

**Solution apportée** :
- Application mobile native (Android/iOS)
- Calculs NGAP automatisés et vérifiés
- Workflow optimisé pour interventions terrain
- Gain de temps : **10 min → 3 min** par facture

**Marché potentiel** :
- ~300 associations SOS Médecins en France
- ~5000 médecins permanenciers
- Facturation mensuelle : milliers de factures

### 2. Code Fonctionnel et Testé

**Avantages pour Stellair** :
- ✅ Pas de développement from scratch (économie 6-12 mois)
- ✅ Expertise métier SOS Médecins déjà codifiée
- ✅ Retours utilisateurs réels (validation terrain)
- ✅ Intégration rapide dans leur suite logicielle (3-6 mois vs 12-18 mois)
- ✅ Time-to-market accéléré

### 3. Compliance RGPD Simplifiée

**Stratégie actuelle** : Pas de stockage identité patients
- Hébergement standard (pas de HDS obligatoire dans cette version)
- Facilite intégration initiale
- Stellair pourra ajouter HDS + données patients côté serveur ensuite

### 4. Stack Technique Moderne

**Technologies** :
- React + TypeScript (maintenable, populaire)
- Capacitor (cross-platform natif)
- Architecture modulaire (facile à intégrer)

---

## Stratégie d'Approche

### Phase 1 : Identification Contact (Décembre 2024)

**Cibles prioritaires chez Stellair** :

1. **Direction Innovation / R&D**
   - Responsable : À identifier (LinkedIn)
   - Email type : innovation@stellair.fr

2. **Responsable Produit "Permanences de Soins"**
   - Si produit existant pour ce segment

3. **Business Development / Partenariats**
   - Ouvert aux solutions externes

**Recherche** :
- LinkedIn : Chercher "Stellair" + "Product Manager" / "Innovation" / "R&D"
- Site Stellair : Page "Contact" / "Nos équipes"
- Réseau SOS Médecins : Demander contacts éventuels

---

### Phase 2 : Premier Contact (Janvier 2025)

**Email de présentation** (Template) :

```
Objet : Solution mobile innovante pour permanences de soins - Démo disponible

Bonjour [Prénom],

Je me permets de vous contacter au sujet d'une solution mobile que j'ai
développée pour optimiser la facturation des permanences de soins, actuellement
utilisée par l'association SOS Médecins de Saint-Malo.

**Contexte** :
Les médecins de garde perdent en moyenne 10 minutes par facture avec les
calculs manuels NGAP/IK et les spécificités établissements. J'ai créé une
application mobile qui réduit ce temps à 3 minutes via :
- Calculs automatisés (NGAP, IK, majorations CDS/PDS)
- Scan OCR documents établissements
- Génération factures pré-remplies
- Workflow optimisé pour interventions terrain

**État d'avancement** :
✅ Application fonctionnelle (Android/iOS)
✅ Testée en conditions réelles par SOS Médecins Saint-Malo
✅ Retours utilisateurs très positifs (gain temps confirmé)
✅ Code production-ready

**Proposition** :
Je serais ravi de vous présenter une démo (15-20 min) et d'explorer
d'éventuelles synergies avec votre gamme de solutions pour permanences de soins.

Seriez-vous disponible pour un échange téléphonique ou visio dans les
prochaines semaines ?

Je reste à votre disposition pour toute information complémentaire.

Cordialement,

[Votre nom]
[Téléphone]
[Email]

---
En pièce jointe : Plaquette de présentation (1 page)
```

**Pièce jointe** : One-pager (voir section ci-dessous)

---

### Phase 3 : Présentation Démo (Février-Mars 2025)

**Format** : Visioconférence (30-45 min)

**Déroulé** :

#### Introduction (5 min)
- Présentation rapide de votre parcours
- Contexte : SOS Médecins Saint-Malo
- Problématique identifiée

#### Démo Live (15-20 min)

**Scénario utilisateur** :
```
1. Médecin sur le terrain (simulation)
   └─> "Je viens de faire une visite à l'EHPAD La Sagesse à Pleurtuit"

2. Ouverture app mobile
   └─> Login rapide (déjà connecté)

3. Sélection "Établissements"
   └─> Choix commune : Pleurtuit
   └─> Choix établissement : La Sagesse Pl

4. Scan document établissement (optionnel)
   └─> Caméra > OCR > Extraction données

5. Sélection paramètres visite
   └─> Période : Nuit profonde (00h-6h)
   └─> Âge : > 80 ans
   └─> ECG : Oui

6. Calcul automatique affiché
   └─> YYYY010 + M + CRM + MOP + 1/2 DEQP003 + 22 IK
   └─> Total : XXX,XX €

7. Génération facture Word
   └─> Template professionnel
   └─> Données pré-remplies
   └─> Champs patients vides (à compléter)

8. Envoi email automatique
   └─> Reçu instantanément
   └─> Pièce jointe modifiable

9. Historique (12 mois)
   └─> Retrouver factures précédentes
```

**Points forts à mettre en avant** :
- ✅ Interface intuitive (pas de formation longue)
- ✅ Rapidité (3 min vs 10 min)
- ✅ Fiabilité calculs (zéro erreur NGAP)
- ✅ Adapté terrain (fonctionne hors connexion pour calculs)
- ✅ Conforme RGPD (pas de données patients stockées)

#### Retours Utilisateurs (5 min)

**Témoignages médecins** (à préparer) :
```
"Avant, je perdais 10 minutes par facture à chercher les codes NGAP
et calculer les IK. Maintenant, 3 clics et c'est terminé. Ça change
vraiment la vie pendant les gardes chargées."
— Dr [Nom], SOS Médecins Saint-Malo

"L'interface est très claire, même pour ceux qui ne sont pas à l'aise
avec la technologie. Le scan OCR des documents d'établissements est
un vrai plus."
— Dr [Nom], SOS Médecins Saint-Malo
```

**Métriques** (si disponibles) :
- Temps moyen par facture : 3 min (-70%)
- Taux d'adoption : XX%
- Satisfaction utilisateurs : X/5
- Erreurs NGAP : 0

#### Proposition Partenariat (10 min)

**Options envisageables** :

**Option 1 : Licence Exclusive**
```
- Vous gardez la propriété du code
- Stellair a droits exclusifs d'utilisation/commercialisation
- Royalties : 5-10% du CA généré ou forfait annuel
- Maintenance évolutive : à définir
```

**Option 2 : Rachat Complet**
```
- Stellair acquiert tous droits de propriété intellectuelle
- Paiement one-shot + éventuelles royalties
- Vous assurez support technique initial (3-6 mois)
```

**Option 3 : Co-développement**
```
- Partenariat long terme
- Développement conjoint nouvelles fonctionnalités
- Partage revenus
- Module "Stellair powered by [Votre nom]"
```

#### Questions / Échanges (5-10 min)

**Questions anticipées** :

**Q : Combien d'utilisateurs actuellement ?**
> R : Testé par X médecins SOS Saint-Malo, déploiement progressif prévu

**Q : Quelles sont les limites techniques actuelles ?**
> R : [Être transparent : OCR pas 100% fiable, nécessite validation manuelle]

**Q : Temps d'intégration dans notre écosystème ?**
> R : Estimé 3-6 mois (connexion à votre backend, adaptation UI à votre charte)

**Q : Coût de la solution ?**
> R : À discuter selon modèle de partenariat, ouvert à vos propositions

**Q : Évolutions futures possibles ?**
> R : Télétransmission automatique, intégration DMP, actes techniques CCAM...

---

## Documents à Préparer

### 1. One-Pager (Plaquette 1 page)

**Structure** :

```
┌─────────────────────────────────────────────────────────┐
│     SOS COTATION - Solution Mobile Permanences de Soins │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  📱 PROBLÈME                                            │
│  Les médecins de garde perdent 10 min/facture          │
│  - Calculs NGAP/IK manuels                              │
│  - Recherche codes majorations                          │
│  - Spécificités établissements                          │
│                                                          │
│  ✨ SOLUTION                                            │
│  Application mobile native (Android/iOS)                │
│  - Calculs automatisés et vérifiés                      │
│  - Scan OCR documents établissements                    │
│  - Génération factures pré-remplies                     │
│  - Gain temps : 10 min → 3 min (-70%)                   │
│                                                          │
│  ✅ ÉTAT D'AVANCEMENT                                   │
│  • App fonctionnelle et testée                          │
│  • Utilisée par SOS Médecins Saint-Malo                 │
│  • Retours utilisateurs positifs                        │
│  • Code production-ready                                │
│                                                          │
│  🎯 MARCHÉ                                              │
│  • ~300 associations SOS Médecins France                │
│  • ~5000 médecins permanenciers                         │
│  • Milliers de factures/mois                            │
│                                                          │
│  🔧 TECHNIQUE                                           │
│  • React + TypeScript + Capacitor                       │
│  • Architecture modulaire                               │
│  • Intégration facile (3-6 mois)                        │
│  • Conforme RGPD                                        │
│                                                          │
│  📊 BÉNÉFICES STELLAIR                                  │
│  • Économie 6-12 mois développement                     │
│  • Expertise métier SOS Médecins codifiée               │
│  • Time-to-market rapide                                │
│  • Extension gamme "Permanences de soins"               │
│                                                          │
│  📧 CONTACT                                             │
│  [Votre nom]                                            │
│  [Email] - [Téléphone]                                  │
└─────────────────────────────────────────────────────────┘
```

### 2. Vidéo Démo (3-5 min)

**Script** :

```
[0:00-0:30] Introduction
- Problème : Médecin de garde, calculs longs et fastidieux
- Solution : SOS Cotation, app mobile dédiée

[0:30-2:30] Démo fonctionnelle
- Workflow complet (établissement > scan > calcul > facture)
- Interface fluide et intuitive
- Résultat : facture Word générée et envoyée

[2:30-3:00] Bénéfices utilisateurs
- Gain de temps chiffré
- Témoignages courts (voix off ou texte)

[3:00-3:30] Appel à l'action
- "Intéressé ? Contactez-nous pour une démo personnalisée"
- Coordonnées affichées
```

**Outils de réalisation** :
- Screen recording : OBS Studio (gratuit)
- Montage : DaVinci Resolve (gratuit) ou iMovie
- Voix off : Microphone correct ou texte à l'écran
- Musique : Epidemic Sound ou musique libre (YouTube Audio Library)

### 3. Deck Présentation (10 slides)

**Structure** :

```
Slide 1 : Titre
  • Logo SOS Cotation
  • Sous-titre : "Solution mobile pour permanences de soins"
  • Votre nom

Slide 2 : Problème
  • Médecins de garde : 10 min/facture
  • Calculs manuels NGAP/IK chronophages
  • Erreurs fréquentes
  • Photo : médecin avec calculatrice/papiers

Slide 3 : Solution
  • Application mobile native
  • Workflow optimisé
  • Calculs automatisés
  • Screenshot interface

Slide 4 : Démo
  • [Démo live ou vidéo intégrée]

Slide 5 : Retours Utilisateurs
  • Témoignages (2-3)
  • Métriques (temps gagné, satisfaction)
  • Logo SOS Médecins Saint-Malo

Slide 6 : Marché
  • 300 associations SOS Médecins
  • 5000 médecins permanenciers
  • Potentiel national

Slide 7 : Technique
  • Stack moderne (React + Capacitor)
  • Architecture modulaire
  • Facilement intégrable
  • Schéma architecture

Slide 8 : Conformité RGPD
  • Pas de données patients stockées
  • Hébergement conforme
  • Sécurité renforcée

Slide 9 : Proposition Partenariat
  • Options : Licence / Rachat / Co-dev
  • Bénéfices pour Stellair
  • Valorisation indicative

Slide 10 : Prochaines Étapes
  • Discussion termes partenariat
  • Essai pilote avec autre association SOS
  • Timeline intégration
  • Contact
```

### 4. Documentation Technique

**Table des matières** :

```
1. Vue d'ensemble
   - Architecture globale
   - Stack technique
   - Diagrammes de flux

2. Frontend Mobile
   - Technologies utilisées
   - Structure projet
   - Composants principaux
   - Plugins Capacitor

3. Backend API
   - Endpoints documentés
   - Authentification
   - Schéma base de données

4. Fonctionnalités
   - Calculs NGAP/IK (algorithmes)
   - Scan OCR (précision, limitations)
   - Génération factures (templates)
   - Envoi emails

5. Sécurité & RGPD
   - Mesures implémentées
   - Conformité RGPD
   - Registre des traitements

6. Tests & Qualité
   - Tests unitaires
   - Tests d'intégration
   - Retours utilisateurs

7. Évolutions Futures
   - Télétransmission CPAM
   - Intégration DMP
   - Actes techniques CCAM
   - Gestion multi-sites

8. Intégration Stellair
   - Points d'intégration
   - Timeline estimée
   - Effort de développement
```

---

## NDA (Non-Disclosure Agreement)

**À préparer avant la démo**

Template simple :

```
ACCORD DE CONFIDENTIALITÉ

Entre :
[Votre nom], ci-après "le Divulgateur"

Et :
Stellair (Cegedim Group), ci-après "le Destinataire"

OBJET : Protection des informations confidentielles relatives au projet
"SOS Cotation" dans le cadre d'une présentation commerciale.

Article 1 - Définition
Sont considérées comme confidentielles toutes informations relatives à :
- Code source de l'application
- Documentation technique
- Données utilisateurs (anonymisées)
- Stratégie commerciale
- Toute information marquée "Confidentiel"

Article 2 - Obligations
Le Destinataire s'engage à :
- Ne pas divulguer les informations confidentielles
- Les utiliser uniquement dans le cadre d'une évaluation commerciale
- Les protéger avec le même niveau de sécurité que ses propres données

Article 3 - Durée
Cet accord est valable 2 ans à compter de la signature.

Article 4 - Exceptions
Ne sont pas couverts :
- Informations déjà publiques
- Informations développées indépendamment par le Destinataire

Fait à [Ville], le [Date]

Signature Divulgateur          Signature Destinataire
```

**Usage** : Faire signer avant de partager le code source complet

---

## Valorisation Commerciale

### Fourchette de Négociation

**Licence Exclusive (recommandé)** :

```
Paiement initial : 15 000 - 30 000 €
  +
Royalties annuelles :
  - Option A : 5-10% du CA généré par le module
  - Option B : Forfait annuel 6 000 - 12 000 €
  +
Support technique initial : 3 000 - 5 000 € (3-6 mois)

Durée : 3-5 ans, renouvelable
Exclusivité : Secteur permanences de soins / SOS Médecins

Total estimé sur 3 ans : 35 000 - 70 000 €
```

**Rachat Complet** :

```
Paiement one-shot : 40 000 - 80 000 €
  +
Royalties optionnelles : 2-5% pendant 2 ans
  +
Support technique : 5 000 € (6 mois)

Total estimé : 45 000 - 100 000 €
```

**Co-développement** :

```
Variable selon apport de chaque partie
Partage des revenus : 50/50 ou autre ratio
Engagement long terme : 3-5 ans
```

### Arguments de Valorisation

**Pour justifier le prix** :

1. **Économie développement Stellair**
   - Développeur senior : ~600 €/jour
   - Développement from scratch : 100-150 jours
   - Économie : **60 000 - 90 000 €**

2. **Expertise métier rare**
   - Connaissance spécifique SOS Médecins
   - Règles NGAP/IK maîtrisées
   - Workflows terrain validés

3. **Time-to-market**
   - Intégration 3-6 mois vs 12-18 mois développement complet
   - Avantage concurrentiel immédiat

4. **Validation terrain**
   - Code testé en conditions réelles
   - Retours utilisateurs positifs
   - Risque réduit

---

## Checklist Préparation Démo

### 1 mois avant

- [ ] Identifier contacts Stellair (LinkedIn, site web)
- [ ] Créer one-pager PDF
- [ ] Rédiger email de premier contact
- [ ] Préparer NDA

### 2 semaines avant

- [ ] Envoyer email + one-pager
- [ ] Relance si pas de réponse (après 7 jours)
- [ ] Créer vidéo démo
- [ ] Préparer deck présentation

### 1 semaine avant

- [ ] Finaliser documentation technique
- [ ] Compiler témoignages utilisateurs
- [ ] Tester démo (vérifier que tout fonctionne)
- [ ] Préparer réponses aux questions difficiles

### Jour J

- [ ] Test connexion visio 15 min avant
- [ ] App mobile chargée et connectée
- [ ] Deck présentation ouvert
- [ ] Vidéo démo prête (backup si démo live bug)
- [ ] Notes sous les yeux
- [ ] Bouteille d'eau à portée 😊

---

## Après la Démo

### Suivi Immédiat (Jour J + 1)

**Email de remerciement** :

```
Objet : Merci pour votre temps - SOS Cotation

Bonjour [Prénom],

Je vous remercie pour le temps que vous m'avez accordé hier et pour
vos retours très constructifs.

Comme convenu, vous trouverez en pièce jointe :
- Documentation technique complète
- Vidéo de démo (lien)
- Proposition commerciale détaillée

Je reste bien sûr à votre disposition pour toute question complémentaire
ou pour organiser une session de tests avec vos équipes.

Dans l'attente de vos retours,

Cordialement,
[Votre nom]
```

### Relances

- **J+7** : Si pas de nouvelle, relance douce
- **J+14** : Proposition d'essai pilote avec autre association SOS
- **J+30** : Dernier email, puis laisser la porte ouverte

---

## Plan B : Autres Partenaires Potentiels

Si Stellair pas intéressé :

1. **Cegedim RX (groupe Cegedim)**
   - Logiciels médicaux ambulatoires

2. **CompuGroup Medical (CGM)**
   - Leader européen logiciels médicaux

3. **Maiia (Doctolib)**
   - Solutions pour professionnels de santé

4. **Inzee Care**
   - Logiciels pour médecins libéraux

5. **Vente directe aux associations SOS Médecins**
   - Modèle SaaS : 50-100 €/médecin/an

---

**Dernière mise à jour** : Novembre 2024
**Statut** : Guide complet - Prêt pour Phase 7
