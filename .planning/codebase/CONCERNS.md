# Codebase Concerns

**Analysis Date:** 2026-06-19

## 🔴 P0 — Producción

### 1. In-memory rate limiter no es efectivo en serverless
- **Archivo:** `src/lib/rate-limit.ts`
- **Problema:** El rate limiter usa un `Map<string, RateLimitEntry>` en memoria. En despliegues serverless (Vercel), cada instancia tiene su propia memoria. Un atacante puede rotar requests entre instancias y evadir el límite de 3 req / 5 min.
- **Impacto:** El formulario de contacto y agendamiento pueden ser spameados.
- **Solución sugerida:** Usar un almacén externo compartido (Upstash Redis, Vercel KV) o rate limiting a nivel de Vercel Edge Middleware/WAF.

### 2. Chat widget webhook URL expuesta al cliente
- **Archivo:** `src/components/ChatWidget.tsx`
- **Variable:** `NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL`
- **Problema:** Las variables con prefijo `NEXT_PUBLIC_` se exponen en el bundle del cliente. Cualquier usuario puede ver la URL del webhook de n8n en el código fuente del navegador y enviar mensajes directamente.
- **Impacto:** El chat n8n puede recibir tráfico no autorizado/spam sin pasar por la validación del servidor.
- **Solución sugerida:** Canalizar el chat a través de un proxy server-side similar al de los formularios, o agregar autenticación/token en n8n.

### 3. Sin error boundaries ni loading states
- **Problema:** Ninguna página o componente tiene `error.tsx`, `loading.tsx`, o `not-found.tsx` en el App Router.
- **Impacto:** Si un error ocurre en un componente, el usuario ve una pantalla en blanco o un error de React sin formato. Experiencia de usuario deficiente para errores inesperados.
- **Archivos afectados:** `src/app/`, todos los páginas.
- **Solución sugerida:** Agregar `error.tsx` y `not-found.tsx` globales, más `loading.tsx` para cada ruta.

## 🟡 P1 — Riesgo Medio

### 4. Cero tests en toda la codebase
- **Problema:** No hay framework de testing, no hay archivos de test, no hay scripts de test en package.json.
- **Impacto:** Cualquier refactor o cambio en schemas de validación, rate limiter, o componentes de formulario no tiene red de seguridad. Los errores llegan a producción sin detección.
- **Cobertura faltante:**
  - `schemas.ts` — Validación de formularios (crítico para leads)
  - `rate-limit.ts` — Lógica de rate limiting
  - `cities.ts` — Datos geo de 15 ciudades
  - `route.ts` (ambos) — API endpoints de webhook
  - Componentes de formulario (Contacto, ScheduleModal)

### 5. Roboto_Mono font cargado pero no usado visiblemente
- **Archivo:** `src/app/layout.tsx` (líneas 13-18)
- **Problema:** `Roboto_Mono` se carga con `next/font/google` y se asigna a `--font-roboto-mono` como variable CSS, pero no hay ningún elemento visible que use esta fuente. Los styles de shadcn/ui la referencian como `--font-mono` pero Tailwind v4 actual no la aplica.
- **Impacto:** ~20-30KB extra en el bundle de font innecesariamente.
- **Solución sugerida:** Eliminar la carga de Roboto Mono si no se usa, o agregar `@apply font-mono` donde corresponda.

### 6. `shadcn` en runtime dependencies
- **Archivo:** `package.json`
- **Problema:** `shadcn: "^4.1.2"` está en `dependencies` (runtime). El CLI `shadcn` solo se necesita durante desarrollo para agregar/actualizar componentes.
- **Impacto:** Aumenta innecesariamente el tamaño del bundle de producción y el `node_modules` en producción.
- **Solución sugerida:** Mover `shadcn` a `devDependencies`.

### 7. NIT placeholder en Footer
- **Archivo:** `src/components/sections/Footer.tsx` (línea 103)
- **Problema:** `NIT: 901.XXX.XXX-X` usa `XXX` como placeholder, lo cual se despliega así en producción.
- **Impacto:** El sitio muestra un NIT inválido en producción. Aspecto poco profesional.
- **Solución sugerida:** Completar el NIT real o eliminar la línea hasta tenerlo.

