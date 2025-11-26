# SOS Cotation - Architectural Overview

## Project Summary

**SOS Cotation** is a Progressive Web Application (PWA) built with React 19, TypeScript, and Vite. It's a medical billing calculation tool for "SOS Médecins Saint-Malo" (an on-call medical service) that helps calculate healthcare service quotations based on various parameters like visit type, time period, patient age, and facility category.

## High-Level Architecture

The application follows a simple component-based architecture with:
- **Single-Page Application (SPA)**: Client-side routing via state management
- **No external routing library**: Navigation handled through React state (custom router pattern)
- **No state management library**: All state managed at page/component level
- **Progressive Web App (PWA)**: Offline-capable with service worker and manifest
- **Static data**: All data (communes, establishments, quotation values) are TypeScript constants

## Directory Structure

```
src/
├── main.tsx                    # Entry point with PWA service worker registration
├── App.tsx                     # Main application shell with routing logic
├── vite-env.d.ts              # Vite environment type definitions
├── types.d.ts                 # Module declarations (CSS modules)
├── pages/                     # Page components (each represents a view)
│   ├── LoginPage.tsx          # Authentication gate (password-based)
│   ├── CotationPage.tsx       # Visits & Consultations quotation calculator
│   └── EtablissementsPage.tsx # Facilities quotation calculator
├── data/                      # Static data files (constants)
│   ├── visiteConsultationData.ts  # Quotation values & commune IK data
│   └── etablissementsData.ts      # Healthcare facilities registry
└── config/                    # Configuration files
    └── auth.ts                # Authentication credentials
└── components/
    └── Button.module.css      # Shared styling (CSS modules)
```

## Core Architectural Patterns

### 1. Manual Routing (No React Router)

**Location**: `src/App.tsx`

Instead of using React Router, the app uses a simple state-based routing pattern:
- Single `currentPage` state tracks which view to display: `'visites' | 'etablissements'`
- `isLoggedIn` state gates access to the entire application
- Page components receive props for state management and callbacks
- Navigation via button clicks that update state

```typescript
// App.tsx example
const [currentPage, setCurrentPage] = useState<Page>('visites');

// Conditional rendering of pages
{currentPage === 'visites' && <CotationPage ... />}
{currentPage === 'etablissements' && <EtablissementsPage ... />}
```

**Rationale**: Minimalist approach suitable for a small app with 3-4 views. No external dependencies needed.

### 2. Authentication Gate Pattern

**Location**: `src/pages/LoginPage.tsx`, `src/App.tsx`

The authentication is a simple password-based system:
1. User enters password on LoginPage
2. Password is verified against `AUTH_PASSWORD` from config
3. On success, `isAuthenticated` flag set in localStorage
4. App component checks localStorage on mount and controls conditional rendering
5. Logout clears localStorage and resets state

**Note**: This is suitable for internal tools but not secure for sensitive applications (password hardcoded in client code).

### 3. State Management Pattern

**Approach**: Local component state using React hooks (useState)

Each page component manages its own complex form state:

**CotationPage** manages:
- `typeActe`: 'Visite' or 'Consultation' selection
- `periode`: 'CDS' or 'PDS' (time periods)
- `regulation15`, `demandeSoignant`: Boolean flags for conditional logic
- `age`, `commune`, `ecg`: Additional options

**EtablissementsPage** manages:
- `choixInitial`: Initial selection (Foyer logement or Établissement)
- `communeSelectionnee`: Selected commune
- `etablissementSelectionne`: Selected facility
- `periodeSelectionnee`, `ageSelectionne`, `ecgActive`: Options

**Why**: Keeps state local and simple for this small app. No global state needed as pages operate independently.

### 4. Conditional Rendering Based on State

Both page components extensively use conditional rendering based on state combinations to show/hide relevant UI sections:

```typescript
// Show different sections based on typeActe and periode
{periode === 'CDS' && (
  <div>
    <h2>Régulation 15</h2>
    {/* Only shown in CDS period */}
  </div>
)}

{typeActe === 'Visite' && periode === 'CDS' && regulation15 === false && (
  <div>
    <h2>Demande d'un soignant</h2>
    {/* Only shown in specific combination */}
  </div>
)}
```

