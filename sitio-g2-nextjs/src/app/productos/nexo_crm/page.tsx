import type { Metadata } from 'next'
import Link from 'next/link'
import {
  MessageCircle, Mail, Users, Zap, Shield, BarChart3,
  CheckCircle2, ArrowRight, Phone, Globe, Lock, Layers,
  Send, Eye, Bell, RefreshCw
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Nexo CRM — WhatsApp y Email para Empresas',
  description:
    'Nexo CRM centraliza WhatsApp Business y correo electrónico en una sola plataforma. Mensajería automatizada, vista 360° del cliente y API para integraciones.',
  openGraph: {
    title: 'Nexo CRM — WhatsApp y Email para tu Empresa',
    description:
      'Centraliza WhatsApp Business y correo electrónico. Mensajería automatizada, vista 360° del cliente, API externa con OAuth2.',
    url: 'https://g2intelligence.co/productos/nexo_crm',
    siteName: 'G2 Intelligence',
    locale: 'es_CO',
    type: 'website',
    images: [{ url: 'https://g2intelligence.co/opengraph-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nexo CRM — WhatsApp y Email para tu Empresa',
    description: 'CRM con WhatsApp Business y correo para conectar con tus clientes.',
    images: ['https://g2intelligence.co/opengraph-image.png'],
  },
  alternates: { canonical: 'https://g2intelligence.co/productos/nexo_crm' },
}

const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Nexo CRM',
  description:
    'CRM con mensajería WhatsApp Business y correo electrónico integrados para empresas colombianas.',
  url: 'https://g2intelligence.co/productos/nexo_crm',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'COP', availability: 'https://schema.org/InStock' },
  provider: { '@type': 'Organization', name: 'G2 Intelligence', url: 'https://g2intelligence.co' },
}

// ──────────────────────────────────────────────
// DATA
// ──────────────────────────────────────────────

const stats = [
  { value: '98%', label: 'Tasa de entrega WhatsApp' },
  { value: '<2s', label: 'Tiempo de sincronización' },
  { value: '360°', label: 'Vista del cliente' },
  { value: 'Multi-empresa', label: 'Arquitectura multi-tenant' },
]

const waFeatures = [
  {
    icon: Send,
    title: 'Mensajería con plantillas aprobadas',
    desc: 'Envía mensajes masivos usando plantillas verificadas por Meta. Campañas, notificaciones y recordatorios con un clic.',
  },
  {
    icon: MessageCircle,
    title: 'Conversaciones en tiempo real',
    desc: 'Historial completo de cada conversación por cliente. Tu equipo responde desde el CRM sin cambiar de herramienta.',
  },
  {
    icon: Eye,
    title: 'Estado de mensajes',
    desc: 'Seguimiento de enviado, entregado y leído en tiempo real. Nunca más te preguntes si tu mensaje llegó.',
  },
  {
    icon: Globe,
    title: 'Cloud API oficial de Meta',
    desc: 'Integración directa con WhatsApp Cloud API. Sin intermediarios, máxima confiabilidad y soporte oficial.',
  },
  {
    icon: Layers,
    title: 'API externa con OAuth2',
    desc: 'Conecta tu sistema externo a Nexo CRM vía API REST segura con autenticación OAuth2 (RS256). Envía mensajes desde cualquier plataforma.',
  },
  {
    icon: Bell,
    title: 'Webhooks de estado',
    desc: 'Recibe notificaciones automáticas cuando un mensaje es entregado o leído. Sincronización bidireccional instantánea.',
  },
]

const emailFeatures = [
  {
    icon: Mail,
    title: 'Correos transaccionales',
    desc: 'Envía facturas, confirmaciones y alertas automáticamente al momento justo del proceso.',
  },
  {
    icon: RefreshCw,
    title: 'Flujos automatizados',
    desc: 'Define secuencias de correos según el comportamiento del cliente. Bienvenidas, seguimientos y reactivación sin intervención manual.',
  },
  {
    icon: BarChart3,
    title: 'Seguimiento de entregas',
    desc: 'Monitorea el estado de cada correo enviado. Detecta rebotes y optimiza tu lista de contactos.',
  },
  {
    icon: Zap,
    title: 'Templates personalizados',
    desc: 'Plantillas de correo con la identidad de tu empresa. Diseño profesional listo para usar o 100% personalizable.',
  },
]

