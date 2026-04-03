# Codebase Concerns

**Analysis Date:** 2026-04-03

## Tech Debt

**SPA Architecture Without SSR (Critical for SEO):**
- Issue: Site is a Vite + React SPA with no Server-Side Rendering. Google sees empty `index.html` with only a root div. All content renders in JavaScript post-load.
- Files: `Kimi_Agent_Diseño web G2Intelligence/app/index.html`, `Kimi_Agent_Diseño web G2Intelligence/app/vite.config.ts`
- Impact:
  - Google cannot index dynamic content reliably on new domains
  - No meta descriptions, Open Graph tags, or structured data in HTML
  - Sharing on social media shows no preview
  - Severely limits SEO strategy for "Agentes IA Colombia", "Consultoría IA" keywords
  - Timeline to first meaningful ranking: 6-12 months instead of 2-3 months
- Fix approach: Implement prerendering at build time (vite-react-ssg, 4-8 hours) or migrate to Next.js with SSR (2-4 weeks). Prerendering recommended for single-page sites. Phase 2 priority per PROYECTO.md.

**Missing Critical SEO Infrastructure:**
- Issue: No robots.txt, no sitemap.xml, no schema.org markup, HTML lang="en" on Spanish site, no canonical URLs, incomplete meta tags
- Files: `Kimi_Agent_Diseño web G2Intelligence/app/index.html`
- Impact: Google cannot efficiently discover/crawl the site. Search results show incorrect metadata. Colombian Spanish speakers see "English" language signal.
- Fix approach: FASE 1 per PROYECTO.md - add lang="es", meta description, OG tags, robots.txt, sitemap.xml, JSON-LD Organization schema. ~5 hours. Already documented in PROYECTO.md as Phase 1 quick wins.

**Hardcoded External Endpoints:**
- Issue: n8n webhook URL hardcoded in multiple places
- Files:
  - `Kimi_Agent_Diseño web G2Intelligence/app/src/sections/ChatWidget.tsx:10` - `https://n8n-n8n.ektnbd.easypanel.host/webhook/1c0360f1-fe27-42a5-9d24-7b52aebe9dd2/chat`
  - `Kimi_Agent_Diseño web G2Intelligence/app/src/components/ScheduleModal.tsx:89` - same URL
- Impact: Changing webhook requires code rebuild + redeploy. URL exposed in client bundle (viewable in browser devtools). If endpoint changes, entire app breaks.
- Fix approach: Extract to environment variable (VITE_N8N_WEBHOOK_URL). Use .env.local in development, set via environment at deploy time. Requires vite.config.ts update for environment variable exposure.

---

## Known Bugs

**Rate-Limiting Logic Race Condition:**
- Issue: In `ScheduleModal.tsx:63-80`, checkRateLimit() logic has a flaw. If user submits rapidly between cooldown check and setLoading, multiple concurrent requests can bypass the cooldown.
- Files: `Kimi_Agent_Diseño web G2Intelligence/app/src/components/ScheduleModal.tsx` lines 82-115
- Trigger: User rapidly clicks "Confirmar Cita" button while loading. Race condition between `checkRateLimit()` and `setLoading(true)`.
- Workaround: Current UI disables button when loading (line 247), which mitigates in practice. However, network latency could still allow race condition if first request is slow.

**Incomplete Empresa Form Field:**
- Issue: In ScheduleModal form, empresa field defined in state (line 54) but no form input for it. Data collected but not UI-exposed.
- Files: `Kimi_Agent_Diseño web G2Intelligence/app/src/components/ScheduleModal.tsx` lines 50-55, 142-185
- Impact: Company name never captured despite being in formData object. Sent to webhook but always undefined.
- Workaround: Currently no immediate impact since webhook receives the form as-is. But defeats purpose of collecting empresa data.

---

## Security Considerations

