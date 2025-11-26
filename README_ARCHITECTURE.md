# SOS Cotation - Architecture Documentation

This folder contains comprehensive architectural documentation for the SOS Cotation PWA.

## Documents in This Repository

### 1. **CLAUDE.md** (Main Architecture Guide)
Comprehensive 460+ line document covering:
- Project summary and high-level architecture
- Complete directory structure
- 6 core architectural patterns (routing, auth, state, rendering, data, calculation)
- Detailed user flows
- Styling architecture
- PWA configuration
- Technology stack
- Type safety approach
- Business logic & quotation rules
- Architectural decisions explained
- Deployment considerations

**Start here for deep understanding of how the app works.**

### 2. **ARCHITECTURE_SUMMARY.txt** (Quick Reference)
Quick-read reference (under 100 lines) with:
- Project overview
- 6 key architectural insights
- Source structure diagram
- Business logic summary
- Important patterns
- Build commands
- Architectural decisions rationale
- Notable features
- Security notes

**Best for quick lookups and onboarding.**

### 3. **DATA_FLOW_DIAGRAM.txt** (Visual Flows)
ASCII diagrams showing:
- Overall app flow (index.html → main.tsx → App.tsx → Pages)
- Login flow (password verification → localStorage → re-render)
- CotationPage state machine (act type → period → modifiers → result)
- EtablissementsPage flow (facility selection → category-specific UI)
- Data sources (static TypeScript files, no API)
- State to calculation mapping
- PWA service worker & caching

**Best for understanding data flow and component interactions.**

## Quick Navigation

### I want to understand...

**The overall structure**
→ Read: ARCHITECTURE_SUMMARY.txt sections 1-2

**How routing works**
→ Read: CLAUDE.md → "Manual Routing" section
→ View: DATA_FLOW_DIAGRAM.txt → "Overall App Flow"

**State management**
→ Read: CLAUDE.md → "State Management Pattern" section
→ View: DATA_FLOW_DIAGRAM.txt → "CotationPage Flow" & "Establishments Page Flow"

**How calculations work**
→ Read: CLAUDE.md → "Calculation Logic Pattern" section
→ Read: ARCHITECTURE_SUMMARY.txt → "Business Logic Summary"
→ View: DATA_FLOW_DIAGRAM.txt → "State to Calculation Mapping"

**The business domain (quotations)**
→ Read: CLAUDE.md → "Key Business Logic" section
→ Read: ARCHITECTURE_SUMMARY.txt → "Business Logic Summary"

**PWA setup**
→ Read: CLAUDE.md → "PWA Configuration" section
→ View: DATA_FLOW_DIAGRAM.txt → "PWA Service Worker & Caching"

**Adding new data**
→ Read: CLAUDE.md → "Static Data Management" section
→ Edit: src/data/visiteConsultationData.ts or src/data/etablissementsData.ts

**Modifying calculations**
→ Read: CLAUDE.md → "Calculation Logic Pattern" section
→ Edit: src/pages/CotationPage.tsx (calculateTotal function)
→ Edit: src/pages/EtablissementsPage.tsx (calculerMontant function)

**Updating UI styling**
→ Read: CLAUDE.md → "Styling Architecture" section
→ Edit: src/components/Button.module.css

## Key Insights

### Architecture Philosophy
This app exemplifies **pragmatic minimalism**:
- Only what's needed, nothing more
- Clear separation of concerns
- TypeScript for safety without over-engineering
- Static data for simplicity and reliability

### Why No Popular Libraries?
- **No React Router**: 2 pages don't justify router complexity
- **No Redux/Zustand**: Independent pages don't need shared global state
- **No Database**: Data is stable and doesn't change frequently
- **No UI Library**: CSS Modules provide sufficient styling control

### Core Patterns
1. **State-based routing**: Simple `currentPage` state switches between views
2. **Authentication gate**: localStorage-backed password check at App level
3. **Local form state**: Each page manages its own complex form logic
4. **Conditional rendering**: UI sections appear/disappear based on state combinations
5. **Pure calculation functions**: Derive results purely from current state
6. **Static data files**: TypeScript constants for commune, facility, and pricing data

