# Budget Détaillé - Plan A'

## Vue d'ensemble

Le Plan A' a été conçu pour **minimiser les coûts** grâce à une architecture simple et l'utilisation de services gratuits/freemium.

**Budget total estimé Année 1 : 130 €**

---

## Coûts Développement

### Infrastructure & Hébergement

| Service | Plan | Coût mensuel | Coût annuel |
|---------|------|--------------|-------------|
| **Backend Hébergement** | Railway/Render Free | 0 € | 0 € |
| **Base de données** | Supabase Free (500 MB) | 0 € | 0 € |
| **Envoi Emails** | Brevo Free (300/jour) | 0 € | 0 € |
| **Stockage Fichiers** | Supabase Storage Free | 0 € | 0 € |
| **Certificat SSL** | Let's Encrypt | 0 € | 0 € |
| **TOTAL Infrastructure** | | **0 €/mois** | **0 €/an** |

#### Détails services gratuits

**Railway/Render Free** :
- 500 heures/mois (suffisant pour petite app)
- 512 MB RAM
- Arrêt auto après inactivité (redémarre au 1er appel)
- Limitations : OK pour beta/MVP

**Supabase Free** :
- 500 MB base PostgreSQL
- 1 GB stockage fichiers
- 50 000 requêtes API/mois
- 2 GB bandwidth
- Limitations : Largement suffisant pour début

**Brevo Free** :
- 300 emails/jour
- 9000 emails/mois
- Templates illimités
- API complète
- Limitations : OK pour usage SOS Saint-Malo (estimé 100-200 emails/mois)

---

### Outils Développement

| Outil | Coût |
|-------|------|
| Visual Studio Code | Gratuit |
| Git / GitHub | Gratuit |
| Node.js | Gratuit |
| Android Studio | Gratuit |
| Xcode (Mac) | Gratuit |
| Postman (tests API) | Gratuit |
| **TOTAL Outils** | **0 €** |

---

### Distribution App Mobile

| Plateforme | Type | Coût |
|------------|------|------|
| **Google Play Store** | One-time | **25 €** |
| **Apple App Store** | Annuel | **99 €/an** |

**Recommandation initiale** :
- ✅ Publier sur Google Play (25 € one-time)
- ⚠️ Reporter Apple App Store (économie 99 €)
- Alternative iOS temporaire : TestFlight (gratuit, 10 000 testeurs max)

**Budget distribution Année 1** :
- Google Play : 25 €
- iOS (optionnel) : 99 €
- **Total recommandé : 25 €**
- **Total complet : 124 €**

---

### Domaine & DNS

| Service | Coût annuel |
|---------|-------------|
| Nom de domaine (.fr ou .com) | 10-15 € |
| DNS (Cloudflare Free) | 0 € |
| **TOTAL** | **~10 €/an** |

**Domaines suggérés** :
- sos-cotation.fr
- cotation-sos.fr
- factu-sos.fr

**Optionnel** : Pas obligatoire en Phase 1-6, utile pour email pro et démo Stellair

---

## Budget Total Année 1

### Scénario Minimum (Android uniquement)

| Catégorie | Coût |
|-----------|------|
| Infrastructure (hébergement, BDD, emails) | 0 € |
| Outils développement | 0 € |
| Google Play Store | 25 € |
| Nom de domaine (optionnel) | 10 € |
| **TOTAL ANNÉE 1** | **35 €** |

### Scénario Complet (Android + iOS)

| Catégorie | Coût |
|-----------|------|
| Infrastructure | 0 € |
| Outils | 0 € |
| Google Play Store | 25 € |
| Apple App Store | 99 € |
| Nom de domaine | 10 € |
| **TOTAL ANNÉE 1** | **134 €** |

---

## Coûts Optionnels

### Monitoring & Logs

| Service | Plan | Coût mensuel | Coût annuel |
|---------|------|--------------|-------------|
| **Sentry** (monitoring erreurs) | Free (5k events/mois) | 0 € | 0 € |
| **LogRocket** (session replay) | Free (1k sessions/mois) | 0 € | 0 € |
| **TOTAL** | | **0 €** | **0 €** |

