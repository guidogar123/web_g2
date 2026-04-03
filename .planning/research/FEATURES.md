# Feature Landscape: B2B AI Consulting Website

**Domain:** B2B AI consulting with local SEO focus (Cali, Valle del Cauca, Colombia)
**Researched:** 2026-04-03
**Overall Confidence:** HIGH (official Google docs + current 2025-2026 sources)

## Table Stakes

Features users expect and Google requires. Missing any = product feels incomplete + won't rank locally.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| **Google Business Profile (GBP)** | Local search visibility; mandatory for Maps, local pack ranking, and "near me" queries | Low | Must verify ownership, complete all fields, add categories "Consulting" + location-specific keywords |
| **Mobile-first responsive design** | 60%+ traffic from mobile in Colombia; Google indexes mobile version first | Medium | Test thumb-friendly CTAs, fast load times (LCP < 2.5s), tap targets 48px minimum |
| **Core Web Vitals performance** | Ranking factor + conversion blocker; slow sites lose 123% more visitors at 10s load time | High | LCP < 2.5s, INP < 200ms, CLS < 0.1; measure with PageSpeed Insights + Search Console |
| **Organization + LocalBusiness schema (JSON-LD)** | Search engines understand business info, location, service areas; required for rich snippets | Medium | Implement both Organization and LocalBusiness schemas; nest Service schema for each offering |
| **Service schema for each consulting service** | Google displays service info in snippets; helps rank for service-specific searches | Medium | Define `areaServed: "CO"`, `availableLanguage: "es"`, pricing model if available, provider details |
| **NAP consistency (Name, Address, Phone)** | Google trusts only consistent business signals across web; inconsistency tanks local ranking | Low | Name: "G2 Intelligence", Address must match GBP exactly, Phone: +57 350 243 9698 everywhere |
| **Technical SEO fundamentals** | Crawlability, indexability, XML sitemap, robots.txt; Google won't rank what it can't index | Medium | Next.js SSR/SSG, dynamic sitemap.xml, robots.txt, fix crawl errors in Search Console |
| **Clear value proposition in Hero + H1** | B2B buyers need immediate clarity on problem you solve + benefit in first 5 seconds | Low | Headline max 44 characters, problem-first messaging (e.g., "Aumenta ventas con IA en Cali" not "IA soluciones") |
| **Local keyword optimization** | Spanish + geo-specific keywords in title, H1, meta description, service descriptions | Low | Focus on: "IA para ventas Cali", "automatización procesos Valle del Cauca", "agentes inteligentes Colombia" |
| **Working contact form** | Users expect to request demo/consultation; form must actually send data to n8n webhook | High | Fix Contacto.tsx bug: remove setTimeout simulation, POST to n8n with type='contact' |
| **Service scheduling/demo booking** | B2B consulting requires appointment-setting; existing ScheduleModal works | Low | Preserve existing ScheduleModal, ensure POST hits n8n with type='scheduling' |
| **Chatbot for 24/7 inquiries** | Users expect instant availability; n8n widget (@n8n/chat) already integrated | Low | Ensure chatbot handles common questions: servicios, precios, ubicación, horarios, cómo agendar |
| **HTTPS + security headers** | Google penalizes HTTP; users trust HTTPS; required for GBP | Low | Enforce HTTPS, add CSP, X-Frame-Options, X-Content-Type-Options headers |
| **Favicon + Open Graph tags** | Social sharing, brand recognition, technical completeness signal | Low | Favicon 32x32 + 192x192, OG title/description/image for LinkedIn/WhatsApp share |
| **Sitemap.xml + robots.txt** | Google discovers pages; prevents indexing unwanted pages (e.g., /admin, /webhooks) | Low | Dynamic sitemap.xml from /app/sitemap.ts, robots.txt disallow /api /webhooks |
| **Spanish language meta tags** | Google knows audience is Spanish-speaking in Colombia; content language signal | Low | `<html lang="es-CO">`, hreflang for Spanish/Colombia variant if multi-region in future |

## Differentiators

