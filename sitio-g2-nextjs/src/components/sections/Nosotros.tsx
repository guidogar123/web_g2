import { Target, Users, Rocket, Award } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Value {
  icon: LucideIcon;
  title: string;
  desc: string;
}

const stats = [
  { value: '+50', label: 'Empresas Asesoradas' },
  { value: '+100', label: 'Proyectos Entregados' },
  { value: '5+', label: 'Años de Experiencia' },
];

const values: Value[] = [
  {
    icon: Target,
    title: 'Enfoque en Resultados',
    desc: 'Nos medimos por el impacto tangible que generamos en tu negocio.',
  },
  {
    icon: Users,
    title: 'Partnership Real',
    desc: 'Trabajamos como extensión de tu equipo, no como proveedores externos.',
  },
  {
    icon: Rocket,
    title: 'Innovación Constante',
    desc: 'Estamos siempre a la vanguardia de las últimas tecnologías.',
  },
  {
    icon: Award,
    title: 'Excelencia Técnica',
    desc: 'Equipo de expertos certificados con años de experiencia.',
  },
];

export default function Nosotros() {
  return (
    <section id="nosotros" className="py-24 lg:py-32 bg-[#0d1117]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-6">
            Sobre Nosotros
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight mb-4">
            Impulsando la{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
              Transformación Digital
            </span>
            {' '}en Colombia
          </h2>
        </div>

        {/* Two-column: text + stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Paragraphs */}
          <div className="space-y-6">
            <p className="text-white/70 text-lg leading-relaxed">
              G2Intelligence nació con una misión clara: democratizar el acceso a las tecnologías
              más avanzadas para empresas colombianas de todos los tamaños. Creemos que la
              inteligencia artificial y los agentes autónomos no son el futuro, son el presente.
            </p>
            <p className="text-white/70 text-lg leading-relaxed">
              Nuestro equipo multidisciplinario combina experiencia en ingeniería de software,
              ciencia de datos y estrategia de negocios para ofrecer soluciones que no solo son
              tecnológicamente robustas, sino que generan valor real para tu empresa.
            </p>
            <p className="text-white/70 text-lg leading-relaxed">
              Hemos ayudado a decenas de empresas en sectores como retail, servicios, manufactura
              y tecnología a transformar sus operaciones y multiplicar sus resultados.
            </p>
          </div>

          {/* Stats */}
          <div className="flex flex-col justify-center gap-6">
            {stats.map(({ value, label }) => (
              <div
                key={label}
                className="flex items-center gap-6 p-6 rounded-2xl bg-[#050505] border border-white/5"
              >
                <span className="text-4xl font-semibold text-emerald-400 min-w-[80px]">
                  {value}
                </span>
                <span className="text-white/60 text-lg">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Values grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {values.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="p-6 rounded-2xl bg-[#050505] border border-white/5 hover:border-emerald-500/20 transition-colors duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">{title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* Quote */}
        <blockquote className="relative p-8 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 text-center">
          <p className="text-white/80 text-xl italic leading-relaxed mb-4 max-w-3xl mx-auto">
            &ldquo;La tecnología agentica no reemplaza a las personas, las potencia. Nuestro
            trabajo es crear el puente entre el potencial humano y el poder de la IA.&rdquo;
          </p>
          <cite className="text-emerald-400 font-medium not-italic">
            Equipo G2Intelligence / Colombia
          </cite>
        </blockquote>
      </div>
    </section>
  );
}
