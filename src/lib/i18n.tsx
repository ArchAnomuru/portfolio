"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useSyncExternalStore,
} from "react";

export type Lang = "en" | "ru";

export const translations = {
  en: {
    nav: {
      about: "About",
      skills: "Skills",
      services: "Services",
      projects: "Projects",
      contact: "Contact",
    },
    hero: {
      greeting: "Hi, I'm",
      role: "AI Integration Developer — Chatbots, RAG & Automation",
      tagline: "I build AI chatbots, RAG assistants, and workflow automations that save teams hours every week — powered by Claude & GPT.",
      cta_projects: "View Projects",
      cta_contact: "Get in Touch",
      scroll: "Scroll to explore",
    },
    about: {
      title: "About Me",
      subtitle: "Who I am",
      bio1: "I'm Bekhruz Mirkhamidov, a full-stack developer with a deep passion for AI integration. I build modern web applications and explore how artificial intelligence can enhance user experiences.",
      bio2: "From crafting real-time analytics dashboards to building conversational AI assistants with voice interfaces, I love turning complex ideas into elegant, working solutions.",
      bio3: "I help businesses ship AI that works: chatbots and RAG assistants over their own data, LLM features wired into existing products, and automations that remove repetitive manual work.",
      based: "Based in",
      location: "Uzbekistan",
      open: "Open to",
      work: "Remote opportunities",
    },
    skills: {
      title: "Skills",
      subtitle: "Tech I work with",
      categories: {
        frontend: "Frontend",
        backend: "Backend",
        ai: "AI & ML",
        tools: "Tools & Infra",
      },
    },
    services: {
      title: "Services",
      subtitle: "How I can help",
      timeline_label: "Typical delivery",
      cta: "Discuss this",
      items: {
        chatbot: {
          title: "AI Chatbot & RAG Assistant",
          desc: "A chatbot that answers from your own data — docs, website, or knowledge base — instead of generic replies.",
          timeline: "3–7 days",
          points: [
            "Retrieval over your documents (RAG)",
            "Embeddable web widget or Telegram bot",
            "Conversation memory & web search",
          ],
          tags: ["Claude / GPT", "RAG", "Vector search", "Widget"],
        },
        automation: {
          title: "Workflow Automation",
          desc: "Connect your tools and let AI handle the repetitive work — so your team stops doing it by hand.",
          timeline: "2–5 days",
          points: [
            "Lead capture, data entry, reports, alerts",
            "AI step in the middle (classify, summarize, draft)",
            "Built on n8n / Make + your APIs",
          ],
          tags: ["n8n / Make", "APIs", "Webhooks", "Scheduling"],
        },
        integration: {
          title: "LLM Feature Integration",
          desc: "Add AI into your existing product — wired into your stack with proper error handling, not a fragile demo.",
          timeline: "4–10 days",
          points: [
            "Summarize, classify, extract, generate",
            "Function calling & streaming responses",
            "Type-safe, tested, production-ready",
          ],
          tags: ["Claude / GPT API", "Function calling", "Streaming", "TS / Python"],
        },
      },
    },
    projects: {
      title: "Projects",
      subtitle: "Things I've built",
      filters: {
        all: "All",
        personal: "Personal",
        work: "Work",
        opensource: "Open Source",
      },
      github: "GitHub",
      live: "Live",
      private: "Private",
    },
    contact: {
      title: "Let's Talk",
      subtitle: "Get in touch",
      description: "Have a project in mind or just want to chat about AI and tech? I'm always open to interesting conversations.",
      available_for: "Available for",
      offers: ["AI chatbots & RAG", "Workflow automation", "Full-stack apps"],
      email_label: "Email me",
      or: "or find me on",
    },
    footer: {
      built: "Built with",
      by: "by Bekhruz Mirkhamidov",
    },
  },
  ru: {
    nav: {
      about: "Обо мне",
      skills: "Навыки",
      services: "Услуги",
      projects: "Проекты",
      contact: "Контакт",
    },
    hero: {
      greeting: "Привет, я",
      role: "AI-разработчик — чат-боты, RAG и автоматизация",
      tagline: "Создаю AI чат-ботов, RAG-ассистентов и автоматизации, которые экономят командам часы каждую неделю — на Claude и GPT.",
      cta_projects: "Проекты",
      cta_contact: "Связаться",
      scroll: "Листай ниже",
    },
    about: {
      title: "Обо мне",
      subtitle: "Кто я",
      bio1: "Я Бехруз Миркхамидов, фулл-стек разработчик с глубоким интересом к интеграции ИИ. Создаю современные веб-приложения и исследую, как искусственный интеллект может улучшить пользовательский опыт.",
      bio2: "От дашбордов аналитики в реальном времени до голосовых AI-ассистентов — мне нравится превращать сложные идеи в элегантные рабочие решения.",
      bio3: "Помогаю бизнесу внедрять работающий AI: чат-боты и RAG-ассистенты по их собственным данным, LLM-функции внутри существующих продуктов и автоматизации, убирающие рутинную ручную работу.",
      based: "Локация",
      location: "Узбекистан",
      open: "Открыт к",
      work: "Удалённой работе",
    },
    skills: {
      title: "Навыки",
      subtitle: "Технологии, с которыми работаю",
      categories: {
        frontend: "Фронтенд",
        backend: "Бэкенд",
        ai: "ИИ и ML",
        tools: "Инструменты",
      },
    },
    services: {
      title: "Услуги",
      subtitle: "Чем могу помочь",
      timeline_label: "Срок обычно",
      cta: "Обсудить",
      items: {
        chatbot: {
          title: "AI чат-бот и RAG-ассистент",
          desc: "Чат-бот, который отвечает по вашим данным — документам, сайту или базе знаний, а не общими фразами.",
          timeline: "3–7 дней",
          points: [
            "Поиск по вашим документам (RAG)",
            "Виджет на сайт или Telegram-бот",
            "Память диалога и поиск в интернете",
          ],
          tags: ["Claude / GPT", "RAG", "Векторный поиск", "Виджет"],
        },
        automation: {
          title: "Автоматизация процессов",
          desc: "Соединяю ваши сервисы и поручаю рутину AI — чтобы команда перестала делать это руками.",
          timeline: "2–5 дней",
          points: [
            "Лиды, ввод данных, отчёты, уведомления",
            "AI-шаг внутри (классификация, саммари, черновик)",
            "На n8n / Make + ваши API",
          ],
          tags: ["n8n / Make", "API", "Webhooks", "Расписания"],
        },
        integration: {
          title: "Внедрение LLM в продукт",
          desc: "Добавляю AI в ваш существующий продукт — встроено в стек с нормальной обработкой ошибок, не хрупкое демо.",
          timeline: "4–10 дней",
          points: [
            "Саммари, классификация, извлечение, генерация",
            "Function calling и стриминг ответов",
            "Типобезопасно, с тестами, production-ready",
          ],
          tags: ["Claude / GPT API", "Function calling", "Стриминг", "TS / Python"],
        },
      },
    },
    projects: {
      title: "Проекты",
      subtitle: "Что я создал",
      filters: {
        all: "Все",
        personal: "Личные",
        work: "Рабочие",
        opensource: "Open Source",
      },
      github: "GitHub",
      live: "Демо",
      private: "Приватный",
    },
    contact: {
      title: "Поговорим",
      subtitle: "Связаться",
      description: "Есть идея проекта или просто хочешь обсудить ИИ и технологии? Всегда рад интересным разговорам.",
      available_for: "Могу помочь с",
      offers: ["AI чат-ботами и RAG", "Автоматизацией процессов", "Full-stack приложениями"],
      email_label: "Написать на email",
      or: "или найди меня в",
    },
    footer: {
      built: "Сделано с",
      by: "Бехрузом Миркхамидовым",
    },
  },
} as const;

type Translations = typeof translations.en;
const languageStorageKey = "portfolio-lang";
const languageChangeEvent = "portfolio-language-change";

function getStoredLang(): Lang {
  if (typeof window === "undefined") {
    return "en";
  }

  const stored = window.localStorage.getItem(languageStorageKey);
  return stored === "en" || stored === "ru" ? stored : "en";
}

function subscribeToLangChange(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(languageChangeEvent, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(languageChangeEvent, callback);
  };
}

const LanguageContext = createContext<{
  lang: Lang;
  t: Translations;
  toggle: () => void;
}>({
  lang: "en",
  t: translations.en,
  toggle: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const lang = useSyncExternalStore<Lang>(
    subscribeToLangChange,
    getStoredLang,
    () => "en",
  );

  const toggle = () => {
    const next = lang === "en" ? "ru" : "en";
    window.localStorage.setItem(languageStorageKey, next);
    window.dispatchEvent(new Event(languageChangeEvent));
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = translations[lang] as unknown as Translations;
  return (
    <LanguageContext.Provider value={{ lang, t, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
