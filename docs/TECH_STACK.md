# Stack Technique - Plan A'

## Architecture Globale

```
┌─────────────────────────────────────────────────────────┐
│                  MOBILE (Frontend)                       │
│  React 19 + TypeScript + Vite + Capacitor              │
│  - Interface utilisateur                                │
│  - Calculs cotation locaux                              │
│  - Scan OCR                                             │
│  - Génération factures                                  │
│  - Stockage local sécurisé                              │
└────────────────┬────────────────────────────────────────┘
                 │
                 │ HTTPS/TLS 1.3
                 │ REST API (JSON)
                 │
┌────────────────▼────────────────────────────────────────┐
│                  BACKEND (API)                           │
│  Node.js + Express                                      │
│  - Authentification JWT                                 │
│  - Gestion médecins                                     │
│  - Stockage factures brouillons                         │
│  - Envoi emails                                         │
└────────────────┬────────────────────────────────────────┘
                 │
                 │
┌────────────────▼────────────────────────────────────────┐
│              BASE DE DONNÉES                             │
│  PostgreSQL (via Supabase)                              │
│  - Table medecins                                       │
│  - Table factures_brouillon                             │
│  - PAS de table patients ❌                             │
└─────────────────────────────────────────────────────────┘
```

---

## Frontend Mobile

### Technologies Core

| Technologie | Version | Rôle |
|-------------|---------|------|
| **React** | 19.1.0 | Framework UI |
| **TypeScript** | 5.8+ | Typage statique |
| **Vite** | 7.0+ | Build tool |
| **Capacitor** | 5.x | Transformation en app native |

### Plugins Capacitor

```json
{
  "@capacitor/core": "^5.0.0",
  "@capacitor/android": "^5.0.0",
  "@capacitor/ios": "^5.0.0",
  "@capacitor/camera": "^5.0.0",
  "@capacitor/filesystem": "^5.0.0",
  "@capacitor/share": "^5.0.0",
  "@capacitor/preferences": "^5.0.0"
}
```

### Librairies Fonctionnelles

#### OCR (Reconnaissance texte)
```json
{
  "tesseract.js": "^5.0.0"
}
```

**Usage** :
```typescript
import Tesseract from 'tesseract.js';

const scanDocument = async (imageUri: string) => {
  const { data: { text } } = await Tesseract.recognize(
    imageUri,
    'fra',  // Langue française
    {
      logger: (m) => console.log('OCR Progress:', m)
    }
  );
  return text;
};
```

#### Génération Documents

```json
{
  "docxtemplater": "^3.40.0",
  "pizzip": "^3.1.6"
}
```

**Usage** :
```typescript
import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';

const generateWordInvoice = async (data: CotationData) => {
  const templateBuffer = await fetch('/assets/facture_template.docx')
    .then(res => res.arrayBuffer());

  const zip = new PizZip(templateBuffer);
  const doc = new Docxtemplater(zip, { paragraphLoop: true });

  doc.render({
    date: new Date().toLocaleDateString('fr-FR'),
    medecin: currentUser.nom,
    actes: data.actes.join(' + '),
    total: data.total.toFixed(2),
    amo: data.amo.toFixed(2),
    amc: data.amc.toFixed(2),
    // Champs vides pour le médecin
    nomPatient: '___________________',
    prenomPatient: '___________________',
  });

  return doc.getZip().generate({ type: 'blob' });
};
```

#### Stockage Local Sécurisé

```typescript
import { Preferences } from '@capacitor/preferences';
import CryptoJS from 'crypto-js';

// Chiffrement avant stockage
const storeSecure = async (key: string, data: any, secret: string) => {
  const encrypted = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    secret
  ).toString();

  await Preferences.set({ key, value: encrypted });
};

// Déchiffrement à la lecture
const retrieveSecure = async (key: string, secret: string) => {
  const { value } = await Preferences.get({ key });
  if (!value) return null;

  const bytes = CryptoJS.AES.decrypt(value, secret);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};
```

### Structure Projet Frontend

```
src/
├── main.tsx                 # Entry point + Capacitor init
├── App.tsx                  # Router principal
├── pages/
│   ├── LoginPage.tsx        # Authentification
│   ├── CotationPage.tsx     # Calculs (existant)
│   ├── EtablissementsPage.tsx  # Établissements (existant)
│   ├── ScanPage.tsx         # 🆕 Scan OCR documents
│   ├── FacturePage.tsx      # 🆕 Génération factures
│   └── HistoriquePage.tsx   # 🆕 Historique factures (12 mois)
├── components/
│   ├── Button.module.css    # Styles (existant)
│   ├── Camera.tsx           # 🆕 Composant caméra
│   ├── OCRViewer.tsx        # 🆕 Affichage résultats OCR
│   └── InvoicePreview.tsx   # 🆕 Prévisualisation facture
├── services/
│   ├── api.ts               # 🆕 Client API backend
│   ├── auth.ts              # 🆕 Gestion authentification
│   ├── ocr.ts               # 🆕 Service OCR
│   └── invoice.ts           # 🆕 Génération factures
├── data/
│   ├── etablissementsData.ts  # Données (existant)
│   └── visiteConsultationData.ts  # Données (existant)
├── types/
│   ├── api.types.ts         # 🆕 Types API
│   └── invoice.types.ts     # 🆕 Types factures
└── assets/
    └── facture_template.docx  # 🆕 Template Word
```