### Design & Assets

| Service | Coût |
|---------|------|
| Figma Free (design UI) | 0 € |
| Canva Free (icônes, logos) | 0 € |
| Unsplash (photos) | 0 € |
| **TOTAL** | **0 €** |

### Marketing & Communication

| Service | Coût |
|---------|------|
| Email professionnel (Google Workspace) | 6 €/mois (optionnel) |
| LinkedIn Premium (networking) | 30 €/mois (optionnel) |
| Carte de visite (50 pcs) | 20 € (optionnel) |

**Recommandation** : Pas nécessaire en Phase 1-6, reporter à Phase 7 (approche Stellair)

---

## Évolution Coûts si Croissance

### Seuils dépassement plans gratuits

#### Backend (Railway/Render)

**Si dépassement 500h/mois (usage intensif 24/7)** :

| Plan | Coût mensuel | Capacités |
|------|--------------|-----------|
| Railway Starter | 5 $/mois | 500h + 1 GB RAM |
| Railway Developer | 20 $/mois | Illimité + 8 GB RAM |
| Render Starter | 7 $/mois | Illimité + 512 MB RAM |

**Estimation** : Dépassement probable à partir de 50+ utilisateurs actifs quotidiens

#### Base de données (Supabase)

**Si dépassement 500 MB ou 50k requêtes/mois** :

| Plan | Coût mensuel | Capacités |
|------|--------------|-----------|
| Supabase Pro | 25 $/mois | 8 GB BDD + 50 GB bandwidth + 500k requêtes |

**Estimation** : Dépassement probable à partir de 100+ utilisateurs avec historique 12 mois

#### Emails (Brevo)

**Si dépassement 300 emails/jour** :

| Plan | Coût mensuel | Capacités |
|------|--------------|-----------|
| Brevo Starter | 25 €/mois | 20k emails/mois |
| Brevo Business | 65 €/mois | 100k emails/mois |

**Estimation** : Dépassement probable à partir de 50+ médecins envoyant 2-3 factures/jour

---

## Comparaison : Plan A' vs Hébergement HDS

### Plan A' (sans données patients)

| Poste | Année 1 | Années suivantes |
|-------|---------|------------------|
| Infrastructure | 0 € | 0-50 €/mois (si croissance) |
| Distribution app | 35-134 € | 99 €/an (iOS) |
| Conformité RGPD | 0 € | 0 € |
| Juridique/DPO | 0 € | 0 € |
| **TOTAL** | **35-134 €** | **100-700 €/an** |

### Plan HDS (avec données patients)

| Poste | Année 1 | Années suivantes |
|-------|---------|------------------|
| Hébergement HDS | 1200 €/an | 1200 €/an |
| Base données HDS | 360 €/an | 360 €/an |
| Stockage fichiers HDS | 180 €/an | 180 €/an |
| Distribution app | 134 € | 99 €/an |
| AIPD initiale | 500-1000 € | 0 € |
| DPO externalisé | 1200-2400 €/an | 1200-2400 €/an |
| Audit sécurité | 2000 € | 500 €/an (suivi) |
| **TOTAL** | **5500-7300 €** | **3500-4200 €/an** |

**Économie Plan A'** : **5400-7200 € la première année**

---

## ROI (Retour sur Investissement)

### Scénario : Vente à Stellair

**Investissement** :
- Temps développement : 3-4 mois (votre temps)
- Budget cash : 35-134 €

**Retour estimé** :
- Licence exclusive : 35 000 - 70 000 € (sur 3 ans)
- Rachat : 45 000 - 100 000 €

**ROI** : **25 000x à 75 000x** (retour sur budget cash)

### Scénario : Vente directe SOS Médecins

**Modèle SaaS** :
- Prix : 50 €/médecin/an
- 1 association (10 médecins) : 500 €/an
- 10 associations : 5 000 €/an
- 50 associations : 25 000 €/an

**Coûts variables** :
- Infrastructure : 50-100 €/mois (si 50+ associations)
- Support utilisateurs : 5-10h/mois (votre temps)

