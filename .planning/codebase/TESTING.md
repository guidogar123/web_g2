# Testing Status

**Analysis Date:** 2026-06-19

## Current State: NO TESTS

The project has **zero test infrastructure**:

| Aspect | Status |
|---|---|
| Test framework | ❌ Not installed |
| Test files (*.test.*, *.spec.*) | ❌ None found |
| Test scripts in package.json | ❌ Not defined |
| Test dependencies in package.json | ❌ Not present |
| E2E tests | ❌ Not configured |
| Component tests | ❌ Not configured |
| Integration tests | ❌ Not configured |
| CI test step | ❌ Not configured |

## Why This Matters

The following code is **critical to business operations** and has no test coverage:

### P0 Risk Areas (Customer-facing)

1. **Form validation logic** (`src/lib/schemas.ts`)
   - `ContactSchema` — validating lead contact data
   - `ScheduleSchema` — validating scheduling requests
   - If broken: lost leads and scheduling revenue

2. **Rate limiter** (`src/lib/rate-limit.ts`)
   - In-memory `Map` with cleanup interval
   - If broken: spam flood or legitimate user blocking
   - Edge case: cleanup timer behavior in serverless environments

3. **Form API routes** (`src/app/api/webhook/n8n/*/route.ts`)
   - Request parsing, validation, rate limiting, n8n proxying
   - Error handling paths (400, 429, 500 responses)
   - If broken: complete form submission failure

4. **City data** (`src/app/[ciudad]/cities.ts`)
   - 15-city static generation data array
   - `getCityBySlug()` lookup function
   - If broken: 404 on city pages or incorrect geo data

### P1 Risk Areas

5. **Component rendering** (`src/components/`)
   - Form components (Contacto, ScheduleModal)
   - Chat widget initialization
   - Navigation scroll behavior
   - Hero canvas particle system

## Recommended Test Strategy

### Phase 1 — Unit Tests (Critical)

**Framework:** Vitest (lightweight, ESM-native, fast)

**Priority targets:**
| Module | Test Type | Priority |
|---|---|---|
| `lib/schemas.ts` | Pure function (validation logic) | 🔴 P0 |
| `lib/rate-limit.ts` | Pure function (rate limiting logic) | 🔴 P0 |
| `app/[ciudad]/cities.ts` | Pure function (data + lookup) | 🔴 P0 |
| `lib/utils.ts` | Pure function (cn utility) | 🟡 P2 |

### Phase 2 — Integration Tests (API Routes)

**Framework:** Vitest + `fetch` mock

**Targets:**
- Contact API route: valid request → 200, invalid body → 400, rate limited → 429
- Schedule API route: same patterns
- n8n proxy failure → 500

### Phase 3 — Component Tests

**Framework:** Vitest + @testing-library/react

**Targets (by priority):**
1. `Contacto.tsx` — Form rendering, validation feedback, submission states
2. `ScheduleModal.tsx` — Date selection, time slots, form validation
3. `Navigation.tsx` — Scroll state, mobile menu toggle
4. `ChatWidget.tsx` — Conditional init based on env var

### Phase 4 — E2E Tests

**Framework:** Playwright

**Targets:**
- Home page renders all sections
- City page renders with correct city name
- Form submission flow (happy path + error states)
- Navigation scroll and mobile menu
- Chat widget presence when configured

## Dependencies Needed

```json
{
  "devDependencies": {
    "vitest": "^3",
    "@testing-library/react": "^16",
    "@testing-library/jest-dom": "^6",
    "jsdom": "^25",
    "@playwright/test": "^1"
  }
}
```

## Quick Start

```bash
# Install test dependencies
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom

# Add to package.json scripts
# "test": "vitest run",
# "test:watch": "vitest"

# Run tests
npm test
```