---

## Backend API

### Technologies

| Technologie | Version | Rôle |
|-------------|---------|------|
| **Node.js** | 20 LTS | Runtime JavaScript |
| **Express** | 4.x | Framework web |
| **TypeScript** | 5.x | Typage backend |
| **Supabase Client** | 2.x | Client PostgreSQL |
| **JWT** | 9.x | Authentification |
| **bcrypt** | 5.x | Hash mots de passe |

### Structure Projet Backend

```
backend/
├── src/
│   ├── index.ts              # Entry point
│   ├── config/
│   │   ├── database.ts       # Config Supabase
│   │   └── env.ts            # Variables environnement
│   ├── middleware/
│   │   ├── auth.ts           # Vérification JWT
│   │   └── validation.ts     # Validation inputs
│   ├── routes/
│   │   ├── auth.routes.ts    # Routes authentification
│   │   ├── factures.routes.ts  # Routes factures
│   │   └── medecins.routes.ts  # Routes médecins
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── factures.controller.ts
│   │   └── medecins.controller.ts
│   ├── services/
│   │   ├── email.service.ts  # Envoi emails (Brevo)
│   │   └── storage.service.ts  # Stockage fichiers
│   └── types/
│       └── index.ts          # Types TypeScript
├── package.json
├── tsconfig.json
└── .env.example
```

### Routes API

#### Authentification

```typescript
POST /api/auth/register
Body: {
  email: string,
  nom: string,
  password: string
}
Response: {
  user: { id, email, nom },
  token: string
}

POST /api/auth/login
Body: {
  email: string,
  password: string
}
Response: {
  user: { id, email, nom },
  token: string
}

GET /api/auth/me
Headers: { Authorization: Bearer <token> }
Response: {
  user: { id, email, nom }
}
```

#### Factures

```typescript
POST /api/factures
Headers: { Authorization: Bearer <token> }
Body: {
  date_visite: string,
  type_acte: string,
  actes: object,
  etablissement?: string,
  commune?: string
}
Response: {
  facture: { id, ... }
}

GET /api/factures
Headers: { Authorization: Bearer <token> }
Query: { limit?: number, offset?: number }
Response: {
  factures: [...],
  total: number
}

POST /api/factures/:id/send
Headers: { Authorization: Bearer <token> }
Body: {
  fichierBase64: string,
  nomFichier: string
}
Response: {
  success: boolean,
  messageId: string
}

DELETE /api/factures/:id
Headers: { Authorization: Bearer <token> }
Response: {
  success: boolean
}
```

### Schéma Base de Données

```sql
-- Table médecins
CREATE TABLE medecins (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  nom VARCHAR(100) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_medecins_email ON medecins(email);

-- Table factures brouillon (SANS données patients)
CREATE TABLE factures_brouillon (
  id SERIAL PRIMARY KEY,
  medecin_id INTEGER REFERENCES medecins(id) ON DELETE CASCADE,
  date_visite TIMESTAMP NOT NULL,
  type_acte VARCHAR(50),
  actes JSONB NOT NULL,  -- {actes: ['G', 'MEG'], montants: {...}}
  etablissement VARCHAR(200),
  commune VARCHAR(100),
  document_url TEXT,  -- URL fichier généré (S3/local)
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_factures_medecin ON factures_brouillon(medecin_id);
CREATE INDEX idx_factures_date ON factures_brouillon(date_visite);

-- Fonction auto-suppression après 12 mois
CREATE OR REPLACE FUNCTION delete_old_factures()
RETURNS void AS $$
BEGIN
  DELETE FROM factures_brouillon
  WHERE created_at < NOW() - INTERVAL '12 months';
END;
$$ LANGUAGE plpgsql;

-- Cron job (si Supabase supporte pg_cron)
-- Sinon : script Node.js avec cron externe
```

### Variables Environnement

```env
# .env
NODE_ENV=production
PORT=3000

# Supabase
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_KEY=your_supabase_key

# JWT
JWT_SECRET=your_super_secret_key_change_me
JWT_EXPIRES_IN=7d

# Brevo (Email)
BREVO_API_KEY=your_brevo_api_key
EMAIL_FROM=noreply@sos-cotation.fr
EMAIL_FROM_NAME=SOS Cotation

# CORS
ALLOWED_ORIGINS=capacitor://localhost,http://localhost:5173

# Sentry (optionnel - monitoring erreurs)
SENTRY_DSN=https://xxx@sentry.io/xxx
```

---

## Services Externes

### 1. Hébergement Backend

