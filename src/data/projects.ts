export type ProjectCategory = "personal" | "work" | "opensource";
export type ProjectStatus = "live" | "wip" | "archived";

export interface LocalizedText {
  en: string;
  ru: string;
}

export interface LocalizedList {
  en: string[];
  ru: string[];
}

export interface Shot {
  /** Path under /public. Screenshots live in /public/projects. */
  src: string;
  caption: LocalizedText;
}

export interface Project {
  id: string;
  title: string;
  /** One line: what the thing actually is. Shown under the title. */
  subtitle: LocalizedText;
  description: LocalizedText;
  /** Concrete things built. 2–4 items reads best. */
  highlights?: LocalizedList;
  role?: LocalizedText;
  /** Human-readable span, e.g. "2025 — now". */
  period?: string;
  category: ProjectCategory;
  status: ProjectStatus;
  /** Ordered by importance — the card shows the first few, rest collapse. */
  stack: string[];
  github?: string;
  live?: string;
  /** Featured projects get the wide screenshot layout. */
  featured?: boolean;
  /** Drop screenshots into /public/projects/ — see the README there. */
  shots?: Shot[];
}

export const projects: Project[] = [
  {
    id: "gennis-v2",
    title: "Gennis V2",
    subtitle: {
      en: "SaaS panel for an education holding — rebuilt from scratch",
      ru: "SaaS-панель образовательного холдинга — переписана с нуля",
    },
    description: {
      en: "Migration of a live CRA/Redux product to a typed monorepo: FastAPI async backend over three PostgreSQL databases and a React 19 SPA on feature-sliced architecture. Built to plug into the Gennis Management hub so branch accounting flows into one place.",
      ru: "Миграция работающего продукта с CRA/Redux на типизированное монорепо: async-бэкенд на FastAPI поверх трёх баз PostgreSQL и SPA на React 19 с feature-sliced архитектурой. Строится так, чтобы подключаться к хабу Gennis Management — бухгалтерия филиалов стекается в одно место.",
    },
    highlights: {
      en: [
        "Three-database access layer: own DB read-write, two legacy DBs read-only",
        "Turborepo + pnpm workspaces with a shared types package",
        "Strict mypy on the backend, zero-warning ESLint on the frontend",
      ],
      ru: [
        "Слой доступа к трём БД: своя на чтение-запись, две legacy — только чтение",
        "Turborepo + pnpm-воркспейсы с общим пакетом типов",
        "Строгий mypy на бэкенде, ESLint без единого варнинга на фронте",
      ],
    },
    role: {
      en: "Frontend architecture + backend modules",
      ru: "Архитектура фронтенда + модули бэкенда",
    },
    period: "2026 — now",
    category: "work",
    status: "wip",
    stack: [
      "React 19",
      "TypeScript",
      "TanStack Router",
      "TanStack Query",
      "Zustand",
      "Tailwind v4",
      "FastAPI",
      "SQLAlchemy 2 async",
      "PostgreSQL",
      "Alembic",
      "Turborepo",
      "Docker",
    ],
    featured: true,
  },
  {
    id: "gennis-management",
    title: "Gennis Management",
    subtitle: {
      en: "Central hub: accounting, tasks and a voice AI operator",
      ru: "Центральный хаб: бухгалтерия, задачи и голосовой AI-оператор",
    },
    description: {
      en: "The control room for the whole business — branch accounting, school ERP, staff and a task system. Its AI layer picks the right assignee for a task, and a realtime voice assistant creates tasks straight from speech over a WebSocket audio stream.",
      ru: "Центр управления всем бизнесом — бухгалтерия филиалов, школьный ERP, персонал и система задач. ИИ-слой подбирает подходящего исполнителя под задачу, а голосовой ассистент реального времени создаёт задачи прямо с речи через WebSocket-стрим аудио.",
    },
    highlights: {
      en: [
        "Realtime voice assistant — PCM16 mic streaming, OpenAI Realtime & Gemini modes",
        "AI executor suggestion for incoming tasks",
        "Consolidated P&L: Gennis and Turon side by side, then per branch",
        "Separate accounting for the holding itself and for each connected system",
        "Telegram bot for notifications with account linking",
        "Covered by Vitest unit tests and Playwright E2E",
      ],
      ru: [
        "Голосовой ассистент реального времени — стрим PCM16 с микрофона, режимы OpenAI Realtime и Gemini",
        "ИИ-подбор исполнителя под входящую задачу",
        "Сводный P&L: Gennis и Turon рядом, ниже разбивка по филиалам",
        "Раздельная бухгалтерия — у самого холдинга и у каждой подключённой системы",
        "Telegram-бот уведомлений с привязкой аккаунта",
        "Покрыт юнит-тестами Vitest и E2E на Playwright",
      ],
    },
    role: {
      en: "Lead developer",
      ru: "Ведущий разработчик",
    },
    period: "2025 — now",
    category: "work",
    status: "live",
    stack: [
      "React",
      "TypeScript",
      "Vite",
      "shadcn/ui",
      "Radix UI",
      "Tailwind",
      "TanStack Query",
      "TanStack Table",
      "Zod",
      "WebSocket",
      "OpenAI Realtime",
      "Gemini",
      "Supabase",
      "Playwright",
      "Vitest",
    ],
    github: "https://github.com/Anomuru/gennis-turon-hub",
    featured: true,
    shots: [
      {
        src: "/projects/management-dashboard.webp",
        caption: {
          en: "Dashboard — Gennis and Turon side by side, then a P&L breakdown per branch",
          ru: "Дашборд — Gennis и Turon рядом, ниже разбивка прибыли и убытков по филиалам",
        },
      },
      {
        src: "/projects/management-voice.webp",
        caption: {
          en: "Live voice assistant listening, over the systems settings screen",
          ru: "Голосовой ассистент в режиме прослушивания поверх экрана настроек систем",
        },
      },
      {
        src: "/projects/management-tasks.webp",
        caption: {
          en: "Shared task board across Gennis and Turon — department, assignee, deadline, status",
          ru: "Общая доска задач по Gennis и Turon — отдел, исполнитель, срок, статус",
        },
      },
      {
        src: "/projects/management-payroll.webp",
        caption: {
          en: "Payroll inside the accounting module — issued and outstanding salaries by month",
          ru: "Зарплаты внутри модуля бухгалтерии — выплаченное и остаток по месяцам",
        },
      },
    ],
  },
  {
    id: "yoshlar-agentligi",
    title: "Yoshlar Agentligi",
    subtitle: {
      en: "Monitoring CRM for a youth agency across 14 districts",
      ru: "CRM мониторинга для агентства по делам молодёжи, 14 районов",
    },
    description: {
      en: "Case-management and monitoring system for a state youth agency working with at-risk teenagers across Tashkent region. Every screen is gated by role: eight of them, three seeing all districts and five scoped to their own. AI drafts an individual three-month plan for a young person — activities, stages, expected outcomes — which a responsible officer edits, and which then goes through an approval queue before any work starts.",
      ru: "Система ведения дел и мониторинга для государственного агентства по делам молодёжи, работающего с подростками в трудной ситуации по Ташкентской области. Каждый экран закрыт ролью: их восемь — три видят все районы, пять ограничены своим. ИИ составляет для подростка индивидуальный трёхмесячный план — активности, этапы, ожидаемые результаты — ответственный правит его, и дальше план идёт через очередь согласования, до которой работа не начинается.",
    },
    highlights: {
      en: [
        "AI plan generation: activities with frequency and responsible specialist, week-by-week stages, expected outcomes",
        "Approval queue for plans and meetings — pending, approved, rejected, with PDF export",
        "Eight roles: admin, direktor and moderator see every district; tuman admin, organisation director, responsible officer, district official and district hokim are scoped to theirs",
        "Meeting scheduling with attendance tracking — held, scheduled, no-show",
        "District monitoring with maps, KPI ratings and an AI insights panel",
      ],
      ru: [
        "Генерация плана ИИ: активности с частотой и ответственным специалистом, этапы по неделям, ожидаемые результаты",
        "Очередь согласования планов и встреч — на рассмотрении, утверждено, отклонено, с выгрузкой в PDF",
        "Восемь ролей: admin, direktor и moderator видят все районы; tuman admin, директор организации, ответственный сотрудник, районный чиновник и хоким района — только свой",
        "Планирование встреч с учётом явки — проведена, запланирована, не пришёл",
        "Мониторинг районов с картами, KPI-рейтингами и панелью AI-инсайтов",
      ],
    },
    role: {
      en: "Full-stack, team of three",
      ru: "Full-stack, команда из трёх человек",
    },
    period: "2026 — now",
    category: "work",
    status: "wip",
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Vercel AI SDK",
      "TanStack Query",
      "Tailwind",
      "Leaflet",
      "FastAPI",
      "SQLAlchemy 2 async",
      "PostgreSQL",
      "Redis",
      "Alembic",
      "pytest",
      "Docker",
    ],
    featured: true,
  },
  {
    id: "rafael",
    title: "Rafael — AI Assistant",
    subtitle: {
      en: "Personal AI agent with a persona, memory and desktop control",
      ru: "Личный AI-агент с характером, памятью и управлением рабочим столом",
    },
    description: {
      en: "An assistant that takes voice or text and acts: searches the web, works with files, tracks finances and habits, sets reminders, and remembers context across sessions through a categorized long-term memory with semantic retrieval. Runs as a terminal app, a Telegram bot, a web panel and a systemd service.",
      ru: "Ассистент, который принимает голос или текст и действует: ищет в интернете, работает с файлами, ведёт финансы и привычки, ставит напоминания и помнит контекст между сессиями через категоризированную долгосрочную память с семантическим поиском. Работает как терминальное приложение, Telegram-бот, веб-панель и systemd-сервис.",
    },
    highlights: {
      en: [
        "One LLM layer over Anthropic Claude and Groq, switchable by env",
        "Tool calling across files, finances, memory, web search and day review",
        "Semantic memory retrieval with fastembed embeddings",
        "Voice loop: faster-whisper STT, ElevenLabs / gTTS TTS",
        "Desktop automation for Hyprland, including a vision layer",
      ],
      ru: [
        "Единый LLM-слой над Anthropic Claude и Groq, переключается через env",
        "Tool calling по файлам, финансам, памяти, веб-поиску и обзору дня",
        "Семантический поиск по памяти на эмбеддингах fastembed",
        "Голосовой контур: STT на faster-whisper, TTS на ElevenLabs / gTTS",
        "Автоматизация рабочего стола под Hyprland, включая vision-слой",
      ],
    },
    role: {
      en: "Solo project",
      ru: "Личный проект",
    },
    period: "2026 — now",
    category: "personal",
    status: "live",
    stack: [
      "Python",
      "Claude API",
      "Groq",
      "Tool calling",
      "fastembed",
      "Flask",
      "python-telegram-bot",
      "faster-whisper",
      "ElevenLabs",
      "systemd",
      "pytest",
    ],
    github: "https://github.com/Anomuru",
    featured: true,
    shots: [
      {
        src: "/rafael-assistant.png",
        caption: {
          en: "Rafael answering in the terminal interface",
          ru: "Рафаэль отвечает в терминальном интерфейсе",
        },
      },
    ],
  },
  {
    id: "turon",
    title: "Turon",
    subtitle: {
      en: "School management platform for a private education network",
      ru: "Платформа управления школами частной образовательной сети",
    },
    description: {
      en: "Production platform for schools: students, teachers, timetables, lesson plans and reporting. Drag-and-drop schedule building, GSAP motion, and full i18n — now being connected into the Gennis Management hub.",
      ru: "Продакшн-платформа для школ: ученики, учителя, расписания, планы уроков и отчётность. Сборка расписания через drag-and-drop, анимации GSAP и полная локализация — сейчас подключается к хабу Gennis Management.",
    },
    highlights: {
      en: [
        "Drag-and-drop timetable builder on dnd-kit",
        "Multi-branch deployments — Chirchiq, Chorvoq, Sergeli",
        "Excel-driven lesson-plan import",
      ],
      ru: [
        "Конструктор расписаний drag-and-drop на dnd-kit",
        "Развёртывания на несколько филиалов — Чирчик, Чорвок, Сергели",
        "Импорт планов уроков из Excel",
      ],
    },
    role: {
      en: "Frontend developer",
      ru: "Фронтенд-разработчик",
    },
    period: "2025 — now",
    category: "work",
    status: "live",
    stack: [
      "React",
      "Vite",
      "Redux Toolkit",
      "Ant Design",
      "dnd-kit",
      "GSAP",
      "i18next",
      "Recharts",
      "SCSS",
    ],
    github: "https://github.com/Anomuru/turon",
  },
  {
    id: "gennis",
    title: "Gennis Evolution",
    subtitle: {
      en: "Education-centre platform running a holding day to day",
      ru: "Платформа учебного центра, на которой холдинг работает каждый день",
    },
    description: {
      en: "The v1 product the business actually runs on: a CRM that queues calls to debtors, new students and inbound leads; accounting covering every money movement from staff salaries to student payments; groups with timetables, lesson plans and attendance; and a reporting dashboard on top. Two years of production traffic, now migrating into Gennis V2.",
      ru: "Продукт v1, на котором реально работает бизнес: CRM с очередями звонков должникам, новым студентам и входящим лидам; бухгалтерия со всеми движениями денег — от зарплат сотрудников до оплат студентов; группы с расписанием, планами уроков и посещаемостью; и отчётный дашборд поверх всего. Два года продакшн-нагрузки, сейчас мигрирует в Gennis V2.",
    },
    highlights: {
      en: [
        "CRM call queues split by debtors, new students and leads, with call outcomes tracked",
        "Accounting across 13 payment categories — tuition, books, salaries, dividends, capital costs",
        "Group profiles with timetable, attendance grid, lesson plans and observed lessons",
        "400+ commits in a shared four-developer codebase",
      ],
      ru: [
        "Очереди звонков в CRM по должникам, новым студентам и лидам с фиксацией результата звонка",
        "Бухгалтерия по 13 категориям платежей — обучение, книги, зарплаты, дивиденды, капзатраты",
        "Профиль группы: расписание, сетка посещаемости, планы уроков и наблюдаемые занятия",
        "400+ коммитов в общей кодовой базе на четверых",
      ],
    },
    role: {
      en: "Frontend developer",
      ru: "Фронтенд-разработчик",
    },
    period: "2024 — now",
    category: "work",
    status: "live",
    stack: [
      "React",
      "Redux Toolkit",
      "Socket.io",
      "Recharts",
      "CanvasJS",
      "GSAP",
      "Framer Motion",
      "SCSS",
    ],
    github: "https://github.com/Anomuru/gennis",
    featured: true,
    shots: [
      {
        src: "/projects/gennis-dashboard.webp",
        caption: {
          en: "Reporting dashboard — balances, new groups and inbound leads over a date range",
          ru: "Отчётный дашборд — балансы, новые группы и входящие лиды за период",
        },
      },
      {
        src: "/projects/gennis-crm.webp",
        caption: {
          en: "CRM call queue — debtors, new students and leads with per-card call status",
          ru: "Очередь звонков в CRM — должники, новые студенты и лиды со статусом звонка",
        },
      },
      {
        src: "/projects/gennis-accounting.webp",
        caption: {
          en: "Accounting — payments by category, cash / click / bank split, filters and reports",
          ru: "Бухгалтерия — платежи по категориям, разбивка cash / click / банк, фильтры и отчёты",
        },
      },
      {
        src: "/projects/gennis-group.webp",
        caption: {
          en: "Group profile — course settings, teacher share and the student roster with balances",
          ru: "Профиль группы — настройки курса, доля преподавателя и список студентов с балансами",
        },
      },
      {
        src: "/projects/gennis-group-menu.webp",
        caption: {
          en: "Group tools — timetable, attendance, lesson plans, lesson observation and tests",
          ru: "Инструменты группы — расписание, посещаемость, планы уроков, наблюдение занятий и тесты",
        },
      },
      {
        src: "/projects/gennis-attendance.webp",
        caption: {
          en: "Attendance grid for a group, month by month",
          ru: "Сетка посещаемости группы по месяцам",
        },
      },
    ],
  },
  {
    id: "classroom",
    title: "Classroom Platform",
    subtitle: {
      en: "Interactive lesson platform with a live collaborative board",
      ru: "Интерактивная платформа уроков с живой совместной доской",
    },
    description: {
      en: "Student-facing classroom tooling built around Socket.io: live word clouds rendered with D3, a math expression editor, a Lexical rich-text editor and media playback. Retired after the client moved to a platform built by another team.",
      ru: "Учебный инструментарий для студентов вокруг Socket.io: живые облака слов на D3, редактор математических выражений, rich-text редактор на Lexical и проигрывание медиа. Выведен из эксплуатации после перехода заказчика на платформу другой команды.",
    },
    highlights: {
      en: [
        "Realtime D3 word clouds fed by student input",
        "MathLive expression editor for maths lessons",
      ],
      ru: [
        "Живые облака слов на D3 по вводу студентов",
        "Редактор выражений MathLive для уроков математики",
      ],
    },
    role: {
      en: "Frontend developer",
      ru: "Фронтенд-разработчик",
    },
    period: "2024 — 2025",
    category: "work",
    status: "archived",
    stack: [
      "React",
      "Socket.io",
      "D3.js",
      "MathLive",
      "Lexical",
      "Redux Toolkit",
      "dnd-kit",
    ],
    github: "https://github.com/DeadMonstr/classroom",
  },
  {
    id: "life-tracking",
    title: "Life Tracking System",
    subtitle: {
      en: "Habits, goals and daily activity in one dashboard",
      ru: "Привычки, цели и ежедневная активность в одном дашборде",
    },
    description: {
      en: "Full-stack productivity app for tracking habits, goals and daily activity, with realtime sync over Socket.io, Google auth and an analytics dashboard.",
      ru: "Full-stack приложение для отслеживания привычек, целей и ежедневной активности — синхронизация в реальном времени через Socket.io, вход через Google и аналитика.",
    },
    role: {
      en: "Solo project",
      ru: "Личный проект",
    },
    period: "2025",
    category: "personal",
    status: "live",
    stack: ["Next.js", "TypeScript", "Socket.io", "NextAuth", "Zustand"],
    github: "https://github.com/Anomuru/life-tracking-system",
  },
  {
    id: "mita",
    title: "Mita — AI Character",
    subtitle: {
      en: "Conversational AI with a consistent persona",
      ru: "Разговорный AI с устойчивой личностью",
    },
    description: {
      en: "A chatbot built around the pieces production assistants actually need: a persona that stays consistent, long-term memory across sessions, tool calling and a web chat interface.",
      ru: "Чат-бот, собранный вокруг того, что реально нужно продакшн-ассистентам: устойчивая личность, долгосрочная память между сессиями, вызов инструментов и веб-чат.",
    },
    role: {
      en: "Solo project",
      ru: "Личный проект",
    },
    period: "2025",
    category: "personal",
    status: "live",
    stack: ["Python", "Groq API", "Flask", "Memory system"],
  },
  {
    id: "government",
    title: "Government Platform",
    subtitle: {
      en: "Public-sector web platform",
      ru: "Веб-платформа для госсектора",
    },
    description: {
      en: "Government web application on the Next.js App Router with TypeScript and Radix UI primitives — typed, accessible and production-ready.",
      ru: "Государственное веб-приложение на Next.js App Router с TypeScript и примитивами Radix UI — типизированное, доступное и готовое к продакшену.",
    },
    role: {
      en: "Frontend developer",
      ru: "Фронтенд-разработчик",
    },
    period: "2025",
    category: "work",
    status: "live",
    stack: ["Next.js", "TypeScript", "Radix UI", "Tailwind"],
    github: "https://github.com/ArchAnomuru/goverment",
  },
  {
    id: "airi",
    title: "AIRI",
    subtitle: {
      en: "Open-source platform for LLM-driven virtual characters",
      ru: "Open-source платформа для LLM-персонажей",
    },
    description: {
      en: "Studied AIRI — an open-source framework for interactive AI characters inspired by Neuro-sama, shipping to web, Electron desktop and mobile from one monorepo. A reference point for how a multi-platform LLM character stack is put together.",
      ru: "Изучал AIRI — open-source фреймворк для интерактивных AI-персонажей, вдохновлённый Neuro-sama, с выпуском в веб, Electron-десктоп и мобайл из одного монорепо. Ориентир в том, как устроен мультиплатформенный стек LLM-персонажа.",
    },
    period: "2025",
    category: "opensource",
    status: "live",
    stack: ["Vue 3", "TypeScript", "Electron", "Three.js", "Monorepo"],
    github: "https://github.com/moeru-ai/airi",
    live: "https://airi.moeru.ai",
  },
];
