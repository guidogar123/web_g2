# Testing Patterns

**Analysis Date:** 2026-04-03

## Test Framework

**Runner:**
- No test framework currently configured
- No testing dependencies in `package.json`
- No `jest.config.js`, `vitest.config.ts`, or similar test configuration files

**Assertion Library:**
- Not applicable — no testing framework detected

**Run Commands:**
```bash
npm run dev              # Start development server (Vite)
npm run build           # Build production bundle
npm run lint            # Run ESLint
npm run preview         # Preview production build locally
```

**Note:** Testing infrastructure not yet implemented. Only linting is configured.

## Test File Organization

**Current State:**
- No test files found in codebase
- No `*.test.*` or `*.spec.*` files in `src/` directory
- Testing directory structure not established

**Recommendation for Implementation:**
- Co-locate test files with source files (same directory)
- Naming convention: `ComponentName.test.tsx` or `ComponentName.spec.tsx`
- Organize as:
  ```
  src/
  ├── components/
  │   ├── ScheduleModal.tsx
  │   ├── ScheduleModal.test.tsx
  │   └── ui/
  │       ├── button.tsx
  │       └── button.test.tsx
  ├── sections/
  │   ├── Navigation.tsx
  │   ├── Navigation.test.tsx
  │   └── ...
  └── hooks/
      ├── use-toast.ts
      └── use-toast.test.ts
  ```

## Current Testing Gaps

**What's NOT tested:**
- React component rendering
- User interactions (clicks, form submissions)
- State management (useState, useEffect hooks)
- Event handlers (handleScroll, handleSubmit)
- API calls to n8n webhook (in `ScheduleModal.tsx`)
- Toast notifications
- Rate limiting logic (cooldown/ban system)

**High-priority areas needing tests:**
1. `ScheduleModal.tsx` — complex form with rate limiting
2. `Navigation.tsx` — scroll detection and navigation
3. `use-toast.ts` — custom hook for toast notifications
4. Date/time selection logic in `ScheduleModal.tsx`

## Testable Code Examples

### Example 1: ScheduleModal Component Logic
**File:** `/c/Users/guido/OneDrive/G2INNOVATION/WEB_G2/Kimi_Agent_Diseño web G2Intelligence/app/src/components/ScheduleModal.tsx`

```typescript
// This function is testable
const getAvailableDays = (count: number) => {
  const days = [];
  let current = new Date();

  // Lead time: 2 business days (skipping Sundays)
  let leadCount = 0;
  while (leadCount < 2) {
    current.setDate(current.getDate() + 1);
    if (current.getDay() !== 0) leadCount++;
  }

  while (days.length < count) {
    if (current.getDay() !== 0) {
      days.push(new Date(current));
    }
    current.setDate(current.getDate() + 1);
  }
  return days;
};
```

**Tests needed:**
- Returns exactly N business days
- Skips Sundays (day 0)
- Respects 2-day lead time
- Handles month/year boundaries

### Example 2: Rate Limiting Logic
**File:** `src/components/ScheduleModal.tsx`

```typescript
const checkRateLimit = () => {
  const now = Date.now();
  const banUntil = localStorage.getItem(BAN_KEY);
  const lastSignal = localStorage.getItem(COOLDOWN_KEY);

  if (banUntil && now < parseInt(banUntil)) {
    const remaining = Math.ceil((parseInt(banUntil) - now) / 1000 / 60);
    toast.error(`Actividad limitada. Espera ${remaining} min.`);
    return false;
  }

  if (lastSignal && now - parseInt(lastSignal) < COOLDOWN_MS) {
    localStorage.setItem(BAN_KEY, (now + BAN_MS).toString());
    toast.error("Seguridad activada. Bloqueo de 5 min.");
    return false;
  }
  return true;
};
```

**Tests needed:**
- Returns true when no previous request
- Returns false and shows error when in cooldown (60s)
- Sets ban flag after 2nd request in cooldown period (5 min ban)
- Correctly calculates remaining time for error message

### Example 3: Navigation Scroll Detection
**File:** `src/sections/Navigation.tsx`

```typescript
useEffect(() => {
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50);
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

**Tests needed:**
- Event listener attached on mount
- Event listener removed on unmount
- `setIsScrolled(true)` when `scrollY > 50`
- `setIsScrolled(false)` when `scrollY <= 50`
- `passive: true` option set for scroll performance

### Example 4: Custom Hook (useToast)
**File:** `src/hooks/use-toast.ts`

```typescript
export function useToast() {
  const toast = ({ title, description, variant }: ToastOptions) => {
    if (variant === 'destructive') {
      sonnerToast.error(title, { description });
    } else {
      sonnerToast.success(title, { description });
    }
  };
  return { toast };
}
```

**Tests needed:**
- Calls `sonnerToast.error()` for destructive variant
- Calls `sonnerToast.success()` for default variant
- Passes title and description correctly
- Returns toast function

## Recommended Testing Setup

**To implement testing, add:**

```bash
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom
```

**Configuration file: `vitest.config.ts`**
```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: [],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

**Test script in `package.json`:**
```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  }
}
```

## Mocking Recommendations

**What to mock:**
- `localStorage` for rate limiting tests
- `fetch()` for n8n webhook calls
- `sonner` toast notifications
- `window.addEventListener` for scroll detection
- `IntersectionObserver` for visibility detection (used in Contacto.tsx)

**What NOT to mock:**
- React hooks (useState, useEffect, useRef, useCallback)
- DOM elements (use React Testing Library to render and query)
- Component props and state changes
- Date/time generation (test with actual dates)

## Manual Testing Checklist

Since no automated tests exist, here's what should be manually tested:

**ScheduleModal Component:**
- [ ] Modal opens/closes correctly
- [ ] Date selection updates state
- [ ] Time slot selection updates state
- [ ] Form validation requires all fields
- [ ] Submit button disabled while loading
- [ ] Rate limiting activates after 2 requests in 60s
- [ ] 5-minute ban message shows after rate limit
- [ ] Form data clears after successful submission
- [ ] n8n webhook receives correct payload

**Navigation Component:**
- [ ] Navigation bar transparent on page load
- [ ] Navigation bar shows background after scrolling 50px
- [ ] Mobile menu opens/closes
- [ ] Menu links scroll to correct sections smoothly
- [ ] Menu closes after clicking a link (mobile)
- [ ] Hover effects work on desktop

**Form Components (Contacto):**
- [ ] Form fields accept input
- [ ] Form validates required fields
- [ ] Submit shows loading state
- [ ] Success toast appears on submit
- [ ] Form clears after submission
- [ ] Scroll position shows section when visible

**Particle Animation (Hero):**
- [ ] Canvas renders correctly
- [ ] Particles animate smoothly
- [ ] Canvas resizes on window resize
- [ ] Animation cleanup on unmount
- [ ] Performance acceptable (30fps target)

## Coverage Targets

**Current coverage:** 0% — no tests implemented

**Recommended targets after implementation:**
- Statements: 70%+
- Branches: 60%+
- Functions: 70%+
- Lines: 70%+

**Priority for high-coverage areas:**
1. `src/components/ScheduleModal.tsx` — 90%+ (critical user interaction)
2. `src/sections/Navigation.tsx` — 80%+ (core navigation)
3. `src/hooks/use-toast.ts` — 100% (simple, testable hook)
4. `src/sections/Contacto.tsx` — 80%+ (form handling)

---

*Testing analysis: 2026-04-03*