## Technology Choices Explained

| Choice | Why | Trade-off |
|--------|-----|-----------|
| React 19 | Modern framework, fast refresh, hooks | More than needed for size |
| TypeScript | Safety, IDE support, self-documenting | Setup overhead |
| Vite | Fast dev server, minimal config | Smaller ecosystem than Webpack |
| CSS Modules | Scoped styling, no naming conflicts | Need to import each component |
| PWA | Offline capability for field workers | Extra configuration needed |
| Static data | Simpler, no backend needed | Manual rebuild to update |
| State-based routing | Minimal code, clear logic | Less feature-rich than React Router |

## Performance Characteristics

- **Bundle size**: Minimal (Vite optimized, no extra dependencies)
- **Calculation speed**: Instant (pure functions, no async)
- **Offline capability**: Full app functional offline (PWA)
- **Mobile performance**: Optimized buttons for touch, responsive layout

## Security Notes

- Password stored in client code (suitable for internal tools only)
- No backend validation (password checked client-side)
- For production use: Move auth to backend/environment variables
- No sensitive data stored, safe for offline use

## Development Workflow

```bash
npm run dev      # Start dev server with HMR
npm run build    # Type check + optimize build
npm run lint     # Check code quality
npm run preview  # Test production build locally
```

## File Change Impact

| File | Purpose | Change Impact |
|------|---------|----------------|
| src/pages/*.tsx | UI + logic | Immediate effect on features |
| src/data/*.ts | Constants | Rebuild needed to deploy |
| src/config/auth.ts | Credentials | Rebuild needed to deploy |
| src/components/Button.module.css | Styling | Immediate effect |
| vite.config.ts | Build config | Rebuild needed |
| tsconfig.json | Type config | Rebuild needed |

## Common Tasks

### Add a new medical act code
1. Edit `src/data/visiteConsultationData.ts`
2. Add to `actesValues` object
3. Reference in calculation logic
4. Run `npm run build`

### Add a new commune
1. Edit `src/data/visiteConsultationData.ts`
2. Add to `communesIK` array
3. Run `npm run build`

### Add a new facility
1. Edit `src/data/etablissementsData.ts`
2. Add to appropriate commune's `etablissements` array
3. Run `npm run build`

### Modify calculation rules
1. Edit `calculateTotal()` in `src/pages/CotationPage.tsx`
   OR
2. Edit `calculerMontant()` in `src/pages/EtablissementsPage.tsx`
3. Run `npm run dev` to test changes

### Change styling
1. Edit `src/components/Button.module.css`
2. Reference new classes in JSX components
3. Changes visible immediately in dev mode

## Testing Checklist

- [ ] Login works (correct password only)
- [ ] CotationPage: All calculations produce expected results
- [ ] EtablissementsPage: Facility categories show correct options
- [ ] Navigation: Pre-selection properly passes between pages
- [ ] Offline: App works when network is disabled
- [ ] PWA: Can install to home screen
- [ ] Responsive: Works on mobile, tablet, desktop

## Deployment Checklist

- [ ] Build passes (`npm run build` succeeds)
- [ ] Linting passes (`npm run lint` clean)
- [ ] PWA manifest correct
- [ ] HTTPS enabled (required for PWA)
- [ ] Service worker caching appropriate
- [ ] No hardcoded sensitive credentials
- [ ] Tested on target devices/browsers

## Future Enhancements

See CLAUDE.md → "Potential Improvements" section for detailed suggestions:
1. Error boundaries for better error handling
2. Form validation for edge cases
3. localStorage persistence of quotation history
4. Unit tests for calculation logic
5. Improved accessibility (a11y)
6. i18n support for multiple languages
7. Environmental configuration
8. Analytics tracking
9. Dedicated mobile app

---

**Last Updated**: October 2024
**Framework**: React 19 + TypeScript + Vite
**Status**: Production-Ready PWA
