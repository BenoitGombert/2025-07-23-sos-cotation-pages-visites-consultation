# Conformité RGPD - Plan A'

## Principe fondamental : Pas de données patients

🎯 **Stratégie** : L'application NE stocke AUCUNE identité patient, ce qui simplifie drastiquement la conformité RGPD.

---

## Données Traitées

### ✅ Données personnelles stockées (RGPD applicable)

#### Médecins uniquement
```
Catégorie : Données personnelles simples
Base légale : Consentement + Intérêt légitime

Données collectées :
- Email (identifiant de connexion)
- Nom et prénom
- Mot de passe (hashé bcrypt)
- Date création compte

Finalité : Authentification et envoi factures
Durée conservation : Compte actif + 12 mois après dernière connexion
Destinataires : Le médecin uniquement
```

### ✅ Données métier anonymes (pas de RGPD stricte)

```
Catégorie : Données professionnelles anonymes
Base légale : Intérêt légitime

Données collectées :
- Codes actes NGAP (G, VG, MEG, etc.)
- Montants calculés (€)
- Dates/heures visites
- Noms établissements/communes (données publiques)
- Documents scannés (sans identité patient)

Finalité : Calcul cotations et génération factures
Durée conservation : 12 mois maximum
Destinataires : Le médecin propriétaire uniquement
```

### ❌ Données NON collectées

```
❌ Nom patient
❌ Prénom patient
❌ Date naissance patient
❌ Numéro Sécurité Sociale
❌ Adresse patient
❌ Diagnostic/pathologie
❌ Traitement médical
❌ Toute donnée de santé à caractère personnel
```

---

## Obligations RGPD Applicables

### 1. Registre des Traitements (Article 30)

**Obligation** : Documenter les traitements de données

#### Traitement 1 : Gestion comptes médecins

```
Nom du traitement : Gestion des comptes utilisateurs médecins
Responsable de traitement : [Votre nom/SOS Médecins Saint-Malo]
Finalité : Authentification et accès à l'application
Catégories de données : Email, nom, mot de passe hashé
Catégories de personnes : Médecins utilisateurs
Destinataires : Médecin uniquement
Durée de conservation : Compte actif + 12 mois
Mesures de sécurité :
  - Mots de passe hashés (bcrypt)
  - Authentification JWT
  - HTTPS obligatoire
  - Chiffrement base de données
Transfert hors UE : Non
```

#### Traitement 2 : Génération factures pré-remplies

```
Nom du traitement : Assistance calcul cotations médicales
Responsable de traitement : [Votre nom/SOS Médecins Saint-Malo]
Finalité : Génération factures médicales pré-remplies
Catégories de données : Actes NGAP, montants, dates (ANONYMES)
Catégories de personnes : Médecins utilisateurs
Destinataires : Médecin uniquement
Durée de conservation : 12 mois maximum (auto-suppression)
Mesures de sécurité :
  - Données anonymes (pas d'identité patient)
  - Chiffrement stockage local mobile
  - Accès authentifié uniquement
Transfert hors UE : Non
```

**📄 Template registre** : Voir annexe ci-dessous

---

### 2. Information des Personnes (Articles 13-14)

**Obligation** : Politique de confidentialité claire

#### Contenu minimum obligatoire

```markdown
# Politique de Confidentialité - SOS Cotation

## Responsable de traitement
[Votre nom ou SOS Médecins Saint-Malo]
Email : [contact]

## Données collectées
Nous collectons uniquement :
- Email et nom (médecins utilisateurs)
- Données professionnelles anonymes (actes NGAP, montants)

Nous NE collectons AUCUNE donnée patient.

## Finalités
- Authentification sécurisée
- Calcul automatisé de cotations médicales
- Génération factures pré-remplées
- Envoi factures par email

## Base légale
- Consentement (inscription)
- Intérêt légitime (amélioration du service)

## Destinataires
Vos données sont accessibles uniquement par vous.
Aucun partage avec des tiers.

## Durée de conservation
- Compte actif : illimitée
- Compte inactif : suppression après 12 mois
- Factures brouillon : suppression automatique après 12 mois

## Vos droits
Conformément au RGPD, vous disposez des droits suivants :
- Droit d'accès à vos données
- Droit de rectification
- Droit de suppression
- Droit d'opposition
- Droit à la portabilité

Pour exercer vos droits : [email contact]

## Sécurité
- Mots de passe chiffrés (bcrypt)
- Connexion sécurisée HTTPS
- Authentification JWT
- Données chiffrées au repos

## Hébergement
- Backend : Railway/Render (UE)
- Base de données : Supabase (UE)
- Emails : Brevo (UE/France)

## Contact
Pour toute question : [email]

Dernière mise à jour : [Date]
```