Features that set G2 Intelligence apart. Not expected by all, but high-value for local ranking + conversion in IA/automation niche.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| **Service area map visualization** | Shows coverage: Cali, Jamundí, Palmira, Yumbo, Valle del Cauca; builds local trust; differentiator vs national generalists | Medium | Interactive map or service area list with delivery time estimates (e.g., "48h implementation in Cali") |
| **Case study section (proof)** | Quantified results for past IA projects; builds confidence in buyer journey; converts 25-30% better than testimonials alone | Medium | 2-3 case studies: problem → solution → results (e.g., "Aumentó ventas 35% en 3 meses", "Redujo tiempo de proceso 70%") — anonymized if needed |
| **FAQ section optimized for local questions** | Addresses Colombia-specific concerns: payment methods, compliance, local support; wins long-tail local queries | Low | Questions like: "¿Cuánto cuesta IA para ventas?", "¿Cómo funciona la consultoría en Cali?", "¿Garantía de resultados?" |
| **Team bios with expertise in Colombian market** | Demonstrates local knowledge, trust; differentiator vs remote-only consultants | Low | Existing Equipo section; highlight experience with Colombian companies, local regulation knowledge |
| **Blog/insights on IA + automation for Colombian market** | Thought leadership, long-tail keyword wins, showcases expertise; out of v1 scope but future differentiator | High | Out of v1 scope per PROJECT.md; defer to Phase 2 |
| **Video testimonials from Colombian clients** | Video converts faster than text; proves real results from companies buyer recognizes (if anonymized) | Medium | 1-2 short videos (30s): client describes problem, G2 describes solution, client states result |
| **WhatsApp integration for instant contact** | Colombians prefer WhatsApp over email; reduces friction to reach you | Low | WhatsApp link in header/footer; consider WhatsApp Business API integration in Phase 2 |
| **Local partner certifications** | Certifications from Microsoft, Google Cloud, n8n partners; builds authority | Low | Display partner logos if G2 holds official certifications; verify with providers first |
| **Service pricing transparency (optional)** | Colombian buyers prefer transparent pricing; unusual for consulting but builds trust | Low | Consider "starting at $X" or "flexible packages"; optional for v1, test in Phase 2 |
| **Aggregate review schema + third-party reviews** | Reviews on Google, Trustpilot, or local Colombian directories boost local ranking + conversion | Medium | Implement AggregateRating schema; encourage clients to leave Google reviews; monitor review sentiment |

## Anti-Features

Features to deliberately NOT build. Scope reduction + avoids common pitfalls for v1.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| **Multi-language support (EN/ES)** | Out of scope per PROJECT.md; audience 100% Colombian Spanish-speakers; adds complexity, dilutes SEO signals | Keep ES-only; hreflang only if you pivot to English market later |
| **Blog / CMS / dynamic content** | Out of v1 scope; requires content strategy, editorial workflow, ongoing maintenance; SEO wins are slow (3-6 months) | Use existing service descriptions + FAQ for content marketing; defer blog to Phase 2 after core SEO established |
| **Client case studies with real names** | Clients may not want public mention; legal/NDA risk; adds development complexity | Use anonymized case studies: "Technology company" instead of name; focus on quantified results not company identity |
| **E-commerce / online payments** | Model is B2B consulting, not SaaS; payments happen offline after proposal; premature complexity | Keep contact → proposal → payment flow offline; no Stripe integration needed in v1 |
| **Live chat (separate from chatbot)** | Duplicates n8n chatbot functionality; adds cost + ops burden; existing chatbot sufficient for v1 | Rely on n8n chatbot + contact form + ScheduleModal; monitor response times, escalate to live chat in Phase 2 if needed |
| **Complex form fields (>5 fields)** | Each field beyond 5 reduces conversion by 20-30%; forms with 5+ fields convert 120% worse | Contact form: name, email, empresa, mensaje (4 fields). Schedule form: nombre, email, fecha, hora (4 fields). Resist upsell fields. |
| **Automatic country/region redirect** | Confuses SEO; Google prefers explicit geolocation signals; redirects based on IP break deep links | Never auto-redirect users; use hreflang for multi-region variants only if you expand to other countries |
| **Heavy animations / custom fonts** | Increases page load time; hurts LCP metric; mobile devices in Colombia may have slower connections | Use system fonts (Inter) + preload only critical fonts; CSS animations only for interactive elements, not hero |
| **Third-party integrations without lazy loading** | Chat widgets, analytics, ads load synchronously; block rendering; hurt Core Web Vitals | Lazy-load non-critical: chatbot, analytics. Async all third-party scripts. Measure impact on LCP. |
| **Keyword stuffing / spammy content** | Google detects unnatural keyword density; penalizes with manual action; loses credibility | Write naturally for humans; keyword placement: H1, H2, first 100 words, meta description, image alt text |

## Feature Dependencies

