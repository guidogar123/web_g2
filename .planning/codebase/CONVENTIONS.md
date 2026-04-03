# Coding Conventions

**Analysis Date:** 2026-04-03

## Naming Patterns

**Files:**
- Component files: PascalCase (e.g., `Navigation.tsx`, `ScheduleModal.tsx`)
- UI component files: kebab-case (e.g., `button.tsx`, `alert-dialog.tsx`)
- Hook files: kebab-case with `use-` prefix (e.g., `use-toast.ts`)
- Utility files: camelCase (e.g., `utils.ts`)
- Section/page files: PascalCase (e.g., `Hero.tsx`, `Contacto.tsx`, `Equipo.tsx`)

**Functions:**
- React functional components: PascalCase (e.g., `App`, `Navigation`, `ScheduleModal`)
- Regular functions: camelCase (e.g., `getAvailableDays()`, `handleSubmit()`)
- Event handlers: camelCase with `handle` prefix (e.g., `handleScroll()`, `handleSubmit()`, `scrollToSection()`)

**Variables:**
- Component props: camelCase (e.g., `isOpen`, `onClose`, `formData`)
- State variables: camelCase (e.g., `isScrolled`, `isMobileMenuOpen`, `selectedTime`)
- Constants: UPPER_SNAKE_CASE (e.g., `COOLDOWN_MS`, `BAN_MS`, `COOLDOWN_KEY`)
- Objects/arrays: camelCase (e.g., `navLinks`, `formData`, `timeSlots`, `particles`)

**Types:**
- Interfaces: PascalCase with suffix `Props` for component props (e.g., `ScheduleModalProps`)
- Type aliases: PascalCase (e.g., `ClassValue`)
- Enums: not commonly used, follow PascalCase

## Code Style

**Formatting:**
- ESLint with Flat Config (ESLint 9.39.1)
- No Prettier detected — formatting via ESLint rules
- Indentation: 2 spaces (standard Node.js/TypeScript convention)
- Line length: follows ESLint defaults
- Semicolons: required at statement ends

**Linting:**
- Config file: `eslint.config.js` (Flat Config format)
- Active rules:
  - `@eslint/js` recommended
  - `typescript-eslint` recommended
  - `eslint-plugin-react-hooks` recommended
  - `eslint-plugin-react-refresh` with Vite support
- Target: `ES2020` for language features
- Browser globals enabled

**Key linting rules:**
- Unused variables: caught (`noUnusedLocals`, `noUnusedParameters` in TypeScript)
- React Hooks rules enforced (dependencies, rules of hooks)
- React Refresh plugin ensures hot reload safety

## Import Organization

**Order:**
1. React imports and external libraries (`import { useState } from 'react'`)
2. Radix UI / UI component libraries (`import { Button } from '@/components/ui/button'`)
3. Icons from lucide-react (`import { Menu, X, Brain } from 'lucide-react'`)
4. Utility libraries (date-fns, clsx, etc.) (`import { format } from "date-fns"`)
5. Custom hooks (`import { useToast } from '@/hooks/use-toast'`)
6. Local components and utilities (`import Navigation from './sections/Navigation'`)
7. Type imports (none currently explicit with `import type`, but could be used)

**Path Aliases:**
- `@/*` maps to `./src/*` (configured in `tsconfig.json`)
- Example: `@/components/ui/button` → `src/components/ui/button.tsx`
- Consistently used across all imports

## Error Handling

**Patterns:**
- Try-catch blocks for async operations (e.g., fetch requests in `ScheduleModal`)
- `try-finally` for cleanup (e.g., setting `setLoading(false)` in finally block)
- Toast notifications for user-facing errors: `toast.error()`, `toast.success()` via sonner
- Silent error handling with toast fallback (e.g., "Error al agendar. Intenta de nuevo.")
- No error logging to console visible in production code; errors wrapped in try-catch