**📍 Affichage** : À l'inscription + lien dans paramètres app

---

### 3. Consentement (Article 7)

**Obligation** : Consentement explicite et éclairé

#### Interface inscription

```
┌─────────────────────────────────────────────┐
│        INSCRIPTION - SOS Cotation           │
├─────────────────────────────────────────────┤
│                                             │
│  Email : [___________________]              │
│  Nom : [___________________]                │
│  Mot de passe : [___________________]       │
│                                             │
│  ☐ J'ai lu et j'accepte la politique       │
│     de confidentialité                      │
│                                             │
│  ☐ J'accepte de recevoir les factures       │
│     générées par email                      │
│                                             │
│  [  CRÉER MON COMPTE  ]                     │
│                                             │
└─────────────────────────────────────────────┘
```

**Code** :
```typescript
const [acceptPrivacy, setAcceptPrivacy] = useState(false);
const [acceptEmails, setAcceptEmails] = useState(false);

const handleRegister = async () => {
  if (!acceptPrivacy) {
    alert('Veuillez accepter la politique de confidentialité');
    return;
  }

  await registerUser({
    email,
    nom,
    password,
    consentements: {
      privacy: acceptPrivacy,
      emails: acceptEmails,
      date: new Date().toISOString()
    }
  });
};
```

---

### 4. Sécurité (Article 32)

**Obligation** : Mesures techniques et organisationnelles appropriées

#### Mesures implémentées

##### Backend
```typescript
✅ Mots de passe hashés (bcrypt - 10 rounds)
✅ Authentification JWT (expiration 7 jours)
✅ HTTPS/TLS 1.3 obligatoire
✅ Rate limiting (100 req/15min par IP)
✅ Validation inputs (Zod schemas)
✅ CORS restrictif (origins autorisées uniquement)
✅ Logs d'accès (traçabilité)
✅ Variables env sécurisées (secrets non commitées)
```

##### Mobile
```typescript
✅ Stockage local chiffré (AES-256)
✅ Tokens JWT sécurisés (Preferences chiffrées)
✅ Pas de données sensibles en clair
✅ Timeout session automatique (7 jours)
✅ Certificat SSL pinning (optionnel renforcé)
```

##### Base de données
```sql
✅ Chiffrement au repos (Supabase par défaut)
✅ Chiffrement en transit (TLS)
✅ Accès restreint par credentials
✅ Backups automatiques chiffrés
✅ Row Level Security (RLS) activé
```

**Exemple RLS Supabase** :
```sql
-- Politique : Un médecin ne voit que ses propres factures
ALTER TABLE factures_brouillon ENABLE ROW LEVEL SECURITY;

CREATE POLICY "medecins_own_factures"
ON factures_brouillon
FOR ALL
USING (medecin_id = auth.uid());
```

---

### 5. Droits des Personnes (Articles 15-22)

**Obligation** : Permettre l'exercice des droits RGPD

#### Implémentation technique

##### Droit d'accès (Article 15)
```
Endpoint : GET /api/medecins/me/data
Réponse : Export JSON toutes données médecin
Délai : Immédiat (automatique)
```

```typescript
// Route backend
app.get('/api/medecins/me/data', authMiddleware, async (req, res) => {
  const medecinData = await supabase
    .from('medecins')
    .select('email, nom, created_at')
    .eq('id', req.userId)
    .single();

  const factures = await supabase
    .from('factures_brouillon')
    .select('*')
    .eq('medecin_id', req.userId);

  res.json({
    medecin: medecinData.data,
    factures: factures.data,
    export_date: new Date().toISOString()
  });
});
```

##### Droit de rectification (Article 16)
```
Endpoint : PUT /api/medecins/me
Body : { nom?: string, email?: string }
```

