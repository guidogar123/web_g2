'use client';

import { useState } from 'react';
import { Mail, MapPin, Phone, ExternalLink } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { ContactSchema } from '@/lib/schemas';

interface ContactoProps {
  onScheduleClick: () => void;
}

interface FormData {
  nombre: string;
  email: string;
  empresa: string;
  mensaje: string;
}

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'hola@g2intelligence.co',
    href: 'mailto:hola@g2intelligence.co',
  },
  {
    icon: MapPin,
    label: 'Ubicación',
    value: 'Cali, Valle del Cauca, Colombia',
    href: '#',
  },
  {
    icon: Phone,
    label: 'Teléfono',
    value: '+57 350 243 9698',
    href: 'tel:+573502439698',
  },
];

const socialLinks = [
  { label: 'Facebook', href: 'https://www.facebook.com/G2Intelligence' },
  { label: 'Twitter/X', href: 'https://twitter.com/G2Intelligence' },
  { label: 'Instagram', href: 'https://www.instagram.com/g2intelligence/' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@g2intelligence' },
];

export default function Contacto({ onScheduleClick }: ContactoProps) {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    email: '',
    empresa: '',
    mensaje: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation (per FORM-03, FORM-04)
    const validation = ContactSchema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        if (!fieldErrors[field]) fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      // POST to API route — never direct to n8n (per FORM-05)
      const response = await fetch('/api/webhook/n8n/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validation.data),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        if (response.status === 429) {
          toast.error('Demasiados intentos. Intenta de nuevo en unos minutos.');
        } else {
          toast.error((data as { error?: string }).error ?? 'Error al enviar. Intenta de nuevo.');
        }
        return;
      }

      toast.success('¡Mensaje enviado! Te contactaremos pronto.');
      setFormData({ nombre: '', email: '', empresa: '', mensaje: '' });
    } catch {
      toast.error('Error de conexión. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contacto" className="py-24 lg:py-32 bg-[#0d1117]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-6">
            Contáctanos
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight mb-4">
            Comienza tu{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
              Transformación
            </span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
            Estamos listos para ayudarte a llevar tu empresa al siguiente nivel. Cuéntanos sobre
            tu proyecto y nos pondremos en contacto contigo.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* LEFT: Contact form */}
          <div className="p-8 rounded-2xl bg-[#050505] border border-white/5">
            <h3 className="text-xl font-semibold text-white mb-6">Envíanos un mensaje</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <Label htmlFor="nombre" className="text-white/60 text-sm">
                  Nombre completo <span className="text-emerald-400">*</span>
                </Label>
                <Input
                  id="nombre"
                  placeholder="Tu nombre"
                  required
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="bg-[#0d1117] border-white/10 text-white placeholder:text-white/30 focus:border-emerald-500/50"
                />
                {errors.nombre && (
                  <p className="text-red-400 text-xs mt-1">{errors.nombre}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-white/60 text-sm">
                  Correo electrónico <span className="text-emerald-400">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@empresa.com"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-[#0d1117] border-white/10 text-white placeholder:text-white/30 focus:border-emerald-500/50"
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="empresa" className="text-white/60 text-sm">
                  Empresa
                </Label>
                <Input
                  id="empresa"
                  placeholder="Nombre de tu empresa"
                  value={formData.empresa}
                  onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                  className="bg-[#0d1117] border-white/10 text-white placeholder:text-white/30 focus:border-emerald-500/50"
                />
                {errors.empresa && (
                  <p className="text-red-400 text-xs mt-1">{errors.empresa}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="mensaje" className="text-white/60 text-sm">
                  Mensaje <span className="text-emerald-400">*</span>
                </Label>
                <Textarea
                  id="mensaje"
                  placeholder="Cuéntanos sobre tu proyecto y cómo podemos ayudarte..."
                  required
                  rows={5}
                  value={formData.mensaje}
                  onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                  className="bg-[#0d1117] border-white/10 text-white placeholder:text-white/30 focus:border-emerald-500/50 resize-none"
                />
                {errors.mensaje && (
                  <p className="text-red-400 text-xs mt-1">{errors.mensaje}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 rounded-xl transition-all duration-300"
              >
                {loading ? 'Enviando...' : 'Enviar mensaje'}
              </Button>
            </form>
          </div>

          {/* RIGHT: Contact info */}
          <div className="flex flex-col gap-6">
            {/* Contact cards */}
            <div className="space-y-4">
              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center gap-4 p-5 rounded-2xl bg-[#050505] border border-white/5 hover:border-emerald-500/20 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors flex-shrink-0">
                    <Icon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-widest font-medium">
                      {label}
                    </p>
                    <p className="text-white font-medium">{value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Social links */}
            <div className="p-5 rounded-2xl bg-[#050505] border border-white/5">
              <p className="text-white/40 text-xs uppercase tracking-widest font-medium mb-4">
                Redes Sociales
              </p>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/10 text-white/60 hover:text-emerald-400 hover:border-emerald-500/30 text-sm transition-all duration-300"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    {label}
                  </a>
                ))}
              </div>
            </div>

            {/* Schedule CTA card */}
            <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
              <h4 className="text-white font-semibold text-lg mb-2">¿Prefieres una llamada?</h4>
              <p className="text-white/60 text-sm mb-5 leading-relaxed">
                Agenda una consulta gratuita de 30 minutos con nuestro equipo.
              </p>
              <Button
                onClick={onScheduleClick}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-all duration-300"
              >
                Agendar llamada
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
