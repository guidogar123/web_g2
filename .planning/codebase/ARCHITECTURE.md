# Architecture

**Analysis Date:** 2026-04-03

## Pattern Overview

**Overall:** React SPA (Single Page Application) with Section-Based Component Architecture

**Key Characteristics:**
- Client-side rendered landing page using React 19 + Vite
- Section-based layout (Hero, Servicios, Nosotros, Equipo, Contacto, Footer)
- Radix UI component library for accessible, unstyled primitives
- Tailwind CSS for styling with dark theme (emerald accent)
- Canvas-based animated backgrounds using requestAnimationFrame
- n8n chat widget integration for conversational AI

## Layers

**Presentation Layer:**
- Purpose: UI components and visual elements
- Location: `src/sections/`, `src/components/`
- Contains: Page sections, form modals, chat widget, UI primitives
- Depends on: React, Radix UI, Lucide icons, Tailwind utilities
- Used by: App.tsx entry point

**Component Library Layer:**
- Purpose: Reusable UI building blocks
- Location: `src/components/ui/`
- Contains: 40+ Radix UI wrapped components (Button, Dialog, Input, Calendar, etc.)
- Depends on: @radix-ui/*, clsx, tailwind-merge
- Used by: Sections and feature components

**State & Hooks Layer:**
- Purpose: Shared state logic and custom React hooks
- Location: `src/hooks/`
- Contains: `use-mobile.ts` (responsive breakpoint detection), `use-toast.ts` (notifications)
- Depends on: React hooks API
- Used by: Section components and modals

**Utility Layer:**
- Purpose: Helper functions and class merging
- Location: `src/lib/utils.ts`
- Contains: `cn()` function for Tailwind class merging
- Depends on: clsx, tailwind-merge
- Used by: All components for className merging

**Feature Components:**
- Purpose: Business logic and user interactions
- Location: `src/components/ScheduleModal.tsx`, `src/sections/ChatWidget.tsx`
- Contains: Form handling, rate limiting, API calls to n8n
- Depends on: UI components, hooks, utilities
- Used by: App.tsx

## Data Flow

**Page Load Flow:**

1. `main.tsx` creates React root and mounts `App.tsx`
2. `App.tsx` renders sections in sequence: Navigation → Hero → Services → About → Team → Contact → Footer
3. ChatWidget mounts and initializes n8n chat client
4. Canvas animation in Hero section begins on mount

**User Interaction Flow:**

**Scheduling:**
1. User clicks "Comienza tu Transformación" button (Hero or Contacto sections)
2. ScheduleModal opens with date/time picker
3. User submits form with name, email, phone, company
4. Rate limiting checked (COOLDOWN_MS = 60s, BAN_MS = 300s)
5. Form data POSTed to n8n webhook: `https://n8n-n8n.ektnbd.easypanel.host/webhook/1c0360f1-fe27-42a5-9d24-7b52aebe9dd2/chat`
6. Toast notification confirms submission

**Chat Widget:**
1. ChatWidget component initializes @n8n/chat client
2. Webhook URL configured for n8n instance
3. User interacts with AI assistant via chat window
4. Custom i18n configuration in Spanish
5. Theme colors match site (emerald #10b981, dark backgrounds)

**Scroll Navigation:**
- Scroll listeners update navbar state (isScrolled)
- Smooth scroll behavior to sections via `scrollIntoView()`
- Mobile menu toggles on resize (768px breakpoint)

## State Management

**Local Component State:**
- Navigation: `isScrolled`, `isMobileMenuOpen` (useState)
- ScheduleModal: `date`, `selectedTime`, `formData`, `loading` (useState)
- Contacto: `isVisible`, `isSubmitting`, `formData` (useState)
- Servicios: `visibleCards` (Set tracking intersection)

**Browser Storage:**
- ScheduleModal uses localStorage for rate limiting: `g2_schedule_cooldown`, `g2_schedule_ban`

**No Global State Management:**
- Props drilling used for event callbacks (`onScheduleClick`)
- No Redux/Zustand/Context API in use

## Key Abstractions

**Section Component Pattern:**
- Purpose: Encapsulate vertical page sections with consistent styling
- Examples: `Hero.tsx`, `Servicios.tsx`, `Contacto.tsx`, `Equipo.tsx`, `Nosotros.tsx`
- Pattern: React functional component with CSS classes, smooth scroll anchors via `id` attribute

**Canvas Animation:**
- Purpose: Particle system background visual effect
- Location: `src/sections/Hero.tsx` lines 23-94
- Pattern: useRef for canvas element, useEffect for requestAnimationFrame loop, particle physics simulation
- Performance: Frame skipping (render every 2nd frame = 30fps target)

**UI Component Wrapper:**
- Purpose: Wrap Radix UI primitives with Tailwind styling
- Location: `src/components/ui/*.tsx`
- Pattern: Export default composed component with cn() utility for className merging
- Example: Button combines Radix slot with Tailwind variants

**n8n Integration:**
- Purpose: Conversational AI assistant
- Location: `src/sections/ChatWidget.tsx`
- Pattern: useEffect hook that calls createChat() once on mount
- Configuration: Webhook URL, i18n Spanish translations, dark theme colors

## Entry Points

**Application Root:**
- Location: `src/main.tsx`
- Triggers: Browser page load
- Responsibilities: Bootstrap React app, mount to #root DOM element

**App Component:**
- Location: `src/App.tsx`
- Triggers: React renders App
- Responsibilities: Compose sections in order, manage schedule modal state, render Toaster

**Build Output:**
- Location: `dist/` (after `npm run build`)
- Triggers: Vite build process
- Responsibilities: Bundled JS/CSS assets served statically

## Error Handling

**Strategy:** Toast notifications for user-facing errors

**Patterns:**
- ScheduleModal: Toast.error for rate limit violations, validation errors
- Contacto: Toast confirmation on form submission
- ChatWidget: console.log for initialization debugging
- No try-catch blocks in critical paths (form submission uses await)

## Cross-Cutting Concerns

**Responsive Design:**
- `use-mobile.ts` hook detects 768px breakpoint
- Tailwind responsive classes (sm:, md:, lg:)
- Mobile nav menu uses visibility classes

**Accessibility:**
- Radix UI components provide semantic HTML and ARIA
- Dialog, Form, Label components from @radix-ui
- Proper heading hierarchy in sections

**Styling Strategy:**
- Tailwind CSS utility-first with dark theme
- Custom CSS variables in `:root` for colors and spacing
- Custom utilities: `.text-gradient`, `.glow-emerald`, `.glow-emerald-strong`
- Font: Inter from Google Fonts

**Animations:**
- Canvas particle system (Hero)
- CSS transitions for nav backdrop, button hover states
- Tailwind animations: fade-in, bounce, accordion-up/down
- requestAnimationFrame for 60fps canvas animation (throttled to 30fps)

**Performance:**
- Vite for fast dev server and optimized builds
- Base config: `./` for relative asset paths
- Lazy canvas rendering (frame skipping in Hero)
- Connection limiting in Intersection Observer (threshold 0.2)

---

*Architecture analysis: 2026-04-03*
