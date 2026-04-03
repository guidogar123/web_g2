---
phase: 04-chat-widget-integration
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - sitio-g2-nextjs/package.json
  - sitio-g2-nextjs/src/components/ChatWidget.tsx
  - sitio-g2-nextjs/src/components/ChatWidgetWrapper.tsx
  - sitio-g2-nextjs/src/components/HomeClient.tsx
autonomous: false
requirements:
  - CHAT-01
  - CHAT-02
  - CHAT-03

must_haves:
  truths:
    - "Page loads without 'window is undefined' SSR errors"
    - "Chat button appears in browser with emerald (#10b981) background color"
    - "Chat window background is near-black (#0a0a0a)"
    - "Removing NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL from env disables the widget without crashing"
    - "No webhook URL is hardcoded anywhere in the source files"
  artifacts:
    - path: "sitio-g2-nextjs/src/components/ChatWidget.tsx"
      provides: "n8n chat initialization, theme config, graceful degradation"
      exports: ["default ChatWidget"]
    - path: "sitio-g2-nextjs/src/components/ChatWidgetWrapper.tsx"
      provides: "SSR-safe dynamic wrapper with ssr: false"
      exports: ["default ChatWidgetWrapper"]
    - path: "sitio-g2-nextjs/src/components/HomeClient.tsx"
      provides: "Mounts ChatWidgetWrapper after ScheduleModal"
      contains: "ChatWidgetWrapper"
  key_links:
    - from: "ChatWidgetWrapper.tsx"
      to: "ChatWidget.tsx"
      via: "next/dynamic with ssr: false"
      pattern: "dynamic.*ChatWidget.*ssr.*false"
    - from: "HomeClient.tsx"
      to: "ChatWidgetWrapper"
      via: "import and JSX render"
      pattern: "<ChatWidgetWrapper"
    - from: "ChatWidget.tsx"
      to: "process.env.NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL"
      via: "useEffect env var read"
      pattern: "NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL"
---

<objective>
Install @n8n/chat and wire a SSR-safe chat widget into the G2 Intelligence Next.js site with Emerald Intelligence branding and graceful degradation when the webhook URL is absent.

Purpose: Enables site visitors to chat with the n8n AI agent (Agente g2) directly from the homepage without SSR errors or layout shift.
Output: Three files (ChatWidget.tsx, ChatWidgetWrapper.tsx, HomeClient.tsx updated) plus @n8n/chat in package.json. Build passes, chat button visible in browser.
</objective>

<execution_context>
@$HOME/.claude/get-shit-done/workflows/execute-plan.md
@$HOME/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/ROADMAP.md
@.planning/REQUIREMENTS.md
@.planning/phases/04-chat-widget-integration/04-CONTEXT.md
@.planning/phases/04-chat-widget-integration/04-RESEARCH.md

<!-- CRITICAL: This Next.js version (16.2.2) may have breaking API changes.
     Before writing any next/dynamic usage, read:
     sitio-g2-nextjs/node_modules/next/dist/docs/
     and check the AGENTS.md warning. -->
</context>

<interfaces>
<!-- Existing HomeClient.tsx — executor must know exact structure to splice in ChatWidgetWrapper -->

From sitio-g2-nextjs/src/components/HomeClient.tsx (current, 33 lines):
```tsx
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
    </>   {/* <-- ChatWidgetWrapper goes here, before closing fragment */}
  );
}
```

Environment variable already configured in sitio-g2-nextjs/.env.local:
  NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL=https://n8n-n8n.ektnbd.easypanel.host/webhook/1c0360f1-fe27-42a5-9d24-7b52aebe9dd2/chat
</interfaces>

<tasks>

