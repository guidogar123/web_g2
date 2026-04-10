import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { CITIES, CITY_SLUGS, getCityBySlug } from './cities';

export const dynamic = 'force-static';
export const dynamicParams = false;

interface Props {
  params: Promise<{ ciudad: string }>;
}

export function generateStaticParams() {
  return CITY_SLUGS.map((slug) => ({ ciudad: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { ciudad } = await params;
  const city = getCityBySlug(ciudad);
  if (!city) return {};

  const title = `Inteligencia Artificial para Ventas en ${city.name}`;
  const description = `G2 Intelligence ofrece soluciones de IA, automatización de procesos y agentes inteligentes para empresas en ${city.name}, ${city.department}. Aumenta tus ventas y eficiencia con tecnología agentica.`;

  return {
    title,
    description,
    alternates: { canonical: `https://g2intelligence.co/${ciudad}` },
    openGraph: {
      type: 'website',
      locale: 'es_CO',
      siteName: 'G2 Intelligence',
      url: `https://g2intelligence.co/${ciudad}`,
      title,
      description,
    },
    other: {
      'og:image': 'https://g2intelligence.co/opengraph-image',
      'og:image:width': '1200',
      'og:image:height': '630',
      'og:image:type': 'image/png',
      'geo.region': city.region,
      'geo.placename': `${city.name}, Colombia`,
      ICBM: `${city.lat},${city.lon}`,
      'fb:app_id': 'A74MnrVggi4x-GZO31bxtCU',
    },
  };
}

const SERVICES = [
  {
    name: 'Infraestructura de IA',
    desc: 'Agentes inteligentes que automatizan tareas complejas y mejoran la atención al cliente.',
  },
  {
    name: 'Optimización de Procesos',
    desc: 'Eliminamos cuellos de botella, reducimos costos y aumentamos la eficiencia operativa.',
  },
  {
    name: 'Aumento de Ventas con IA',
    desc: 'Identificamos oportunidades, personalizamos propuestas y cerramos más negocios.',
  },
  {
    name: 'Consultoría Estratégica',
    desc: 'Roadmap tecnológico adaptado a las necesidades de tu empresa.',
  },
  {
    name: 'Análisis de Datos',
    desc: 'Dashboards inteligentes, modelos predictivos y análisis automatizados.',
  },
  {
    name: 'Integración de Sistemas',
    desc: 'Conectamos tus herramientas existentes con capacidades de IA sin fricción.',
  },
];

export default async function CiudadPage({ params }: Props) {
  const { ciudad } = await params;
  const city = getCityBySlug(ciudad);
  if (!city) notFound();

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'G2 Intelligence',
    description: `Empresa de inteligencia artificial y automatización de procesos para empresas en ${city.name}, ${city.department}`,
    url: `https://g2intelligence.co/${ciudad}`,
    telephone: '+573502439698',
    email: 'hola@g2intelligence.co',
    address: {
      '@type': 'PostalAddress',
      addressLocality: city.name,
      addressRegion: city.department,
      addressCountry: 'CO',
    },
    areaServed: [
      { '@type': 'City', name: city.name },
      { '@type': 'AdministrativeArea', name: city.department },
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
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      <div className="min-h-screen bg-[#050505] text-white">
        {/* Header */}
        <header className="border-b border-white/10 px-6 py-4">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-black font-bold text-sm">
                G2
              </div>
              <span className="font-semibold text-white">G2 Intelligence</span>
            </Link>
            <Link
              href="/#contacto"
              className="px-4 py-2 rounded-lg bg-emerald-500 text-black font-semibold text-sm hover:bg-emerald-400 transition-colors"
            >
              Contactar
            </Link>
          </div>
        </header>

        {/* Hero */}
        <section className="max-w-5xl mx-auto px-6 py-20 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-sm mb-6">
            {city.name}, {city.department}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Inteligencia Artificial para{' '}
            <span className="text-emerald-400">Ventas y Automatización</span>
            <br />en {city.name}
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10">
            Ayudamos a empresas de {city.name} y {city.department} a adoptar IA agentica,
            automatizar procesos y multiplicar sus ventas con tecnología de vanguardia.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/#contacto"
              className="px-6 py-3 rounded-lg bg-emerald-500 text-black font-semibold hover:bg-emerald-400 transition-colors"
            >
              Comienza en {city.name}
            </Link>
            <Link
              href="/"
              className="px-6 py-3 rounded-lg border border-white/20 text-white hover:border-emerald-500/50 transition-colors"
            >
              Ver todos los servicios
            </Link>
          </div>
        </section>

        {/* Stats */}
        <section className="border-y border-white/10 py-12">
          <div className="max-w-5xl mx-auto px-6 grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-emerald-400">+50</div>
              <div className="text-sm text-white/60 mt-1">Proyectos Agenticos</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-400">3x</div>
              <div className="text-sm text-white/60 mt-1">Aumento en Ventas</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-400">98%</div>
              <div className="text-sm text-white/60 mt-1">Clientes Satisfechos</div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="max-w-5xl mx-auto px-6 py-20">
          <h2 className="text-3xl font-bold text-center mb-4">
            Servicios de IA en {city.name}
          </h2>
          <p className="text-white/60 text-center mb-12 max-w-xl mx-auto">
            Soluciones diseñadas para empresas de {city.department} que quieren crecer con inteligencia artificial.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s) => (
              <div
                key={s.name}
                className="p-6 rounded-xl border border-white/10 bg-white/5 hover:border-emerald-500/30 transition-colors"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-400 mb-3" />
                <h3 className="font-semibold mb-2">{s.name}</h3>
                <p className="text-sm text-white/60">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-emerald-500/10 border-y border-emerald-500/20 py-16">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">
              ¿Tu empresa está en {city.name}?
            </h2>
            <p className="text-white/70 mb-8">
              Agenda una consulta gratuita de 30 minutos con nuestro equipo y descubre cómo la IA puede transformar tu negocio en {city.name}.
            </p>
            <Link
              href="/#contacto"
              className="inline-block px-8 py-4 rounded-lg bg-emerald-500 text-black font-bold hover:bg-emerald-400 transition-colors"
            >
              Hablar con un experto
            </Link>
          </div>
        </section>

        {/* Other cities */}
        <section className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-xl font-semibold mb-6 text-white/80">
            También servimos en otras ciudades de Colombia
          </h2>
          <div className="flex flex-wrap gap-3">
            {CITIES.filter((c) => c.slug !== ciudad).map((c) => (
              <Link
                key={c.slug}
                href={`/${c.slug}`}
                className="px-4 py-2 rounded-lg border border-white/10 text-sm text-white/60 hover:border-emerald-500/40 hover:text-emerald-400 transition-colors"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 py-8 text-center text-white/40 text-sm">
          <p>© {new Date().getFullYear()} G2 Intelligence — {city.name}, {city.department}, Colombia</p>
          <p className="mt-1">
            <a href="mailto:hola@g2intelligence.co" className="hover:text-emerald-400 transition-colors">
              hola@g2intelligence.co
            </a>{' '}
            ·{' '}
            <a href="tel:+573502439698" className="hover:text-emerald-400 transition-colors">
              +57 350 243 9698
            </a>
          </p>
        </footer>
      </div>
    </>
  );
}
