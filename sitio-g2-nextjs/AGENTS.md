<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## 📍 DÓNDE QUEDAMOS — última sesión 09-oct-2026
Leyendo esto no hace falta releer el código. Ante contradicción con memoria vieja, gana este bloque.

1. Contexto: este repo (`WEB_G2/sitio-g2-nextjs`, git `guidogar123/web_g2`, Next.js 16) ES el sitio publicado en g2intelligence.co. `C:/Users/guido/OneDrive/G2INNOVATION/g2-website` (Vite+React) es prototipo descartable sin relación. Deploy: push a `main` -> GitHub Actions `deploy.yml` -> VPS easypanel 82.25.86.23, servicio Docker Swarm `web-g2_web_g2` (el que Traefik enruta; `posgresql_web_g2` existe pero NO recibe tráfico). Causa del "deploy fantasma" desde 27-ago: el workflow apuntaba al servicio equivocado + secret `WEBG2_SSH_KEY` vencido; corregido en `46b99e1`.
2. Funciona hoy, verificado en vivo con `curl --resolve g2intelligence.co:443:82.25.86.23` (main `d1b2597`, CI deploy success): 19/19 URLs del sitemap en 200; home enlaza a las 15 ciudades; OG con `property=`; sin `fb:app_id` (salvo privacidad, ver 4); `ItemList` con `ListItem`; 1 `LocalBusiness` + 1 `FAQPage` por ciudad, solo `/cali` con `PostalAddress`; legales con 1 `Organization`; ciudades 588-675 palabras; `lastmod` fijo 2026-10-09; `/llms.txt` 200. Legales con la razón social real (ver reglas).
3. Escrito sin desplegar: nada.
4. Próximo paso: PR chico (flujo de la regla 3) que (a) quite `name="og:image"` y `fb:app_id` del `metadata.other` de `src/app/politica-privacidad/page.tsx`, (b) recorte la description del home (`src/app/page.tsx`, hoy 176 chars) a <=160.
5. Bloqueos externos (de Guido): Search Console — verificar dominio, enviar `https://g2intelligence.co/sitemap.xml`, pedir indexación de las 15 ciudades. Sin esto Google no recoge los cambios rápido.
6. Pendientes sin medir: Core Web Vitals (cuota pública de PageSpeed suele agotarse); vencimiento del SSL; si TikTok exige cláusula específica de Login Kit/Content API en `/terminos-servicio`. Deuda previa: `npm run lint` da 34 errores idénticos en `main`.
7. Reglas vigentes:
   - G2 INTELLIGENCE es ESTABLECIMIENTO DE COMERCIO (matrícula 1287922), NO sociedad. NUNCA escribir "G2 Intelligence S.A.S.". Razón social: "GUIDO GARZÓN PEÑA, actuando como propietario del establecimiento de comercio G2INTELLIGENCE", NIT 94.527.160-5. Guido es NO RESPONSABLE DE IVA: nunca "más IVA" en textos legales.
   - Rutas legales reales: `/politica-privacidad`, `/terminos-servicio`, `/politica-cookies` (NO `terminos-condiciones`). Antes de crear página nueva: `git fetch && git log main..origin/main`.
   - Push/merge a `main` DESPLIEGA a producción. Cambios van por rama + PR. Flujo autorizado por Guido: Claude (nube, `claude --cloud`, interactivo; no admite `-p`) implementa -> Codex (`codex exec --sandbox read-only -m gpt-5.5`, brief neutro, nunca `gpt-6-astra`) revisa en frío -> Hermes verifica build + curl propios y cada hallazgo contra el fuente -> si Codex APRUEBA y la verificación pasa, merge autónomo (`gh pr ready` primero si es draft) y verificar en vivo; si rechaza, corregir en la misma rama y repetir.
   - No inventar datos en el sitio: ni reseñas/AggregateRating, ni cifras, ni dirección postal fuera de Cali, ni promesas de resultado.
   - Verificar el sitio vivo siempre con `curl --resolve g2intelligence.co:443:82.25.86.23`: la red de Guido tiene DNS corporativo que secuestra el dominio hacia `*.holcimbp.net`.
   - Build local en worktree: symlink/junction a `node_modules` y `npm run build` (>4 min, en background). Sin node_modules, un tsc "limpio" es falso verde.