**Bénéfice net estimé (50 associations)** :
- Revenus : 25 000 €/an
- Coûts : 1200 €/an (infrastructure)
- **Net : ~23 800 €/an**

---

## Recommandations Financières

### Phase 1-6 (Développement)

**Budget à prévoir** :
```
Minimum (Android uniquement) : 35 €
Recommandé (Android + domaine) : 45 €
Complet (Android + iOS + domaine) : 134 €
```

**Stratégie** :
- ✅ Commencer avec plan minimum (35 €)
- ✅ Ajouter domaine avant Phase 7 (démo Stellair)
- ⚠️ Reporter iOS si budget serré (TestFlight gratuit suffit)

### Phase 7 (Approche Stellair)

**Budget marketing/comm** :
```
Email pro (Google Workspace) : 6 €/mois × 3 mois = 18 €
LinkedIn Premium (optionnel) : 30 €/mois × 2 mois = 60 €
Carte de visite (optionnel) : 20 €
TOTAL : ~100 €
```

**Retour attendu** : 30 000 - 60 000 € (si négociation réussie)

---

## Suivi Budget

### Template Tableau de Suivi

```
| Date | Poste | Fournisseur | Montant | Statut |
|------|-------|-------------|---------|--------|
| 2024-12 | Google Play | Google | 25 € | Payé |
| 2025-01 | Domaine | OVH | 10 € | Payé |
| 2025-02 | Apple Store | Apple | 99 € | Optionnel |
| TOTAL | | | 134 € | |
```

### Alertes Dépassement

**Supabase** :
- ✅ Configurer alertes à 80% usage (400 MB BDD, 40k requêtes)
- 📧 Notification email automatique

**Brevo** :
- ✅ Suivre statistiques envois quotidiens
- ⚠️ Alert si > 250 emails/jour (proche limite 300)

**Railway/Render** :
- ✅ Dashboard heures utilisées/mois
- ⚠️ Alert si > 400h (proche limite 500h)

---

## Financement Potentiel

### Si besoin de financement initial

#### France Travail (Pôle Emploi)
- ACRE (Aide à la Création d'Entreprise)
- ARCE (versement capital allocations)

#### Bpifrance
- Prêt d'honneur (0% intérêt, 10-50k€)
- Subventions innovation

#### Régions
- Aides régionales création entreprise innovante
- Chèques numériques

**Note** : Votre projet nécessite si peu d'investissement qu'un financement n'est probablement pas nécessaire.

---

## Conclusion Budget

### Points clés

✅ **Budget initial très faible** : 35-134 €
✅ **Pas de coûts récurrents obligatoires** (grâce aux plans gratuits)
✅ **Scalabilité progressive** : payer uniquement si croissance
✅ **ROI potentiel exceptionnel** : 25 000x - 75 000x

### Comparaison alternatives

| Scénario | Budget Année 1 | Complexité | ROI potentiel |
|----------|----------------|------------|---------------|
| **Plan A' (choisi)** | **35-134 €** | ✅ Faible | ✅ Très élevé |
| Hébergement HDS | 5500-7300 € | ❌ Élevée | ⚠️ Moyen |
| Dev from scratch Stellair | 60 000-90 000 € | ❌ Très élevée | N/A |

**Verdict** : Le Plan A' est **économiquement optimal** pour votre situation.

---

## Checklist Budget

### Avant démarrage
- [ ] Créer compte Supabase (gratuit)
- [ ] Créer compte Railway/Render (gratuit)
- [ ] Créer compte Brevo (gratuit)
- [ ] Créer compte GitHub (gratuit, si pas déjà fait)

### Phase 2 (Capacitor)
- [ ] Installer Android Studio (gratuit)
- [ ] Créer compte développeur Google Play (25 €)
- [ ] (Optionnel) Créer compte développeur Apple (99 €)

### Phase 7 (Stellair)
- [ ] Acheter nom de domaine (10 €)
- [ ] (Optionnel) Google Workspace (18 € pour 3 mois)
- [ ] (Optionnel) LinkedIn Premium (60 € pour 2 mois)

---

**Dernière mise à jour** : Novembre 2024
**Budget total estimé Année 1** : **35-134 €**
