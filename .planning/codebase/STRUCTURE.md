# Codebase Structure

**Analysis Date:** 2026-04-03

## Directory Layout

```
WEB_G2/
├── Kimi_Agent_Diseño web G2Intelligence/
│   └── app/                                    # Main Next.js/Vite app
│       ├── src/
│       │   ├── App.tsx                         # Root React component
│       │   ├── main.tsx                        # Entry point
│       │   ├── index.css                       # Global styles + Tailwind
│       │   ├── App.css                         # App-specific styles
│       │   ├── chat-overrides.css              # n8n chat customization
│       │   ├── components/
│       │   │   ├── ScheduleModal.tsx           # Appointment scheduling form
│       │   │   └── ui/                         # Radix UI wrapped components (40+ files)
│       │   │       ├── button.tsx
│       │   │       ├── dialog.tsx
│       │   │       ├── input.tsx
│       │   │       ├── label.tsx
│       │   │       ├── form.tsx
│       │   │       ├── calendar.tsx
│       │   │       └── ...
│       │   ├── sections/                       # Page sections
│       │   │   ├── Navigation.tsx              # Fixed navbar with mobile menu
│       │   │   ├── Hero.tsx                    # Landing hero with canvas animation
│       │   │   ├── Servicios.tsx               # 6 service cards with lazy loading
│       │   │   ├── Nosotros.tsx                # About section
│       │   │   ├── Equipo.tsx                  # Team members section
│       │   │   ├── Contacto.tsx                # Contact form + social links
│       │   │   ├── Footer.tsx                  # Footer navigation
│       │   │   └── ChatWidget.tsx              # n8n chat initialization
│       │   ├── hooks/                          # Custom React hooks
│       │   │   ├── use-mobile.ts               # Responsive breakpoint detection
│       │   │   └── use-toast.ts                # Toast notification hook
│       │   └── lib/
│       │       └── utils.ts                    # cn() Tailwind class merger
│       ├── package.json                        # Dependencies (React 19, Radix UI, Vite)
│       ├── tsconfig.json                       # TypeScript config with @ alias
│       ├── tsconfig.app.json                   # App-specific TS config
│       ├── tsconfig.node.json                  # Node/Vite TS config
│       ├── vite.config.ts                      # Vite build config
│       ├── tailwind.config.js                  # Tailwind CSS config
│       ├── eslint.config.js                    # ESLint rules
│       ├── index.html                          # HTML entry point
│       ├── dist/                               # Built output (generated)
│       ├── .git/                               # Git repository
│       └── .planning/codebase/                 # Documentation
├── sitio-g2/                                   # Static site (fallback/legacy)
│   ├── index.html
│   └── assets/
└── G2_Social_Media_Kit/                        # Brand assets
```

## Directory Purposes

**`src/`:**
- Purpose: All source code for the React application
- Contains: Components, styles, utilities, hooks
- Key entry: `main.tsx` and `App.tsx`

**`src/sections/`:**
- Purpose: Page layout sections that compose the landing page
- Contains: Navigation, Hero, Services, About, Team, Contact, Footer, ChatWidget
- Pattern: Each file = one visual section with id anchor for navigation
- Key files: `Navigation.tsx` (8 links), `Hero.tsx` (canvas animation), `Servicios.tsx` (service cards)

**`src/components/`:**
- Purpose: Reusable UI components and feature components
- Contains: ScheduleModal (appointment form), ui folder (Radix primitives)
- Key files: `ScheduleModal.tsx` (400+ lines, calendar + form logic)

**`src/components/ui/`:**
- Purpose: Radix UI component wrappers with Tailwind styling
- Contains: 40+ exported components (Button, Dialog, Input, Calendar, Select, etc.)
- Pattern: Each component exports Radix-wrapped element with cn() for styles
- Used by: All sections and feature components

**`src/hooks/`:**
- Purpose: Custom React hooks for shared logic
- Contains: `use-mobile.ts` (viewport detection), `use-toast.ts` (notifications)
- Pattern: Named exports starting with "use" convention

**`src/lib/`:**
- Purpose: Utility functions and helpers
- Contains: `utils.ts` with cn() function (clsx + tailwind-merge)

## Key File Locations

**Entry Points:**
- `index.html`: HTML shell with `<div id="root">`
- `src/main.tsx`: React root creation and DOM mount
- `src/App.tsx`: Root component that renders sections

**Configuration:**
- `vite.config.ts`: Base path `./`, plugin config, alias `@` → `src`
- `tsconfig.json`: Path alias configuration
- `tailwind.config.js`: Color extensions, animation keyframes, plugins
- `eslint.config.js`: ESLint rules (React hooks, React refresh, TypeScript)

