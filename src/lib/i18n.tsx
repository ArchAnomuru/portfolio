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
