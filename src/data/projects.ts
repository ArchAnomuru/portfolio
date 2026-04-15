export type ProjectCategory = "personal" | "work" | "opensource";

export interface Project {
  id: string;
  title: string;
  description: { en: string; ru: string };
  category: ProjectCategory;
  tags: string[];
  github?: string;
  live?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: "rafael",
    title: "Rafael — AI Assistant",
    description: {
      en: "Personal AI assistant with voice interface, Telegram bot, and web UI. Features persistent categorized memory, web search, file tools, and voice reminders. Powered by Anthropic Claude API.",
      ru: "Персональный AI-ассистент с голосовым интерфейсом, Telegram-ботом и веб-UI. Имеет постоянную память, поиск в интернете и голосовые напоминания. Работает на Anthropic Claude API.",
    },
    category: "personal",
    tags: ["Python", "Claude API", "Telegram", "Flask", "STT/TTS"],
    github: "https://github.com/Anomuru",
    featured: true,
  },
  {
    id: "life-tracking",
    title: "Life Tracking System",
    description: {
      en: "Full-stack productivity app for tracking habits, goals, and daily activities. Real-time sync with Socket.io, Google auth, dark/light themes, and analytics dashboard.",
      ru: "Фулл-стек приложение для отслеживания привычек, целей и ежедневной активности. Синхронизация в реальном времени, Google авторизация и аналитика.",
    },
    category: "personal",
    tags: ["Next.js", "TypeScript", "Socket.io", "Next-Auth", "Zustand"],
    github: "https://github.com/Anomuru/life-tracking-system",
    featured: true,
  },
  {
    id: "mita",
    title: "Mita — AI Character",
    description: {
      en: "An AI character with a unique personality (tsundere cat) built for learning LLM development. Features persistent long-term memory, function calling, and a web chat interface.",
      ru: "AI-персонаж с уникальной личностью (tsundere кошка), созданный для изучения LLM. Постоянная память, вызов функций и веб-чат.",
    },
    category: "personal",
    tags: ["Python", "Groq API", "Flask", "LLM", "Memory System"],
  },
  {
    id: "gennis",
    title: "Gennis Evolution",
    description: {
      en: "Real-time analytics dashboard with interactive charts, live data visualization via Socket.io, GSAP animations, and data export features.",
      ru: "Дашборд аналитики в реальном времени с интерактивными графиками, Socket.io, анимациями GSAP и экспортом данных.",
    },
    category: "work",
    tags: ["React", "Redux", "Socket.io", "Recharts", "GSAP"],
    github: "https://github.com/Anomuru",
    featured: true,
  },
  {
    id: "gennis-management",
    title: "Gennis Management",
    description: {
      en: "Admin dashboard with AI integration built with modern component libraries. Features analytics, dark/light themes, form validation, and Vercel AI SDK integration.",
      ru: "Административный дашборд с ИИ-интеграцией. Аналитика, темы, валидация форм и Vercel AI SDK.",
    },
    category: "work",
    tags: ["Vite", "React", "TypeScript", "shadcn/ui", "Vercel AI SDK"],
    github: "https://github.com/Anomuru/gennis-turon-hub",
  },
  {
    id: "classroom",
    title: "Classroom Platform",
    description: {
      en: "Interactive educational platform with real-time word clouds, math expression editor, media playback, and collaborative classroom features powered by Socket.io.",
      ru: "Интерактивная образовательная платформа с облаками слов, редактором математических выражений и совместной работой через Socket.io.",
    },
    category: "work",
    tags: ["React", "Socket.io", "D3.js", "MathLive", "Redux"],
    github: "https://github.com/DeadMonstr/classroom",
  },
  {
    id: "turon",
    title: "Turon",
    description: {
      en: "Feature-rich web application with advanced drag-and-drop UI, smooth GSAP animations, internationalization (i18next), and image cropping/zoom tools.",
      ru: "Веб-приложение с продвинутым drag-and-drop, анимациями GSAP, интернационализацией и инструментами работы с изображениями.",
    },
    category: "work",
    tags: ["React", "TypeScript", "GSAP", "dnd-kit", "i18next"],
    github: "https://github.com/Anomuru/turon",
  },
  {
    id: "government",
    title: "Government Platform",
    description: {
      en: "Government web application built with Next.js App Router, TypeScript, and Radix UI primitives. Type-safe, accessible, and production-ready.",
      ru: "Государственная веб-платформа на Next.js App Router, TypeScript и Radix UI. Типобезопасная и доступная.",
    },
    category: "work",
    tags: ["Next.js", "TypeScript", "Radix UI", "Tailwind"],
    github: "https://github.com/ArchAnomuru/goverment",
  },
  {
    id: "airi",
    title: "AIRI — Open Source",
    description: {
      en: "Explored AIRI, an open-source LLM-powered virtual character platform inspired by Neuro-sama. Multi-platform framework (Web, Electron desktop, Mobile) for interactive AI characters.",
      ru: "Изучил AIRI — open-source платформу для LLM-персонажей, вдохновлённую Neuro-sama. Мультиплатформенный фреймворк: веб, Electron-десктоп и мобайл.",
    },
    category: "opensource",
    tags: ["Vue 3", "TypeScript", "Electron", "Three.js", "Monorepo"],
    github: "https://github.com/moeru-ai/airi",
    live: "https://airi.moeru.ai",
  },
];
