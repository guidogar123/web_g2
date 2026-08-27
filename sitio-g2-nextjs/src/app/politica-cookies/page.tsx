import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Cookies | G2 Intelligence',
  description:
    'Política de Cookies de G2 Intelligence. Conoce cómo utilizamos cookies y tecnologías similares en nuestro sitio web.',
  openGraph: {
    url: 'https://g2intelligence.co/politica-cookies',
    type: 'website',
    title: 'Política de Cookies | G2 Intelligence',
    description: 'Política de Cookies de G2 Intelligence.',
    siteName: 'G2 Intelligence',
  },
  alternates: {
    canonical: 'https://g2intelligence.co/politica-cookies',
  },
};

export default function PoliticaCookies() {
  const lastUpdated = '2026-08-27';

  return (
    <main className="min-h-screen bg-white px-4 py-12 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-8 border-b border-gray-200 pb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Política de Cookies</h1>
          <p className="text-gray-600">
            <strong>G2 Intelligence S.A.S.</strong> (NIT 94527160-5)
            <br />
            Última actualización: {lastUpdated}
            <br />
            Vigente desde: {lastUpdated}
          </p>
        </div>

        <section id="que-son" className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. ¿Qué son las cookies?</h2>
          <p className="text-gray-700 leading-relaxed">
            Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo (navegador, celular, tableta) cuando visitas un sitio web. Permiten que el sitio recuerde tus acciones y preferencias durante un tiempo, y se utilizan para mejorar tu experiencia y medir el rendimiento de las páginas. También utilizamos tecnologías similares como píxeles de seguimiento y almacenamiento local.
          </p>
        </section>

        <section id="cookies-que-usamos" className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Cookies que utilizamos</h2>

          <div className="space-y-4 mb-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Cookies estrictamente necesarias</h3>
              <p className="text-gray-700 text-sm">Imprescindibles para el funcionamiento básico del sitio (por ejemplo, seguridad, preferencias de sesión). No requieren consentimiento y no pueden desactivarse.</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Cookies analíticas</h3>
              <p className="text-gray-700 text-sm">Nos permiten entender cómo interactúan los visitantes con el sitio (páginas más visitadas, tiempo de permanencia, origen del tráfico). Utilizamos <strong>Google Analytics</strong> para este fin. La información es agregada y seudónimizada.</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Cookies publicitarias</h3>
              <p className="text-gray-700 text-sm">Utilizadas para medir la efectividad de nuestras campañas y mostrarte publicidad relevante. Podemos usar el <strong>Meta (Facebook) Pixel</strong> y herramientas de Google Ads para rastrear conversiones y segmentar audiencias. Estas cookies pueden ser instaladas por terceros (Meta, Google).</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Cookies de preferencias</h3>
              <p className="text-gray-700 text-sm">Recuerdan tus preferencias (idioma, región, configuración) para personalizar tu experiencia en visitas posteriores.</p>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed">
            Las cookies analíticas, publicitarias y de preferencias se instalan únicamente con tu consentimiento previo, que puedes otorgar o rechazar a través del aviso de cookies del sitio.
          </p>
        </section>

        <section id="gestion" className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Cómo gestionar o desactivar las cookies</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Puedes controlar y eliminar las cookies desde la configuración de tu navegador. A continuación, enlaces con instrucciones de los navegadores más comunes:
          </p>
          <ul className="text-gray-700 space-y-2 ml-6 list-disc mb-4">
            <li><a href="https://support.google.com/chrome/answer/95647" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
            <li><a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
            <li><a href="https://support.apple.com/es-co/guide/safari/sfri11471/mac" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Safari</a></li>
            <li><a href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-639d06f0-e57f-4f20-8d76-c7e0d1e1e4e0" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
          </ul>
          <p className="text-gray-700 leading-relaxed">
            También puedes optar por no ser rastreado por Google Analytics instalando el complemento oficial: <a href="https://tools.google.com/dlpage/gaoptout" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out</a>. Ten en cuenta que si desactivas las cookies, algunas funciones del sitio podrían no funcionar correctamente.
          </p>
        </section>

        <section id="terceros" className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Cookies de terceros</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Nuestros proveedores de análisis y publicidad pueden instalar sus propias cookies en tu dispositivo. Puedes consultar sus políticas para más información:
          </p>
          <ul className="text-gray-700 space-y-2 ml-6 list-disc mb-4">
            <li><a href="https://policies.google.com/technologies/cookies" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Google – Cookies</a></li>
            <li><a href="https://www.facebook.com/policies/cookies/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Meta – Política de Cookies</a></li>
          </ul>
          <p className="text-gray-700 leading-relaxed">
            Estos terceros actúan como responsables independientes del tratamiento de los datos que recopilan mediante sus cookies, conforme a sus propias políticas.
          </p>
        </section>

        <section id="actualizaciones" className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Actualizaciones de esta Política</h2>
          <p className="text-gray-700 leading-relaxed">
            Podemos actualizar esta Política de Cookies para reflejar cambios en las tecnologías utilizadas o en la normativa aplicable. La versión vigente se publicará en esta página con su fecha de actualización.
          </p>
        </section>

        <section id="contacto" className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Contacto</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Si tienes preguntas sobre el uso de cookies en nuestro sitio, escríbenos a <a href="mailto:privacidad@g2intelligence.co" className="text-blue-600 hover:underline">privacidad@g2intelligence.co</a>. Para más información sobre el tratamiento de tus datos personales, consulta nuestra <a href="/politica-privacidad" className="text-blue-600 hover:underline">Política de Privacidad</a>.
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