**Client-Side Sensitive Data Exposure:**
- Risk: NIT placeholder exposed in footer: `NIT: 901.XXX.XXX-X`
- Files: `Kimi_Agent_Diseño web G2Intelligence/app/src/sections/Footer.tsx:142`
- Current mitigation: Masked with X's (good). However, this suggests the real NIT will eventually be unmasked here — exposing company tax ID in client HTML.
- Recommendations:
  - Document that NIT should never be placed in frontend code, even masked
  - Consider removing from footer entirely, or place only on secure backend pages
  - Use contact form confirmation emails for tax/legal info instead

**Hardcoded Webhook Exposures:**
- Risk: n8n webhook endpoint (with ID) visible in client-side source code
- Files: `Kimi_Agent_Diseño web G2Intelligence/app/src/sections/ChatWidget.tsx:10`, `ScheduleModal.tsx:89`
- Current mitigation: n8n webhooks can include authentication in the URL itself (the ID is a shared secret)
- Recommendations:
  - Document that this endpoint URL acts as an API key — never expose in public repos
  - Implement backend proxy if additional security is needed (e.g., rate-limiting, IP restrictions)
  - If webhook ID rotates, entire frontend must redeploy
  - Consider using environment variables to avoid exposing URLs in git history

**LocalStorage Rate-Limiting Bypass:**
- Risk: Rate-limiting stored in browser localStorage (`g2_schedule_cooldown`, `g2_schedule_ban`)
- Files: `Kimi_Agent_Diseño web G2Intelligence/app/src/components/ScheduleModal.tsx:20-23, 65-66`
- Current mitigation: Client-side only. Can be trivially bypassed by clearing localStorage or using DevTools.
- Recommendations:
  - localStorage rate-limiting is advisory only (for UX). Implement server-side rate-limiting in n8n webhook or backend proxy.
  - Consider fingerprinting (IP + User-Agent) for abuse detection
  - Document this as "UX throttling" not "security throttling"

**No CORS Headers Documented:**
- Risk: ScheduleModal makes fetch() to external n8n domain without visible CORS handling
- Files: `Kimi_Agent_Diseño web G2Intelligence/app/src/components/ScheduleModal.tsx:89-100`
- Current mitigation: Likely working because n8n webhook has CORS enabled (common for webhooks)
- Recommendations:
  - Document expected CORS headers from n8n endpoint
  - If this breaks, error message "Error al agendar. Intenta de nuevo" (line 111) won't help users debug CORS issues
  - Consider backend proxy to handle CORS consistently

---

## Performance Bottlenecks

