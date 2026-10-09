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
  /** Cómo se aplica la IA en los sectores de la ciudad (2 a 3 párrafos, texto propio por ciudad). */
  sectorDetail: string[];
  /** FAQ propia por ciudad — no se repite entre ciudades (evita duplicado). */
  localFaq: { q: string; a: string }[];
}

export const CITIES: CityData[] = [
  {
    slug: 'bogota', name: 'Bogotá', department: 'Cundinamarca', region: 'CO-DC', lat: '4.7110', lon: '-74.0721',
    sector: 'servicios financieros, salud y tecnología',
    sectorNote: 'concentra la mayor densidad de empresas de servicios, banca y centros corporativos del país',
    sectorDetail: [
      "En Bogotá los equipos de servicios financieros, salud y tecnología manejan un volumen alto de consultas que llegan por varios canales a la vez: WhatsApp, correo, formularios web y llamadas. Un agente de IA puede recibir esas consultas, clasificarlas por tema y urgencia, responder las preguntas habituales y pasar a una persona las que requieren criterio. El equipo deja de leer cientos de mensajes en bruto y se concentra en los casos que sí necesitan atención humana.",
      "En el sector financiero y de seguros hay procesos documentales que se repiten a diario: recibir soportes, verificar que estén completos, pedir lo que falta y registrar el avance. La IA ayuda a revisar si un documento cumple con el formato esperado y a recordarle al cliente lo pendiente, dejando registro de cada paso para que el proceso sea auditable. En clínicas, laboratorios y empresas de salud, la misma lógica sirve para confirmar citas, enviar indicaciones previas y responder dudas administrativas.",
      "Para las empresas de tecnología con sede en Bogotá, el trabajo suele estar en el soporte y la operación interna: respuestas a tickets repetitivos, resúmenes de reuniones con clientes, reportes semanales armados desde varias fuentes y alertas cuando una cuenta lleva tiempo sin contacto. Antes de automatizar, revisamos contigo qué proceso consume más horas del equipo y empezamos por ese, con una integración a las herramientas que ya usas.",
    ],
    localFaq: [
      { q: '¿La IA sirve para empresas de servicios financieros en Bogotá?', a: 'Sí. Implementamos agentes que automatizan atención al cliente, validación de documentos y seguimiento comercial, con los controles de trazabilidad que exige el sector financiero y de seguros.' },
      { q: '¿Trabajan con empresas de cualquier tamaño en Bogotá?', a: 'Trabajamos tanto con pymes de servicios como con áreas específicas de empresas más grandes que necesitan automatizar un proceso puntual sin un proyecto de TI completo.' },
      { q: "¿Cómo se manejan los datos de clientes al automatizar con IA en Bogotá?", a: "Antes de conectar cualquier canal definimos qué información puede ver el agente y cuál no, y dejamos registro de las conversaciones y acciones. En sectores regulados como el financiero o el de salud, esos límites se acuerdan por escrito con tu equipo de cumplimiento antes de empezar." },
    ],
  },
  {
    slug: 'medellin', name: 'Medellín', department: 'Antioquia', region: 'CO-ANT', lat: '6.2518', lon: '-75.5636',
    sector: 'textil, moda y tecnología',
    sectorNote: 'combina una industria textil consolidada con un ecosistema de innovación tecnológica en crecimiento',
    sectorDetail: [
      "La industria textil y de confección de Medellín trabaja con ciclos de pedido muy dinámicos: colecciones que cambian, referencias por talla y color, clientes mayoristas que consultan disponibilidad y tiempos de entrega. Un agente de IA conectado al catálogo y al inventario puede responder esas consultas por WhatsApp a cualquier hora, tomar el pedido con los datos completos y avisar al equipo comercial cuando una conversación está lista para cerrarse.",
      "En las empresas de moda, buena parte del tiempo comercial se va en enviar el mismo catálogo, aclarar condiciones de despacho y dar seguimiento a cotizaciones que quedaron sin respuesta. La automatización permite que cada cliente reciba su seguimiento en el momento oportuno, y que el vendedor vea en un solo lugar en qué punto está cada negociación, sin depender de notas sueltas ni de chats dispersos.",
      "El ecosistema tecnológico de la ciudad tiene necesidades distintas: productos que ya existen y necesitan incorporar un asistente, equipos de soporte que atienden preguntas repetidas y procesos de incorporación de clientes con muchos pasos manuales. Ahí la IA se integra por API a lo que la empresa ya tiene, de modo que no hay que reemplazar el sistema actual para empezar a ganar tiempo.",
    ],
    localFaq: [
      { q: '¿Qué automatizan para empresas de confección y moda en Medellín?', a: 'Atención a clientes mayoristas por WhatsApp, seguimiento de pedidos y catálogos digitales con respuesta automática, liberando tiempo del equipo comercial.' },
      { q: '¿Trabajan con startups del ecosistema tech de Medellín?', a: 'Sí, apoyamos integración de agentes de IA en productos existentes y automatización de procesos internos (soporte, onboarding, reportes).' },
      { q: "¿Pueden integrar la IA con el catálogo y el inventario de mi empresa de confección en Medellín?", a: "Sí, siempre que el catálogo o el inventario estén en un sistema o una hoja que se pueda consultar de forma ordenada. En el diagnóstico inicial revisamos dónde viven esos datos y definimos cómo se conecta el agente para que responda con información actualizada." },
    ],
  },
  {
    slug: 'cali', name: 'Cali', department: 'Valle del Cauca', region: 'CO-VAC', lat: '3.4516', lon: '-76.5320',
    sector: 'agroindustria, logística y manufactura',
    sectorNote: 'es el centro agroindustrial del suroccidente colombiano, con fuerte presencia de ingenios azucareros y logística de carga',
    sectorDetail: [
      "Cali y el Valle del Cauca concentran empresas agroindustriales, de logística y de manufactura cuya operación depende de coordinar muchos actores: cultivadores, proveedores, transportadores y clientes mayoristas. Gran parte de esa coordinación hoy se hace con llamadas, mensajes y hojas de cálculo. Un agente de IA puede recoger la información que llega por esos canales, ordenarla en un reporte único y avisar cuando algo se sale de lo esperado.",
      "En logística y transporte de carga, el cliente pregunta con frecuencia dónde está su pedido y cuándo llega. Responder eso uno por uno consume horas del equipo de servicio. Con una integración al sistema de seguimiento, el agente consulta el estado y contesta de inmediato por WhatsApp, y deriva a una persona solo los casos con novedades. Lo mismo aplica para la confirmación de citas de cargue y descargue.",
      "En manufactura, los reportes de producción, las solicitudes de compra y el seguimiento a proveedores suelen manejarse en archivos separados. Automatizar la consolidación de esos datos le da a gerencia una visión diaria sin que alguien tenga que armarla a mano. Para las pymes de Cali, Jamundí, Yumbo y Palmira, recomendamos empezar por un solo proceso y ampliar cuando el equipo ya lo use con confianza.",
    ],
    localFaq: [
      { q: '¿La IA ayuda a empresas agroindustriales en Cali y el Valle del Cauca?', a: 'Sí. Automatizamos reportes de producción, seguimiento a proveedores y atención a clientes mayoristas, integrando datos que hoy suelen estar en hojas de cálculo dispersas.' },
      { q: '¿Qué tan rápido se implementa una solución en Cali?', a: 'Un flujo de automatización puntual (por ejemplo atención por WhatsApp) suele estar operativo en 2 a 4 semanas, dependiendo de las integraciones que requiera.' },
      { q: "¿Pueden atender empresas de Jamundí, Yumbo y Palmira desde Cali?", a: "Sí. Desde Cali acompañamos empresas del área metropolitana y de municipios cercanos del Valle del Cauca, con reuniones presenciales o virtuales según lo que prefiera cada equipo." },
    ],
  },
  {
    slug: 'barranquilla', name: 'Barranquilla', department: 'Atlántico', region: 'CO-ATL', lat: '10.9685', lon: '-74.7813',
    sector: 'logística portuaria e industria',
    sectorNote: 'es uno de los principales puertos del Caribe colombiano y un polo industrial y logístico',
    sectorDetail: [
      "La economía de Barranquilla gira en buena parte alrededor del río, el puerto y la industria, y eso implica una cadena de comunicación larga: navieras, agentes de carga, transportadores, bodegas y clientes finales. Cada eslabón envía información en un formato distinto. Un agente de IA puede leer correos y mensajes, extraer los datos clave de un embarque y actualizar el estado para que el equipo no tenga que reescribirlos.",
      "En comercio exterior hay documentos que deben coincidir entre sí: facturas, listas de empaque, manifiestos y declaraciones. La IA puede comparar esos documentos, señalar diferencias antes de que causen una demora y recordar a los responsables qué falta por entregar. La decisión final sigue en manos del especialista en aduanas, pero se ahorra el tiempo de buscar errores a ojo.",
      "Para las empresas industriales de la ciudad, la automatización también sirve a la relación con el cliente: notificaciones automáticas cuando un despacho sale, cuando llega a destino o cuando hay un cambio de fecha. Menos llamadas de seguimiento significan más tiempo para resolver los problemas reales de la operación.",
    ],
    localFaq: [
      { q: '¿Qué procesos logísticos automatizan en Barranquilla?', a: 'Seguimiento de embarques, notificaciones automáticas a clientes y conciliación de documentos de comercio exterior son los casos más frecuentes en empresas del puerto.' },
      { q: '¿Atienden empresas de comercio exterior en Barranquilla?', a: 'Sí, incluyendo automatización de comunicación con clientes y proveedores internacionales vía WhatsApp y correo.' },
      { q: "¿Pueden extraer datos de documentos de comercio exterior en Barranquilla?", a: "Sí, podemos configurar un agente que lea documentos como facturas y listas de empaque, extraiga los campos relevantes y los compare. Los casos con diferencias se envían a una persona para su revisión, de modo que la verificación final no se delega a la máquina." },
    ],
  },
  {
    slug: 'cartagena', name: 'Cartagena', department: 'Bolívar', region: 'CO-BOL', lat: '10.3910', lon: '-75.4794',
    sector: 'turismo, puerto y petroquímica',
    sectorNote: 'combina una economía turística intensiva con un clúster industrial y petroquímico de talla nacional',
    sectorDetail: [
      "Cartagena vive de dos economías que conviven: un turismo con picos marcados de demanda y un clúster industrial y petroquímico con operación continua. Para hoteles, agencias y operadores turísticos, el reto es contestar rápido las mismas preguntas sobre disponibilidad, tarifas, traslados y actividades. Un agente de IA atiende esas consultas en varios idiomas cuando se configura así, y entrega al equipo comercial las reservas listas para confirmar.",
      "Después de la estadía también hay trabajo repetitivo: enviar encuestas, pedir reseñas y responder inquietudes. Automatizar esos mensajes mantiene el contacto con el huésped sin recargar a recepción. En temporada alta, cuando el equipo está al límite, esa diferencia se nota en la rapidez de respuesta y en menos solicitudes que se pierden entre chats.",
      "En el lado industrial, las empresas manejan contratistas, permisos y proveedores con requisitos documentales estrictos. La IA ayuda a llevar el control de qué documentos están vigentes, avisa cuando uno está por vencer y genera reportes operativos periódicos. Son tareas administrativas que no requieren juicio experto pero sí constancia, y por eso se prestan bien a la automatización.",
    ],
    localFaq: [
      { q: '¿La IA sirve para hoteles y agencias de turismo en Cartagena?', a: 'Sí. Automatizamos reservas, respuestas frecuentes y seguimiento post-estadía por WhatsApp, reduciendo el tiempo de respuesta en temporada alta.' },
      { q: '¿Trabajan con empresas industriales de Cartagena?', a: 'Sí, en automatización de reportes operativos y comunicación con proveedores, adaptada a los tiempos de operación continua del sector.' },
      { q: "¿Un agente de IA puede atender huéspedes extranjeros en Cartagena?", a: "Sí, el agente puede configurarse para responder en español e inglés, y en otros idiomas si el negocio lo necesita. Definimos con tu equipo el tono y los temas que debe tratar, y lo que siempre debe pasar a una persona, como cambios de reserva o reclamos." },
    ],
  },
  {
    slug: 'bucaramanga', name: 'Bucaramanga', department: 'Santander', region: 'CO-SAN', lat: '7.1193', lon: '-73.1227',
    sector: 'calzado, cuero y agroindustria',
    sectorNote: 'tiene una industria de calzado y manufactura de cuero históricamente fuerte, junto a un sector agroindustrial activo',
    sectorDetail: [
      "La industria del calzado y la marroquinería de Bucaramanga y su área metropolitana vende en buena parte a distribuidores y tiendas de otras ciudades. Eso significa muchas conversaciones sobre referencias, tallas, colores y tiempos de entrega. Un agente de IA con acceso al catálogo puede enviar la información correcta, armar la cotización con las condiciones comerciales de la empresa y registrar el pedido sin que el vendedor tenga que repetir el proceso con cada cliente.",
      "En manufactura de cuero y calzado, la planeación de producción depende de pedidos, inventario de materiales y capacidad de taller. Cuando esos datos están en archivos distintos, planear toma tiempo y se cometen errores. Consolidarlos en un tablero que se actualiza solo permite ver qué se debe producir, qué material falta y qué pedidos están en riesgo de retraso.",
      "El sector agroindustrial de Santander tiene una necesidad parecida con otra materia prima: seguimiento a productores, programación de recolección y comunicación con compradores. La IA ayuda a ordenar esa información y a enviar recordatorios automáticos. Para una pyme de la región, lo más sensato es elegir un proceso concreto, medir cuánto tiempo toma hoy y decidir con ese dato si vale la pena extenderlo.",
    ],
    localFaq: [
      { q: '¿Qué automatizan para fabricantes de calzado en Bucaramanga?', a: 'Atención a distribuidores mayoristas, seguimiento de pedidos y catálogos digitales con cotización automática por WhatsApp.' },
      { q: '¿Cuánto cuesta implementar IA en una empresa mediana de Bucaramanga?', a: 'Depende del alcance; una automatización inicial (un canal, un proceso) es la forma más económica de empezar antes de escalar a más áreas.' },
      { q: "¿Pueden automatizar la cotización a distribuidores de calzado en Bucaramanga?", a: "Sí. Si la empresa tiene definidas sus listas de precios y condiciones de venta, el agente puede generar la cotización a partir del catálogo y enviarla por WhatsApp o correo. Los descuentos especiales o condiciones fuera de lo habitual quedan para aprobación de una persona." },
    ],
  },
  {
    slug: 'pereira', name: 'Pereira', department: 'Risaralda', region: 'CO-RIS', lat: '4.8133', lon: '-75.6961',
    sector: 'café, comercio y servicios',
    sectorNote: 'es centro del Eje Cafetero, con fuerte actividad comercial y de servicios regionales',
    sectorDetail: [
      "Pereira funciona como nodo comercial y de servicios del Eje Cafetero, con empresas que venden a toda la región y que a la vez compran a productores de los alrededores. En el comercio, la mayor parte del trabajo diario se va en atender consultas de catálogo, confirmar pedidos y coordinar entregas. Un agente de IA puede encargarse de las preguntas repetidas y dejarle al equipo las ventas que requieren una conversación más personalizada.",
      "En empresas relacionadas con el café, la información está repartida entre fincas, cooperativas, bodegas y compradores. Consolidar los datos de recepción, calidad y despacho en reportes claros evita retrabajo y confusión entre áreas. La IA puede ayudar a leer y organizar esos registros, y a generar resúmenes para quienes toman decisiones de compra o de logística.",
      "Las empresas de servicios de la ciudad, como firmas profesionales, centros médicos y academias, tienen un problema común: agendar y reagendar. Un asistente conectado a la agenda confirma citas, envía recordatorios y gestiona cambios, lo que reduce las citas perdidas y libera tiempo administrativo. Es un caso de uso sencillo y de bajo riesgo para empezar.",
    ],
    localFaq: [
      { q: '¿La IA ayuda a empresas cafeteras y agroexportadoras en Pereira?', a: 'Sí, en seguimiento de cosecha y proveedores, además de atención automática a clientes y distribuidores internacionales.' },
      { q: '¿Atienden comercio local en Pereira?', a: 'Sí, chatbots de WhatsApp para catálogo, pedidos y agendamiento son de los casos más solicitados en comercio local.' },
      { q: "¿Se puede conectar el agente de IA a la agenda de mi negocio en Pereira?", a: "Sí, si la agenda está en una herramienta que permita integración, como un calendario en línea o un sistema de citas. En el diagnóstico verificamos la herramienta que ya usas y definimos qué acciones puede hacer el agente, por ejemplo confirmar, reagendar o solo consultar." },
    ],
  },
  {
    slug: 'manizales', name: 'Manizales', department: 'Caldas', region: 'CO-CAL', lat: '5.0689', lon: '-75.5174',
    sector: 'café, educación y servicios',
    sectorNote: 'combina una economía cafetera consolidada con un sector educativo y de servicios importante para la región',
    sectorDetail: [
      "Manizales tiene una economía donde el café convive con una oferta educativa amplia y un sector de servicios dinámico. Las universidades, colegios e institutos reciben durante todo el año las mismas preguntas de aspirantes y familias: requisitos de admisión, fechas, costos, becas y documentos. Un agente de IA entrenado con la información oficial de la institución puede responder a cualquier hora y remitir a una persona cuando la consulta es particular.",
      "Dentro de la institución también hay trabajo administrativo repetido: confirmar documentos recibidos, recordar fechas de matrícula y enviar comunicados segmentados por programa. Automatizar esos avisos reduce los olvidos y permite que el personal de admisiones se dedique a acompañar a los aspirantes en lugar de reenviar mensajes.",
      "Para las cooperativas y empresas del sector cafetero, la comunicación con asociados es el punto central: avisos de precios, convocatorias, estado de pagos y entregas. La IA puede responder las consultas frecuentes de los asociados y generar reportes de producción a partir de los registros existentes. Siempre recomendamos que la información sensible se maneje con permisos claros y que las decisiones sigan en manos del equipo directivo.",
    ],
    localFaq: [
      { q: '¿Qué automatizan para instituciones educativas en Manizales?', a: 'Atención a aspirantes y estudiantes por WhatsApp, respuestas a preguntas frecuentes de admisión y seguimiento de procesos administrativos.' },
      { q: '¿Trabajan con cooperativas cafeteras en Manizales?', a: 'Sí, en automatización de comunicación con asociados y reportes de producción.' },
      { q: "¿Qué información necesita el agente para atender aspirantes de una institución educativa en Manizales?", a: "Necesita la información oficial vigente, como requisitos, calendario, programas y canales de contacto. Con eso configuramos las respuestas, y todo lo que no esté en esa base se deriva a una persona de la institución en lugar de inventarse una respuesta." },
    ],
  },
  {
    slug: 'ibague', name: 'Ibagué', department: 'Tolima', region: 'CO-TOL', lat: '4.4389', lon: '-75.2322',
    sector: 'agroindustria y comercio',
    sectorNote: 'es un centro agroindustrial del Tolima con fuerte actividad comercial regional',
    sectorDetail: [
      "Ibagué es un centro de comercio y agroindustria del Tolima, con empresas que reciben producto de la región y lo distribuyen a otras ciudades. En ese tipo de operación los datos clave son cantidades, calidades, fechas de entrega y precios pactados, y suelen llegar por mensajes y llamadas. Un agente de IA puede registrarlos en una hoja o sistema ordenado y generar un resumen diario para quien coordina las compras.",
      "En el comercio local, el volumen de consultas por WhatsApp crece cuando se promociona un producto o llega una temporada. Atender cada mensaje a mano hace que se pierdan oportunidades. Un asistente que responda precios, disponibilidad y horarios, y que tome los datos del pedido, permite atender más conversaciones con el mismo equipo y sin cambiar la forma de trabajar del negocio.",
      "Al ser una ciudad con muchas pymes, el punto de partida importa. Proponemos un primer proyecto acotado, con un solo canal y un proceso claro, para que el equipo conozca la herramienta y vea su utilidad antes de pensar en algo más grande. Si funciona, se amplía a otras áreas como cobranza, seguimiento a proveedores o reportes de ventas.",
    ],
    localFaq: [
      { q: '¿La IA sirve para empresas agroindustriales en Ibagué?', a: 'Sí, en seguimiento de producción, proveedores y atención a clientes mayoristas con reportes automatizados.' },
      { q: '¿Qué tan accesible es implementar IA para una pyme en Ibagué?', a: 'Empezamos con un proceso puntual y de bajo riesgo (por ejemplo atención por WhatsApp) antes de escalar a automatizaciones más complejas.' },
      { q: "¿Qué proceso conviene automatizar primero en una pyme de Ibagué?", a: "Normalmente el que más se repite y menos riesgo tiene, como responder preguntas frecuentes o confirmar pedidos por WhatsApp. En el diagnóstico revisamos cómo trabaja tu equipo y proponemos el proceso donde el ahorro de tiempo sea más claro." },
    ],
  },
  {
    slug: 'santa-marta', name: 'Santa Marta', department: 'Magdalena', region: 'CO-MAG', lat: '11.2408', lon: '-74.1990',
    sector: 'turismo, puerto y agroindustria',
    sectorNote: 'combina una economía turística fuerte con actividad portuaria y agroindustria de banano y palma',
    sectorDetail: [
      "Santa Marta combina turismo de playa y de naturaleza, actividad portuaria y una agroindustria con productos como el banano y la palma. Para los operadores turísticos, hoteles y hostales, la rapidez de respuesta marca la diferencia entre ganar o perder una reserva. Un agente de IA contesta disponibilidad, tarifas y detalles de los planes, y le pasa al equipo las solicitudes listas para cerrar.",
      "Los operadores de excursiones y transporte turístico manejan cupos que cambian a diario. Si el agente tiene acceso a la disponibilidad real, puede confirmar cupos, enviar el punto de encuentro y recordar la actividad el día anterior. Eso reduce cancelaciones de último minuto y el desorden de coordinar grupos por mensajes sueltos.",
      "En el lado agroexportador y portuario, la comunicación con compradores y transportadores es continua: fechas de corte, documentos, contenedores y novedades. La IA ayuda a mantener informados a todos los involucrados con mensajes automáticos y a consolidar el estado de cada embarque. La persona responsable sigue supervisando, pero deja de hacer seguimiento manual de cada detalle.",
    ],
    localFaq: [
      { q: '¿La IA ayuda a hoteles y operadores turísticos en Santa Marta?', a: 'Sí, automatizando reservas, respuestas frecuentes y seguimiento de clientes, especialmente útil en temporada alta.' },
      { q: '¿Trabajan con empresas agroexportadoras en Santa Marta?', a: 'Sí, en seguimiento de producción y comunicación automatizada con compradores y proveedores.' },
      { q: "¿El agente de IA puede confirmar cupos de excursiones en Santa Marta?", a: "Sí, si los cupos se llevan en una hoja de cálculo o un sistema que el agente pueda consultar. Se configura para confirmar solo cuando hay disponibilidad y para avisar a una persona cuando el grupo está lleno o el cliente pide un cambio especial." },
    ],
  },
  {
    slug: 'cucuta', name: 'Cúcuta', department: 'Norte de Santander', region: 'CO-NSA', lat: '7.8939', lon: '-72.5078',
    sector: 'comercio fronterizo y confecciones',
    sectorNote: 'tiene una economía fuertemente ligada al comercio transfronterizo y una industria de confecciones activa',
    sectorDetail: [
      "La economía de Cúcuta está muy ligada al comercio con la frontera, y eso trae una dinámica particular: pedidos frecuentes, cambios de precio por variaciones del mercado y clientes que escriben a todas horas. Un agente de IA que atienda por WhatsApp puede mantener las respuestas al día con la lista de precios vigente, tomar pedidos y avisar al comerciante cuando hay una venta importante por atender.",
      "La industria de confecciones de la región vende a mayoristas que piden catálogos, referencias y condiciones de despacho. Automatizar el envío de catálogo, la cotización y el seguimiento posterior evita que un cliente se enfríe por falta de respuesta. Además, ordenar el historial de cada cliente en un solo lugar facilita saber quién compra con regularidad y quién dejó de escribir.",
      "Para los negocios familiares y las pymes, muchas veces el obstáculo es que el conocimiento está en la cabeza de una sola persona. Documentar el proceso de atención y convertirlo en un flujo automatizado reduce esa dependencia: si la persona se ausenta, el negocio sigue respondiendo. Empezamos siempre por entender cómo vende hoy la empresa antes de proponer cambios.",
    ],
    localFaq: [
      { q: '¿Qué automatizan para comerciantes en Cúcuta?', a: 'Atención a clientes por WhatsApp, cotización automática y seguimiento de pedidos, adaptado al ritmo del comercio fronterizo.' },
      { q: '¿Trabajan con empresas de confecciones en Cúcuta?', a: 'Sí, en atención a distribuidores mayoristas y automatización de catálogos digitales.' },
      { q: "¿Pueden mantener actualizados los precios en las respuestas del agente en Cúcuta?", a: "Sí. Si los precios cambian con frecuencia, conectamos el agente a una hoja o sistema que se actualice y que él consulte en cada respuesta, para que no repita valores antiguos. Los precios fuera de lista se dejan para que los confirme una persona." },
    ],
  },
  {
    slug: 'villavicencio', name: 'Villavicencio', department: 'Meta', region: 'CO-MET', lat: '4.1420', lon: '-73.6266',
    sector: 'agroindustria, ganadería y petróleo',
    sectorNote: 'es el centro económico de los Llanos Orientales, con fuerte presencia de palma, ganadería y sector petrolero',
    sectorDetail: [
      "Villavicencio es la puerta de entrada de los Llanos Orientales y el centro de una economía basada en ganadería, cultivos como la palma y servicios asociados al sector petrolero. Estas actividades generan datos dispersos: registros de hatos, controles de cosecha, órdenes de servicio y facturación de contratistas. Un agente de IA ayuda a recopilar esa información y presentarla en reportes que el administrador pueda leer sin armarlos a mano.",
      "En las empresas ganaderas, el seguimiento de animales, insumos y ventas se lleva muchas veces en cuadernos o archivos sueltos. Digitalizar y ordenar esos registros permite responder preguntas simples, como cuánto se ha vendido en el mes o qué proveedor tiene entregas pendientes, con una consulta en lenguaje natural en lugar de buscar entre papeles.",
      "Para las empresas que prestan servicios a la industria petrolera, la carga administrativa de contratistas, órdenes de trabajo y documentos de seguridad es considerable. La automatización puede recordar vencimientos, verificar que los soportes estén completos y comunicarse con proveedores. Dado que en estos entornos los errores tienen un costo alto, diseñamos los flujos con puntos de revisión humana en los pasos críticos.",
    ],
    localFaq: [
      { q: '¿La IA sirve para empresas ganaderas o de palma en Villavicencio?', a: 'Sí, en seguimiento de producción, proveedores y automatización de reportes que hoy se manejan manualmente.' },
      { q: '¿Atienden empresas de servicios petroleros en Villavicencio?', a: 'Sí, en automatización de procesos administrativos y comunicación con contratistas y proveedores.' },
      { q: "¿Se puede consultar información de hatos o cosechas en lenguaje natural en Villavicencio?", a: "Sí, cuando los datos están en una hoja o base organizada, un agente puede responder preguntas como el total vendido en un periodo o los pendientes de un proveedor. Si hoy están en papel, el primer paso es digitalizarlos de forma ordenada." },
    ],
  },
  {
    slug: 'armenia', name: 'Armenia', department: 'Quindío', region: 'CO-QUI', lat: '4.5339', lon: '-75.6811',
    sector: 'café, turismo y comercio',
    sectorNote: 'combina economía cafetera con un sector turístico en crecimiento en el Eje Cafetero',
    sectorDetail: [
      "Armenia y el Quindío unen café, turismo rural y comercio en una región donde muchas fincas reciben visitantes además de producir. Un agente de IA puede atender a quienes preguntan por tours, alojamiento y experiencias, informarles disponibilidad y precios y recoger los datos de la reserva. Así, el administrador de la finca no debe contestar el teléfono durante el recorrido ni dejar mensajes sin responder.",
      "Los negocios turísticos suelen trabajar con pocos empleados que hacen de todo. Automatizar las tareas repetitivas, como recordatorios previos a la visita, indicaciones de llegada y mensajes de agradecimiento, libera tiempo sin quitarle trato personal al servicio. La conversación importante, la que genera confianza, la sigue llevando una persona.",
      "En el comercio local del Quindío, los catálogos y pedidos por WhatsApp son el caso más frecuente. Un asistente que responda sobre productos, tome el pedido y confirme la dirección de entrega puede atender varios clientes al mismo tiempo. Para las cafeterías, tiendas y distribuidores de la región, es una manera de ordenar la atención sin necesidad de contratar más personal.",
    ],
    localFaq: [
      { q: '¿La IA ayuda al turismo rural y cafetero en Armenia?', a: 'Sí, automatizando reservas y atención a visitantes por WhatsApp, incluyendo fincas cafeteras que reciben turismo.' },
      { q: '¿Trabajan con comercio local en Armenia?', a: 'Sí, chatbots de catálogo y pedidos son el caso de uso más común en comercio local del Quindío.' },
      { q: "¿La IA puede ayudar a una finca cafetera que recibe turistas en Armenia?", a: "Sí. Puede responder preguntas sobre recorridos, horarios y tarifas, tomar los datos de la reserva y enviar recordatorios de llegada. Las excepciones, como grupos grandes o solicitudes especiales, se envían al administrador para que las gestione directamente." },
    ],
  },
  {
    slug: 'pasto', name: 'Pasto', department: 'Nariño', region: 'CO-NAR', lat: '1.2136', lon: '-77.2811',
    sector: 'comercio, agro y artesanías',
    sectorNote: 'tiene una economía diversificada entre comercio fronterizo, agro y producción artesanal',
    sectorDetail: [
      "Pasto tiene una economía diversa: comercio impulsado por la cercanía con la frontera sur, producción agrícola de la región andina de Nariño y una tradición artesanal reconocida. Para los artesanos y pequeños fabricantes, vender fuera de la ciudad implica atender consultas de clientes de otras regiones. Un agente de IA puede presentar el catálogo, explicar los tiempos de producción y recoger los datos del pedido personalizado.",
      "En el comercio, el desafío es atender con rapidez cuando hay mucha demanda en fechas especiales. Automatizar las respuestas sobre precios, medios de pago y envíos permite que el dueño del negocio dedique su tiempo a producir o surtir en lugar de estar pendiente del teléfono. También ayuda a registrar quién preguntó y qué compró para retomar el contacto más adelante.",
      "Los productores agrícolas de Nariño necesitan coordinar cosechas, compradores y transporte. La IA sirve para llevar un registro ordenado de entregas, avisar a los compradores sobre disponibilidad y generar reportes sencillos para asociaciones de productores. Como en toda implementación, partimos de conocer cómo trabaja hoy la organización y adaptamos la herramienta a su ritmo, no al revés.",
    ],
    localFaq: [
      { q: '¿La IA sirve para comercio y artesanías en Pasto?', a: 'Sí, en atención a clientes por WhatsApp y automatización de pedidos, útil también para venta a otras ciudades.' },
      { q: '¿Trabajan con empresas agroindustriales en Nariño?', a: 'Sí, en seguimiento de producción y comunicación automatizada con proveedores y compradores.' },
      { q: "¿Pueden ayudar a un taller artesanal de Pasto a vender en otras ciudades?", a: "Sí. Podemos configurar un asistente que presente los productos, explique tiempos de elaboración y formas de pago, y recoja los datos del pedido. La definición de precios y de pedidos a medida queda siempre bajo control del taller." },
    ],
  },
  {
    slug: 'monteria', name: 'Montería', department: 'Córdoba', region: 'CO-COR', lat: '8.7575', lon: '-75.8814',
    sector: 'ganadería y agroindustria',
    sectorNote: 'es el centro ganadero y agroindustrial del Caribe colombiano',
    sectorDetail: [
      "Montería es el centro ganadero de Córdoba y un punto de referencia para la agroindustria del Caribe colombiano. La actividad ganadera genera mucha información operativa: inventario de animales, controles sanitarios, compras de insumos y ventas. Un agente de IA ayuda a consolidar esos registros y a responder preguntas del administrador, como qué lotes tienen controles pendientes o cuánto se ha comprado de un proveedor.",
      "Las empresas que comercializan productos agropecuarios suelen manejar pedidos de varios clientes con fechas de despacho distintas. Automatizar la confirmación de pedidos, la programación del transporte y el aviso al cliente cuando sale la carga reduce llamadas y malentendidos. Esto es útil para quienes venden a mayoristas y deben coordinar camiones, bodegas y fechas.",
      "En una región con grandes distancias entre fincas y centros urbanos, la comunicación por WhatsApp es la herramienta principal. Un asistente que reciba reportes de campo, los ordene y los envíe a quien corresponde evita que la información se pierda entre chats. Nuestro enfoque consiste en empezar por un proceso concreto y mantener a una persona responsable de revisar lo que el sistema produce.",
    ],
    localFaq: [
      { q: '¿La IA ayuda a empresas ganaderas en Montería?', a: 'Sí, en automatización de reportes de producción, seguimiento de proveedores y atención a compradores por WhatsApp.' },
      { q: '¿Atienden agroindustria en Córdoba?', a: 'Sí, incluyendo seguimiento de cosecha, logística de despacho y comunicación automatizada con clientes mayoristas.' },
      { q: "¿Pueden recibir reportes de campo por WhatsApp en una finca de Córdoba?", a: "Sí. Podemos configurar un flujo donde los encargados envíen sus reportes por WhatsApp, el sistema los ordene en una hoja o tablero y el administrador reciba un resumen. Los mensajes que no se entiendan bien se marcan para que alguien los revise." },
    ],
  },
];

export const CITY_SLUGS = CITIES.map((c) => c.slug);

export function getCityBySlug(slug: string): CityData | undefined {
  return CITIES.find((c) => c.slug === slug);
}