**Core Logic:**
- `src/sections/Navigation.tsx`: Nav state, scroll listeners, mobile menu
- `src/sections/Hero.tsx`: Canvas animation, particle system, CTA buttons
- `src/components/ScheduleModal.tsx`: Form handling, rate limiting, n8n POST
- `src/sections/ChatWidget.tsx`: n8n chat initialization

**Styling:**
- `src/index.css`: Tailwind directives, CSS variables, custom utilities
- `src/App.css`: Global styles
- `src/chat-overrides.css`: n8n chat widget color overrides
- `tailwind.config.js`: Theme config (colors, fonts, keyframes)

**Testing:**
- Not detected — no test files present

## Naming Conventions

**Files:**
- Components: PascalCase (e.g., `Navigation.tsx`, `ScheduleModal.tsx`)
- Hooks: camelCase with "use" prefix (e.g., `use-mobile.ts`, `use-toast.ts`)
- Utilities: camelCase (e.g., `utils.ts`)
- Sections: PascalCase (e.g., `Hero.tsx`, `Servicios.tsx`)

**Components:**
- React components: PascalCase function names (e.g., `Hero()`, `Navigation()`)
- Props interfaces: TypeScript interfaces in PascalCase (e.g., `ScheduleModalProps`)
- Event handlers: camelCase with "handle" prefix (e.g., `handleSubmit()`, `handleScroll()`)
- State setters: camelCase (e.g., `setIsScrolled()`, `setFormData()`)

**Variables:**
- Boolean: prefix with "is" or "has" (e.g., `isScrolled`, `isMobileMenuOpen`)
- Classes: "className" prop
- Tailwind utilities: lowercase with hyphens (e.g., `flex items-center gap-4`)

**Types:**
- Component props: `{ComponentName}Props` (e.g., `ScheduleModalProps`)
- Radix UI components: No custom types (use Radix exports)
- Theme colors: Tailwind utility names (e.g., `emerald-500`, `emerald-600`)

## Where to Add New Code

**New Section/Page Feature:**
- Primary code: `src/sections/{FeatureName}.tsx`
- Pattern: Export default React function component, add `id` anchor for navigation
- Register in: `src/App.tsx` main return JSX
- Example: Create `src/sections/Blog.tsx`, import and add to App.tsx

**New Reusable Component:**
- Implementation: `src/components/{ComponentName}.tsx`
- For UI primitives: `src/components/ui/{primitive}.tsx` (wrap Radix)
- Usage: Import in sections, other components

**New Custom Hook:**
- Location: `src/hooks/use-{hookName}.ts`
- Pattern: Export named function starting with "use"
- Example: `use-form-validation.ts`, `use-scroll-position.ts`

**New Utility Function:**
- Location: `src/lib/utils.ts` (or new file if large)
- Pattern: Named export in utils.ts
- Example: Add `convertDateFormat()` to utils.ts

**Styling:**
- Global styles: Add to `src/index.css` (Tailwind directives)
- Component-scoped: Use `className` prop with Tailwind utilities
- Custom CSS: Add @layer rules in `src/index.css` or component-specific CSS file
- Theme colors: Use Tailwind config (tailwind.config.js)

**API Integration:**
- n8n webhooks: Already configured in `ChatWidget.tsx` and `ScheduleModal.tsx`
- New endpoints: Add fetch calls in component event handlers (e.g., `handleSubmit`)
- Error handling: Use toast notifications via `use-toast` hook

## Special Directories

**`dist/`:**
- Purpose: Build output directory
- Generated: Yes (via `npm run build` / Vite)
- Committed: No (in .gitignore)
- Contents: Minified JS bundles, CSS, index.html

**`node_modules/`:**
- Purpose: npm dependencies
- Generated: Yes (via `npm install`)
- Committed: No (in .gitignore)
- Size: ~500MB+ (Radix UI, Vite, TypeScript, etc.)

**`.git/`:**
- Purpose: Git repository metadata
- Generated: Yes (git init)
- Committed: N/A
- Contents: Git objects, refs, logs

**`.planning/codebase/`:**
- Purpose: Documentation and analysis (ARCHITECTURE.md, STRUCTURE.md, etc.)
- Generated: No (manually maintained)
- Committed: Yes

## Build & Deploy

**Development:**
```bash
npm install
npm run dev              # Vite dev server on http://localhost:5173
```

**Production Build:**
```bash
npm run build            # TypeScript compile + Vite build → dist/
npm run preview          # Preview built output locally
```

**Deployment:**
- Static files: Upload `dist/` folder to web server
- Base path: Configured as `./` for relative asset paths
- No backend required (pure client-side SPA)

---

*Structure analysis: 2026-04-03*