```
Contact Form (fixed) → n8n webhook integration (backend)
Schedule Modal → n8n webhook (backend)
Organization Schema → LocalBusiness Schema (nest under Organization)
LocalBusiness Schema → Service Schema (each service links to LocalBusiness)
Core Web Vitals optimization → Image optimization + code splitting + SSR/SSG
NAP consistency → Google Business Profile (source of truth)
Google Business Profile → Local pack ranking (Maps) + Schema.org areaServed
Mobile optimization → Responsive design + thumb-friendly CTAs + fast performance
SEO ranking → Technical SEO (sitemap, robots.txt, schema) + content (keywords, headings) + authority (backlinks, reviews)
```

## MVP Recommendation

**Phase 1: Core SEO + Conversion (this milestone)**

Prioritize in this order:

1. **Fix contact form** — Currently broken; blocks lead capture
2. **Technical SEO foundation** — GBP setup, schema.org (Organization + LocalBusiness + Service), sitemap, robots.txt, mobile optimization
3. **Core Web Vitals** — LCP < 2.5s, CLS < 0.1, INP < 200ms (Next.js helps; focus on image optimization)
4. **Local keyword optimization** — H1, meta tags, service descriptions in Spanish + geo-specificity
5. **Service descriptions** — Clear, keyword-optimized explanations of each service (6 existing services)

Defer:

- **Case studies** — Create 1-2 anonymized case studies in Phase 2 after gathering client success stories
- **FAQ section** — Phase 2; add after identifying real user questions from analytics + search console
- **Video testimonials** — Phase 2; requires production, client coordination
- **Blog / insights** — Phase 2; requires content calendar + editorial workflow
- **WhatsApp integration** — Phase 2; start with link, upgrade to Business API later
- **Review aggregation** — Phase 2; first get Google reviews, then Trustpilot

## Why This Order

1. **Technical SEO first** — Without schema, sitemap, Core Web Vitals, Google won't index or rank you; everything else is wasted effort
2. **Contact form second** — Current form is broken; useless to drive traffic if leads can't convert
3. **Local keywords third** — Spanish + geo-specific terms are table stakes for competing in Valle del Cauca
4. **Proof/case studies fourth** — Conversion multiplier once you have traffic; test with testimonials first, upgrade to case studies in Phase 2

## Content Sections (Based on Top-Ranking Sites)

Top B2B consulting websites converge on this structure:

1. **Hero** — Problem statement, value prop, primary CTA (e.g., "Agendar consultoría")
   - Existing ✓

2. **Services** — 6 service cards with problem → solution → outcome framing
   - Existing ✓ (optimize descriptions for keywords + length)

3. **How It Works / Metodología** — Process framework (discovery → implementation → results)
   - New; consider as Phase 2 differentiator

4. **Case Studies / Resultados** — 2-3 anonymized client wins with metrics
   - New; Phase 2

5. **FAQ** — Common objections answered (price, timeline, compliance, support)
   - New; Phase 2

6. **Team / Nosotros** — Bios + credentials + local market expertise
   - Existing ✓ (enhance with market expertise callouts)

7. **Testimonials** — 1-3 short quotes + logos (if permission granted)
   - Existing ✓

8. **Contact / CTA** — Working form + alternative channels (email, phone, calendar)
   - Existing ✓ (fix form)

9. **Footer** — Company info, links, social, copyright, cookie policy
   - Existing ✓

## SEO Content Optimization Checklist

For each page in MVP:

- [ ] H1 includes primary keyword + local intent (e.g., "Inteligencia Artificial para Ventas en Cali")
- [ ] Meta description (120-160 chars) answers user intent, includes keyword + CTA
- [ ] At least 2-3 H2 subheadings with secondary keywords
- [ ] First 100 words cover keyword naturally
- [ ] Alt text on all images (keyword + description)
- [ ] Internal links between service pages + home
- [ ] Page load time < 2.5s (LCP)
- [ ] Mobile test in PageSpeed Insights (target 90+ score)
- [ ] Schema.org validation via Rich Results Test

## Structured Data (Schema.org) Implementation Notes

