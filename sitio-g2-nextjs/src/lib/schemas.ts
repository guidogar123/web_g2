import { z } from 'zod';

export const ContactSchema = z.object({
  nombre: z
    .string()
    .min(2, { message: 'Nombre debe tener al menos 2 caracteres' })
    .max(100, { message: 'Nombre es muy largo' }),
  email: z.string().email({ message: 'Email inválido' }),
  empresa: z
    .string()
    .max(100, { message: 'Empresa es muy larga' })
    .optional()
    .default(''),
  mensaje: z
    .string()
    .min(10, { message: 'Mensaje debe tener al menos 10 caracteres' })
    .max(1000, { message: 'Mensaje es muy largo' }),
});

export const ScheduleSchema = z.object({
  nombre: z
    .string()
    .min(2, { message: 'Nombre debe tener al menos 2 caracteres' })
    .max(100, { message: 'Nombre es muy largo' }),
  email: z.string().email({ message: 'Email inválido' }),
  telefono: z
    .string()
    .min(7, { message: 'Teléfono debe tener al menos 7 dígitos' })
    .max(20, { message: 'Teléfono inválido' }),
  fecha: z.string().min(1, { message: 'Fecha requerida' }),
  hora: z.string().regex(/^\d{2}:\d{2}$/, { message: 'Hora debe ser en formato HH:mm' }),
});

export type ContactFormData = z.infer<typeof ContactSchema>;
export type ScheduleFormData = z.infer<typeof ScheduleSchema>;
