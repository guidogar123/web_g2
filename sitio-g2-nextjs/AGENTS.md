<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## 📍 DÓNDE QUEDAMOS — última sesión 09-oct-2026
Leyendo esto no hace falta releer el código.

1. Causa raíz / contexto: el sitio local Vite+React en `C:/Users/guido/OneDrive/G2INNOVATION/g2-website` NO es el publicado — es un prototipo sin relación con producción. El proyecto real es ESTE (`WEB_G2/sitio-g2-nextjs`, repo git `web_g2`, origin `github.com/guidogar123/web_g2.git`), desplegado en VPS easypanel 82.25.86.23, servicio `web-g2`, build Docker desde `/etc/easypanel/projects/web-g2/web_g2/code/sitio-g2-nextjs`. Rutas legales reales: `/politica-privacidad`, `/terminos-servicio`, `/politica-cookies` (NO `terminos-condiciones` — esa ruta se descartó por duplicar `terminos-servicio` que ya existía en origin desde 27-ago).
2. Qué funciona hoy, verificado: `npm run build` pasa limpio (Next.js 16.2.2 Turbopack). Las 3 páginas legales + Footer corregidas: razón social "G2 Intelligence S.A.S." (persona jurídica INEXISTENTE) reemplazada por "GUIDO GARZÓN PEÑA, actuando como propietario del establecimiento de comercio G2INTELLIGENCE" + NIT real 94.527.160-5 en header/intro/contacto/footer de cada página (ver regla 7).
3. Qué está escrito pero NO desplegado: nada pendiente de este cambio — falta solo commit+push a main (dispara el GitHub Action de deploy).
4. Próximo paso concreto: `git add -A && git commit -m "fix(legal): razón social correcta GUIDO GARZÓN PEÑA / G2INTELLIGENCE en páginas legales" && git push origin main`.
5. Bloqueos externos: ninguno.
6. Pendientes sin medir: no se verificó si TikTok exige cláusula textual específica sobre su Login Kit/Content API en `/terminos-servicio` — se dejó la redacción genérica existente.
7. Reglas vigentes:
   - G2 INTELLIGENCE es un ESTABLECIMIENTO DE COMERCIO (matrícula 1287922), NO una sociedad — NUNCA escribir "G2 Intelligence S.A.S." en contratos/legales del sitio. Razón social correcta: "GUIDO GARZÓN PEÑA, actuando como propietario del establecimiento de comercio G2INTELLIGENCE". NIT 94.527.160-5. Guido (persona natural, C.C. 94.527.160) es NO RESPONSABLE DE IVA — nunca poner "más IVA" en textos legales/contratos de G2.
   - Repo `g2-website` (Vite+React, C:/Users/guido/OneDrive/G2INNOVATION/g2-website) es prototipo descartable, sin relación con el sitio real — no confundirlo con este repo en futuras sesiones.
   - SIEMPRE `git fetch && git log main..origin/main` antes de crear página legal nueva en este repo — otra sesión/agente puede haber ya resuelto lo mismo en otra ruta (pasó 09-oct: `terminos-condiciones` duplicaba `terminos-servicio` ya pusheado 27-ago).
