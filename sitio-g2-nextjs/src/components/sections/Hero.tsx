import { Cpu, TrendingUp, Sparkles, ChevronDown } from 'lucide-react';
import HeroCanvas from './HeroCanvas';

interface HeroProps {
  onScheduleClick: () => void;
}

const stats = [
  { icon: Cpu, value: '+50', label: 'Proyectos Agenticos' },
  { icon: TrendingUp, value: '3x', label: 'Aumento Promedio en Ventas' },
  { icon: Sparkles, value: '98%', label: 'Clientes Satisfechos' },
];

export default function Hero({ onScheduleClick }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#050505]"
    >
      {/* Canvas particle background */}
      <HeroCanvas />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-8">
          <Sparkles className="w-4 h-4" />
          Tecnología Agentica de Vanguardia
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-semibold text-white leading-tight tracking-tight mb-6">
          Transformamos tu Negocio
          <br />
          <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
            con Inteligencia Agentica
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed mb-10">
          En G2Intelligence ayudamos a empresas colombianas a adoptar las últimas tecnologías
          agenticas, optimizar procesos y multiplicar sus ventas mediante soluciones inteligentes.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={onScheduleClick}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25 hover:-translate-y-0.5"
          >
            Comienza tu Transformación
          </button>
          <a
            href="#servicios"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/20 text-white/80 hover:text-white hover:border-white/40 font-semibold transition-all duration-300 hover:-translate-y-0.5"
          >
            Descubre Nuestros Servicios
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
          {stats.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-2 p-6 rounded-2xl bg-[#0d1117]/80 border border-white/5 backdrop-blur-sm"
            >
              <Icon className="w-6 h-6 text-emerald-400" />
              <span className="text-3xl font-semibold text-white">{value}</span>
              <span className="text-sm text-white/50 text-center">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/30 text-xs animate-bounce">
        <span>Scroll</span>
        <ChevronDown className="w-4 h-4" />
      </div>
    </section>
  );
}
