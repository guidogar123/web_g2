import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Términos de Servicio | G2 Intelligence',
  description:
    'Términos de Servicio de G2 Intelligence. Condiciones de uso de nuestro sitio web y servicios de inteligencia artificial y automatización.',
  openGraph: {
    url: 'https://g2intelligence.co/terminos-servicio',
    type: 'website',
    title: 'Términos de Servicio | G2 Intelligence',
    description:
      'Términos de Servicio de G2 Intelligence. Condiciones de uso de nuestro sitio web y servicios.',
    siteName: 'G2 Intelligence',
  },
  alternates: {
    canonical: 'https://g2intelligence.co/terminos-servicio',
  },
};

export default function TerminosServicio() {
  const lastUpdated = '2026-08-27';

  return (
    <main className="min-h-screen bg-white px-4 py-12 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-8 border-b border-gray-200 pb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Términos de Servicio</h1>
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
            Estos Términos de Servicio ("Términos") regulan el acceso y uso del sitio web g2intelligence.co, sus aplicaciones, productos y servicios (colectivamente, los "Servicios") ofrecidos por <strong>G2 Intelligence S.A.S.</strong> ("G2 Intelligence", "nosotros", "nos").
          </p>
          <p className="text-gray-700 leading-relaxed">
            Al acceder o utilizar nuestros Servicios, aceptas estos Términos en su totalidad. Si no estás de acuerdo con ellos, por favor no utilices nuestros Servicios.
          </p>
        </section>

        <section id="descripcion" className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Descripción de los Servicios</h2>
          <p className="text-gray-700 leading-relaxed">
            G2 Intelligence ofrece servicios de consultoría estratégica, desarrollo de inteligencia artificial, automatización de procesos, agentes autónomos, infraestructura IA, optimización de ventas y desarrollo a medida para empresas. Los Servicios pueden prestarse directamente o a través de aliados y subcontratistas autorizados.
          </p>
        </section>

        <section id="aceptacion" className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Aceptación y Capacidad Legal</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Declaras que eres mayor de 18 años y que tienes capacidad legal para aceptar estos Términos. Si utilizas los Servicios en representación de una empresa u organización, declaras que estás autorizado para vincularla a estos Términos.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Los menores de edad solo pueden utilizar los Servicios con la supervisión y autorización de sus padres o representantes legales.
          </p>
        </section>

        <section id="propiedad-intelectual" className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Propiedad Intelectual</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Todo el contenido del sitio web (textos, imágenes, gráficos, logotipos, marcas, software, diseños y demás elementos) es propiedad de G2 Intelligence o de sus licenciantes y está protegido por las leyes de propiedad intelectual colombianas e internacionales.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Se prohíbe la reproducción, distribución, modificación o uso comercial del contenido sin autorización previa y escrita de G2 Intelligence, salvo las excepciones legales.
          </p>
        </section>

        <section id="uso-aceptable" className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Uso Aceptable</h2>
          <p className="text-gray-700 leading-relaxed mb-4">Al utilizar nuestros Servicios, te comprometes a no:</p>
          <ul className="text-gray-700 space-y-2 ml-6 list-disc mb-4">
            <li>Usar los Servicios para fines ilícitos o contrarios a la ley colombiana o internacional</li>
            <li>Intentar acceder, vulnerar o interferir con los sistemas, redes o infraestructura de G2 Intelligence o de terceros</li>
            <li>Transmitir virus, malware o cualquier código dañino</li>
            <li>Suplantar la identidad de otras personas o entidades</li>
            <li>Usar los Servicios para enviar comunicaciones comerciales no solicitadas (spam)</li>
            <li>Recopilar datos de otros usuarios sin su consentimiento</li>
            <li>Usar los resultados de nuestros Servicios para fines distintos a los pactados en el contrato o cotización correspondiente</li>
          </ul>
          <p className="text-gray-700 leading-relaxed">
            El incumplimiento de estas reglas puede dar lugar a la suspensión o terminación de tu acceso a los Servicios.
          </p>
        </section>

        <section id="contratacion" className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Contratación de Servicios</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            La contratación de nuestros servicios de consultoría, desarrollo o automatización se formaliza mediante cotización, orden de servicio o contrato específico, que prevalecen sobre estos Términos en caso de conflicto.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Los precios, alcances, entregables y tiempos se describen en la propuesta comercial correspondiente. Los pagos se realizarán según las condiciones pactadas, a través de los medios autorizados.
          </p>
        </section>

        <section id="enlaces-terceros" className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Enlaces a Terceros</h2>
          <p className="text-gray-700 leading-relaxed">
            Nuestro sitio puede contener enlaces a sitios web de terceros (redes sociales, herramientas de pago, etc.). No somos responsables del contenido, políticas o prácticas de dichos sitios. Te recomendamos revisar sus términos y políticas de privacidad antes de utilizarlos.
          </p>
        </section>

        <section id="limitacion-responsabilidad" className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Limitación de Responsabilidad</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            En la máxima medida permitida por la ley, G2 Intelligence no será responsable por daños indirectos, incidentales, especiales o consecuentes derivados del uso o la imposibilidad de uso de los Servicios, incluyendo pérdida de datos, lucro cesante o interrupción del negocio.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Los Servicios se proporcionan "tal cual" y "según disponibilidad", sin garantías de ningún tipo, expresas o implícitas. No garantizamos que los Servicios sean ininterrumpidos o libres de errores.
          </p>
        </section>

        <section id="comunicaciones" className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Comunicaciones Comerciales</h2>
          <p className="text-gray-700 leading-relaxed">
            Al proporcionar tus datos de contacto, podrás recibir comunicaciones comerciales si otorgas tu autorización previa, conforme a la <strong>Ley 2300 de 2023</strong>. En cualquier momento puedes solicitar la suspensión de estos envíos mediante el mecanismo de baja incluido en cada comunicación o escribiendo a <a href="mailto:privacidad@g2intelligence.co" className="text-blue-600 hover:underline">privacidad@g2intelligence.co</a>. Consulta nuestra <a href="/politica-privacidad" className="text-blue-600 hover:underline">Política de Privacidad</a>.
          </p>
        </section>

        <section id="fuerza-mayor" className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Fuerza Mayor</h2>
          <p className="text-gray-700 leading-relaxed">
            No seremos responsables por incumplimientos derivados de causas ajenas a nuestro control razonable, como desastres naturales, fallas de infraestructura de telecomunicaciones, actos de autoridades, huelgas o cualquier evento de fuerza mayor o caso fortuito.
          </p>
        </section>

        <section id="ley-aplicable" className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Ley Aplicable y Jurisdicción</h2>
          <p className="text-gray-700 leading-relaxed">
            Estos Términos se rigen por las leyes de la República de Colombia. Cualquier controversia derivada de estos Términos o de los Servicios será sometida a la jurisdicción de los jueces de la ciudad de Cali, Valle del Cauca, Colombia, salvo disposición legal en contrario.
          </p>
        </section>

        <section id="modificaciones" className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Modificaciones</h2>
          <p className="text-gray-700 leading-relaxed">
            Podemos actualizar estos Términos en cualquier momento. La versión vigente se publicará en esta página con su fecha de actualización. El uso continuado de los Servicios después de la publicación de cambios constituye aceptación de los mismos.
          </p>
        </section>

        <section id="contacto" className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contacto</h2>
          <div className="bg-gray-50 p-6 rounded-lg space-y-2">
            <p>
              <strong>Empresa:</strong> G2 Intelligence S.A.S. (NIT 94527160-5)
            </p>
            <p>
              <strong>Correo Electrónico:</strong> <a href="mailto:hola@g2intelligence.co" className="text-blue-600 hover:underline">hola@g2intelligence.co</a>
            </p>
            <p>
              <strong>Teléfono:</strong> <a href="tel:+573116783068" className="text-blue-600 hover:underline">+57 311 678 3068</a>
            </p>
            <p>
              <strong>Ubicación:</strong> Cali, Valle del Cauca, Colombia
            </p>
          </div>
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
