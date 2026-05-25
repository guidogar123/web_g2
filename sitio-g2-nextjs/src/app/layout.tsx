import type { Metadata } from 'next';
import { Inter, Roboto_Mono } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '600'],
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
  weight: ['400'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://g2intelligence.co'),
  title: {
    default: 'G2 Intelligence — IA para Empresas en Cali',
    template: '%s | G2 Intelligence',
  },
  description:
    'G2 Intelligence ayuda a empresas de Cali, Jamundí, Palmira, Yumbo y Valle del Cauca a adoptar IA, automatizar procesos y multiplicar ventas con agentes inteligentes.',
  keywords: [
    'inteligencia artificial para ventas Cali',
    'automatización de procesos Cali Colombia',
    'agentes inteligentes Valle del Cauca',
    'consultoría IA empresas colombianas',
    'IA para negocios Cali',
    'G2 Intelligence',
  ],
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    siteName: 'G2 Intelligence',
    url: 'https://g2intelligence.co',
    title: 'G2 Intelligence — IA que Transforma Empresas en Cali',
    description:
      'G2 Intelligence ayuda a empresas de Cali, Jamundí, Palmira, Yumbo y Valle del Cauca a adoptar IA, automatizar procesos y multiplicar ventas con agentes inteligentes.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'G2 Intelligence — IA para Empresas en Cali',
    description:
      'Automatiza procesos y multiplica ventas con agentes inteligentes. Servicio para empresas en Cali, Jamundí, Palmira, Yumbo y Valle del Cauca.',
    images: ['https://g2intelligence.co/opengraph-image.png'],
  },
  other: {
    'og:image': 'https://g2intelligence.co/opengraph-image.png',
    'og:image:width': '1200',
    'og:image:height': '630',
    'og:image:type': 'image/png',
    'geo.region': 'CO-VAC',
    'geo.placename': 'Cali, Colombia',
    ICBM: '3.4516,-76.5320',
    'fb:app_id': 'A74MnrVggi4x-GZO31bxtCU',
  },
  alternates: {
    canonical: 'https://g2intelligence.co',
  },
};

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-CO" className={`${inter.variable} ${robotoMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