**Recommandation : Railway** (Gratuit jusqu'à 500h/mois)

**Alternatives** :
- Render (Gratuit avec limitations)
- Fly.io (Gratuit 3 apps)

**Configuration Railway** :
```bash
# Installation CLI
npm install -g @railway/cli

# Connexion
railway login

# Création projet
railway init

# Déploiement
railway up
```

### 2. Base de Données

**Recommandation : Supabase** (Gratuit jusqu'à 500 MB)

**Caractéristiques** :
- PostgreSQL managé
- Interface admin web
- API REST automatique
- Authentification intégrée (optionnelle)
- Stockage fichiers (500 MB gratuit)

**Setup** :
```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

// Exemple requête
const { data, error } = await supabase
  .from('medecins')
  .select('*')
  .eq('email', email)
  .single();
```

### 3. Envoi Emails

**Recommandation : Brevo (ex-Sendinblue)** (300 emails/jour gratuit)

**Setup** :
```typescript
import SibApiV3Sdk from '@sendinblue/client';

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
apiInstance.setApiKey(
  SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

const sendEmail = async (to: string, attachment: Buffer) => {
  const sendSmtpEmail = {
    to: [{ email: to }],
    sender: {
      email: process.env.EMAIL_FROM,
      name: process.env.EMAIL_FROM_NAME
    },
    subject: 'Facture pré-remplie SOS Médecins',
    htmlContent: `<p>Voici votre facture...</p>`,
    attachment: [{
      content: attachment.toString('base64'),
      name: 'facture.docx'
    }]
  };

  return await apiInstance.sendTransacEmail(sendSmtpEmail);
};
```

---

## Sécurité

### 1. Authentification

**JWT avec Refresh Tokens** :
```typescript
// Génération token
import jwt from 'jsonwebtoken';

const generateToken = (userId: number) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET!,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

// Vérification token (middleware)
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Non authentifié' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token invalide' });
  }
};
```

### 2. Hash Mots de Passe

```typescript
import bcrypt from 'bcrypt';

// Inscription
const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

// Connexion
const comparePassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};
```

### 3. Validation Inputs

```typescript
import { z } from 'zod';

const registerSchema = z.object({
  email: z.string().email(),
  nom: z.string().min(2).max(100),
  password: z.string().min(8).max(100)
});

// Usage
const validateRegister = (data: any) => {
  return registerSchema.parse(data);
};
```

### 4. CORS

```typescript
import cors from 'cors';

app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(','),
  credentials: true
}));
```

### 5. Rate Limiting

```typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // Max 100 requêtes par IP
});

app.use('/api/', limiter);
```

---

## Tests

### Frontend (Vitest)

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

```typescript
// src/__tests__/calculateTotal.test.ts
import { describe, it, expect } from 'vitest';
import { calculateTotal } from '../services/cotation';

describe('Calcul cotation', () => {
  it('calcule correctement une consultation simple', () => {
    const result = calculateTotal({
      typeActe: 'Consultation',
      periode: 'CDS',
      age: null,
      ecg: false
    });

    expect(result.total).toBe(30);
    expect(result.actes).toContain('G');
  });
});
```

### Backend (Jest)

```bash
npm install -D jest @types/jest ts-jest supertest
```

```typescript
// src/__tests__/auth.test.ts
import request from 'supertest';
import app from '../index';

describe('POST /api/auth/register', () => {
  it('crée un nouveau médecin', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'test@sos-medecins.fr',
        nom: 'Dr Test',
        password: 'password123'
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('token');
  });
});
```

---

## Build & Déploiement

### Frontend Mobile

```bash
# Développement
npm run dev

# Build production
npm run build

# Sync avec Capacitor
npx cap sync

# Build Android APK
npx cap open android
# Dans Android Studio : Build > Build Bundle(s) / APK(s) > Build APK(s)

# Build iOS (Mac uniquement)
npx cap open ios
# Dans Xcode : Product > Archive
```

### Backend

```bash
# Build TypeScript
npm run build

# Démarrage production
npm start

# Déploiement Railway
railway up

# Variables d'environnement
railway variables set JWT_SECRET=xxx
```

---

## Monitoring & Logs

### Sentry (Recommandé - Gratuit 5k events/mois)

```bash
npm install @sentry/node @sentry/react
```

**Backend** :
```typescript
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV
});

app.use(Sentry.Handlers.errorHandler());
```

**Frontend** :
```typescript
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: process.env.VITE_SENTRY_DSN,
  integrations: [new Sentry.BrowserTracing()],
  tracesSampleRate: 1.0
});
```

---

## Checklist Technique

### Avant Phase 1
- [ ] Node.js 20+ installé
- [ ] Compte Supabase créé
- [ ] Compte Railway/Render créé
- [ ] Git configuré

### Avant Phase 2
- [ ] Android Studio installé
- [ ] Émulateur Android configuré
- [ ] Xcode installé (si Mac/iOS)

### Avant Phase 3
- [ ] Autorisations caméra testées
- [ ] Tesseract.js testé sur device

### Avant Phase 4
- [ ] Template Word créé
- [ ] Tests génération locale

### Avant Phase 5
- [ ] Compte Brevo créé
- [ ] API Key Brevo obtenue
- [ ] Tests envoi emails

---

**Dernière mise à jour** : Novembre 2024
