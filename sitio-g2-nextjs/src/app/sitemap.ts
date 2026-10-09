import type { MetadataRoute } from 'next';
import { CITIES } from './[ciudad]/cities';

// Fecha del último cambio de contenido de cada grupo de páginas.
// Se actualiza a mano cuando cambia el contenido; no se deriva de la hora del build.
const LAST_MODIFIED_HOME = new Date('2026-10-09');
const LAST_MODIFIED_LEGAL = new Date('2026-10-09');
const LAST_MODIFIED_CITIES = new Date('2026-10-09');

export default function sitemap(): MetadataRoute.Sitemap {
  const cityPages: MetadataRoute.Sitemap = CITIES.map((city) => ({
    url: `https://g2intelligence.co/${city.slug}`,
    lastModified: LAST_MODIFIED_CITIES,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [
    {
      url: 'https://g2intelligence.co',
      lastModified: LAST_MODIFIED_HOME,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: 'https://g2intelligence.co/politica-privacidad',
      lastModified: LAST_MODIFIED_LEGAL,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: 'https://g2intelligence.co/terminos-servicio',
      lastModified: LAST_MODIFIED_LEGAL,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: 'https://g2intelligence.co/politica-cookies',
      lastModified: LAST_MODIFIED_LEGAL,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    ...cityPages,
  ];
}
