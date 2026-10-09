export interface CityData {
  slug: string;
  name: string;
  department: string;
  region: string; // ISO 3166-2:CO
  lat: string;
  lon: string;
  /** Sector económico predominante — contexto real, no genérico. */
  sector: string;
  /** Frase breve sobre el tejido empresarial local. */
  sectorNote: string;
  /** FAQ propia por ciudad — no se repite entre ciudades (evita duplicado). */
  localFaq: { q: string; a: string }[];
}

export const CITIES: CityData[] = [
  {
    slug: 'bogota', name: 'Bogotá', department: 'Cundinamarca', region: 'CO-DC', lat: '4.7110', lon: '-74.0721',
    sector: 'servicios financieros, salud y tecnología',
    sectorNote: 'concentra la mayor densidad de empresas de servicios, banca y centros corporativos del país',
    localFaq: [
      { q: '¿La IA sirve para empresas de servicios financieros en Bogotá?', a: 'Sí. Implementamos agentes que automatizan atención al cliente, validación de documentos y seguimiento comercial, con los controles de trazabilidad que exige el sector financiero y de seguros.' },
      { q: '¿Trabajan con empresas de cualquier tamaño en Bogotá?', a: 'Trabajamos tanto con pymes de servicios como con áreas específicas de empresas más grandes que necesitan automatizar un proceso puntual sin un proyecto de TI completo.' },
    ],
  },
  {
    slug: 'medellin', name: 'Medellín', department: 'Antioquia', region: 'CO-ANT', lat: '6.2518', lon: '-75.5636',
    sector: 'textil, moda y tecnología',
    sectorNote: 'combina una industria textil consolidada con un ecosistema de innovación tecnológica en crecimiento',
    localFaq: [
      { q: '¿Qué automatizan para empresas de confección y moda en Medellín?', a: 'Atención a clientes mayoristas por WhatsApp, seguimiento de pedidos y catálogos digitales con respuesta automática, liberando tiempo del equipo comercial.' },
      { q: '¿Trabajan con startups del ecosistema tech de Medellín?', a: 'Sí, apoyamos integración de agentes de IA en productos existentes y automatización de procesos internos (soporte, onboarding, reportes).' },
    ],
  },
  {
    slug: 'cali', name: 'Cali', department: 'Valle del Cauca', region: 'CO-VAC', lat: '3.4516', lon: '-76.5320',
    sector: 'agroindustria, logística y manufactura',
    sectorNote: 'es el centro agroindustrial del suroccidente colombiano, con fuerte presencia de ingenios azucareros y logística de carga',
    localFaq: [
      { q: '¿La IA ayuda a empresas agroindustriales en Cali y el Valle del Cauca?', a: 'Sí. Automatizamos reportes de producción, seguimiento a proveedores y atención a clientes mayoristas, integrando datos que hoy suelen estar en hojas de cálculo dispersas.' },
      { q: '¿Qué tan rápido se implementa una solución en Cali?', a: 'Un flujo de automatización puntual (por ejemplo atención por WhatsApp) suele estar operativo en 2 a 4 semanas, dependiendo de las integraciones que requiera.' },
    ],
  },
  {
    slug: 'barranquilla', name: 'Barranquilla', department: 'Atlántico', region: 'CO-ATL', lat: '10.9685', lon: '-74.7813',
    sector: 'logística portuaria e industria',
    sectorNote: 'es uno de los principales puertos del Caribe colombiano y un polo industrial y logístico',
    localFaq: [
      { q: '¿Qué procesos logísticos automatizan en Barranquilla?', a: 'Seguimiento de embarques, notificaciones automáticas a clientes y conciliación de documentos de comercio exterior son los casos más frecuentes en empresas del puerto.' },
      { q: '¿Atienden empresas de comercio exterior en Barranquilla?', a: 'Sí, incluyendo automatización de comunicación con clientes y proveedores internacionales vía WhatsApp y correo.' },
    ],
  },
  {
    slug: 'cartagena', name: 'Cartagena', department: 'Bolívar', region: 'CO-BOL', lat: '10.3910', lon: '-75.4794',
    sector: 'turismo, puerto y petroquímica',
    sectorNote: 'combina una economía turística intensiva con un clúster industrial y petroquímico de talla nacional',
    localFaq: [
      { q: '¿La IA sirve para hoteles y agencias de turismo en Cartagena?', a: 'Sí. Automatizamos reservas, respuestas frecuentes y seguimiento post-estadía por WhatsApp, reduciendo el tiempo de respuesta en temporada alta.' },
      { q: '¿Trabajan con empresas industriales de Cartagena?', a: 'Sí, en automatización de reportes operativos y comunicación con proveedores, adaptada a los tiempos de operación continua del sector.' },
    ],
  },
  {
    slug: 'bucaramanga', name: 'Bucaramanga', department: 'Santander', region: 'CO-SAN', lat: '7.1193', lon: '-73.1227',
    sector: 'calzado, cuero y agroindustria',
    sectorNote: 'tiene una industria de calzado y manufactura de cuero históricamente fuerte, junto a un sector agroindustrial activo',
    localFaq: [
      { q: '¿Qué automatizan para fabricantes de calzado en Bucaramanga?', a: 'Atención a distribuidores mayoristas, seguimiento de pedidos y catálogos digitales con cotización automática por WhatsApp.' },
      { q: '¿Cuánto cuesta implementar IA en una empresa mediana de Bucaramanga?', a: 'Depende del alcance; una automatización inicial (un canal, un proceso) es la forma más económica de empezar antes de escalar a más áreas.' },
    ],
  },
  {
    slug: 'pereira', name: 'Pereira', department: 'Risaralda', region: 'CO-RIS', lat: '4.8133', lon: '-75.6961',
    sector: 'café, comercio y servicios',
    sectorNote: 'es centro del Eje Cafetero, con fuerte actividad comercial y de servicios regionales',
    localFaq: [
      { q: '¿La IA ayuda a empresas cafeteras y agroexportadoras en Pereira?', a: 'Sí, en seguimiento de cosecha y proveedores, además de atención automática a clientes y distribuidores internacionales.' },
      { q: '¿Atienden comercio local en Pereira?', a: 'Sí, chatbots de WhatsApp para catálogo, pedidos y agendamiento son de los casos más solicitados en comercio local.' },
    ],
  },
  {
    slug: 'manizales', name: 'Manizales', department: 'Caldas', region: 'CO-CAL', lat: '5.0689', lon: '-75.5174',
    sector: 'café, educación y servicios',
    sectorNote: 'combina una economía cafetera consolidada con un sector educativo y de servicios importante para la región',
    localFaq: [
      { q: '¿Qué automatizan para instituciones educativas en Manizales?', a: 'Atención a aspirantes y estudiantes por WhatsApp, respuestas a preguntas frecuentes de admisión y seguimiento de procesos administrativos.' },
      { q: '¿Trabajan con cooperativas cafeteras en Manizales?', a: 'Sí, en automatización de comunicación con asociados y reportes de producción.' },
    ],
  },
  {
    slug: 'ibague', name: 'Ibagué', department: 'Tolima', region: 'CO-TOL', lat: '4.4389', lon: '-75.2322',
    sector: 'agroindustria y comercio',
    sectorNote: 'es un centro agroindustrial del Tolima con fuerte actividad comercial regional',
    localFaq: [
      { q: '¿La IA sirve para empresas agroindustriales en Ibagué?', a: 'Sí, en seguimiento de producción, proveedores y atención a clientes mayoristas con reportes automatizados.' },
      { q: '¿Qué tan accesible es implementar IA para una pyme en Ibagué?', a: 'Empezamos con un proceso puntual y de bajo riesgo (por ejemplo atención por WhatsApp) antes de escalar a automatizaciones más complejas.' },
    ],
  },
  {
    slug: 'santa-marta', name: 'Santa Marta', department: 'Magdalena', region: 'CO-MAG', lat: '11.2408', lon: '-74.1990',
    sector: 'turismo, puerto y agroindustria',
    sectorNote: 'combina una economía turística fuerte con actividad portuaria y agroindustria de banano y palma',
    localFaq: [
      { q: '¿La IA ayuda a hoteles y operadores turísticos en Santa Marta?', a: 'Sí, automatizando reservas, respuestas frecuentes y seguimiento de clientes, especialmente útil en temporada alta.' },
      { q: '¿Trabajan con empresas agroexportadoras en Santa Marta?', a: 'Sí, en seguimiento de producción y comunicación automatizada con compradores y proveedores.' },
    ],
  },
  {
    slug: 'cucuta', name: 'Cúcuta', department: 'Norte de Santander', region: 'CO-NSA', lat: '7.8939', lon: '-72.5078',
    sector: 'comercio fronterizo y confecciones',
    sectorNote: 'tiene una economía fuertemente ligada al comercio transfronterizo y una industria de confecciones activa',
    localFaq: [
      { q: '¿Qué automatizan para comerciantes en Cúcuta?', a: 'Atención a clientes por WhatsApp, cotización automática y seguimiento de pedidos, adaptado al ritmo del comercio fronterizo.' },
      { q: '¿Trabajan con empresas de confecciones en Cúcuta?', a: 'Sí, en atención a distribuidores mayoristas y automatización de catálogos digitales.' },
    ],
  },
  {
    slug: 'villavicencio', name: 'Villavicencio', department: 'Meta', region: 'CO-MET', lat: '4.1420', lon: '-73.6266',
    sector: 'agroindustria, ganadería y petróleo',
    sectorNote: 'es el centro económico de los Llanos Orientales, con fuerte presencia de palma, ganadería y sector petrolero',
    localFaq: [
      { q: '¿La IA sirve para empresas ganaderas o de palma en Villavicencio?', a: 'Sí, en seguimiento de producción, proveedores y automatización de reportes que hoy se manejan manualmente.' },
      { q: '¿Atienden empresas de servicios petroleros en Villavicencio?', a: 'Sí, en automatización de procesos administrativos y comunicación con contratistas y proveedores.' },
    ],
  },
  {
    slug: 'armenia', name: 'Armenia', department: 'Quindío', region: 'CO-QUI', lat: '4.5339', lon: '-75.6811',
    sector: 'café, turismo y comercio',
    sectorNote: 'combina economía cafetera con un sector turístico en crecimiento en el Eje Cafetero',
    localFaq: [
      { q: '¿La IA ayuda al turismo rural y cafetero en Armenia?', a: 'Sí, automatizando reservas y atención a visitantes por WhatsApp, incluyendo fincas cafeteras que reciben turismo.' },
      { q: '¿Trabajan con comercio local en Armenia?', a: 'Sí, chatbots de catálogo y pedidos son el caso de uso más común en comercio local del Quindío.' },
    ],
  },
  {
    slug: 'pasto', name: 'Pasto', department: 'Nariño', region: 'CO-NAR', lat: '1.2136', lon: '-77.2811',
    sector: 'comercio, agro y artesanías',
    sectorNote: 'tiene una economía diversificada entre comercio fronterizo, agro y producción artesanal',
    localFaq: [
      { q: '¿La IA sirve para comercio y artesanías en Pasto?', a: 'Sí, en atención a clientes por WhatsApp y automatización de pedidos, útil también para venta a otras ciudades.' },
      { q: '¿Trabajan con empresas agroindustriales en Nariño?', a: 'Sí, en seguimiento de producción y comunicación automatizada con proveedores y compradores.' },
    ],
  },
  {
    slug: 'monteria', name: 'Montería', department: 'Córdoba', region: 'CO-COR', lat: '8.7575', lon: '-75.8814',
    sector: 'ganadería y agroindustria',
    sectorNote: 'es el centro ganadero y agroindustrial del Caribe colombiano',
    localFaq: [
      { q: '¿La IA ayuda a empresas ganaderas en Montería?', a: 'Sí, en automatización de reportes de producción, seguimiento de proveedores y atención a compradores por WhatsApp.' },
      { q: '¿Atienden agroindustria en Córdoba?', a: 'Sí, incluyendo seguimiento de cosecha, logística de despacho y comunicación automatizada con clientes mayoristas.' },
    ],
  },
];

export const CITY_SLUGS = CITIES.map((c) => c.slug);

export function getCityBySlug(slug: string): CityData | undefined {
  return CITIES.find((c) => c.slug === slug);
}
