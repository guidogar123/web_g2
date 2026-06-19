'use client';

import { useEffect } from 'react';
import { createChat } from '@n8n/chat';
import '@n8n/chat/style.css';

export default function ChatWidget() {
  useEffect(() => {
    try {
      createChat({
        // Proxy server-side — la URL real del webhook (N8N_WEBHOOK_URL) es
        // server-only y nunca se expone al cliente. Si n8n no está configurado
        // el proxy responde 503 y @n8n/chat muestra un error graceful.
        webhookUrl: '/api/webhook/n8n/chat',
        mode: 'window',
        chatInputKey: 'chatInput',
        metadata: {
          page: window.location.pathname,
          referrer: document.referrer || '(directo)',
          ciudad: window.location.pathname.split('/')[1] || 'home',
        },
        showWelcomeScreen: true,
        initialMessages: [
          '¡Hola! Soy Agente g2, el asistente virtual de G2Intelligence. ¿En qué puedo ayudarte hoy?',
        ],
        i18n: {
          en: {
            title: 'Agente g2',
            subtitle: 'En línea',
            footer: 'Powered by G2Intelligence AI',
            inputPlaceholder: 'Escribe tu mensaje...',
            getStarted: 'Comenzar',
            closeButtonTooltip: 'Cerrar',
          },
        },
        theme: {
          button: { backgroundColor: '#10b981', size: 'medium' },
          chatWindow: {
            titleBackgroundColor: '#0d1117',
            titleColor: '#ffffff',
            subtitleColor: '#10b981',
            showCloseButton: true,
            backgroundColor: '#0a0a0a',
            userMessageBackgroundColor: '#10b981',
            userMessageTextColor: '#ffffff',
            botMessageBackgroundColor: '#1f2937',
            botMessageTextColor: '#f3f4f6',
            welcomeScreen: {
              title: 'Agente g2',
              subtitle: 'Soluciones inteligentes para tu empresa.',
              backgroundColor: '#0a0a0a',
              titleColor: '#ffffff',
              subtitleColor: 'rgba(255, 255, 255, 0.7)',
            },
          },
        },
      });
    } catch (err) {
      console.error('[ChatWidget] Failed to initialize:', err);
    }
  }, []);

  return null;
}
