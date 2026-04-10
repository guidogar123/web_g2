import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidad | G2 Intelligence',
  description:
    'Política de privacidad de G2 Intelligence. Conoce cómo protegemos tus datos personales según la Ley 1581 de 2012 de Colombia.',
  openGraph: {
    url: 'https://g2intelligence.co/politica-privacidad',
    type: 'website',
    title: 'Política de Privacidad | G2 Intelligence',
    description:
      'Política de privacidad de G2 Intelligence. Cumple Ley 1581 de 2012 y requisitos Meta Developers.',
    siteName: 'G2 Intelligence',
  },
  other: {
    'og:image': 'https://g2intelligence.co/opengraph-image.png',
    'og:image:width': '1200',
    'og:image:height': '630',
    'og:image:type': 'image/png',
    'fb:app_id': 'A74MnrVggi4x-GZO31bxtCU',
  },
  alternates: {
    canonical: 'https://g2intelligence.co/politica-privacidad',
  },
};

export default function PoliticaPrivacidad() {
  const lastUpdated = '2026-04-10';

  return (
    <main className="min-h-screen bg-white px-4 py-12 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-8 border-b border-gray-200 pb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Política de Privacidad</h1>
          <p className="text-gray-600">
            <strong>G2 Intelligence S.A.S.</strong>
            <br />
            Última actualización: {lastUpdated}
            <br />
            Vigente desde: 2026-04-10
          </p>
        </div>

        {/* Intro */}
        <section className="mb-8">
          <p className="text-gray-700 leading-relaxed mb-4">
            G2 Intelligence S.A.S. ("nosotros", "nos", "la Empresa" o "G2 Intelligence") respeta tu privacidad y está comprometida con proteger tus datos personales. Esta Política de Privacidad describe cómo recopilamos, usamos, compartimos y protegemos tu información cuando utilizas nuestro sitio web g2intelligence.co, nuestras aplicaciones, servicios y productos (colectivamente, los "Servicios").
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Nuestro procesamiento de datos personales cumple con la <strong>Ley 1581 de 2012 sobre Habeas Data</strong> y el <strong>Decreto 1377 de 2013</strong> expedidos en Colombia, así como con regulaciones internacionales aplicables.
          </p>
        </section>

        {/* TOC */}
        <nav className="mb-8 bg-gray-50 p-6 rounded-lg">
          <h2 className="font-bold text-gray-900 mb-4">Contenido</h2>
          <ul className="text-sm text-blue-600 space-y-2">
            <li>1. <a href="#informacion-recopilada" className="hover:underline">Información que Recopilamos</a></li>
            <li>2. <a href="#proposito" className="hover:underline">Propósito del Procesamiento</a></li>
            <li>3. <a href="#base-legal" className="hover:underline">Base Legal del Procesamiento</a></li>
            <li>4. <a href="#compartir" className="hover:underline">Cómo Compartimos tu Información</a></li>
            <li>5. <a href="#seguridad" className="hover:underline">Seguridad de tus Datos</a></li>
            <li>6. <a href="#derechos" className="hover:underline">Tus Derechos (Habeas Data)</a></li>
            <li>7. <a href="#retencion" className="hover:underline">Retención de Datos</a></li>
            <li>8. <a href="#terceros" className="hover:underline">Servicios de Terceros</a></li>
            <li>9. <a href="#menores" className="hover:underline">Menores de Edad</a></li>
            <li>10. <a href="#cambios" className="hover:underline">Cambios a esta Política</a></li>
            <li>11. <a href="#contacto" className="hover:underline">Cómo Contactarnos</a></li>
          </ul>
        </nav>

        {/* Sections */}
        <section id="informacion-recopilada" className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Información que Recopilamos</h2>

          <h3 className="text-lg font-semibold text-gray-800 mb-3 mt-6">Información que nos proporcionas directamente</h3>
          <ul className="text-gray-700 space-y-2 ml-6 list-disc mb-4">
            <li><strong>Información de Contacto:</strong> Nombre, email, teléfono, dirección, ciudad, región</li>
            <li><strong>Información Empresarial:</strong> Nombre de la empresa, sector, tamaño, sitio web</li>
            <li><strong>Comunicaciones:</strong> Contenido de formularios, consultas, comentarios, sugerencias</li>
            <li><strong>Información de Identificación:</strong> Cédula, NIT, razón social (cuando es relevante)</li>
            <li><strong>Información Financiera:</strong> Datos de facturación y pago procesados por terceros autorizados</li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-800 mb-3 mt-6">Información recopilada automáticamente</h3>
          <ul className="text-gray-700 space-y-2 ml-6 list-disc mb-4">
            <li><strong>Datos de Navegación:</strong> Dirección IP, tipo de navegador, sistema operativo, páginas visitadas, tiempo de permanencia</li>
            <li><strong>Cookies:</strong> Identificadores únicos para recordar preferencias y mejorar experiencia</li>
            <li><strong>Datos de Dispositivo:</strong> Tipo de dispositivo, resolución de pantalla, información técnica</li>
            <li><strong>Análisis Web:</strong> Información sobre cómo interactúas con nuestro sitio (proporcionada por Google Analytics)</li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-800 mb-3 mt-6">Información de Integraciones Externas</h3>
          <ul className="text-gray-700 space-y-2 ml-6 list-disc mb-4">
            <li><strong>Meta/Facebook Pixel:</strong> Datos de comportamiento para campañas publicitarias (si tienes un píxel instalado)</li>
            <li><strong>Plataformas de Automatización:</strong> Información sincronizada con herramientas de CRM y automatización que uses</li>
          </ul>
        </section>

        <section id="proposito" className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Propósito del Procesamiento</h2>
          <p className="text-gray-700 leading-relaxed mb-4">Procesamos tu información para los siguientes propósitos:</p>
          <ul className="text-gray-700 space-y-2 ml-6 list-disc mb-4">
            <li>Proporcionar, mantener y mejorar nuestros Servicios</li>
            <li>Responder a tus consultas, solicitudes y comunicaciones</li>
            <li>Enviar información sobre productos, servicios y promociones (con tu consentimiento)</li>
            <li>Procesar transacciones y pagos</li>
            <li>Personalizar tu experiencia en el sitio web</li>
            <li>Realizar análisis y mejorar nuestro marketing digital</li>
            <li>Cumplir obligaciones legales y contractuales</li>
            <li>Prevenir fraude y asegurar la seguridad de nuestros Servicios</li>
            <li>Realizar campañas de publicidad dirigida en Meta, Google y otras plataformas</li>
          </ul>
        </section>

        <section id="base-legal" className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Base Legal del Procesamiento</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Conforme a la Ley 1581 de 2012, procesamos tus datos personales bajo las siguientes bases legales:
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
            <p className="text-gray-800 mb-2">
              <strong>Consentimiento:</strong> Para procesamiento que no es obligatorio por ley, obtenemos tu consentimiento explícito.
            </p>
            <p className="text-gray-800 mb-2">
              <strong>Ejecución de Contrato:</strong> Para procesar tus datos cuando solicitas nuestros servicios.
            </p>
            <p className="text-gray-800 mb-2">
              <strong>Cumplimiento de Obligación Legal:</strong> Cuando la ley lo requiere (ej: retención fiscal, obligaciones tributarias).
            </p>
            <p className="text-gray-800">
              <strong>Interés Legítimo:</strong> Para mejorar nuestros Servicios y comunicaciones comerciales (con derecho a oposición).
            </p>
          </div>
        </section>

        <section id="compartir" className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Cómo Compartimos tu Información</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Compartimos tus datos personales únicamente cuando es necesario:
          </p>
          <ul className="text-gray-700 space-y-2 ml-6 list-disc mb-4">
            <li><strong>Proveedores de Servicios:</strong> Plataformas de email, hosting, analytics, CRM que procesan datos conforme a nuestras instrucciones</li>
            <li><strong>Plataformas Publicitarias:</strong> Meta, Google Ads, LinkedIn (solo información agregada y seudónimizada cuando corresponde)</li>
            <li><strong>Autoridades Legales:</strong> Cuando requerido por ley o orden judicial</li>
            <li><strong>Fusiones o Adquisiciones:</strong> Si nuestra empresa es adquirida, tus datos pueden transferirse (te notificaremos)</li>
          </ul>
          <p className="text-gray-700 leading-relaxed">
            <strong>NO vendemos</strong> tus datos personales a terceros. Los proveedores que procesamos datos firma acuerdos de protección de datos.
          </p>
        </section>

        <section id="seguridad" className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Seguridad de tus Datos</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Implementamos medidas técnicas y organizacionales para proteger tus datos contra acceso no autorizado, alteración, pérdida o divulgación:
          </p>
          <ul className="text-gray-700 space-y-2 ml-6 list-disc mb-4">
            <li>Encriptación SSL/TLS en transmisión de datos</li>
            <li>Servidores seguros con cortafuegos</li>
            <li>Acceso restringido a información sensible</li>
            <li>Auditorías de seguridad regulares</li>
            <li>Políticas de contraseña segura para empleados</li>
            <li>Cumplimiento con estándares de seguridad internacionales</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-4">
            Sin embargo, ningún método de transmisión por internet es 100% seguro. No podemos garantizar seguridad absoluta.
          </p>
        </section>

        <section id="derechos" className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Tus Derechos (Habeas Data - Ley 1581 de 2012)</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Como titular de datos personales, tienes los siguientes derechos:
          </p>

          <div className="space-y-4 mb-4">
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-gray-800">Derecho de Acceso</h3>
              <p className="text-gray-700">Acceder a tus datos personales y conocer cómo los procesamos</p>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-gray-800">Derecho de Rectificación</h3>
              <p className="text-gray-700">Corregir datos inexactos o incompletos</p>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-gray-800">Derecho de Eliminación</h3>
              <p className="text-gray-700">Solicitar la eliminación de tus datos cuando ya no sean necesarios (sujeto a excepciones legales)</p>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-gray-800">Derecho de Oposición</h3>
              <p className="text-gray-700">Oponerle al procesamiento de tus datos por motivos legítimos</p>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-gray-800">Derecho de Revocación de Consentimiento</h3>
              <p className="text-gray-700">Revocar el consentimiento que hayas dado en cualquier momento</p>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-gray-800">Derecho de Portabilidad</h3>
              <p className="text-gray-700">Recibir una copia de tus datos en formato estructurado y transferirlos a otro responsable</p>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed bg-yellow-50 p-4 rounded-lg">
            <strong>¿Cómo ejercer tus derechos?</strong> Contacta a nuestro Encargado de Tratamiento de Datos enviando un correo a <strong>privacidad@g2intelligence.co</strong> con:
            <ul className="mt-2 ml-6 list-disc text-gray-700">
              <li>Tu nombre completo y cédula</li>
              <li>Descripción clara del derecho que quieres ejercer</li>
              <li>Documentación que acredite tu identidad</li>
            </ul>
            Responderemos en máximo 10 días hábiles.
          </p>
        </section>

        <section id="retencion" className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Retención de Datos</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Retenemos tus datos personales solo durante el tiempo necesario para los propósitos especificados:
          </p>
          <table className="w-full border-collapse border border-gray-300 mb-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-3 text-left">Tipo de Dato</th>
                <th className="border border-gray-300 p-3 text-left">Período de Retención</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-3">Datos de Contacto (Leads)</td>
                <td className="border border-gray-300 p-3">3 años o hasta revocación de consentimiento</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-3">Datos Transaccionales (Facturación)</td>
                <td className="border border-gray-300 p-3">7 años (obligación fiscal colombiana)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3">Logs de Navegación</td>
                <td className="border border-gray-300 p-3">13 meses</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-3">Cookies</td>
                <td className="border border-gray-300 p-3">Según configuración (máximo 2 años)</td>
              </tr>
            </tbody>
          </table>
          <p className="text-gray-700 leading-relaxed">
            Después del período de retención, eliminamos o seudoanonimizamos tus datos, salvo obligaciones legales que requieran conservarlos más tiempo.
          </p>
        </section>

        <section id="terceros" className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Servicios de Terceros</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Utilizamos las siguientes plataformas que pueden procesar tus datos:
          </p>

          <div className="space-y-4 mb-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Google Analytics</h3>
              <p className="text-gray-700 text-sm">Analiza comportamiento en el sitio. <a href="https://policies.google.com/privacy" className="text-blue-600 hover:underline">Política de Google</a></p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Meta (Facebook Pixel)</h3>
              <p className="text-gray-700 text-sm">Rastrea conversiones y permite segmentación publicitaria. <a href="https://www.facebook.com/privacy/policy" className="text-blue-600 hover:underline">Política de Meta</a></p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Servicios de Email (Brevo, Mailgun, etc.)</h3>
              <p className="text-gray-700 text-sm">Procesamiento y envío de correos. Poseen contratos de procesamiento de datos.</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Plataformas de Pago</h3>
              <p className="text-gray-700 text-sm">Procesamos pagos a través de terceros certificados (PCI-DSS). No almacenamos números de tarjeta.</p>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed">
            Estos terceros están obligados contractualmente a proteger tus datos según estándares similares a los nuestros. No vendemos datos a publicistas.
          </p>
        </section>

        <section id="menores" className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Menores de Edad</h2>
          <p className="text-gray-700 leading-relaxed">
            Nuestros Servicios no están dirigidos a menores de 18 años. No recopilamos intencionalmente datos de menores. Si descubrimos que hemos recibido información de un menor sin consentimiento de sus padres/tutores, eliminaremos esa información de inmediato. Contacta a <strong>privacidad@g2intelligence.co</strong> si crees que hemos recopilado datos de un menor.
          </p>
        </section>

        <section id="cambios" className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Cambios a esta Política</h2>
          <p className="text-gray-700 leading-relaxed">
            Podemos actualizar esta Política de Privacidad en cualquier momento. Te notificaremos de cambios materiales publicando una versión actualizada en nuestro sitio web y actualizando la fecha "Última actualización". Tu uso continuado de nuestros Servicios constituye aceptación de los cambios.
          </p>
        </section>

        <section id="contacto" className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Cómo Contactarnos</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Si tienes preguntas sobre esta Política de Privacidad o deseas ejercer tus derechos, contáctanos:
          </p>

          <div className="bg-gray-50 p-6 rounded-lg space-y-2">
            <p>
              <strong>Empresa:</strong> G2 Intelligence S.A.S.
            </p>
            <p>
              <strong>Correo Electrónico:</strong> <a href="mailto:privacidad@g2intelligence.co" className="text-blue-600 hover:underline">privacidad@g2intelligence.co</a>
            </p>
            <p>
              <strong>Teléfono:</strong> <a href="tel:+573502439698" className="text-blue-600 hover:underline">+57 350 243 9698</a>
            </p>
            <p>
              <strong>Ubicación:</strong> Cali, Valle del Cauca, Colombia
            </p>
            <p>
              <strong>Encargado de Datos Personales:</strong> Disponible para consultas y solicitudes de derechos
            </p>
          </div>

          <p className="text-gray-700 leading-relaxed mt-6">
            <strong>Derecho a Presentar Reclamación:</strong> Si no estás satisfecho con cómo manejamos tu información, tienes derecho a presentar una reclamación ante la <strong>Superintendencia de Industria y Comercio (SIC)</strong> de Colombia.
          </p>
        </section>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-600 text-sm">
          <p>
            © 2026 G2 Intelligence S.A.S. Todos los derechos reservados.
            <br />
            Última actualización: {lastUpdated}
          </p>
        </div>
      </article>
    </main>
  );
}
