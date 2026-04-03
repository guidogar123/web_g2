# External Integrations

**Analysis Date:** 2026-04-03

## APIs & External Services

**n8n Workflow Platform:**
- Service: n8n automation and chat orchestration
- What it's used for: AI assistant chat widget and meeting scheduling integration
  - SDK/Client: @n8n/chat 1.9.1
  - Endpoint: `https://n8n-n8n.ektnbd.easypanel.host/webhook/1c0360f1-fe27-42a5-9d24-7b52aebe9dd2/chat`
  - Implementation: `src/sections/ChatWidget.tsx` - Chat initialization and configuration
  - Implementation: `src/components/ScheduleModal.tsx` - Schedule submission webhook

**Font Service:**
- Service: Google Fonts
- What it's used for: Inter font family for typography
  - Implementation: Imported in `src/index.css` via @import
  - Fonts: Inter 300-800 weights

## Data Storage

**Databases:**
- None detected - Fully client-side application

**File Storage:**
- Local filesystem only - No cloud storage integration detected

**Caching:**
- Browser localStorage - Used for rate limiting and session state
  - Keys: `g2_schedule_cooldown`, `g2_schedule_ban` (schedule modal anti-spam)
  - Implementation: `src/components/ScheduleModal.tsx` (lines 65-80)

## Authentication & Identity

**Auth Provider:**
- None - Public marketing website with no user authentication
- Unauthenticated form submissions to n8n webhook

## Monitoring & Observability

**Error Tracking:**
- None detected - Basic error handling via try/catch

**Logs:**
- Browser console logging
- Implementation: `src/sections/ChatWidget.tsx` (line 8) - "Initializing G2 Assistant Chat Widget..."
- Toast notifications for user feedback via Sonner library

## CI/CD & Deployment

**Hosting:**
- Not specified in codebase - Static hosting required (Vite SPA build output)
- Build output directory: `dist/`

**CI Pipeline:**
- None detected in codebase
- Would require external setup (GitHub Actions, GitLab CI, etc.)

## Environment Configuration

**Required env vars:**
- None configured - All configuration is hardcoded in source files

**Critical Configuration Points:**
- n8n webhook URL: `https://n8n-n8n.ektnbd.easypanel.host/webhook/1c0360f1-fe27-42a5-9d24-7b52aebe9dd2/chat`
  - Location: `src/sections/ChatWidget.tsx` (line 10) and `src/components/ScheduleModal.tsx` (line 89)
  - Should be moved to environment variables before production
- n8n widget configuration (colors, messages, themes)
  - Location: `src/sections/ChatWidget.tsx` (lines 9-52)

**Secrets location:**
- No secrets detected or stored
- n8n webhook URL is semi-public (should be protected in production)

## Webhooks & Callbacks

**Incoming:**
- n8n Chat Webhook: POST endpoint receives chat messages and scheduling requests
  - Endpoint: `https://n8n-n8n.ektnbd.easypanel.host/webhook/1c0360f1-fe27-42a5-9d24-7b52aebe9dd2/chat`
  - Request body (chat): `{ message: string }`
  - Request body (scheduling): `{ type: 'scheduling', nombre: string, email: string, telefono: string, empresa?: string, fecha: string, hora: string, timestamp: ISO8601 }`
  - Implementation: `src/components/ScheduleModal.tsx` (lines 88-101)

**Outgoing:**
- Form submissions to n8n webhook only
- Contact form (Contacto section) - Currently simulated with 1500ms delay, no actual submission
  - Implementation: `src/sections/Contacto.tsx` (lines 66-80) - Form submission is mocked

## Social Media Integration

**Account Links (No API Integration):**
- Facebook: https://www.facebook.com/profile.php?id=61552402294706
- X (Twitter): https://x.com/g2intelligen_co
- Instagram: https://www.instagram.com/g2intelligence_co/
- TikTok: https://www.tiktok.com/@g2intelligence_co
- Implementation: `src/sections/Contacto.tsx` (lines 31-35)

## Contact Information

**Embedded Data:**
- Email: hola@g2intelligence.co
- Phone: +57 350 243 9698
- Location: Colombia
- Implementation: `src/sections/Contacto.tsx` (lines 9-28)

---

*Integration audit: 2026-04-03*
