# G2 Intelligence — Website Rebuild

## What This Is

Reconstrucción del sitio web de G2 Intelligence (g2intelligence.co) desde una React SPA sin SEO hacia un sitio Next.js optimizado para búsqueda local. El objetivo es posicionar a G2 Intelligence como la empresa referente de IA para ventas y automatización de procesos en Cali, Jamundí, Palmira y Yumbo. El diseño se regenera desde cero con Stitch MCP respetando la identidad visual Emerald Intelligence.

## Core Value

Que cuando una empresa del Valle del Cauca busque "inteligencia artificial para ventas" o "automatización de procesos Cali", G2 Intelligence aparezca primero.

## Requirements

### Validated

- ✓ Chat bot vía n8n widget (`@n8n/chat`) integrado y funcional — existente
- ✓ Sistema de agenda (ScheduleModal) que envía a webhook n8n con `type: 'scheduling'` — existente
- ✓ Identidad Emerald Intelligence aplicada: fondo negro #050505, esmeralda #10b981, slate #0d1117 — existente
- ✓ 6 secciones de contenido: Hero, Servicios, Nosotros, Equipo, Contacto, Footer — existente
- ✓ Información de contacto: hola@g2intelligence.co / +57 350 243 9698 / redes sociales — existente

### Active

- [ ] Migrar de React SPA + Vite a Next.js (App Router) para SSR/SSG y SEO técnico
- [ ] Rediseñar UI completa con Stitch MCP usando identidad Emerald Intelligence
- [ ] Arreglar formulario de contacto: conectar al webhook n8n (`type: 'contact'`) en lugar de simulación
- [ ] SEO local: meta tags, titles, descriptions con geo-targeting Cali / Valle del Cauca
- [ ] Schema.org structured data: LocalBusiness, Organization, Service con área de servicio Colombia/Valle
- [ ] Sitemap.xml dinámico y robots.txt optimizados
- [ ] Core Web Vitals: LCP < 2.5s, CLS < 0.1, FID < 100ms
- [ ] Open Graph y Twitter Cards para compartir en redes sociales
- [ ] Contenido optimizado: integrar palabras clave locales en H1, H2, descripciones de servicios
- [ ] Variables de entorno para webhook URLs (eliminar URLs hardcodeadas)

### Out of Scope

- Casos de éxito con nombres de clientes reales — usuario prefiere no mencionar clientes específicos
- Multi-idioma (EN/ES) — audiencia target es 100% colombiana
- Blog / CMS / contenido dinámico — fuera del alcance del rebuild v1
- E-commerce o pagos online — modelo de negocio es consultoría B2B
- App móvil nativa — solo web

## Context

**Codebase existente:**
- Fuente React: `Kimi_Agent_Diseño web G2Intelligence/app/` (React 19 + Vite 7 + TypeScript + Tailwind 3 + shadcn/ui)
- Sitio compilado: `sitio-g2/` (build estático desplegado actualmente)
- Identidad visual: `G2_Social_Media_Kit/` con `master_brand_kit.md` y `emerald_intelligence_philosophy.md`

**Integraciones activas:**
- n8n webhook: `https://n8n-n8n.ektnbd.easypanel.host/webhook/1c0360f1-fe27-42a5-9d24-7b52aebe9dd2/chat`
  - Chat bot: `@n8n/chat` library, webhook GET/POST
  - Agenda: POST con `{ type: 'scheduling', nombre, email, telefono, fecha, hora }`
  - Contacto (a implementar): POST con `{ type: 'contact', nombre, email, empresa, mensaje }`

**Bug conocido (Contacto.tsx:70-72):**
```javascript
// Simulate form submission — NUNCA envía datos reales
await new Promise((resolve) => setTimeout(resolve, 1500));
```
El formulario muestra "Mensaje enviado" pero descarta todos los datos del usuario.

**Identidad Emerald Intelligence:**
- Colores: `#050505` Void Black, `#10b981` Emerald Nexus, `#0d1117` Deep Slate
- Tipografía: Inter (sans), Roboto Mono (mono), tracking wide 0.1-0.2em
- Mood: futurista, minimalista, premium — "high-end research facility"

**SEO objetivo:**
- Geo-target: Cali, Jamundí, Palmira, Yumbo, Valle del Cauca, Colombia
- Servicios clave: IA para ventas, automatización de procesos, agentes inteligentes, transformación digital
- Competencia: consultoras tech generales sin especialización en IA local

## Constraints

- **Brand**: Emerald Intelligence visual system — no puede cambiar, es la identidad consolidada
- **Integraciones**: Webhook n8n debe preservarse exactamente — es el backend de automatización
- **Stack**: Next.js App Router — decisión tomada por requerimiento SEO
- **Diseño**: Stitch MCP para generación de pantallas — usuario eligió esta herramienta
- **Dominio**: g2intelligence.co — dominio colombiano .co
- **Seguridad**: URLs de webhook deben moverse a variables de entorno `.env.local`

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js sobre React SPA | SEO técnico requiere SSR/SSG; las SPAs no se indexan bien | — Pending |
| Stitch MCP para diseño | Usuario eligió explícitamente esta herramienta para generar screens nuevos | — Pending |
| Mismo webhook n8n para formulario de contacto | Ya funciona para chat y agenda; evita nueva infraestructura | — Pending |
| Sin blog/CMS en v1 | Reduce scope; SEO inicial se logra con contenido de servicios bien optimizado | — Pending |

## Evolution

Este documento evoluciona en transiciones de fase y hitos de milestone.

**Después de cada transición de fase** (vía `/gsd:transition`):
1. ¿Requisitos invalidados? → Mover a Out of Scope con razón
2. ¿Requisitos validados? → Mover a Validated con referencia de fase
3. ¿Requisitos nuevos emergieron? → Agregar a Active
4. ¿Decisiones que registrar? → Agregar a Key Decisions
5. ¿"What This Is" sigue siendo preciso? → Actualizar si se desvió

**Después de cada milestone** (vía `/gsd:complete-milestone`):
1. Revisión completa de todas las secciones
2. Core Value check — ¿sigue siendo la prioridad correcta?
3. Auditar Out of Scope — ¿las razones siguen siendo válidas?
4. Actualizar Context con estado actual

---
*Last updated: 2026-04-03 after initialization*
