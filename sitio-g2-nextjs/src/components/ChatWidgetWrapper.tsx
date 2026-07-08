'use client';

import dynamic from 'next/dynamic';

const ChatWidget = dynamic(() => import('./ChatWidget'), {
  ssr: false,
  loading: () => null,
});

// CHAT DESACTIVADO TEMPORALMENTE — n8n pendiente de configuración
export default function ChatWidgetWrapper() {
  return null;
}
