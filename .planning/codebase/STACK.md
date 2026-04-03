# Technology Stack

**Analysis Date:** 2026-04-03

## Languages

**Primary:**
- TypeScript 5.9.3 - All source code including React components and build configuration
- JavaScript - Supporting configuration files and assets

**Secondary:**
- CSS3 - Styling with Tailwind CSS and custom utilities

## Runtime

**Environment:**
- Node.js (inferred from package.json type: "module")

**Package Manager:**
- npm - Lockfile: `package-lock.json` present

## Frameworks

**Core:**
- React 19.2.0 - UI component framework and rendering
- Vite 7.2.4 - Build tool and dev server

**UI Component Library:**
- Radix UI - 30+ component libraries (@radix-ui/*) - Unstyled, accessible components
  - Includes: accordion, dialog, dropdown, select, tooltip, tabs, slider, navigation-menu, popover, context-menu, progress, radio-group, checkbox, switch, toggle, scroll-area, alert-dialog, avatar, breadcrumb, aspect-ratio, hover-card, separator, collapsible, menubar

**Styling:**
- Tailwind CSS 3.4.19 - Utility-first CSS framework
- PostCSS 8.5.6 - CSS transformation with autoprefixer
- Autoprefixer 10.4.23 - CSS vendor prefixing

**Form & Validation:**
- React Hook Form 7.70.0 - Efficient form state management
- @hookform/resolvers 5.2.2 - Validation resolver integration
- Zod 4.3.5 - TypeScript-first schema validation

**Development:**
- ESLint 9.39.1 - JavaScript/TypeScript linting
- @vitejs/plugin-react 5.1.1 - React support in Vite

## Key Dependencies

**Critical:**
- @n8n/chat 1.9.1 - Why it matters: Embedded chat widget for n8n workflow integration (ChatWidget component uses this for AI assistant)
- next-themes 0.4.6 - Dark mode theme management

**UI & UX:**
- Lucide React 0.562.0 - SVG icon library (Mail, Phone, MapPin, Facebook, Twitter, Instagram icons)
- Recharts 2.15.4 - React charting library for data visualization
- Sonner 2.0.7 - Toast notification system
- embla-carousel-react 8.6.0 - Carousel/slider component
- react-resizable-panels 4.2.2 - Resizable panel layouts
- date-fns 4.1.0 - Date utilities and formatting (used in schedule modal)
- react-day-picker 9.13.0 - Calendar picker component
- input-otp 1.4.2 - OTP input component
- vaul 1.1.2 - Drawer component
- cmdk 1.1.1 - Command palette/command menu
- class-variance-authority 0.7.1 - Component variant management
- clsx 2.1.1 - Conditional class name builder
- tailwind-merge 3.4.0 - Merge Tailwind classes

**Utilities:**
- react-dom 19.2.0 - React DOM rendering

## Configuration

**Environment:**
- Configuration managed through JavaScript config files
- No .env file detected in codebase
- Hardcoded n8n webhook URL in ChatWidget and ScheduleModal components: `https://n8n-n8n.ektnbd.easypanel.host/webhook/1c0360f1-fe27-42a5-9d24-7b52aebe9dd2/chat`

**Build:**
- `vite.config.ts` - Vite configuration with React plugin and @ path alias
- `tsconfig.json` - TypeScript base configuration with path aliases
- `tsconfig.app.json` - App-specific TypeScript configuration
- `tsconfig.node.json` - Node/build tools TypeScript configuration
- `tailwind.config.js` - Tailwind CSS theme and plugin configuration
- `postcss.config.js` - PostCSS configuration with Tailwind
- `eslint.config.js` - ESLint rules and language configuration

## Platform Requirements

**Development:**
- Node.js with npm package manager
- Modern browser with ES2020 support (ECMAScript version set to 2020 in ESLint)
- TypeScript knowledge for development

**Production:**
- Static hosting capable of serving SPA (Single Page Application)
- Base path configuration available for deployment at non-root paths
- Vite build output to `dist/` directory

---

*Stack analysis: 2026-04-03*