<task type="auto">
  <name>Task 1: Install @n8n/chat and check for peer dependency warnings</name>
  <files>sitio-g2-nextjs/package.json</files>
  <action>
    From the sitio-g2-nextjs/ directory, run:

      npm install @n8n/chat

    Observe the output carefully:
    - If peer dependency warnings appear for React or Next.js, capture the exact warning text in a comment at the top of ChatWidget.tsx (as a TODO) so the executor of the checkpoint task knows.
    - Do NOT use --legacy-peer-deps or --force unless peer warnings cause a hard install failure. If install fails entirely, try --legacy-peer-deps and document in the SUMMARY.

    After install, confirm @n8n/chat appears in package.json under "dependencies" with a pinned version.
  </action>
  <verify>
    node -e "require('C:/Users/guido/OneDrive/G2INNOVATION/WEB_G2/sitio-g2-nextjs/node_modules/@n8n/chat/package.json')" && echo "OK"
  </verify>
  <done>@n8n/chat is listed in package.json dependencies and its node_modules directory exists.</done>
</task>

<task type="auto">
  <name>Task 2: Create ChatWidget.tsx and ChatWidgetWrapper.tsx, update HomeClient.tsx</name>
  <files>
    sitio-g2-nextjs/src/components/ChatWidget.tsx,
    sitio-g2-nextjs/src/components/ChatWidgetWrapper.tsx,
    sitio-g2-nextjs/src/components/HomeClient.tsx
  </files>
  <action>
    IMPORTANT: Before writing any next/dynamic usage, read
    sitio-g2-nextjs/node_modules/next/dist/docs/ (or the relevant guide listed
    there) to confirm the dynamic() import API for Next.js 16.2.2. Use whatever
    API is documented there; do NOT assume Next.js 13-15 syntax is identical.

    --- CREATE sitio-g2-nextjs/src/components/ChatWidget.tsx ---

    'use client' component. Implements:
    - import { useEffect } from 'react'
    - import { createChat } from '@n8n/chat'
    - import '@n8n/chat/style.css'
    - Single useEffect with empty deps array []
    - Inside useEffect:
        1. Read process.env.NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL
        2. If undefined or empty string: console.warn('[ChatWidget] NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL not set — chat disabled') then return
        3. try { createChat({ ... }) } catch(err) { console.error('[ChatWidget] Failed to initialize:', err) }
    - createChat config (per D-03 and D-04 from CONTEXT.md):
        webhookUrl: (the env var value),
        mode: 'window',
        chatInputKey: 'chatInput',
        metadata: {},
        showWelcomeScreen: true,
        initialMessages: ['¡Hola! Soy Agente g2, el asistente virtual de G2Intelligence. ¿En qué puedo ayudarte hoy?'],
        i18n: { en: { title: 'Agente g2', subtitle: 'En línea', footer: 'Powered by G2Intelligence AI', inputPlaceholder: 'Escribe tu mensaje...', getStarted: 'Comenzar', closeButtonTooltip: 'Cerrar' } },
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
        }
    - Component returns null (no JSX rendered).
    - No hardcoded webhook URL anywhere in this file.

    --- CREATE sitio-g2-nextjs/src/components/ChatWidgetWrapper.tsx ---

    'use client' component. Implements:
    - Import dynamic from 'next/dynamic' using the API verified from node_modules docs
    - Dynamically import ChatWidget with ssr: false and loading: () => null
    - Export default function ChatWidgetWrapper() { return <ChatWidget /> }
    - The ssr: false option is REQUIRED (per D-01 from CONTEXT.md) — prevents window/document access during SSR.

    --- MODIFY sitio-g2-nextjs/src/components/HomeClient.tsx ---

    Add to existing file (minimal diff, do not rewrite unnecessarily):
    1. Add import line: import ChatWidgetWrapper from '@/components/ChatWidgetWrapper';
    2. Add <ChatWidgetWrapper /> as the last child inside the fragment, after the closing </ScheduleModal> tag and before the closing </>.

    The final JSX structure should end with:
      <ScheduleModal
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
      />
      <ChatWidgetWrapper />
    </>
  </action>
  <verify>
    cd C:/Users/guido/OneDrive/G2INNOVATION/WEB_G2/sitio-g2-nextjs && npm run build 2>&1 | tail -20
  </verify>
  <done>
    - npm run build exits 0 with no TypeScript or SSR errors.
    - ChatWidget.tsx exists, contains NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL, returns null, no hardcoded URL.
    - ChatWidgetWrapper.tsx exists, uses dynamic import with ssr: false.
    - HomeClient.tsx contains the ChatWidgetWrapper import and JSX element.
  </done>