**Large Radix UI Component Library:**
- Problem: 40+ @radix-ui/* dependencies in package.json, all included in bundle
- Files: `Kimi_Agent_Diseño web G2Intelligence/app/package.json` lines 16-40
- Current usage: Only ~15 components used (Dialog, Input, Label, etc.) but all installed
- Impact: Increases build size and bundle analysis. Many unused components.
- Improvement path:
  - Run `npm ls @radix-ui` to audit which are actually imported
  - Remove unused @radix-ui packages (keep only required ones)
  - Current tree-shaking should eliminate most unused code, but cleaner dependency list improves maintainability

**Console Logging in Production:**
- Problem: `console.log('Initializing G2 Assistant Chat Widget...')` left in ChatWidget
- Files: `Kimi_Agent_Diseño web G2Intelligence/app/src/sections/ChatWidget.tsx:8`
- Impact: Minor. Outputs to browser console on every page load. No performance cost but indicates code not fully production-hardened.
- Improvement path: Remove debug logging or wrap in `process.env.NODE_ENV === 'development'` check

---

## Fragile Areas

**ScheduleModal Time Slot Generation:**
- Files: `Kimi_Agent_Diseño web G2Intelligence/app/src/components/ScheduleModal.tsx:57-61`
- Why fragile: Hard-coded 6 AM - 8 PM (20:00) business hours. If business changes hours, code must be modified. Assumes UTC time without timezone conversion.
- Safe modification: Extract to constants at top (SCHEDULE_START_HOUR, SCHEDULE_END_HOUR). Add timezone parameter if international scaling needed.
- Test coverage: No unit tests for time slot generation logic.

**Available Days Calculation:**
- Files: `Kimi_Agent_Diseño web G2Intelligence/app/src/components/ScheduleModal.tsx:26-44`
- Why fragile: Hard-coded 2-day lead time, skips Sundays only (no holidays). If business closes for holidays, users can still book those days.
- Safe modification: Extract to config object {leadDays: 2, closedDays: [0, 6] (Sundays/Saturdays), holidays: [...]}. Consider using date-fns for holiday handling.
- Test coverage: No tests for edge cases (month boundaries, leap years, daylight savings).

**Footer Link Scroll Behavior:**
- Files: `Kimi_Agent_Diseño web G2Intelligence/app/src/sections/Footer.tsx:26-33, 44, 85-106`
- Why fragile: Navigation relies on ID selectors matching HTML structure (e.g., `#hero`, `#servicios`, `#nosotros`). If section IDs change, links break silently.
- Safe modification: Create central SECTION_IDS constant object, use in both Footer and sections. Add console warning if element not found.
- Test coverage: No E2E tests verifying footer links scroll to correct sections.

**Form Data Object Mutation:**
- Files: `Kimi_Agent_Diseño web G2Intelligence/app/src/components/ScheduleModal.tsx:50-55, 151, 165, 179`
- Why fragile: setFormData spreads entire object on each input change (e.g., line 151). If more fields added, easy to miss one and create silent data loss.
- Safe modification: Use form library (react-hook-form already imported in dependencies) or create typed setter for each field.
- Test coverage: No form validation tests.

---

## Scaling Limits

**Single Webhook Endpoint for All Events:**
- Capacity: One n8n webhook ID handles chat + scheduling
- Limit: If traffic increases 10x, single webhook becomes bottleneck. No load balancing.
- Scaling path: Separate webhook for chat and scheduling. Implement n8n queue nodes. Add rate-limiting at nginx reverse proxy level before reaching n8n.

**Client-Side State Only:**
- Capacity: All state in React component memory. No persistent session tracking.
- Limit: If business needs to show "currently 5 people ahead of you in queue", cannot implement without backend.
- Scaling path: Introduce backend API (Node.js/Supabase) to track queue state, session persistence, analytics.

---

## Dependencies at Risk

**No Lockfile Issues Detected:**
- Status: package-lock.json present and committed. Dependency tree is reproducible.

**React 19.2.0 + Vite 7.2.4 (Cutting Edge):**
- Risk: Very new versions (Feb 2024 releases). May have undiscovered bugs or breaking changes in minor versions.
- Impact: If critical security issue found, might require quick patch with unforeseen incompatibilities.
- Migration plan: Monitor React 19.x and Vite 7.x release notes. Test thoroughly before upgrading minor versions. Consider using ~19.2.0 in package.json to avoid auto-patch to 19.3+ if issues arise.

**@n8n/chat v1.9.1 Dependency:**
- Risk: Proprietary n8n widget. Limited control over updates. If n8n sunsets this package, no alternative without rewriting chat UI.
- Impact: Chat widget becomes unmaintainable if package is deprecated.
- Migration plan: Audit n8n/chat source code. Plan alternative: custom React chat component + n8n webhook (decouples from widget library).

---

## Missing Critical Features

**No Analytics Integration:**
- Problem: No Google Analytics, Posthog, or equivalent. Cannot measure visitor behavior, conversion funnel, bounce rate.
- Blocks: SEO strategy (PROYECTO.md recommends GA4 + GSC integration). Cannot validate if content resonates.
- Impact: Flying blind on what works. Cannot optimize for user engagement.

**No Form Validation on Client:**
- Problem: ScheduleModal accepts any email format, any phone. No client-side validation before submission.
- Blocks: Poor UX if user submits invalid email but only finds out after slow network request.
- Impact: Higher server load from invalid submissions.

**No Error Recovery UI:**
- Problem: ScheduleModal error toast (line 111) says "Error al agendar. Intenta de nuevo." but doesn't say WHY it failed (network? webhook timeout? validation?).
- Blocks: Users cannot debug or retry intelligently.
- Impact: Abandoned booking attempts, lost leads.

**No Unsubscribe/Opt-Out Mechanism:**
- Problem: Scheduling collects email + phone but no way for users to opt out of future communications.
- Blocks: Potential GDPR/PIPEDA compliance issue if data stored in CRM without explicit consent record.
- Impact: Legal risk if emails/calls escalate.

---

## Test Coverage Gaps

**No Automated Tests:**
- What's not tested: All business logic (form validation, rate-limiting, date calculation, navigation)
- Files: No test files found in codebase. 67 component files with zero test coverage.
- Risk: Changes to ScheduleModal time logic or Footer scroll behavior could break without detection.
- Priority: HIGH - Recommend starting with:
  1. ScheduleModal form submission + rate-limiting (`checkRateLimit()` logic)
  2. Available days calculation (boundary cases, holidays)
  3. Footer section scroll functionality

**No E2E Tests:**
- Missing: User flows (booking a consultation, submitting contact form)
- Files: No Playwright, Cypress, or equivalent config
- Risk: SEO improvements (FASE 1) and widget integrations cannot be validated across browsers/devices

**No Build Verification:**
- Missing: Pre-deploy checks (a11y, performance, broken links)
- Workaround: Manual pre-launch QA only
- Recommendation: Add ESLint (already configured), add @axe-core/react for a11y, add lighthouse CI

---

## Deployment & Operations Issues

**Deploy Script Has Placeholders:**
- Issue: `deploy.sh` contains template variables `tu_usuario`, `tu_vps_ip`, `REMOTE_PATH`
- Files: `Kimi_Agent_Diseño web G2Intelligence/app/deploy.sh`
- Impact: Script will not work as-is. Requires manual editing before first deploy. No error checking if vars are empty.
- Fix approach: Use environment variables (.env.deploy) or prompt user for input. Add validation: `if [ -z "$USER" ]; then echo "ERROR: USER not set"; exit 1; fi`

**SSL Certificate Status Unknown:**
- Issue: PROYECTO.md notes "SSL: pendiente Certbot en VPS" (2026-04-03)
- Files: VPS deployment status unknown without SSH access
- Impact: Site may not have HTTPS. Browser warning if HTTP served to g2intelligence.co.
- Fix approach: Run `certbot certonly --standalone -d g2intelligence.co -d www.g2intelligence.co` on VPS. Set auto-renewal cron.

**No Health Check / Monitoring:**
- Missing: Uptime monitoring, error tracking, performance alerts
- Impact: Site could be down and nobody notices until customer complains
- Recommendation: Add free tier Uptime Robot (5-min ping), Sentry (error tracking), or equivalent

---

## Summary by Priority

| Category | Issue | Priority | Time to Fix |
|----------|-------|----------|------------|
| SEO | SPA without SSR | CRITICAL | 4-8 hours (prerender) / 2-4 weeks (Next.js) |
| SEO | Missing SEO metadata | CRITICAL | 5 hours |
| Security | Hardcoded webhook URL | HIGH | 1 hour |
| Tech Debt | Client-only rate-limiting | HIGH | 2 hours |
| Testing | Zero test coverage | HIGH | 20-40 hours (initial suite) |
| Operations | Deploy script placeholders | MEDIUM | 1 hour |
| Performance | Unused Radix components | MEDIUM | 2 hours |
| UX | No form validation UI | MEDIUM | 3 hours |
| Code Quality | Rate-limit race condition | MEDIUM | 2 hours |
| Compliance | Missing opt-out mechanism | MEDIUM | 4 hours |

---

*Concerns audit: 2026-04-03*
