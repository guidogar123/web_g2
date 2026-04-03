import { Bot, Workflow, TrendingUp, Lightbulb, Code2, Shield, Check } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
}

const services: Service[] = [
  {
    icon: Bot,
    title: 'Infraestructura IA',
    description:
      'Implementamos agentes inteligentes que automatizan tareas complejas, mejoran la atención al cliente y optimizan la toma de decisiones en tiempo real.',
    features: ['Chatbots avanzados', 'Automatización inteligente', 'Procesamiento de lenguaje natural'],
  },
  {
    icon: Workflow,
    title: 'Optimización de Procesos',
    description:
      'Analizamos y redefinimos tus procesos de negocio para eliminar cuellos de botella, reducir costos y aumentar la eficiencia operativa.',
    features: ['Mapeo de procesos', 'Eliminación de desperdicios', 'Automatización de flujos'],
  },
  {
    icon: TrendingUp,
    title: 'Aumento de Ventas',
    description:
      'Desarrollamos estrategias basadas en datos e inteligencia artificial para identificar oportunidades y cerrar más negocios.',
    features: ['Análisis predictivo', 'Segmentación inteligente', 'Embudos optimizados'],
  },
  {
    icon: Lightbulb,
    title: 'Consultoría Estratégica',
    description:
      'Te guiamos en la adopción de tecnologías emergentes con un plan de transformación digital adaptado a tus necesidades.',
    features: ['Roadmap tecnológico', 'Evaluación de madurez', 'Plan de implementación'],
  },
  {
    icon: Code2,
    title: 'Desarrollo a Medida',
    description:
      'Creamos soluciones software personalizadas que se integran perfectamente con tus sistemas existentes.',
    features: ['Aplicaciones web', 'Integraciones API', 'Arquitectura escalable'],
  },
  {
    icon: Shield,
    title: 'Seguridad y Cumplimiento',
    description:
      'Garantizamos que tus implementaciones cumplan con las normativas colombianas y estándares internacionales de seguridad.',
    features: ['Protección de datos', 'Cumplimiento normativo', 'Auditorías de seguridad'],
  },
];

export default function Servicios() {
  return (
    <section id="servicios" className="py-24 lg:py-32 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-6">
            Nuestros Servicios
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight mb-4">
            Soluciones que{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
              Impulsan tu Negocio
            </span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
            Combinamos tecnología de punta con estrategia de negocio para ofrecerte soluciones
            integrales que generan resultados medibles.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(({ icon: Icon, title, description, features }) => (
            <div
              key={title}
              className="group p-8 rounded-2xl bg-[#0d1117] border border-white/5 hover:border-emerald-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/5"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:bg-emerald-500/20 transition-colors duration-300">
                <Icon className="w-6 h-6 text-emerald-400" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>

              {/* Description */}
              <p className="text-white/50 text-sm leading-relaxed mb-6">{description}</p>

              {/* Features */}
              <ul className="space-y-2">
                {features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-white/60">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
