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
  twitter: {
    card: 'summary_large_image',
    title: 'G2 Intelligence — IA para Empresas en Cali',
    description:
      'Automatiza procesos y multiplica ventas con agentes inteligentes. Servicio para empresas en Cali, Jamundí, Palmira, Yumbo y Valle del Cauca.',
    images: ['https://g2intelligence.co/opengraph-image.png'],
  },
  other: {
    'geo.region': 'CO-VAC',
    'geo.placename': 'Cali, Colombia',
    ICBM: '3.4516,-76.5320',
  },
};

// Organización mínima para todas las páginas (incluidas las legales). El LocalBusiness
// con datos de contacto y cobertura vive solo en el home y en cada landing de ciudad.
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'G2 Intelligence',
  url: 'https://g2intelligence.co',
  sameAs: [
    'https://www.facebook.com/profile.php?id=61552402294706',
    'https://x.com/g2intelligen_co',
    'https://www.instagram.com/g2intelligence_co/',
    'https://www.tiktok.com/@g2intelligence_co',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-CO" className={`${inter.variable} ${robotoMono.variable}`}>
      <body className={`${inter.className} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
