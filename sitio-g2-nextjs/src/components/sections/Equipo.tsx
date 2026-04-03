'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { Search, Zap, PenTool, BarChart3, ChevronLeft, ChevronRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface AgentCard {
  icon: LucideIcon;
  name: string;
  role: string;
  description: string;
  capabilities: string[];
}

const agents: AgentCard[] = [
  {
    icon: Search,
    name: 'SEO Researcher',
    role: 'Estratega de Visibilidad',
    description:
      'Investiga tendencias, analiza la competencia y optimiza el posicionamiento orgánico con precisión quirúrgica.',
    capabilities: ['Análisis de Keywords', 'Auditoría Técnica', 'Estrategia de Contenido'],
  },
  {
    icon: Zap,
    name: 'Growth Hacker',
    role: 'Especialista en Escalamiento',
    description:
      'Diseña y ejecuta experimentos de crecimiento rápido para multiplicar la base de usuarios y la retención.',
    capabilities: ['A/B Testing', 'Optimización de Conversión', 'Viral Loops'],
  },
  {
    icon: PenTool,
    name: 'Copywriter AI',
    role: 'Arquitecto de Persuasión',
    description:
      'Crea narrativas cautivadoras y copys de alta conversión que conectan emocionalmente con tu audiencia.',
    capabilities: ['Storytelling', 'Copy de Ventas', 'Identidad de Marca'],
  },
  {
    icon: BarChart3,
    name: 'Analytics Agent',
    role: 'Científico de Datos',
    description:
      'Transforma grandes volúmenes de datos en insights accionables para la toma de decisiones estratégicas.',
    capabilities: ['Dashboards en Vivo', 'Modelado Preventivo', 'Análisis de Atribución'],
  },
];

export default function Equipo() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <section id="equipo" className="py-24 lg:py-32 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-6">
            Nuestro Equipo Digital
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight mb-4">
            Nuestra{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
              Élite Digital
            </span>{' '}
            a tu Servicio
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
            Conoce a nuestros expertos en Inteligencia Artificial, diseñados para trabajar en
            armonía y escalar tu negocio.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {agents.map(({ icon: Icon, name, role, description, capabilities }) => (
                <div
                  key={name}
                  className="flex-none w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] p-8 rounded-2xl bg-[#0d1117] border border-white/5 hover:border-emerald-500/20 transition-all duration-300"
                >
                  {/* Badge */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-6">
                    G2 AI Expert
                  </div>

                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-emerald-400" />
                  </div>

                  {/* Name & Role */}
                  <h3 className="text-white font-semibold text-xl mb-1">{name}</h3>
                  <p className="text-emerald-400 text-sm font-medium mb-4">{role}</p>

                  {/* Description */}
                  <p className="text-white/50 text-sm leading-relaxed mb-6">{description}</p>

                  {/* Capabilities */}
                  <div>
                    <p className="text-white/30 text-xs uppercase tracking-widest font-semibold mb-3">
                      Capacidades Core
                    </p>
                    <ul className="space-y-2">
                      {capabilities.map((cap) => (
                        <li
                          key={cap}
                          className="flex items-center gap-2 text-sm text-white/60"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                          {cap}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={scrollPrev}
              className="w-12 h-12 rounded-full border border-white/10 bg-[#0d1117] flex items-center justify-center text-white/60 hover:text-white hover:border-emerald-500/30 transition-all duration-300 hover:bg-emerald-500/10"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollNext}
              className="w-12 h-12 rounded-full border border-white/10 bg-[#0d1117] flex items-center justify-center text-white/60 hover:text-white hover:border-emerald-500/30 transition-all duration-300 hover:bg-emerald-500/10"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