This creates a multi-step wizard-like experience where available options change based on prior selections.

### 5. Static Data Management

**Location**: `src/data/` directory

All application data is stored as TypeScript constant exports:

#### `visiteConsultationData.ts`
- `actesValues`: Object mapping act codes to their Euro values
- `communesIK`: Array of communes with their IK (Index de Kœnig) coefficients
- TypeScript interfaces for type safety

#### `etablissementsData.ts`
- `communesData`: Hierarchical structure (Communes > Établissements)
- `Établissement` interface with category (A-E) and optional details
- `Commune` interface grouping establishments by location
- Each establishment has metadata (billing type, contact email, special messages)

**Design**: Centralized data makes it easy to update without touching business logic. No database or API calls.

### 6. Calculation Logic Pattern

Both pages implement calculation functions that derive results from form state:

```typescript
// CotationPage example
const calculateTotal = () => {
  let totalHorsIK = 0;
  let actes: string[] = [];
  
  // Add base act values based on type
  if (typeActe === 'Consultation') {
    actes.push('G');
    totalHorsIK += actesValues.G;
  }
  
  // Conditionally add modifiers based on state
  if (periode === 'CDS' && regulation15) {
    actes.push('SNP');
    totalHorsIK += actesValues.SNP;
  }
  
  // Calculate split (AMO/AMC)
  const amo = (totalHorsIK * 0.7) + ikTotal;
  const amc = totalHorsIK * 0.3;
  
  return { total, actes, amo, amc };
};

// Called on every render, re-calculates based on current state
const { total, actes, amo, amc } = calculateTotal();
```

These are pure functions depending only on state, re-evaluated on every render.

## User Flow

### Primary Flows

#### 1. Visits/Consultations Quotation (CotationPage)
```
Login → Select Act Type (Visite/Consultation)
  → Select Period (CDS/PDS)
    → Select additional modifiers (age, ECG, regulation status, etc.)
      → Select commune (for Visite only, affects IK calculation)
        → View calculated total with AMO/AMC breakdown
```

#### 2. Facilities Quotation (EtablissementsPage)
```
Login → Select initial choice (Foyer logement or Établissement)
  [If Foyer logement]
    → Redirect to Visite with Saint-Malo preset
  [If Établissement]
    → Select commune
      → Select facility (filtered by commune)
        → View facility details (category-dependent UI)
          [If A/E categories]
            → Select period, age, ECG options
              → View calculated total
          [If other categories]
            → Show standard care instructions
              → Option to redirect to regular Visite quotation
```

### Pre-selection Pattern

Both pages support pre-selected values passed from navigation:
```typescript
// App.tsx passes pre-selected values when navigating
<CotationPage 
  preselectedActe={preselectedActe} 
  preselectedCommune={preselectedCommune} 
/>

// EtablissementsPage can trigger navigation with pre-selections
onRedirectToVisites('Visite', 'Saint-Malo')
```

This enables facility selection to pre-populate the quotation page.

## Styling Architecture

### CSS Modules Approach

**File**: `src/components/Button.module.css`

The app uses CSS Modules for component-scoped styling:
- Avoids global namespace pollution
- Provides type safety via TypeScript declaration
- All buttons and UI patterns centralized in one module

### Key Style Classes

- `.button`: Base button styling (1rem padding, 2rem horizontal, blue border)
- `.selectedVisites`: Active state for visits (light blue background)
- `.selectedEtablissements`: Active state for facilities (light green background)
- `.buttonGroup`: Flex container for button grouping (wraps on mobile)
- `.appHeader`: Navigation header styling
- `.actionButton`: Larger variant for prominent actions (1.5x sizing)

### Responsive Design

- Mobile-first flexbox layout
- `flex-wrap: wrap` allows buttons to wrap on small screens
- `min-width: 150px` ensures buttons remain usable
- Generous padding (1rem) for touch interfaces

## PWA Configuration

### Service Worker Setup

**Location**: `src/main.tsx`

```typescript
import { registerSW } from 'virtual:pwa-register';

registerSW({
  immediate: true,
  onNeedRefresh() { /* New version available */ },
  onOfflineReady() { /* Ready for offline use */ },
});
```

