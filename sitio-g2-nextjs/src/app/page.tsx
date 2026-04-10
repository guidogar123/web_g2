import type { Metadata } from 'next';
import HomeClient from '@/components/HomeClient';

// ISR: revalidate the home page at most once per hour
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'G2 Intelligence — Inteligencia Artificial para Ventas y Automatización en Cali',
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
    },
    other: {
      'og:image': 'https://g2intelligence.co/opengraph-image.png',
      'og:image:width': '1200',
      'og:image:height': '630',
      'og:image:type': 'image/png',
      'fb:app_id': 'A74MnrVggi4x-GZO31bxtCU',
    },
  };
}

export default function Home() {
  return <HomeClient />;
}
