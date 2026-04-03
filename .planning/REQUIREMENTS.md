# Requirements: G2 Intelligence Website Rebuild

**Defined:** 2026-04-03
**Core Value:** Que cuando una empresa del Valle del Cauca busque "inteligencia artificial para ventas" o "automatización de procesos Cali", G2 Intelligence aparezca primero.

## v1 Requirements

### Migration

- [ ] **MIGR-01**: El sitio funciona como aplicación Next.js 15 App Router (reemplazando React SPA + Vite)
- [ ] **MIGR-02**: Todas las secciones existentes están presentes: Hero, Servicios, Nosotros, Equipo, Contacto, Footer
- [ ] **MIGR-03**: Las URLs de webhook n8n están almacenadas en variables de entorno `.env.local`, no hardcodeadas
- [ ] **MIGR-04**: El sitio se despliega correctamente en Vercel con dominio g2intelligence.co

### SEO Técnico

- [ ] **SEO-01**: Cada página tiene title y meta description únicos con geo-targeting (Cali, Valle del Cauca)
- [ ] **SEO-02**: Schema.org `LocalBusiness` con `areaServed` incluyendo Cali, Jamundí, Palmira, Yumbo está presente en el layout raíz
- [ ] **SEO-03**: Schema.org `Service` con descripción, nombre y proveedor está presente para cada uno de los 6 servicios
- [ ] **SEO-04**: `sitemap.xml` se genera automáticamente por Next.js y lista todas las páginas del sitio
- [ ] **SEO-05**: `robots.txt` permite indexación completa del sitio
- [ ] **SEO-06**: Open Graph tags (og:title, og:description, og:image) están presentes en todas las páginas para compartir en redes sociales
- [ ] **SEO-07**: Twitter Card tags están presentes para previews en X/Twitter

### Formularios e Integraciones

- [ ] **FORM-01**: El formulario de contacto envía datos reales al webhook n8n con `{ type: 'contact', nombre, email, empresa, mensaje }` (fix bug simulación)
- [ ] **FORM-02**: El formulario de agenda envía datos al webhook n8n con `{ type: 'scheduling', nombre, email, telefono, fecha, hora }` (preservar funcionalidad existente)
- [ ] **FORM-03**: Todos los campos de formulario se validan con Zod tanto en cliente como en servidor antes del envío
- [ ] **FORM-04**: Los errores de envío muestran mensajes descriptivos específicos al usuario (no mensajes genéricos)
- [ ] **FORM-05**: Las API Routes de Next.js proxean las peticiones al webhook n8n (no llamadas directas cliente→n8n que causan CORS)
- [ ] **FORM-06**: Rate limiting server-side en las API Routes de formularios previene spam y abuso

### Chat Widget

- [ ] **CHAT-01**: El widget `@n8n/chat` carga correctamente sin errores SSR usando `dynamic()` con `ssr: false`
- [ ] **CHAT-02**: El chat mantiene la paleta Emerald Intelligence: botón #10b981, fondo chat #0a0a0a
- [ ] **CHAT-03**: El webhook del chat sigue conectado a `NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL`

### Diseño Visual

- [ ] **UI-01**: Todas las secciones del sitio son regeneradas con Stitch MCP usando la identidad Emerald Intelligence
- [ ] **UI-02**: La paleta de colores se mantiene: Void Black #050505, Emerald Nexus #10b981, Deep Slate #0d1117
- [ ] **UI-03**: La tipografía usa Inter (sans-serif) y Roboto Mono cargadas con `next/font` sin layout shift
- [ ] **UI-04**: La imagen de Open Graph/Twitter Card usa la identidad visual Emerald Intelligence

### Performance

- [ ] **PERF-01**: LCP (Largest Contentful Paint) < 2.5s medido en PageSpeed Insights
- [ ] **PERF-02**: CLS (Cumulative Layout Shift) < 0.1 (sin saltos de layout al cargar)
- [ ] **PERF-03**: Todas las imágenes se sirven con `next/image` en formato WebP/AVIF con dimensiones declaradas
- [ ] **PERF-04**: Fuentes Inter y Roboto Mono se cargan con `next/font` para eliminar FOUT

## v2 Requirements

### Contenido y Autoridad

- **CONT-01**: Sección de casos de éxito con proyectos anonimizados (problema → solución → resultado)
- **CONT-02**: Sección de FAQ con preguntas frecuentes sobre IA para empresas colombianas
- **CONT-03**: Blog/Insights para contenido de thought leadership y keywords de long-tail
- **CONT-04**: Reseñas de clientes integradas desde Google My Business

### SEO Avanzado

- **SEO-08**: Páginas de servicios individuales (`/servicios/ia-para-ventas`, etc.) para keywords de long-tail
- **SEO-09**: Páginas de ciudades (`/cali`, `/palmira`, etc.) para geo-targeting más específico
- **SEO-10**: Integración con Google Analytics 4 y Search Console

### Funcionalidades

- **FUNC-01**: WhatsApp Business button flotante para contacto directo
- **FUNC-02**: Notificaciones por email cuando el formulario de contacto recibe un mensaje

## Out of Scope

| Feature | Reason |
|---------|--------|
| Multi-idioma (EN/ES) | Audiencia 100% colombiana; añadir inglés diluye SEO local |
| Casos de éxito con clientes nombrados | Decisión del usuario: prefiere no mencionar clientes específicos |
| Blog / CMS dinámico | Fuera del alcance v1; SEO inicial con páginas de servicios es suficiente |
| E-commerce / pagos | Modelo B2B consultoría; ventas ocurren por agenda/llamada |
| App móvil nativa | Web-first con diseño responsive |
| Multi-página por servicio (v1) | Prioridad: lanzar fast; páginas individuales de servicio van en v2 |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| MIGR-01 | Phase 1 | Pending |
| MIGR-02 | Phase 1 | Pending |
| MIGR-03 | Phase 1 | Pending |
| MIGR-04 | Phase 5 | Pending |
| SEO-01 | Phase 2 | Pending |
| SEO-02 | Phase 2 | Pending |
| SEO-03 | Phase 2 | Pending |
| SEO-04 | Phase 2 | Pending |
| SEO-05 | Phase 2 | Pending |
| SEO-06 | Phase 2 | Pending |
| SEO-07 | Phase 2 | Pending |
| FORM-01 | Phase 3 | Pending |
| FORM-02 | Phase 3 | Pending |
| FORM-03 | Phase 3 | Pending |
| FORM-04 | Phase 3 | Pending |
| FORM-05 | Phase 3 | Pending |
| FORM-06 | Phase 3 | Pending |
| CHAT-01 | Phase 4 | Pending |
| CHAT-02 | Phase 4 | Pending |
| CHAT-03 | Phase 4 | Pending |
| UI-01 | Phase 1 | Pending |
| UI-02 | Phase 1 | Pending |
| UI-03 | Phase 1 | Pending |
| UI-04 | Phase 2 | Pending |
| PERF-01 | Phase 5 | Pending |
| PERF-02 | Phase 5 | Pending |
| PERF-03 | Phase 1 | Pending |
| PERF-04 | Phase 1 | Pending |

**Coverage:**
- v1 requirements: 28 total
- Mapped to phases: 28
- Unmapped: 0 ✓

---
*Requirements defined: 2026-04-03*
*Last updated: 2026-04-03 after initial definition*
