import type { Metadata } from 'next';
import HomeClient from '@/components/HomeClient';

// Datos estructurados solo del home: las landings de ciudad emiten su propio LocalBusiness.
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'G2 Intelligence',
  description:
    'Empresa de inteligencia artificial y automatización de procesos para empresas colombianas',
  url: 'https://g2intelligence.co',
  telephone: '+573116783068',
  email: 'hola@g2intelligence.co',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Cali',
    addressCountry: 'CO',
    addressRegion: 'Valle del Cauca',
  },
  areaServed: [
    { '@type': 'City', name: 'Cali' },
    { '@type': 'City', name: 'Jamundí' },
    { '@type': 'City', name: 'Palmira' },
    { '@type': 'City', name: 'Yumbo' },
    { '@type': 'AdministrativeArea', name: 'Valle del Cauca' },
    { '@type': 'Country', name: 'Colombia' },
  ],
  priceRange: '$$',
  knowsAbout: [
    'Inteligencia Artificial',
    'Automatización de Procesos',
    'Agentes Inteligentes',
    'Análisis de Datos',
    'Consultoría Empresarial',
  ],
  sameAs: [
    'https://www.facebook.com/profile.php?id=61552402294706',
    'https://x.com/g2intelligen_co',
    'https://www.instagram.com/g2intelligence_co/',
    'https://www.tiktok.com/@g2intelligence_co',
  ],
};

const servicesSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: [
    {
      '@type': 'Service',
      position: 1,
      name: 'Infraestructura de IA',
      description:
        'Implementamos agentes inteligentes que automatizan tareas complejas, mejoran la atención al cliente y optimizan la toma de decisiones en tiempo real.',
      provider: { '@type': 'Organization', name: 'G2 Intelligence', url: 'https://g2intelligence.co' },
      areaServed: { '@type': 'AdministrativeArea', name: 'Valle del Cauca' },
    },
    {
      '@type': 'Service',
      position: 2,
      name: 'Optimización de Procesos',
      description:
        'Analizamos y redefinimos tus procesos de negocio para eliminar cuellos de botella, reducir costos y aumentar la eficiencia operativa.',
      provider: { '@type': 'Organization', name: 'G2 Intelligence', url: 'https://g2intelligence.co' },
      areaServed: { '@type': 'AdministrativeArea', name: 'Valle del Cauca' },
    },
    {
      '@type': 'Service',
      position: 3,
      name: 'Aumento de Ventas con IA',
      description:
        'Integramos herramientas de IA en tu ciclo de ventas para identificar oportunidades, personalizar propuestas y cerrar más negocios.',
      provider: { '@type': 'Organization', name: 'G2 Intelligence', url: 'https://g2intelligence.co' },
      areaServed: { '@type': 'AdministrativeArea', name: 'Valle del Cauca' },
    },
    {
      '@type': 'Service',
      position: 4,
      name: 'Consultoría Estratégica en IA',
      description:
        'Guiamos a tu empresa en la adopción de IA: diagnóstico, hoja de ruta, selección de herramientas y gestión del cambio organizacional.',
      provider: { '@type': 'Organization', name: 'G2 Intelligence', url: 'https://g2intelligence.co' },
      areaServed: { '@type': 'AdministrativeArea', name: 'Valle del Cauca' },
    },
    {
      '@type': 'Service',
      position: 5,
      name: 'Análisis de Datos con IA',
      description:
        'Convertimos tus datos en decisiones con dashboards inteligentes, modelos predictivos y análisis automatizados.',
      provider: { '@type': 'Organization', name: 'G2 Intelligence', url: 'https://g2intelligence.co' },
      areaServed: { '@type': 'AdministrativeArea', name: 'Valle del Cauca' },
    },
    {
      '@type': 'Service',
      position: 6,
      name: 'Integración de Sistemas con IA',
      description:
        'Conectamos tus herramientas existentes con capacidades de IA para flujos de trabajo unificados y sin fricciones.',
      provider: { '@type': 'Organization', name: 'G2 Intelligence', url: 'https://g2intelligence.co' },
      areaServed: { '@type': 'AdministrativeArea', name: 'Valle del Cauca' },
    },
  ],
};

// ISR: revalidate the home page at most once per hour
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'G2 Intelligence — Inteligencia Artificial para Ventas y Automatización en Cali',
    alternates: { canonical: 'https://g2intelligence.co' },
    description:
      'Transforma tu empresa con IA agentica. G2 Intelligence ofrece automatización de procesos, agentes inteligentes y consultoría en Cali, Jamundí, Palmira, Yumbo y Valle del Cauca.',
    openGraph: {
      type: 'website',
      locale: 'es_CO',
      siteName: 'G2 Intelligence',
      url: 'https://g2intelligence.co',
      title: 'G2 Intelligence — IA que Transforma Empresas en Cali',
      description:
        'Aumenta ventas y eficiencia con inteligencia artificial. Servicio para empresas en Cali y Valle del Cauca.',
      images: [
        {
          url: 'https://g2intelligence.co/opengraph-image.png',
          width: 1200,
          height: 630,
          type: 'image/png',
          alt: 'G2 Intelligence — IA para empresas en Colombia',
        },
      ],
    },
  };
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />
      <HomeClient />
    </>
  );
}
