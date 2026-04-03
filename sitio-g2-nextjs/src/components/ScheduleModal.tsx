'use client';

import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Calendar as CalendarIcon, Clock, User, Mail, Phone, Loader2, Sparkles } from 'lucide-react';
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface ScheduleModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const COOLDOWN_KEY = 'g2_schedule_cooldown';
const BAN_KEY = 'g2_schedule_ban';
const COOLDOWN_MS = 60 * 1000;
const BAN_MS = 5 * 60 * 1000;

export const ScheduleModal = ({ isOpen, onClose }: ScheduleModalProps) => {
    const getAvailableDays = (count: number) => {
        const days = [];
        let current = new Date();

        // Lead time: 2 business days (skipping Sundays)
        let leadCount = 0;
        while (leadCount < 2) {
            current.setDate(current.getDate() + 1);
            if (current.getDay() !== 0) leadCount++;
        }

        while (days.length < count) {
            if (current.getDay() !== 0) {
                days.push(new Date(current));
            }
            current.setDate(current.getDate() + 1);
        }
        return days;
    };

    const availableDays = getAvailableDays(2);
    const [date, setDate] = useState<Date | undefined>(availableDays[0]);
    const [selectedTime, setSelectedTime] = useState<string>("10:00");
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        empresa: '',
    });

    const timeSlots: string[] = [];
    for (let hour = 6; hour <= 20; hour++) {
        timeSlots.push(`${hour.toString().padStart(2, '0')}:00`);
        if (hour < 20) timeSlots.push(`${hour.toString().padStart(2, '0')}:30`);
    }

    const checkRateLimit = () => {
        const now = Date.now();
        const banUntil = localStorage.getItem(BAN_KEY);
        const lastSignal = localStorage.getItem(COOLDOWN_KEY);

        if (banUntil && now < parseInt(banUntil)) {
            const remaining = Math.ceil((parseInt(banUntil) - now) / 1000 / 60);
            toast.error(`Actividad limitada. Espera ${remaining} min.`);
            return false;
        }

        if (lastSignal && now - parseInt(lastSignal) < COOLDOWN_MS) {
            localStorage.setItem(BAN_KEY, (now + BAN_MS).toString());
            toast.error("Seguridad activada. Bloqueo de 5 min.");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!checkRateLimit()) return;
        if (!date) return toast.error("Selecciona un día.");

        setLoading(true);
        try {
            const webhookUrl = process.env.NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL;
            if (!webhookUrl) {
                throw new Error('NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL is not configured');
            }

            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    type: 'scheduling',
                    ...formData,
                    fecha: format(date, "PPP", { locale: es }),
                    hora: selectedTime,
                    timestamp: new Date().toISOString()
                }),
            });

            if (response.ok) {
                toast.success("¡Agendado exitosamente!");
                localStorage.setItem(COOLDOWN_KEY, Date.now().toString());
                onClose();
            } else {
                throw new Error();
            }
        } catch (error) {
            toast.error("Error al agendar. Intenta de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[800px] bg-[#0d1117] border-white/10 text-white p-0 overflow-hidden rounded-3xl backdrop-blur-xl max-h-[90vh] overflow-y-auto">
                <div className="flex flex-col md:flex-row min-h-full">
                    <div className="md:w-[240px] bg-emerald-500/10 p-8 flex flex-col justify-start border-r border-white/10">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center mb-6">
                            <CalendarIcon className="w-6 h-6 text-emerald-400" />
                        </div>
                        <h3 className="text-xl font-bold mb-4">Agenda tu sesión</h3>
                        <p className="text-white/40 text-xs leading-relaxed mb-8">
                            Consultoría estratégica de 30 minutos.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-xs text-white/50">
                                <Clock className="w-4 h-4 text-emerald-400" />
                                <span>30 min</span>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-white/50">
                                <Sparkles className="w-4 h-4 text-emerald-400" />
                                <span>Estrategia IA</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 p-8 bg-black/40">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <Label className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Concepto / Nombre</Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-3 w-4 h-4 text-white/20" />
                                        <Input
                                            placeholder="Tu nombre"
                                            value={formData.nombre}
                                            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                                            required
                                            className="pl-10 bg-white/5 border-white/10 h-11 rounded-xl"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <Label className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Email Corporativo</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 w-4 h-4 text-white/20" />
                                        <Input
                                            type="email"
                                            placeholder="tu@empresa.com"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            required
                                            className="pl-10 bg-white/5 border-white/10 h-11 rounded-xl"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <Label className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Teléfono / WhatsApp</Label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-3 w-4 h-4 text-white/20" />
                                        <Input
                                            type="tel"
                                            placeholder="+57..."
                                            value={formData.telefono}
                                            onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                                            required
                                            className="pl-10 bg-white/5 border-white/10 h-11 rounded-xl"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6 pt-4 border-t border-white/5">
                                <div className="space-y-3">
                                    <Label className="text-[10px] uppercase tracking-widest text-white/30 font-bold block">1. Escoge el día</Label>
                                    <div className="flex gap-3">
                                        {availableDays.map((d) => (
                                            <button
                                                key={d.toISOString()}
                                                type="button"
                                                onClick={() => setDate(d)}
                                                className={cn(
                                                    "flex-1 p-4 rounded-xl border transition-all duration-300 flex flex-col items-center gap-1",
                                                    date?.toDateString() === d.toDateString()
                                                        ? "bg-emerald-500/20 border-emerald-500 text-emerald-400"
                                                        : "bg-white/5 border-white/10 text-white/40 hover:bg-white/10"
                                                )}
                                            >
                                                <span className="text-[9px] uppercase tracking-tighter font-bold opacity-60">
                                                    {format(d, "EEEE", { locale: es })}
                                                </span>
                                                <span className="text-lg font-bold">
                                                    {format(d, "d 'de' MMM", { locale: es })}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <Label className="text-[10px] uppercase tracking-widest text-white/30 font-bold block">2. Escoge el horario (6AM - 8PM)</Label>
                                    <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2 max-h-[180px] overflow-y-auto pr-2">
                                        {timeSlots.map((time) => (
                                            <button
                                                key={time}
                                                type="button"
                                                onClick={() => setSelectedTime(time)}
                                                className={cn(
                                                    "h-9 text-[11px] font-medium rounded-lg transition-all border",
                                                    selectedTime === time
                                                        ? "bg-emerald-500 border-emerald-500 text-white"
                                                        : "bg-white/5 border-white/10 text-white/30 hover:bg-white/10 hover:text-white"
                                                )}
                                            >
                                                {time}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl">
                                <div className="text-center sm:text-left">
                                    <span className="text-white/30 block uppercase text-[9px] tracking-widest mb-1">Tu sesión:</span>
                                    {date && (
                                        <span className="text-emerald-400 font-bold text-base">
                                            {format(date, "d 'de' MMMM", { locale: es })} @ {selectedTime} hs
                                        </span>
                                    )}
                                </div>
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white px-8 h-12 rounded-xl font-bold transition-all duration-300"
                                >
                                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Confirmar Cita"}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ScheduleModal;
