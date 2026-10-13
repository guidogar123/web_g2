import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle2, Download, Phone } from 'lucide-react'

const PDF_URL = '/recursos/Lista_Ley1581_pymes_G2Intelligence.pdf'
const PAGE_URL = 'https://g2intelligence.co/recursos/lista-ley-1581'

export const metadata: Metadata = {
  title: 'Lista gratis: 10 puntos de la Ley 1581 antes de usar IA con datos de clientes',
  description:
    'Descarga gratis una lista de 10 puntos basada en la Ley 1581 de 2012 para revisar cómo tu pyme trata los datos de sus clientes antes de usar inteligencia artificial.',
  openGraph: {
    title: 'Lista gratis: 10 puntos de la Ley 1581 para tu pyme',
    description:
      'Lista de verificación basada en la Ley 1581 de 2012 para usar IA cuidando los datos personales de tus clientes.',
    url: PAGE_URL,
    siteName: 'G2 Intelligence',
    locale: 'es_CO',
    type: 'website',
    images: [{ url: 'https://g2intelligence.co/opengraph-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lista gratis: 10 puntos de la Ley 1581 para tu pyme',
    description: 'Revisa en 10 puntos cómo tu pyme trata los datos de sus clientes antes de usar IA.',
    images: ['https://g2intelligence.co/opengraph-image.png'],
  },
  alternates: { canonical: PAGE_URL },
}

const points = [
  'Sé qué datos personales tengo y dónde están',
  'Tengo autorización previa, expresa e informada',
  'Al pedirla, informo cuatro cosas',
  'Cuido los datos sensibles y los de menores',
  'Uso los datos solo para lo que dije',
  'Protejo los datos y limito quién entra',
  'Sé a quién le llegan los datos cuando uso una herramienta de IA',
  'Atiendo consultas y reclamos a tiempo',
  'Tengo un manual interno de políticas y procedimientos',
  'Sé qué hacer si hay una violación de seguridad',
]

export default function ListaLey1581() {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <header className="sticky top-0 z-50 border-b border-white/8 bg-[#050505]/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="text-lg font-bold tracking-tight text-[#10b981]">G2</span>
            <span className="text-sm text-white/40">|</span>
            <span className="text-sm font-semibold text-white">G2 Intelligence</span>
          </Link>
          <Link href="/" className="text-sm text-white/60 transition-colors hover:text-white">
            Volver al inicio
          </Link>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden px-6 pb-12 pt-20">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full opacity-10"
            style={{ background: 'radial-gradient(ellipse, #10b981 0%, transparent 70%)' }}
          />
          <div className="relative mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#10b981]/30 bg-[#10b981]/10 px-4 py-1.5 text-sm text-[#10b981]">
              <CheckCircle2 size={14} />
              Recurso gratis para pymes
            </div>
            <h1 className="mb-6 text-3xl font-bold leading-tight tracking-tight md:text-5xl">
              Antes de usar IA con los datos de tus clientes:{' '}
              <span className="text-[#10b981]">10 puntos de la Ley 1581</span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-white/60">
              Una lista de verificación de 2 páginas para revisar, con un sí o un no, cómo tu empresa
              trata los datos personales. Está basada en el texto de la Ley 1581 de 2012 y cada punto
              indica el artículo del que sale.
            </p>
            <a
              href={PDF_URL}
              download
              className="inline-flex items-center gap-2 rounded-lg bg-[#10b981] px-8 py-4 text-lg font-bold text-white transition-all hover:bg-[#0d9668] hover:shadow-xl hover:shadow-[#10b981]/25"
            >
              <Download size={18} />
              Descargar la lista (PDF)
            </a>
            <p className="mt-3 text-sm text-white/40">Gratis, sin registro. 2 páginas, formato A4.</p>
          </div>
        </section>

        <section className="px-6 pb-12">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-xl font-semibold">Lo que revisa la lista</h2>
            <ol className="space-y-3">
              {points.map((p, i) => (
                <li
                  key={p}
                  className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4"
                >
                  <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-[#10b981] text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="pt-1 text-white/85">{p}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="px-6 pb-12">
          <div className="mx-auto max-w-3xl rounded-xl border border-white/10 bg-white/[0.03] p-6 text-sm leading-relaxed text-white/60">
            <p className="mb-3">
              <strong className="text-white">Aviso:</strong> esta lista es información general basada en el
              texto de la ley y no es asesoría legal. La Ley 1581 tiene decretos reglamentarios que no se
              resumen en ella. Para tu caso concreto, consulta con un abogado. Contenido elaborado con ayuda
              de inteligencia artificial.
            </p>
            <p>
              <strong className="text-white">Fuente:</strong>{' '}
              Ley 1581 de 2012, &quot;Por la cual se dictan
              disposiciones generales para la protección de datos personales&quot;, expedida el 17 de octubre
              de 2012.{' '}
              <a
                href="https://www.alcaldiabogota.gov.co/sisjur/normas/Norma1.jsp?i=49981"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#10b981] underline-offset-2 hover:underline"
              >
                Texto consultado en la Alcaldía de Bogotá (SISJUR)
              </a>
              , 13 de octubre de 2026.
            </p>
          </div>
        </section>

        <section className="px-6 pb-20">
          <div className="mx-auto max-w-3xl rounded-2xl border border-[#10b981]/30 bg-[#10b981]/10 p-8 text-center">
            <h2 className="mb-3 text-2xl font-bold">¿Quieres revisar tu caso?</h2>
            <p className="mx-auto mb-6 max-w-xl text-white/70">
              Tenemos una sesión gratis de 1 hora para ver cómo usar IA en tu pyme cuidando los datos de tus
              clientes.
            </p>
            <a
              href="https://wa.me/573116783068?text=Hola%2C%20quiero%20mi%20sesi%C3%B3n%20gratis%20de%201%20hora%20(LM-1581)"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-[#25D366]/40 bg-[#25D366]/10 px-8 py-4 text-lg font-bold text-[#25D366] transition-all hover:bg-[#25D366]/20"
            >
              <Phone size={18} />
              Escribir por WhatsApp
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/8 px-6 py-10">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-4 text-sm text-white/40 md:flex-row">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#10b981]">G2 Intelligence</span>
            <span>·</span>
            <span>Cali, Colombia</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="mailto:hola@g2intelligence.co" className="transition-colors hover:text-white">
              hola@g2intelligence.co
            </a>
            <Link href="/politica-privacidad" className="transition-colors hover:text-white">
              Privacidad
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