const crmFeatures = [
  {
    icon: Users,
    title: 'Vista 360° del cliente',
    desc: 'Toda la información del cliente en una sola pantalla: conversaciones de WhatsApp, correos, historial de interacciones y estado del proceso.',
  },
  {
    icon: Zap,
    title: 'Búsqueda semántica con IA',
    desc: 'Encuentra cualquier cliente, conversación o documento con búsqueda inteligente. Sin necesidad de recordar términos exactos.',
  },
  {
    icon: Lock,
    title: 'Multi-empresa seguro',
    desc: 'Arquitectura multi-tenant con Row-Level Security. Cada empresa ve solo sus datos. Escalable desde 1 hasta N empresas.',
  },
  {
    icon: Shield,
    title: 'Seguridad empresarial',
    desc: 'Datos encriptados con AES-256-GCM. Auditoría completa de acciones. Roles y permisos granulares por usuario.',
  },
]

const steps = [
  { num: '01', title: 'Configura tu cuenta', desc: 'Crea tu empresa en Nexo CRM en minutos. Invita a tu equipo y define roles y permisos.' },
  { num: '02', title: 'Conecta tus canales', desc: 'Vincula tu número de WhatsApp Business y tu correo corporativo. Configuración guiada paso a paso.' },
  { num: '03', title: 'Automatiza y crece', desc: 'Configura plantillas, flujos automáticos y notificaciones. Tu equipo se concentra en cerrar, no en enviar.' },
]

// ──────────────────────────────────────────────
// COMPONENTS
// ──────────────────────────────────────────────

function FeatureCard({
  icon: Icon,
  title,
  desc,
}: {
  icon: React.ElementType
  title: string
  desc: string
}) {
  return (
    <div className="group rounded-xl border border-white/8 bg-[#0d1117] p-6 transition-all duration-300 hover:border-[#10b981]/40 hover:bg-[#0d1117]/80">
      <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#10b981]/10 text-[#10b981] transition-colors group-hover:bg-[#10b981]/20">
        <Icon size={20} />
      </div>
      <h3 className="mb-2 text-base font-semibold text-white">{title}</h3>
      <p className="text-sm leading-relaxed text-white/60">{desc}</p>
    </div>
  )
}

// ──────────────────────────────────────────────
// PAGE
// ──────────────────────────────────────────────

