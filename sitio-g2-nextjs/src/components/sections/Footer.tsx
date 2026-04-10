import { Brain, ExternalLink } from 'lucide-react';

const footerLinks = [
  {
    heading: 'Servicios',
    links: [
      { label: 'Infraestructura IA', href: '#servicios' },
      { label: 'Optimización de Procesos', href: '#servicios' },
      { label: 'Aumento de Ventas', href: '#servicios' },
      { label: 'Consultoría', href: '#servicios' },
    ],
  },
  {
    heading: 'Empresa',
    links: [
      { label: 'Sobre Nosotros', href: '#nosotros' },
      { label: 'Casos de Éxito', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Carreras', href: '#' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Política de Privacidad', href: '/politica-privacidad' },
      { label: 'Términos de Servicio', href: '#' },
      { label: 'Política de Cookies', href: '#' },
    ],
  },
];

const socialLinks = [
  { label: 'Facebook', href: 'https://www.facebook.com/G2Intelligence' },
  { label: 'Twitter/X', href: 'https://twitter.com/G2Intelligence' },
  { label: 'Instagram', href: 'https://www.instagram.com/g2intelligence/' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@g2intelligence' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#050505] border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Top: Logo + tagline + links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo + tagline */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-white">
                G2<span className="text-emerald-400">Intelligence</span>
              </span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-6">
              Transformamos empresas colombianas mediante tecnología agentica de vanguardia. Tu
              socio estratégico en la revolución digital.
            </p>
            {/* Social links */}
            <div className="flex flex-wrap gap-3">
              {socialLinks.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-white/10 text-white/40 hover:text-emerald-400 hover:border-emerald-500/30 text-xs transition-all duration-300"
                >
                  <ExternalLink className="w-3 h-3" />
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map(({ heading, links }) => (
            <div key={heading}>
              <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">
                {heading}
              </h4>
              <ul className="space-y-3">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-white/40 hover:text-white text-sm transition-colors duration-200"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/30">
          <p>© {currentYear} G2Intelligence. Todos los derechos reservados.</p>
          <p>NIT: 901.XXX.XXX-X | +57 350 243 9698 | Colombia</p>
        </div>

        {/* Made with love */}
        <p className="text-center text-white/20 text-xs mt-4">
          Hecho con ♥ en Bogotá, Colombia
        </p>
      </div>
    </footer>
  );
}
