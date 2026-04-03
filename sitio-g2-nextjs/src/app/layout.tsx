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
  title: 'G2 Intelligence — Inteligencia Artificial para Empresas en Cali y Valle del Cauca',
  description:
    'G2 Intelligence ayuda a empresas colombianas a adoptar IA agentica, optimizar procesos y multiplicar ventas. Servicios en Cali, Jamundí, Palmira, Yumbo y Valle del Cauca.',
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'G2 Intelligence',
  description:
    'Empresa de inteligencia artificial y automatización de procesos para empresas colombianas',
  url: 'https://g2intelligence.co',
  telephone: '+573502439698',
  email: 'hola@g2intelligence.co',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'CO',
    addressRegion: 'Valle del Cauca',
  },
  areaServed: ['Cali', 'Jamundí', 'Palmira', 'Yumbo', 'Valle del Cauca', 'Colombia'],
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
    <html lang="es" className={`${inter.variable} ${robotoMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