</task>

<task type="checkpoint:human-verify" gate="blocking">
  <name>Checkpoint: Verify chat widget in browser</name>
  <action>Human verifies the chat widget renders correctly and no SSR errors occur. See how-to-verify steps below.</action>
  <verify>Human approves via resume-signal after following the verification steps.</verify>
  <done>User types "approved" confirming emerald button visible, dark chat window opens, no console errors.</done>
  <what-built>
    @n8n/chat installed, ChatWidget.tsx and ChatWidgetWrapper.tsx created, HomeClient.tsx updated. Build passes.
  </what-built>
  <how-to-verify>
    1. Run the dev server: cd sitio-g2-nextjs && npm run dev
    2. Open http://localhost:3000 in a browser.
    3. Confirm: An emerald-green chat button (#10b981) appears in the bottom-right corner within 2-3 seconds of page load.
    4. Click the chat button. Confirm: The chat window opens with a dark background (#0a0a0a), not white.
    5. Confirm: The welcome screen shows "Agente g2" as the title and the initial greeting message.
    6. Open browser devtools (Console tab). Confirm: No "window is undefined" errors. No uncaught exceptions from @n8n/chat.
    7. Optional SSR check: In .env.local, temporarily comment out NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL. Restart dev server. Confirm the page still loads normally (no crash), chat button does not appear, and the console shows the [ChatWidget] warning. Restore the env var.
  </how-to-verify>
  <resume-signal>Type "approved" if all checks pass, or describe any issues (wrong color, SSR error, button missing, etc.)</resume-signal>
</task>

</tasks>

<verification>
Run these checks after Task 2 completes, before the checkpoint:

1. Build succeeds:
   cd sitio-g2-nextjs && npm run build

2. Env var referenced (not hardcoded URL):
   grep -n "NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL" sitio-g2-nextjs/src/components/ChatWidget.tsx
   # Must find at least 1 match

3. No hardcoded webhook URL in ChatWidget:
   grep -n "n8n-n8n.ektnbd.easypanel.host" sitio-g2-nextjs/src/components/ChatWidget.tsx
   # Must find 0 matches

4. SSR guard present in wrapper:
   grep -n "ssr.*false" sitio-g2-nextjs/src/components/ChatWidgetWrapper.tsx
   # Must find 1 match

5. HomeClient mounts the wrapper:
   grep -n "ChatWidgetWrapper" sitio-g2-nextjs/src/components/HomeClient.tsx
   # Must find 2 matches (import + JSX usage)
</verification>

<success_criteria>
- npm run build exits 0 (no SSR errors, no TypeScript errors)
- Chat button visible in browser at http://localhost:3000, emerald color (#10b981)
- Chat window background is #0a0a0a when opened
- NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL is the only webhook reference in ChatWidget.tsx
- ChatWidgetWrapper uses dynamic import with ssr: false
- Absent env var: page loads normally, widget silently absent, console warning logged
</success_criteria>

<output>
After completion, create `.planning/phases/04-chat-widget-integration/04-01-SUMMARY.md` following the summary template at @$HOME/.claude/get-shit-done/templates/summary.md.

Key items to capture in the summary:
- @n8n/chat version installed (from package.json after install)
- Any peer dependency warnings observed and how they were resolved
- Confirmation that build passed with SSR errors absent
- The next/dynamic API used (note if it differed from Next.js 13-15 behavior)
</output>
