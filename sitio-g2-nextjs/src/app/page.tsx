import type { Metadata } from 'next';
import HomeClient from '@/components/HomeClient';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'G2 Intelligence — Inteligencia Artificial para Ventas y Automatización en Cali',
    description:
      'Transforma tu empresa con IA agentica. G2 Intelligence ofrece automatización de procesos, agentes inteligentes y consultoría en Cali, Jamundí, Palmira, Yumbo y Valle del Cauca.',
    openGraph: {
      title: 'G2 Intelligence — IA que Transforma Empresas en Cali',
      description:
        'Aumenta ventas y eficiencia con inteligencia artificial. Servicio para empresas en Cali y Valle del Cauca.',
    },
  };
}

export default function Home() {
  return <HomeClient />;
}