### 8. Social links inconsistentes entre componentes
- **Problema:** Los links de redes sociales aparecen en 3 lugares con valores diferentes:
  - `layout.tsx` (sameAs): URLs con IDs específicos
  - `Contacto.tsx` (socialLinks): URLs genéricas
  - `Footer.tsx` (socialLinks): URLs genéricas diferentes
- **Impacto:** Las URLs en `Contacto.tsx` y `Footer.tsx` pueden no coincidir con las cuentas reales (ej: `twitter.com/G2Intelligence` vs `x.com/g2intelligen_co` en layout).
- **Solución sugerida:** Centralizar los social links en una única fuente de verdad (`lib/`), idealmente de tipado fuerte.

## 🟢 P2 — Riesgo Bajo / Deuda Técnica

### 9. `dynamicParams = false` impide agregar ciudades sin rebuild
- **Archivo:** `src/app/[ciudad]/page.tsx` (línea 7)
- **Problema:** `dynamicParams = false` + `force-static` significa que solo las 15 ciudades definidas en `generateStaticParams` generan página. Cualquier ciudad nueva requiere rebuild completo.
- **Impacto:** Si se necesita agregar una ciudad urgentemente, no se puede sin deploy.
- **Solución sugerida:** Cambiar a `dynamicParams = true` (con ISR) para soporte de nuevas ciudades bajo demanda.

### 10. Layout duplicación entre city pages y secciones
- **Problema:** Las city pages (`src/app/[ciudad]/page.tsx`) tienen su propio header, hero, servicios, CTA y footer inline — no reusan los componentes compartidos (`HomeClient.tsx`, `Navigation.tsx`, `Hero.tsx`, `Footer.tsx`).
- **Impacto:** Cambios de diseño (header, footer, CTA) deben aplicarse en dos lugares: componentes compartidos + city pages. Alto riesgo de divergencia visual.
- **Solución sugerida:** Extraer un layout compartido o componente `CityPageShell` que use los mismos componentes de sección.

### 11. Sin CI/CD pipeline en el repositorio
- **Problema:** No hay configuración de GitHub Actions u otro CI en el repo. No hay lint automático, tests, o verificación de build en PRs.
- **Impacto:** Errores de lint o build pueden llegar a `main` sin detección.
- **Solución sugerida:** Agregar GitHub Actions workflow con lint + build + (futuros) tests.

### 12. Sin manejo de imágenes optimizadas
- **Problema:** No se usa `next/image` ni hay imágenes en `public/` aparte de `opengraph-image.png`. No hay configuración de `sharp` (aunque está en devDependencies).
- **Impacto:** Meta tags de OG image funcionan, pero no hay imágenes de contenido que necesiten optimización.
- **Solución sugerida:** Si se agregan imágenes al sitio, usar `next/image` con los formatos modernos (WebP/AVIF).

### 13. Footer links sin destino (#)
- **Archivo:** `src/components/sections/Footer.tsx`
- **Problema:** Links "Blog", "Carreras", "Términos de Servicio", "Política de Cookies" apuntan a `#` — no tienen página asociada.
- **Impacto:** UX incompleta. Usuarios clickean y no pasa nada.
- **Solución sugerida:** Crear las páginas faltantes o eliminar los links temporalmente.

### 14. Compatibilidad internacional i18n limitada
- **Problema:** El sitio está completamente en español (es_CO). No hay estructura para i18n (sin `next-intl`, `react-intl`, o similar).
- **Impacto:** Si se necesita inglés u otros idiomas en el futuro, hay que refactorizar todo el texto hardcodeado en componentes. No es urgente ahora pero la deuda crecerá.
- **Solución sugerida:** Adoptar `next-intl` si hay planes de multi-idioma.

## Fortalezas Actuales

✅ **Server-side form proxy** — Las rutas API protegen la URL de n8n del lado servidor para formularios  
✅ **Dual Zod validation** — Validación tanto en cliente como en servidor  
✅ **Rate limiting server-side** — Aunque imperfecto en serverless, es mejor que nada  
✅ **D-locked payloads** — Solo los campos validados se reenvían (previene inyección de campos)  
✅ **SEO first** — Metadata completa en todas las rutas, JSON-LD, sitemap dinámico, geo tags  
✅ **Dark theme por defecto** — Diseño consistente sin flash de modo claro  
✅ **Graceful degradation** — Chat widget se desactiva automáticamente sin env var configurada  
✅ **Standalone output** — Listo para despliegue en Vercel con www → naked domain redirect