**vite-plugin-pwa** automatically generates service workers with fetch handlers.

### Manifest Configuration

**Location**: `vite.config.ts`

```typescript
VitePWA({
  registerType: 'autoUpdate',
  manifest: {
    name: 'SOS Cotation',
    short_name: 'Cotation',
    start_url: '/',
    display: 'standalone',
    theme_color: '#0d6efd',
    icons: [
      { src: '/pwa-192x192.png', sizes: '192x192' },
      { src: '/pwa-512x512.png', sizes: '512x512' }
    ]
  },
  workbox: {
    navigateFallback: '/index.html'
  }
})
```

**Features**:
- Automatic updates with user notification
- Offline support with network fallback
- Standalone display (no browser UI)
- Custom icons for home screen installation
- Navigation fallback for SPA routing

### Assets Included

- App icons (192x192, 512x512 PNG)
- Manifest webmanifest link in HTML
- Robot.txt and favicon configured

## Technology Stack

### Core Dependencies
- **React 19.1.0**: UI framework with latest features
- **React-DOM 19.1.0**: DOM rendering
- **Vite 7.0.4**: Build tool and dev server
- **TypeScript ~5.8.3**: Type safety

### Vite Plugins
- **@vitejs/plugin-react**: Fast Refresh and JSX support
- **vite-plugin-pwa**: PWA support with service workers

### Development Tools
- **ESLint**: Code quality (with React hooks, React Refresh, TypeScript plugins)
- **typescript-eslint**: TypeScript linting

## Build & Development

### Scripts

```json
{
  "dev": "vite",                          // Start dev server
  "build": "tsc -b && vite build",       // Type check + build
  "lint": "eslint .",                    // Lint all files
  "preview": "vite preview"              // Preview production build
}
```

### Build Process

1. TypeScript compilation (`tsc -b`) - Validates types before bundling
2. Vite bundling - Creates optimized production build
3. Service worker generation (via vite-plugin-pwa)
4. Output to `dist/` folder

### Development Workflow

- `npm run dev`: Hot module replacement (HMR) with fast refresh
- Changes instantly reflect without page reload
- TypeScript errors reported in console

## Type Safety

### TypeScript Configuration

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "jsx": "react-jsx",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

### Key Interfaces

**visiteConsultationData.ts**:
- `CotationValues`: Map of act codes to prices
- `CommuneIK`: Commune with IK coefficient

**etablissementsData.ts**:
- `Établissement`: Healthcare facility (category A-E, metadata)
- `Commune`: City with list of establishments

**Page Props**:
- Typed props for `CotationPage`, `EtablissementsPage`
- `LoginPageProps` with callback

## Key Business Logic

### Quotation Calculation Rules

#### CotationPage (Visits & Consultations)
1. **Base acts**: G (Consultation) or VG (Visit) = €30
2. **Period modifiers (PDS)**: Add CRN/VRN (€42.50-46), CRM/VRM (€51.50-59.50), etc.
3. **Regulation modifiers (CDS)**: MD (€10), SNP (€15), MU (€22.60)
4. **Age modifiers**: MEG (0-6 yrs, €5), MOP (>80 yrs, €5)
5. **ECG**: DEQP003 (€14.52 consultation, €24.12 visit)
6. **IK coefficient**: Commune-dependent multiplier (€0.61 per IK point, visits only)
7. **Payment split**: AMO = 70% of base, AMC = 30% of base (plus full IK)

#### EtablissementsPage (Facilities)
1. **Base act**: YYYY010 = €48
2. **Category-specific logic**:
   - **Category A/E (CHGR)**: Add M (€26.88) + period modifiers
   - **Category E (first act)**: Use visit rates (VRN/VRM/VRS/VRD) + IK
   - **Category E (subsequent acts)**: Use consultation rates (CRN/CRM/CRS/CRD)
   - **Other categories**: Standard rates (M €26.88)
3. **ECG**: Half DEQP003 (€7.26)
4. **MOP**: Age >80 adds €5

### Facility Categories

- **A**: CHGR hospitals (special billing)
- **B**: Care homes (take vitale card)
- **C**: Specialized care (leave FSP form)
- **D**: Medical facilities (complete dedicated form)
- **E**: Out-of-sector facilities (special quotation logic + email)