### 1. Organization Schema (Root)
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "G2 Intelligence",
  "url": "https://g2intelligence.co",
  "logo": "https://g2intelligence.co/logo.png",
  "description": "Consultoría especializada en inteligencia artificial para ventas y automatización de procesos en Colombia",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+57 350 243 9698",
    "contactType": "Sales"
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[Get from GBP]",
    "addressLocality": "Cali",
    "addressRegion": "Valle del Cauca",
    "postalCode": "[if applicable]",
    "addressCountry": "CO"
  },
  "sameAs": [
    "https://www.linkedin.com/company/g2intelligence",
    "[other official profiles]"
  ]
}
```

**Purpose:** Tells Google who you are, where you're located, how to contact you.
**Where:** In `<head>` of home page; reference from LocalBusiness schema.

### 2. LocalBusiness Schema (Location-specific)
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "G2 Intelligence",
  "image": "https://g2intelligence.co/logo.png",
  "description": "Expertos en IA para ventas y automatización en Cali, Jamundí, Palmira, Yumbo",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[match GBP exactly]",
    "addressLocality": "Cali",
    "addressRegion": "Valle del Cauca",
    "postalCode": "[match GBP]",
    "addressCountry": "CO"
  },
  "telephone": "+57 350 243 9698",
  "email": "hola@g2intelligence.co",
  "url": "https://g2intelligence.co",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "18:00",
      "inLanguage": "es-CO"
    }
  ],
  "areaServed": {
    "@type": "State",
    "name": "Valle del Cauca"
  },
  "priceRange": "$$",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "[average from Google reviews]",
    "reviewCount": "[number of reviews]",
    "bestRating": "5",
    "worstRating": "1"
  }
}
```

**Purpose:** Signals to Google where you operate, hours, service area, reviews.
**Where:** `/pages/index.tsx` or shared layout component.
**Note:** `areaServed` is critical for local ranking; list all cities you serve.