```typescript
app.put('/api/medecins/me', authMiddleware, async (req, res) => {
  const { nom, email } = req.body;

  const { data, error } = await supabase
    .from('medecins')
    .update({ nom, email, updated_at: new Date() })
    .eq('id', req.userId);

  res.json({ success: true, medecin: data });
});
```

##### Droit de suppression (Article 17)
```
Endpoint : DELETE /api/medecins/me
```

```typescript
app.delete('/api/medecins/me', authMiddleware, async (req, res) => {
  // Suppression cascade (factures liées supprimées auto)
  await supabase
    .from('medecins')
    .delete()
    .eq('id', req.userId);

  res.json({ success: true, message: 'Compte supprimé' });
});
```

**Interface mobile** :
```
Paramètres > Mes données
  - [Télécharger mes données]
  - [Modifier mes informations]
  - [Supprimer mon compte] (confirmation requise)
```

##### Droit à la portabilité (Article 20)
```
Format : JSON ou CSV
Contenu : Toutes données médecin + factures
```

```typescript
app.get('/api/medecins/me/export', authMiddleware, async (req, res) => {
  const format = req.query.format || 'json'; // json ou csv

  const data = await getAllMedecinData(req.userId);

  if (format === 'csv') {
    res.setHeader('Content-Type', 'text/csv');
    res.send(convertToCSV(data));
  } else {
    res.json(data);
  }
});
```

---

### 6. Violation de Données (Articles 33-34)

**Obligation** : Notification CNIL sous 72h en cas de fuite

#### Procédure d'incident

```
1. DÉTECTION (immédiate)
   └─> Monitoring Sentry/logs
   └─> Alerte automatique

2. ÉVALUATION (< 24h)
   └─> Gravité de la fuite
   └─> Données concernées
   └─> Nombre de personnes impactées

3. NOTIFICATION CNIL (< 72h)
   └─> Via teleservices.cnil.fr
   └─> Formulaire notification violation

4. INFORMATION PERSONNES (si risque élevé)
   └─> Email aux médecins concernés
   └─> Mesures correctives

5. DOCUMENTATION
   └─> Registre des violations
   └─> Mesures prises
```

**Template email notification** :
```
Objet : Information importante - Sécurité de vos données

Bonjour Dr [Nom],

Nous vous informons qu'un incident de sécurité a affecté notre service
SOS Cotation le [date].

Nature de l'incident : [Description]
Données concernées : [Préciser]
Risque pour vous : [Évaluation]

Mesures prises immédiatement :
- [Action 1]
- [Action 2]

Recommandations :
- Changez votre mot de passe
- [Autres conseils]

Pour toute question : [contact]

Cordialement,
L'équipe SOS Cotation
```

---

### 7. Sous-traitants (Article 28)

**Obligation** : Contrat de sous-traitance avec fournisseurs

#### Sous-traitants identifiés

| Fournisseur | Service | Données traitées | Localisation |
|-------------|---------|-----------------|--------------|
| **Supabase** | Base de données | Emails, noms, factures | UE (Irlande) |
| **Railway/Render** | Hébergement backend | Aucune directe | UE/US (à vérifier) |
| **Brevo** | Envoi emails | Emails médecins | UE (France) |

**Action requise** : Vérifier DPA (Data Processing Agreement) de chaque fournisseur

**Supabase** : ✅ DPA conforme RGPD disponible
**Brevo** : ✅ DPA conforme RGPD disponible
**Railway** : ⚠️ À vérifier (privilégier région EU)

---

## Checklist Conformité RGPD

### Avant lancement

#### Documentation
- [ ] Registre des traitements rédigé
- [ ] Politique de confidentialité créée
- [ ] Mentions légales app rédigées
- [ ] Procédure violation de données définie

