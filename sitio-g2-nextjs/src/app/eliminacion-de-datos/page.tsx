import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Eliminación de Datos',
  description:
    'Cómo solicitar la eliminación de tus datos personales en G2 Intelligence, incluidos los datos recibidos por comentarios y mensajes en Instagram y Facebook.',
  openGraph: {
    url: 'https://g2intelligence.co/eliminacion-de-datos',
    type: 'website',
    title: 'Eliminación de Datos | G2 Intelligence',
    description:
      'Cómo solicitar la eliminación de tus datos personales en G2 Intelligence.',
    siteName: 'G2 Intelligence',
  },
  alternates: {
    canonical: 'https://g2intelligence.co/eliminacion-de-datos',
  },
};

export default function EliminacionDeDatos() {
  const lastUpdated = '2026-10-13';

  return (
    <main className="min-h-screen bg-white px-4 py-12 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-3xl">
        <div className="mb-8 border-b border-gray-200 pb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Eliminación de Datos</h1>
          <p className="text-gray-600">
            <strong>GUIDO GARZÓN PEÑA, actuando como propietario del establecimiento de comercio G2INTELLIGENCE</strong>
            <br />
            Última actualización: {lastUpdated}
          </p>
        </div>

        <section className="mb-8">
          <p className="text-gray-700 leading-relaxed">
            Tienes derecho a pedir que eliminemos tus datos personales. Esta página explica qué datos podemos tener sobre ti y cómo solicitar su eliminación. Se complementa con nuestra{' '}
            <a href="/politica-privacidad" className="text-blue-700 underline">Política de Privacidad</a>, que desarrolla tus derechos conforme a la Ley 1581 de 2012 (Habeas Data).
          </p>
        </section>

        <section id="datos" className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Qué datos podemos tener</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Si comentas o nos escribes en nuestras cuentas de Instagram o Facebook para pedir un recurso o una sesión, podemos guardar:
          </p>
          <ul className="text-gray-700 space-y-2 ml-6 list-disc">
            <li>Tu nombre de usuario y el identificador público de tu cuenta en la red social</li>
            <li>El texto de tu comentario o mensaje, su fecha y la publicación a la que respondiste</li>
            <li>Los datos de contacto que tú mismo nos compartas después (por ejemplo, nombre, teléfono, correo o empresa)</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-4">
            Usamos estos datos únicamente para responderte y, si tú lo pides, agendar o dar seguimiento a una conversación comercial.
          </p>
        </section>

        <section id="como-solicitar" className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Cómo solicitar la eliminación</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Escribe a{' '}
            <a href="mailto:hola@g2intelligence.co?subject=Solicitud%20de%20eliminaci%C3%B3n%20de%20datos" className="text-blue-700 underline">hola@g2intelligence.co</a>{' '}
            con el asunto <strong>&quot;Solicitud de eliminación de datos&quot;</strong> e incluye:
          </p>
          <ul className="text-gray-700 space-y-2 ml-6 list-disc">
            <li>Tu nombre de usuario en Instagram, Facebook o TikTok (o el teléfono o correo con el que hablaste con nosotros)</li>
            <li>Los datos que quieres que eliminemos, o &quot;todos&quot;</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-4">
            También puedes enviarnos un mensaje directo con la palabra <strong>BAJA</strong> desde la cuenta de la que quieres que borremos los datos. Para proteger tu información, podemos pedirte que confirmes que eres el titular.
          </p>
        </section>

        <section id="plazo" className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Qué pasa después</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Atenderemos tu solicitud en un máximo de <strong>15 días hábiles</strong> y te confirmaremos por el mismo medio cuando los datos estén eliminados.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Podemos conservar los datos que la ley nos obligue a mantener (por ejemplo, registros contables o contractuales) y solo durante el tiempo que la norma exija. Lo que no esté sujeto a esa obligación se elimina.
          </p>
        </section>

        <section id="meta" className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Datos en Instagram y Facebook</h2>
          <p className="text-gray-700 leading-relaxed">
            Tus comentarios y mensajes también existen en la plataforma de Meta, bajo sus propias políticas. Esta solicitud elimina lo que G2 Intelligence guarda en sus propios sistemas. Para borrar contenido dentro de Instagram o Facebook, puedes eliminarlo directamente desde tu cuenta o gestionarlo en la configuración de privacidad de esas plataformas.
          </p>
        </section>

        <section id="contacto" className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Contacto</h2>
          <p className="text-gray-700 leading-relaxed">
            Correo: <a href="mailto:hola@g2intelligence.co" className="text-blue-700 underline">hola@g2intelligence.co</a>
            <br />
            Sitio web: g2intelligence.co
          </p>
        </section>
      </article>
    </main>
  );
}