Example from `ScheduleModal.tsx`:
```typescript
try {
  const response = await fetch('...');
  if (response.ok) {
    toast.success("¡Agendado exitosamente!");
  } else {
    throw new Error();
  }
} catch (error) {
  toast.error("Error al agendar. Intenta de nuevo.");
} finally {
  setLoading(false);
}
```

## Logging

**Framework:** No explicit logging framework; using browser console indirectly via React development tools
- No `console.log()` calls visible in production code
- Development logging assumed via React DevTools and browser console
- Toast notifications (`sonner`) used for user feedback instead of console

## Comments

**When to Comment:**
- Code is self-documenting; minimal comments
- Comments appear only when logic is non-obvious (e.g., particle animation in Hero.tsx)
- No JSDoc comments observed in codebase

**Observed pattern:**
- Comments explain "why" not "what" (e.g., "Lead time: 2 business days (skipping Sundays)")
- Inline comments for complex calculations or performance optimizations

Example from `Hero.tsx`:
```typescript
// Particle system
// Render every 2nd frame for performance (30fps)
```

## Function Design

**Size:** Functions generally kept small and focused
- Average function length: 20-50 lines
- Longer functions handle single concerns (e.g., form submission with validation)

**Parameters:**
- Destructured props for React components (e.g., `{ isOpen, onClose }`)
- Single object parameter for form data instead of multiple parameters
- Example: `setFormData({ ...formData, nombre: e.target.value })`

**Return Values:**
- Components return JSX elements
- Hooks return values or [state, setState] pairs
- Utility functions return primitives or objects
- Explicit return types on TypeScript functions

Example from `Navigation.tsx`:
```typescript
const navLinks = [
  { name: 'Inicio', href: '#hero' },
  { name: 'Servicios', href: '#servicios' },
  // ...
];
```

## Module Design

**Exports:**
- Default exports for React components (e.g., `export default Navigation`)
- Named exports for utilities (e.g., `export { Button, buttonVariants }` in ui components)
- Each UI component exports the component and its variants (CVA-based)

**Barrel Files:**
- Not explicitly used in current structure
- UI components are imported directly from their individual files

**Component Structure:**
- One component per file
- UI primitives in `src/components/ui/`
- Feature components in `src/sections/`
- Modal/dialog patterns in `src/components/`

## Tailwind CSS

**Styling approach:** Utility-first with Tailwind CSS 3.4.19
- All styling via Tailwind classes in `className` attributes
- No separate CSS files for components (uses `index.css` for globals)
- Custom CSS variables defined in `:root` in `index.css` for theme colors
- Class Variance Authority (CVA) used for component variants (e.g., button variants)

**Example pattern from `button.tsx`:**
```typescript
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: { default: "...", destructive: "...", outline: "..." },
      size: { default: "...", sm: "...", lg: "..." },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);
```

**Theme colors:**
- Primary: `--primary: 160 84% 39%` (emerald green)
- Accent: `--accent: 160 84% 39%` (same as primary)
- Background: `--background: 0 0% 4%` (near black)
- Foreground: `--foreground: 0 0% 98%` (near white)
- All colors use CSS custom properties

## State Management

**Pattern:** React hooks only (useState, useRef, useEffect)
- No Redux or Context API
- Local component state for form inputs and UI toggles
- Refs for DOM elements (e.g., canvas, intersection observers)

**Example from `ScheduleModal.tsx`:**
```typescript
const [date, setDate] = useState<Date | undefined>(availableDays[0]);
const [selectedTime, setSelectedTime] = useState<string>("10:00");
const [loading, setLoading] = useState(false);
const [formData, setFormData] = useState({
  nombre: '',
  email: '',
  telefono: '',
  empresa: '',
});
```

## TypeScript Configuration

**Strict mode enabled:**
- `"strict": true` — all strict type checks active
- `"noUnusedLocals": true` — unused variables flagged
- `"noUnusedParameters": true` — unused function parameters flagged
- `"noFallthroughCasesInSwitch": true` — switch case fallthrough prevented

**Target:** ES2022 (modern JavaScript features available)

---

*Convention analysis: 2026-04-03*