### 3. Service Schema (for each service offering)
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Inteligencia Artificial para Ventas",
  "description": "Implementamos agentes de IA que automatizan prospección, calificación y seguimiento de leads.",
  "provider": {
    "@type": "Organization",
    "name": "G2 Intelligence"
  },
  "areaServed": [
    {
      "@type": "City",
      "name": "Cali",
      "addressCountry": "CO"
    },
    {
      "@type": "City",
      "name": "Jamundí",
      "addressCountry": "CO"
    },
    {
      "@type": "State",
      "name": "Valle del Cauca",
      "addressCountry": "CO"
    }
  ],
  "availableLanguage": "es",
  "priceRange": "Consultoría personalizada",
  "serviceType": "Business Consulting"
}
```

**Purpose:** Tells Google about specific services you offer, where, in what language.
**Where:** Serialize for each service in `/pages/servicios/` or in a service-detail component.
**Nest under:** LocalBusiness schema using `offers: [Service, Service, ...]`.

### 4. AggregateRating Schema (Reviews)
```json
{
  "@type": "AggregateRating",
  "ratingValue": "4.8",
  "reviewCount": "23",
  "bestRating": "5",
  "worstRating": "1"
}
```

**Purpose:** Display star rating in search results.
**Where:** Nest in LocalBusiness schema. Populate from Google reviews API.
**Note:** Must have minimum 3-5 reviews for Google to display stars.

## Colombian Market-Specific SEO Signals

### 1. Local Keyword Strategy
- **Primary keywords:** "IA para ventas Cali", "automatización procesos Colombia", "agentes inteligentes Valle del Cauca"
- **Long-tail keywords:** "¿Cuánto cuesta IA para ventas?", "Implementación IA en Jamundí", "Consultor IA Cali"
- **Search intent:** Colombians search for solutions, not features; "aumenta ventas con IA" > "machine learning API"

### 2. Mobile-First Reality in Colombia
- Mobile is 60%+ of web traffic; must optimize for slower networks (3G/LTE common)
- Page weight < 2MB for fast loading on mobile
- Compress images aggressively; use WebP + fallback to JPG
- Test on 4G mobile (PageSpeed Insights has a throttle option)

### 3. Trust Signals for Colombian Market
- Local phone number displayed prominently (+57 3502439698)
- Spanish language, Colombian grammar (voseo varies by region; formal Spanish safer)
- Google Business Profile with full details + regular post updates
- Customer reviews in Spanish (Google Reviews, not English testimonials)
- Compliance messaging: "Protección de datos", "Privacidad LGPD-compliant" (if applicable)

### 4. NAP Consistency Critical in Colombia
- Colombian businesses often have multiple listings due to directory sprawl
- Audit and clean up:
  - Google Business Profile
  - Google Maps
  - Local Colombian directories (if present)
  - Social media profiles (LinkedIn, Instagram)
  - Any other business listings
- Use exact same address, phone, business name everywhere

### 5. Payment/Pricing Signals
- Colombian market values payment flexibility; "Presupuesto a medida", "Planes flexibles"
- If showing pricing, mention payment methods: transferencia bancaria, tarjeta, efectivo
- Reduces friction: buying B2B consulting in Colombia often requires negotiation

## Conversion Rate Optimization (CRO) Baseline

Based on B2B consulting benchmark data:

| Element | B2B Consulting Benchmark | G2 Target |
|---------|------------------------|-----------|
| Landing page conversion rate | 2-3% | 5%+ (v1 goal) |
| Form conversion rate | Varies; 1-5 form fields | 4 fields (optimize for 8%+) |
| CTA clarity | Yes/No evaluation | Clear, action-oriented CTAs ("Agendar consultoría" not "Submit") |
| Mobile conversion | 60-70% of desktop | Parity (mobile-first optimization) |
| Bounce rate | 40-60% for B2B | 35-45% (quality traffic from local SEO) |

**Optimization strategy for v1:**
- Minimize form fields (4 max)
- Clear, Colombian-specific CTAs in Spanish
- Social proof: Google reviews + aggregate rating in schema
- Fast load (Core Web Vitals)
- Message match: ad → landing page keyword alignment

## Sources

**Google Official:**
- [Google Search Central: Local Business Structured Data](https://developers.google.com/search/docs/appearance/structured-data/local-business)
- [Google Search Central: Organization Schema](https://developers.google.com/search/docs/appearance/structured-data/organization)
- [Google Search Central: Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals)
- [Google for Developers: Understanding Core Web Vitals and Google search results](https://developers.google.com/search/docs/appearance/core-web-vitals)

**2025 B2B Best Practices:**
- [B2B Website Design Best Practices: The Complete 2025 Guide | Trajectory Web Design](https://www.trajectorywebdesign.com/blog/b2b-website-design-best-practices)
- [10 B2B Web Design Strategies to Boost Conversions in 2025 | Grazitti](https://www.grazitti.com/blog/the-future-of-b2b-web-design-10-strategies-to-improve-your-conversion-rates/)
- [B2B Landing Page Best Practices: Proven Examples & Strategies | Directive Consulting](https://directiveconsulting.com/blog/blog-b2b-landing-page-best-practices-examples/)

**Local SEO & Colombia-Specific:**
- [A Complete Guide for Doing Local SEO in Colombia | RankTracker](https://www.ranktracker.com/blog/a-complete-guide-for-doing-local-seo-in-colombia/)
- [SEO in Latin America. What Does Latin SEO Look Like? | MacSources](https://macsources.com/seo-in-latin-america-what-does-latin-seo-look-like/)
- [Your 2025 Local SEO Checklist (With Bonus Google My Business Tips) | Hatch Strategy](https://www.hatchstrat.com/your-2025-local-seo-checklist-with-bonus-google-my-business-tips)

**Schema & Structured Data:**
- [LocalBusiness Schema Markup: The Complete Guide to Standing-Out in Local Search | Localo](https://localo.com/blog/local-business-schema)
- [Complete Local Schema Markup Guide for SEO and Developers | DigiCob](https://digicobweb.com/local-business-schema-guide/)
- [How structured data supports local visibility across Google and AI | Search Engine Land](https://searchengineland.com/schema-local-visibility-google-ai-470906)

**Case Studies & Social Proof:**
- [How to Get Powerful Consulting Testimonials and Case Studies That Win More Clients | Consulting Success](https://www.consultingsuccess.com/consulting-testimonials)
- [45 Best Consulting Websites That Attract New Clients (2025) | Consulting Success](https://www.consultingsuccess.com/best-consulting-websites)

**Core Web Vitals:**
- [Core Web Vitals Crackdown: Google Enforces Stricter Mobile Performance Standards in 2025 | Systems Architect](https://systemsarchitect.net/core-web-vitals-2025/)
- [Core Web Vitals 2025: The Complete Guide to LCP, CLS & INP for Mobile and Desktop | Mobile Proxy](https://mobileproxy.space/en/pages/core-web-vitals-2025-the-complete-guide-to-lcp-cls--inp-for-mobile-and-desktop.html)

**Conversion Rate Optimization:**
- [B2B SaaS Landing Page Design: Boost Conversions & ARR | SaaS Hero](https://www.saashero.net/content/landing-page-optimization-strategies/)
- [How to Improve B2B SaaS Landing Page Conversion Rates | SaaS Hero](https://www.saashero.net/design/b2b-saas-landing-page-conversions/)
- [B2B conversion rate optimization: 2025 strategies & benchmarks | Unbounce](https://unbounce.com/conversion-rate-optimization/b2b-conversion-rates/)