#### Technique
- [ ] Mots de passe hashés (bcrypt)
- [ ] Authentification JWT implémentée
- [ ] HTTPS activé (certificat SSL)
- [ ] Chiffrement stockage local mobile
- [ ] Rate limiting configuré
- [ ] Validation inputs (Zod)
- [ ] Logs sécurisés (pas d'emails/passwords)

#### Interface utilisateur
- [ ] Consentement explicite à l'inscription
- [ ] Lien politique de confidentialité visible
- [ ] Page "Mes données" (accès, rectification, suppression)
- [ ] Export données disponible

#### Données
- [ ] Auto-suppression factures > 12 mois implémentée
- [ ] Pas de stockage identité patients (vérification code)
- [ ] Row Level Security activé (Supabase)

#### Juridique
- [ ] DPA Supabase signé/accepté
- [ ] DPA Brevo signé/accepté
- [ ] CGU rédigées (optionnel mais recommandé)

---

## Différences avec hébergement HDS

### Votre situation (Plan A')

| Aspect | Requis | Justification |
|--------|--------|---------------|
| **Hébergement HDS** | ❌ NON | Pas de données de santé patients |
| **AIPD obligatoire** | ⚠️ Recommandée | Traitement simple, risques faibles |
| **DPO** | ❌ NON | Pas de traitement grande échelle |
| **Certification** | ❌ NON | Données personnelles simples |
| **Budget conformité** | **0€** | Tout fait en interne |

### Avec données patients (comparaison)

| Aspect | Requis | Coût estimé |
|--------|--------|-------------|
| **Hébergement HDS** | ✅ OUI | 100€/mois |
| **AIPD obligatoire** | ✅ OUI | 500-1000€ |
| **DPO** | ✅ OUI | 1200-2400€/an |
| **Audit sécurité** | ✅ OUI | 2000-5000€ |
| **Budget conformité** | **~5000€/an** | |

---

## Annexe : Template Registre

```markdown
# REGISTRE DES ACTIVITÉS DE TRAITEMENT

## Responsable de traitement
Nom : [Votre nom ou SOS Médecins Saint-Malo]
Adresse : [Adresse]
Email : [Contact]
Téléphone : [Numéro]

## Traitement n°1 : Gestion comptes médecins

**Finalité** : Authentification et accès sécurisé à l'application

**Base légale** : Consentement (Article 6.1.a RGPD)

**Catégories de données** :
- Données d'identification : Email, nom, prénom
- Données de connexion : Mot de passe hashé, date création compte

**Catégories de personnes concernées** :
- Médecins utilisateurs de l'application

**Catégories de destinataires** :
- Le médecin concerné uniquement
- Sous-traitant technique : Supabase (hébergement base de données)

**Transferts hors UE** : Non

**Délai de conservation** :
- Compte actif : Durée d'utilisation
- Compte inactif : Suppression après 12 mois d'inactivité

**Mesures de sécurité** :
- Chiffrement mots de passe (bcrypt, 10 rounds)
- Authentification JWT (expiration 7 jours)
- HTTPS/TLS 1.3 obligatoire
- Chiffrement base de données au repos
- Rate limiting anti-brute force
- Logs d'accès sécurisés

---

## Traitement n°2 : Génération factures pré-remplies

**Finalité** : Assistance au calcul de cotations médicales et génération de factures

**Base légale** : Intérêt légitime (Article 6.1.f RGPD)

**Catégories de données** :
- Données professionnelles : Codes actes NGAP, montants calculés
- Données contextuelles : Dates visites, noms établissements/communes
- Documents : Scans documents établissements (sans identité patient)

**Catégories de personnes concernées** :
- Médecins utilisateurs

**Catégories de destinataires** :
- Le médecin concerné uniquement
- Sous-traitant email : Brevo (envoi factures)

**Transferts hors UE** : Non

**Délai de conservation** :
- Factures brouillon : 12 mois maximum (suppression automatique)

**Mesures de sécurité** :
- Données anonymes (AUCUNE identité patient stockée)
- Chiffrement stockage local mobile (AES-256)
- Accès authentifié uniquement
- Row Level Security base de données

---

Date de création du registre : [Date]
Dernière mise à jour : [Date]
```

---

## Ressources Officielles

- **CNIL - Guide RGPD** : https://www.cnil.fr/fr/rgpd-de-quoi-parle-t-on
- **CNIL - Registre des traitements** : https://www.cnil.fr/fr/RGDP-le-registre-des-activites-de-traitement
- **CNIL - Notification violation** : https://www.cnil.fr/fr/notifier-une-violation-de-donnees-personnelles
- **CNIL - Modèle politique confidentialité** : https://www.cnil.fr/fr/modele/politique-de-confidentialite

---

**Dernière mise à jour** : Novembre 2024
**Statut** : Documentation complète - Prêt pour implémentation
