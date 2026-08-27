import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidad | G2 Intelligence',
  description:
    'Política de privacidad de G2 Intelligence. Conoce cómo protegemos tus datos personales según la Ley 1581 de 2012, el Decreto 090 de 2018 y la Ley 2300 de 2023 de Colombia.',
  openGraph: {
    url: 'https://g2intelligence.co/politica-privacidad',
    type: 'website',
    title: 'Política de Privacidad | G2 Intelligence',
    description:
      'Política de privacidad de G2 Intelligence. Cumple Ley 1581 de 2012, Decreto 090 de 2018, Ley 2300 de 2023 y requisitos Meta Developers.',
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
  const lastUpdated = '2026-08-27';

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
            Vigente desde: {lastUpdated}
          </p>
        </div>

        {/* Intro */}
        <section className="mb-8">
          <p className="text-gray-700 leading-relaxed mb-4">
            G2 Intelligence S.A.S. ("nosotros", "nos", "la Empresa" o "G2 Intelligence") respeta tu privacidad y está comprometida con proteger tus datos personales. Esta Política de Privacidad describe cómo recopilamos, usamos, compartimos y protegemos tu información cuando utilizas nuestro sitio web g2intelligence.co, nuestras aplicaciones, servicios y productos (colectivamente, los "Servicios").
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Nuestro procesamiento de datos personales cumple con la <strong>Ley Estatutaria 1581 de 2012 sobre Habeas Data</strong>, el <strong>Decreto 1377 de 2013</strong> (compilado en el <strong>Decreto 1074 de 2015</strong>), el <strong>Decreto 090 de 2018</strong>, la <strong>Circular Única de la Superintendencia de Industria y Comercio (SIC)</strong> en su Título V, la <strong>Ley 2300 de 2023</strong> en materia de comunicaciones comerciales, así como con las regulaciones internacionales aplicables.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Esta política aplica a los datos personales que tratamos como <strong>responsables del tratamiento</strong> en el marco de nuestros Servicios, incluyendo los datos que recibimos a través del sitio web, formularios de contacto, campañas publicitarias, herramientas de mensajería (incluido WhatsApp) y demás canales habilitados.
          </p>
        </section>

        {/* TOC */}
        <nav className="mb-8 bg-gray-50 p-6 rounded-lg">
          <h2 className="font-bold text-gray-900 mb-4">Contenido</h2>
          <ul className="text-sm text-blue-600 space-y-2">
            <li>1. <a href="#informacion-recopilada" className="hover:underline">Información que Recopilamos</a></li>
            <li>2. <a href="#proposito" className="hover:underline">Propósito del Procesamiento</a></li>
            <li>3. <a href="#base-legal" className="hover:underline">Base Legal del Procesamiento</a></li>
            <li>4. <a href="#datos-sensibles" className="hover:underline">Datos Sensibles</a></li>
            <li>5. <a href="#compartir" className="hover:underline">Cómo Compartimos tu Información</a></li>
            <li>6. <a href="#transferencias" className="hover:underline">Transferencias Internacionales de Datos</a></li>
            <li>7. <a href="#seguridad" className="hover:underline">Seguridad de tus Datos</a></li>
            <li>8. <a href="#incidentes" className="hover:underline">Incidentes de Seguridad y Notificación de Vulneraciones</a></li>
            <li>9. <a href="#derechos" className="hover:underline">Tus Derechos (Habeas Data)</a></li>
            <li>10. <a href="#comunicaciones-comerciales" className="hover:underline">Comunicaciones Comerciales</a></li>
            <li>11. <a href="#retencion" className="hover:underline">Retención de Datos</a></li>
            <li>12. <a href="#terceros" className="hover:underline">Servicios de Terceros</a></li>
            <li>13. <a href="#menores" className="hover:underline">Menores de Edad</a></li>
            <li>14. <a href="#cambios" className="hover:underline">Cambios a esta Política</a></li>
            <li>15. <a href="#contacto" className="hover:underline">Cómo Contactarnos</a></li>
          </ul>
        </nav>

        {/* Sections */}
        <section id="informacion-recopilada" className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Información que Recopilamos</h2>

          <h3 className="text-lg font-semibold text-gray-800 mb-3 mt-6">Información que nos proporcionas directamente</h3>
          <ul className="text-gray-700 space-y-2 ml-6 list-disc mb-4">
            <li><strong>Información de Contacto:</strong> Nombre, email, teléfono, dirección, ciudad, región</li>
            <li><strong>Información Empresarial:</strong> Nombre de la empresa, sector, tamaño, sitio web</li>
            <li><strong>Comunicaciones:</strong> Contenido de formularios, consultas, comentarios, sugerencias, y mensajes enviados por canales como WhatsApp o chat del sitio</li>
            <li><strong>Información de Identificación:</strong> Cédula, NIT, razón social (cuando es relevante)</li>
            <li><strong>Información Financiera:</strong> Datos de facturación y pago procesados por terceros autorizados</li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-800 mb-3 mt-6">Información recopilada automáticamente</h3>
          <ul className="text-gray-700 space-y-2 ml-6 list-disc mb-4">
            <li><strong>Datos de Navegación:</strong> Dirección IP, tipo de navegador, sistema operativo, páginas visitadas, tiempo de permanencia</li>
            <li><strong>Cookies:</strong> Identificadores únicos para recordar preferencias y mejorar experiencia (consulta nuestra <a href="/politica-cookies" className="text-blue-600 hover:underline">Política de Cookies</a>)</li>
            <li><strong>Datos de Dispositivo:</strong> Tipo de dispositivo, resolución de pantalla, información técnica</li>
            <li><strong>Análisis Web:</strong> Información sobre cómo interactúas con nuestro sitio (proporcionada por Google Analytics)</li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-800 mb-3 mt-6">Información de Integraciones Externas</h3>
          <ul className="text-gray-700 space-y-2 ml-6 list-disc mb-4">
            <li><strong>Meta/Facebook Pixel:</strong> Datos de comportamiento para campañas publicitarias (cuando el píxel está instalado)</li>
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
            <li>Realizar campañas de publicidad dirigida en Meta, Google y otras plataformas, conforme a la normativa de comunicaciones comerciales vigente</li>
          </ul>
          <p className="text-gray-700 leading-relaxed">
            No utilizaremos tus datos personales para finalidades distintas o incompatibles con las descritas en esta política sin obtener tu autorización previa.
          </p>
        </section>

        <section id="base-legal" className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Base Legal del Procesamiento</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Conforme a la Ley 1581 de 2012, procesamos tus datos personales bajo las siguientes bases legales:
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
            <p className="text-gray-800 mb-2">
              <strong>Consentimiento:</strong> Para procesamiento que no es obligatorio por ley, obtenemos tu autorización previa, expresa e informada.
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

        <section id="datos-sensibles" className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Datos Sensibles</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            De acuerdo con el artículo 5 de la Ley 1581 de 2012, se consideran datos sensibles aquellos que afectan la intimidad del titular o cuyo uso indebido puede generar discriminación: origen racial o étnico, orientación política, convicciones religiosas o filosóficas, pertenencia a sindicatos, datos relativos a la salud, vida sexual y datos biométricos.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>G2 Intelligence no recopila ni trata datos sensibles</strong> en el desarrollo ordinario de sus Servicios, salvo que: (i) nos otorgues tu autorización explícita y previa, (ii) la ley lo exija, o (iii) sea necesario para proteger tu vida o tu salud.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Si en algún formulario o canal te solicitamos información que pudiera considerarse sensible, el suministro de la misma será <strong>facultativo</strong> y nunca condicionará la prestación del servicio, salvo las excepciones previstas en la ley.
          </p>
        </section>

        <section id="compartir" className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Cómo Compartimos tu Información</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Compartimos tus datos personales únicamente cuando es necesario:
          </p>
          <ul className="text-gray-700 space-y-2 ml-6 list-disc mb-4">
            <li><strong>Proveedores de Servicios:</strong> Plataformas de email, hosting, analytics, CRM que procesan datos conforme a nuestras instrucciones y bajo acuerdos de protección de datos</li>
            <li><strong>Plataformas Publicitarias:</strong> Meta, Google Ads, LinkedIn (solo información agregada y seudónimizada cuando corresponde)</li>
            <li><strong>Autoridades Legales:</strong> Cuando requerido por ley o orden judicial</li>
            <li><strong>Fusiones o Adquisiciones:</strong> Si nuestra empresa es adquirida, tus datos pueden transferirse (te notificaremos)</li>
          </ul>
          <p className="text-gray-700 leading-relaxed">
            <strong>NO vendemos</strong> tus datos personales a terceros. Los proveedores que procesan datos firman acuerdos de protección de datos.
          </p>
        </section>

        <section id="transferencias" className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Transferencias Internacionales de Datos</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Algunos de nuestros proveedores (por ejemplo, Google, Meta y servicios de infraestructura en la nube) pueden procesar datos en países distintos a Colombia, incluido Estados Unidos.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Realizamos transferencias internacionales únicamente cuando el país receptor cuenta con un nivel adecuado de protección reconocido por la SIC, o cuando contamos con tu autorización previa o con cláusulas contractuales y demás mecanismos que garantizan un nivel de protección equivalente al colombiano, conforme a la Circular Externa 005 de 2017 y la normativa vigente.
          </p>
          <p className="text-gray-700 leading-relaxed">
            No transferimos datos personales a países sin garantías adecuadas, salvo que la ley lo exija o lo permita expresamente.
          </p>
        </section>

        <section id="seguridad" className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Seguridad de tus Datos</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Implementamos medidas técnicas y organizacionales para proteger tus datos contra acceso no autorizado, alteración, pérdida o divulgación:
          </p>
          <ul className="text-gray-700 space-y-2 ml-6 list-disc mb-4">
            <li>Encriptación SSL/TLS en transmisión de datos</li>
            <li>Servidores seguros con cortafuegos</li>
            <li>Acceso restringido a información sensible</li>
            <li>Auditorías de seguridad regulares</li>
            <li>Políticas de contraseña segura para empleados</li>
            <li>Gestión de vulnerabilidades y monitoreo de nuestros sistemas</li>
            <li>Cumplimiento con estándares de seguridad internacionales</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-4">
            Sin embargo, ningún método de transmisión por internet es 100% seguro. No podemos garantizar seguridad absoluta.
          </p>
        </section>

        <section id="incidentes" className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Incidentes de Seguridad y Notificación de Vulneraciones</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Contamos con procedimientos para la gestión de incidentes de seguridad. En caso de una vulneración de datos personales (acceso no autorizado, pérdida, alteración o divulgación accidental o ilícita), actuaremos de la siguiente manera:
          </p>
          <ul className="text-gray-700 space-y-2 ml-6 list-disc mb-4">
            <li><strong>Contención y evaluación:</strong> Controlaremos el incidente, evaluaremos su alcance y los datos afectados</li>
            <li><strong>Mitigación:</strong> Adoptaremos las medidas correctivas necesarias para reducir los riesgos para los titulares</li>
            <li><strong>Notificación:</strong> Informaremos a la <strong>Superintendencia de Industria y Comercio (SIC)</strong> y a los titulares afectados cuando la normativa lo exija (artículo 17, literal l), de la Ley 1581 de 2012, y demás disposiciones aplicables), dentro de los plazos que establezca la autoridad</li>
            <li><strong>Registro:</strong> Mantendremos registro de los incidentes y de las acciones adelantadas</li>
          </ul>
          <p className="text-gray-700 leading-relaxed">
            Si detectas una posible vulneración que involucre tus datos, escríbenos de inmediato a <a href="mailto:privacidad@g2intelligence.co" className="text-blue-600 hover:underline">privacidad@g2intelligence.co</a>.
          </p>
        </section>

        <section id="derechos" className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Tus Derechos (Habeas Data - Ley 1581 de 2012)</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Como titular de datos personales, tienes los siguientes derechos:
          </p>

          <div className="space-y-4 mb-4">
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-gray-800">Derecho de Acceso</h3>
              <p className="text-gray-700">Acceder a tus datos personales y conocer cómo los procesamos</p>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-gray-800">Derecho de Actualización y Rectificación</h3>
              <p className="text-gray-700">Corregir datos inexactos o incompletos</p>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-gray-800">Derecho de Supresión (Eliminación)</h3>
              <p className="text-gray-700">Solicitar la eliminación de tus datos cuando ya no sean necesarios (sujeto a excepciones legales)</p>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-gray-800">Derecho de Oposición</h3>
              <p className="text-gray-700">Oponerte al procesamiento de tus datos por motivos legítimos</p>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-gray-800">Derecho de Revocación de Consentimiento</h3>
              <p className="text-gray-700">Revocar el consentimiento que hayas dado en cualquier momento</p>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-gray-800">Derecho de Acceso a Copia (Entrega de Datos)</h3>
              <p className="text-gray-700">Obtener una copia de los datos personales que nos hayas suministrado. Adicionalmente, y de manera voluntaria, podemos facilitar la entrega estructurada de tus datos a otro responsable cuando sea técnicamente viable</p>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed bg-yellow-50 p-4 rounded-lg">
            <strong>¿Cómo ejercer tus derechos?</strong> Contacta a nuestro Encargado de Tratamiento de Datos enviando un correo a <strong>privacidad@g2intelligence.co</strong> con:
            <ul className="mt-2 ml-6 list-disc text-gray-700">
              <li>Tu nombre completo y cédula</li>
              <li>Descripción clara del derecho que quieres ejercer</li>
              <li>Documentación que acredite tu identidad</li>
            </ul>
            Responderemos en los plazos legales: <strong>consultas</strong> en máximo <strong>10 días hábiles</strong> (prorrogables por 5 días hábiles cuando la consulta lo amerite), y <strong>reclamos</strong> en máximo <strong>15 días hábiles</strong> (prorrogables por 8 días hábiles adicionales, informándote antes del vencimiento).
          </p>
        </section>

        <section id="comunicaciones-comerciales" className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Comunicaciones Comerciales</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            De conformidad con la <strong>Ley 2300 de 2023</strong> y la normativa que regula las comunicaciones comerciales, solo contactamos con fines comerciales o publicitarios (llamadas, SMS, WhatsApp, correo electrónico u otros canales) a quienes nos hayan otorgado su <strong>autorización previa, expresa e informada</strong>.
          </p>
          <ul className="text-gray-700 space-y-2 ml-6 list-disc mb-4">
            <li><strong>Identificación:</strong> Nuestras comunicaciones comerciales identifican claramente a G2 Intelligence como remitente</li>
            <li><strong>Mecanismo de baja (opt-out):</strong> Toda comunicación comercial incluye un mecanismo sencillo y gratuito para solicitar la suspensión de envíos (por ejemplo, responder "BAJA" o "NO" en WhatsApp/SMS, o el enlace de cancelación en correos electrónicos)</li>
            <li><strong>Registro de Números Excluidos (RNE):</strong> Respetamos el Registro de Números Excluidos administrado por la CRC y no enviamos comunicaciones comerciales a números inscritos en el mismo</li>
            <li><strong>Horarios y frecuencia:</strong> Realizamos contactos dentro de los horarios y con la periodicidad permitidos por la normativa vigente</li>
            <li><strong>Revocación:</strong> Puedes revocar tu autorización para recibir comunicaciones comerciales en cualquier momento, sin costo alguno, usando los mecanismos indicados o escribiendo a <a href="mailto:privacidad@g2intelligence.co" className="text-blue-600 hover:underline">privacidad@g2intelligence.co</a></li>
          </ul>
          <p className="text-gray-700 leading-relaxed">
            Las comunicaciones necesarias para la prestación del servicio (confirmaciones, avisos de facturación, soporte) no se consideran comerciales y pueden enviarse sin perjuicio de tu autorización publicitaria.
          </p>
        </section>

        <section id="retencion" className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Retención de Datos</h2>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Servicios de Terceros</h2>
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

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">WhatsApp / Canales de Mensajería</h3>
              <p className="text-gray-700 text-sm">Para atención al cliente y comunicaciones comerciales cuando lo autorizas. <a href="https://www.whatsapp.com/legal/privacy-policy" className="text-blue-600 hover:underline">Política de privacidad de WhatsApp</a></p>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed">
            Estos terceros están obligados contractualmente a proteger tus datos según estándares similares a los nuestros. No vendemos datos a publicistas.
          </p>
        </section>

        <section id="menores" className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Menores de Edad</h2>
          <p className="text-gray-700 leading-relaxed">
            Nuestros Servicios no están dirigidos a menores de 18 años. No recopilamos intencionalmente datos de menores. Si descubrimos que hemos recibido información de un menor sin el consentimiento previo de sus padres o representantes legales, eliminaremos esa información de inmediato. En caso de que el tratamiento de datos de menores resulte necesario, se realizará con prevalencia de su interés superior y con la autorización del representante legal, considerando la opinión del menor según su madurez. Contacta a <strong>privacidad@g2intelligence.co</strong> si crees que hemos recopilado datos de un menor.
          </p>
        </section>

        <section id="cambios" className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Cambios a esta Política</h2>
          <p className="text-gray-700 leading-relaxed">
            Podemos actualizar esta Política de Privacidad en cualquier momento, en particular para mantenerla conforme a la normativa vigente. Te notificaremos de cambios materiales publicando una versión actualizada en nuestro sitio web y actualizando la fecha "Última actualización". Te recomendamos revisar periódicamente esta página. Tu uso continuado de nuestros Servicios después de la publicación de cambios constituye aceptación de los mismos.
          </p>
        </section>

        <section id="contacto" className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">15. Cómo Contactarnos</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Si tienes preguntas sobre esta Política de Privacidad o deseas ejercer tus derechos, contáctanos:
          </p>

          <div className="bg-gray-50 p-6 rounded-lg space-y-2">
            <p>
              <strong>Empresa:</strong> G2 Intelligence S.A.S. (NIT 94527160-5)
            </p>
            <p>
              <strong>Correo Electrónico:</strong> <a href="mailto:privacidad@g2intelligence.co" className="text-blue-600 hover:underline">privacidad@g2intelligence.co</a>
            </p>
            <p>
              <strong>Teléfono:</strong> <a href="tel:+573116783068" className="text-blue-600 hover:underline">+57 311 678 3068</a>
            </p>
            <p>
              <strong>Ubicación:</strong> Cali, Valle del Cauca, Colombia
            </p>
            <p>
              <strong>Encargado de Datos Personales:</strong> Disponible para consultas y solicitudes de derechos
            </p>
          </div>

          <p className="text-gray-700 leading-relaxed mt-6">
            <strong>Derecho a Presentar Reclamación:</strong> Si no estás satisfecho con cómo manejamos tu información, tienes derecho a presentar una reclamación ante la <strong>Superintendencia de Industria y Comercio (SIC)</strong> de Colombia, quien además administra el <strong>Registro Nacional de Bases de Datos (RNBD)</strong> en el que G2 Intelligence cumple con sus obligaciones de registro conforme al Decreto 090 de 2018.
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