export default function NexoCRMPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      <div className="min-h-screen bg-[#050505] text-white">

        {/* ── NAV ── */}
        <header className="sticky top-0 z-50 border-b border-white/8 bg-[#050505]/90 backdrop-blur-sm">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <Link href="https://g2intelligence.co" className="flex items-center gap-2.5">
              <span className="text-[#10b981] font-bold text-lg tracking-tight">G2</span>
              <span className="text-white/40 text-sm">|</span>
              <span className="text-white font-semibold text-sm">Nexo CRM</span>
            </Link>
            <nav className="hidden items-center gap-6 md:flex">
              <a href="#whatsapp" className="text-sm text-white/60 transition-colors hover:text-white">WhatsApp</a>
              <a href="#email" className="text-sm text-white/60 transition-colors hover:text-white">Email</a>
              <a href="#crm" className="text-sm text-white/60 transition-colors hover:text-white">CRM</a>
            </nav>
            <a
              href="https://g2intelligence.co#contacto"
              className="inline-flex items-center gap-2 rounded-lg bg-[#10b981] px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-[#0d9668]"
            >
              Solicitar demo
              <ArrowRight size={14} />
            </a>
          </div>
        </header>

        {/* ── HERO ── */}
        <section className="relative overflow-hidden px-6 pb-20 pt-24">
          {/* Background glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full opacity-10"
            style={{ background: 'radial-gradient(ellipse, #10b981 0%, transparent 70%)' }}
          />

          <div className="relative mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#10b981]/30 bg-[#10b981]/10 px-4 py-1.5 text-sm text-[#10b981]">
              <CheckCircle2 size={14} />
              CRM con mensajería nativa — WhatsApp + Email
            </div>

            <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-white md:text-6xl">
              Conecta con tus clientes{' '}
              <span className="text-[#10b981]">donde están</span>
            </h1>

            <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-white/60">
              <strong className="text-white">Nexo CRM</strong> centraliza WhatsApp Business y correo electrónico
              en una sola plataforma. Automatiza mensajes, gestiona conversaciones y ten una vista completa
              de cada cliente — sin cambiar de herramienta.
            </p>

            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="https://g2intelligence.co#contacto"
                className="inline-flex items-center gap-2 rounded-lg bg-[#10b981] px-6 py-3 font-semibold text-white transition-all hover:bg-[#0d9668] hover:shadow-lg hover:shadow-[#10b981]/20"
              >
                Solicitar demo gratuita
                <ArrowRight size={16} />
              </a>
              <a
                href="#whatsapp"
                className="inline-flex items-center gap-2 rounded-lg border border-white/12 px-6 py-3 font-semibold text-white/80 transition-all hover:border-white/24 hover:text-white"
              >
                Ver características
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="mx-auto mt-20 max-w-4xl">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-white/8 bg-[#0d1117] p-5 text-center"
                >
                  <div className="text-2xl font-bold text-[#10b981]">{s.value}</div>
                  <div className="mt-1 text-xs text-white/50">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHATSAPP ── */}
        <section id="whatsapp" className="px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#25D366]/10 text-[#25D366]">
                <MessageCircle size={22} />
              </div>
              <span className="text-sm font-medium uppercase tracking-widest text-[#25D366]">WhatsApp Business</span>
            </div>
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
              WhatsApp en el corazón de tu CRM
            </h2>
            <p className="mb-12 max-w-2xl text-lg text-white/60">
              Integración oficial con <strong className="text-white">WhatsApp Cloud API de Meta</strong>.
              Envía, recibe y rastrea mensajes sin salir de Nexo CRM. Con API externa para conectar cualquier sistema.
            </p>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {waFeatures.map((f) => (
                <FeatureCard key={f.title} icon={f.icon} title={f.title} desc={f.desc} />
              ))}
            </div>

            {/* WhatsApp highlight box */}
            <div className="mt-10 rounded-2xl border border-[#25D366]/20 bg-[#25D366]/5 p-8">
              <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
                <div className="flex-1">
                  <h3 className="mb-2 text-xl font-bold text-white">
                    API externa con autenticación OAuth2
                  </h3>
                  <p className="text-white/60">
                    Conecta tu ERP, e-commerce o cualquier sistema externo a Nexo CRM mediante nuestra
                    API REST. Autenticación segura RS256, envío de mensajes masivos, consulta de
                    plantillas y seguimiento de estado — todo desde tu plataforma actual.
                  </p>
                </div>
                <div className="shrink-0">
                  <div className="rounded-xl border border-white/10 bg-[#050505] p-4 font-mono text-xs text-[#10b981]">
                    <div className="text-white/40">POST /api/v1/wa/messages</div>
                    <div className="mt-1">Authorization: Bearer {'<token>'}</div>
                    <div className="mt-1 text-white/60">{`{ "to": "+57300...", "template": "..." }`}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── EMAIL ── */}
        <section id="email" className="border-t border-white/6 bg-[#0a0e15] px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#10b981]/10 text-[#10b981]">
                <Mail size={22} />
              </div>
              <span className="text-sm font-medium uppercase tracking-widest text-[#10b981]">Correo Electrónico</span>
            </div>
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
              Correo automatizado, sin esfuerzo
            </h2>
            <p className="mb-12 max-w-2xl text-lg text-white/60">
              Envía correos transaccionales, campañas y notificaciones automáticas desde el mismo
              lugar donde gestionas tus clientes. Sin herramientas adicionales.
            </p>

            <div className="grid gap-5 sm:grid-cols-2">
              {emailFeatures.map((f) => (
                <FeatureCard key={f.title} icon={f.icon} title={f.title} desc={f.desc} />
              ))}
            </div>

            {/* Channel comparison */}
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-[#25D366]/20 bg-[#25D366]/5 p-6">
                <div className="mb-3 flex items-center gap-2 text-[#25D366]">
                  <MessageCircle size={18} />
                  <span className="font-semibold">WhatsApp</span>
                </div>
                <ul className="space-y-2 text-sm text-white/70">
                  {['Tasa de apertura ~98%', 'Respuesta en minutos', 'Multimedia: imagen, doc, audio', 'Ideal para urgencias y seguimiento'].map(i => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 size={13} className="shrink-0 text-[#25D366]" />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-[#10b981]/20 bg-[#10b981]/5 p-6">
                <div className="mb-3 flex items-center gap-2 text-[#10b981]">
                  <Mail size={18} />
                  <span className="font-semibold">Email</span>
                </div>
                <ul className="space-y-2 text-sm text-white/70">
                  {['Formal y documentado', 'Adjuntos ilimitados', 'Templates ricos en HTML', 'Ideal para propuestas y facturas'].map(i => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 size={13} className="shrink-0 text-[#10b981]" />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── CRM ── */}
        <section id="crm" className="px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#10b981]/10 text-[#10b981]">
                <Users size={22} />
              </div>
              <span className="text-sm font-medium uppercase tracking-widest text-[#10b981]">CRM Inteligente</span>
            </div>
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
              Gestión de clientes con visión completa
            </h2>
            <p className="mb-12 max-w-2xl text-lg text-white/60">
              Cada cliente tiene su historia completa: mensajes de WhatsApp, correos, notas y
              estado del proceso — todo en una sola pantalla, accesible para todo tu equipo.
            </p>

            <div className="grid gap-5 sm:grid-cols-2">
              {crmFeatures.map((f) => (
                <FeatureCard key={f.title} icon={f.icon} title={f.title} desc={f.desc} />
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="border-t border-white/6 bg-[#0a0e15] px-6 py-24">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
              Empieza en 3 pasos
            </h2>
            <p className="mb-16 text-lg text-white/60">
              Sin configuraciones complejas. Tu equipo operativo en el mismo día.
            </p>

            <div className="grid gap-8 md:grid-cols-3">
              {steps.map((s, i) => (
                <div key={s.num} className="relative">
                  {i < steps.length - 1 && (
                    <div
                      aria-hidden
                      className="absolute right-0 top-6 hidden h-px w-full translate-x-1/2 bg-gradient-to-r from-[#10b981]/30 to-transparent md:block"
                    />
                  )}
                  <div className="relative z-10 text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-[#10b981]/30 bg-[#10b981]/10 text-sm font-bold text-[#10b981]">
                      {s.num}
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-white">{s.title}</h3>
                    <p className="text-sm leading-relaxed text-white/60">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECURITY BADGE ── */}
        <section className="px-6 py-16">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-2xl border border-white/8 bg-[#0d1117] p-8">
              <div className="flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#10b981]/10 text-[#10b981]">
                  <Shield size={32} />
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-bold text-white">Seguridad empresarial de nivel bancario</h3>
                  <p className="text-white/60">
                    Encriptación AES-256-GCM en reposo, TLS 1.3 en tránsito, Row-Level Security por empresa,
                    auditoría completa de acciones y credenciales OAuth2 RS256. Tus datos siempre protegidos.
                  </p>
                </div>
                <div className="flex shrink-0 flex-col gap-2 text-sm">
                  {['AES-256-GCM', 'OAuth2 RS256', 'Multi-tenant RLS', 'Audit log'].map(b => (
                    <div key={b} className="flex items-center gap-2 text-white/60">
                      <CheckCircle2 size={14} className="text-[#10b981]" />
                      {b}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section className="relative overflow-hidden border-t border-white/6 px-6 py-28 text-center">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-8"
            style={{ background: 'radial-gradient(ellipse, #10b981 0%, transparent 70%)' }}
          />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="mb-4 text-3xl font-bold text-white md:text-5xl">
              ¿Listo para conectar con{' '}
              <span className="text-[#10b981]">tus clientes</span>?
            </h2>
            <p className="mb-10 text-lg text-white/60">
              Solicita una demo gratuita. Nuestro equipo te configura Nexo CRM con tu
              WhatsApp Business y correo corporativo en el mismo día.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="https://g2intelligence.co#contacto"
                className="inline-flex items-center gap-2 rounded-lg bg-[#10b981] px-8 py-4 text-lg font-bold text-white transition-all hover:bg-[#0d9668] hover:shadow-xl hover:shadow-[#10b981]/25"
              >
                Solicitar demo gratuita
                <ArrowRight size={18} />
              </a>
              <a
                href="https://wa.me/573116783068?text=Hola%2C%20quiero%20información%20sobre%20Nexo%20CRM"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-[#25D366]/40 bg-[#25D366]/10 px-8 py-4 text-lg font-bold text-[#25D366] transition-all hover:bg-[#25D366]/20"
              >
                <Phone size={18} />
                Escribir por WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="border-t border-white/8 px-6 py-10">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-white/40 md:flex-row">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#10b981]">G2 Intelligence</span>
              <span>·</span>
              <span>Nexo CRM</span>
            </div>
            <div className="flex items-center gap-6">
              <a href="https://g2intelligence.co" className="transition-colors hover:text-white">
                g2intelligence.co
              </a>
              <a href="mailto:hola@g2intelligence.co" className="transition-colors hover:text-white">
                hola@g2intelligence.co
              </a>
              <a
                href="https://g2intelligence.co/politica-privacidad"
                className="transition-colors hover:text-white"
              >
                Privacidad
              </a>
            </div>
            <div>© {new Date().getFullYear()} G2 Intelligence. Cali, Colombia.</div>
          </div>
        </footer>

      </div>
    </>
  )
}