## Notable Architectural Decisions

### Why No Router Library?
- Small app with only 2-3 main pages
- Minimal routing complexity (no nested routes, no dynamic segments)
- Reduces dependencies and bundle size
- Custom state-based router is sufficient

### Why No Global State Manager (Redux/Zustand)?
- Pages are independent (no shared state between CotationPage and EtablissementsPage)
- Local state is sufficient for form complexity
- Simpler to understand and modify for small team
- Would add unnecessary overhead for 2 pages with independent concerns

### Why Static Data?
- Relatively stable data (communes, facilities, pricing)
- No real-time updates needed
- Simpler deployment (no backend dependency during development)
- Can be updated by modifying TypeScript files and rebuilding

### Why PWA?
- Medical staff works in field/clinics with intermittent connectivity
- Offline functionality enables quotation calculations without internet
- Can be installed on home screen like native app
- Reduces need for separate mobile app development

## Potential Improvements

1. **Error Boundaries**: Add React error boundaries for better error handling
2. **Form Validation**: Add input validation for edge cases
3. **Data Persistence**: Save quotation history to localStorage
4. **Testing**: Add unit tests for calculation logic
5. **Accessibility**: Improve a11y labels and keyboard navigation
6. **Documentation**: Add JSDoc comments to complex functions
7. **Security**: Move credentials to environment variables
8. **Localization**: i18n support for multi-language (currently French-only)
9. **Analytics**: Track user flows for UX optimization
10. **Mobile App**: Consider React Native for dedicated mobile experience

## Deployment Considerations

1. **Build Output**: Vite creates optimized bundles in `dist/`
2. **PWA**: Service worker caching must be considered for updates
3. **HTTPS**: Required for PWA service worker registration
4. **Caching Strategy**: vite-plugin-pwa configured for auto-update
5. **Manifest**: WebManifest enables installation on supported devices

## File Organization Summary

| Category | Files | Purpose |
|----------|-------|---------|
| **Entry Point** | main.tsx | App initialization + PWA setup |
| **App Shell** | App.tsx | Router, auth gate, page switching |
| **Pages** | 3x.tsx in pages/ | User-facing views |
| **Data** | 2x.ts in data/ | Static constants |
| **Config** | auth.ts | Credentials |
| **Styling** | Button.module.css | Centralized UI styles |
| **Types** | types.d.ts | TypeScript declarations |

This architecture is intentionally simple and pragmatic for a focused business tool. It prioritizes maintainability and ease of modification over architectural complexity.

## Commands
- dev: npm run dev
- build: npm run build
- preview: npm run preview
- lint: npm run lint

## Guardrails (OBLIGATOIRE)
- Ne jamais modifier les barèmes NGAP/CCAM/IK sans confirmation explicite.
- Ne pas toucher à la répartition AMO/AMC (70/30) ni à l’intégration IK (IK uniquement en AMO).
- Ne pas ajouter de dépendances lourdes (router, Redux, etc.) sans demande explicite.
- Interface mobile-first, boutons sélectionnables, pas de texte explicatif sous les boutons.

## Règles métier SOS Saint-Malo (extrait)
- Acte de base : G = 30 €, VG = 30 €.
- Enfants 0–6 ans : MEG = 5 € ; >80 ans : MOP = 5 €.
- CDS : SNP = 15 €, MD = 10 €, MU = 22,60 € (UNIQUEMENT si Visite + CDS + pas régulation 15 + demande soignant = oui).
- PDS : utiliser CRN/VRN, CRM/VRM, CRS/VRS, CRD/VRD selon tranche.
- ECG : Consultation = 14,52 € ; Visite = 24,12 €.
- IK : 0,61 € / point, **IK uniquement en AMO**.
- Répartition : AMO = (total hors IK) × 0,7 + IK ; AMC = (total hors IK) × 0,3.

## Style de code
- React + TypeScript strict ; fonctions pures pour le calcul ; pas de state manager global.
- UI tactile/responsive ; composants simples ; éviter la complexité inutile.

## Fichiers sensibles
- `config/auth.ts` : ne pas commit de vrai mot de passe ; privilégier variables d’environnement.
