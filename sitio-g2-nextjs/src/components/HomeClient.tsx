'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/sections/Hero';
import Servicios from '@/components/sections/Servicios';
import Nosotros from '@/components/sections/Nosotros';
import Equipo from '@/components/sections/Equipo';
import Contacto from '@/components/sections/Contacto';
import Footer from '@/components/sections/Footer';
import ScheduleModal from '@/components/ScheduleModal';
import ChatWidgetWrapper from '@/components/ChatWidgetWrapper';

export default function HomeClient() {
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);

  return (
    <>
      <Navigation />
      <main>
        <Hero onScheduleClick={() => setIsScheduleOpen(true)} />
        <Servicios />
        <Nosotros />
        <Equipo />
        <Contacto onScheduleClick={() => setIsScheduleOpen(true)} />
      </main>
      <Footer />
      <ScheduleModal
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
      />
      <ChatWidgetWrapper />
    </>
  );
}
