"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLang } from "@/lib/i18n";

function FadeUp({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

interface SkillGroup {
  labelKey: keyof ReturnType<typeof useLang>["t"]["skills"]["categories"];
  accent: string;
  items: string[];
}

const skillGroups: SkillGroup[] = [
  {
    labelKey: "frontend",
    accent: "var(--accent-cyan)",
    items: [
      "React",
      "Next.js",
      "Vue 3",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "GSAP",
      "Redux Toolkit",
    ],
  },
  {
    labelKey: "backend",
    accent: "var(--accent-purple)",
    items: [
      "Python",
      "Flask",
      "Node.js",
      "Socket.io",
      "REST APIs",
      "PostgreSQL",
    ],
  },
  {
    labelKey: "ai",
    accent: "#f59e0b",
    items: [
      "Anthropic Claude",
      "Groq / LLaMA",
      "LLM Integration",
      "Function Calling",
      "Memory Systems",
      "Vercel AI SDK",
      "RAG Patterns",
    ],
  },
  {
    labelKey: "tools",
    accent: "#34d399",
    items: [
      "Vite",
      "Electron",
      "Docker",
      "Vercel",
      "Git",
      "pnpm",
      "Capacitor",
      "Systemd",
    ],
  },
];

function SkillTag({ label, accent }: { label: string; accent: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  return (
    <span
      ref={ref}
      className="px-3 py-1.5 rounded-full text-xs font-mono border transition-all duration-200 cursor-default"
      style={{
        borderColor: "var(--border)",
        color: "var(--text-secondary)",
        background: "var(--bg-card)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = accent + "55";
        (e.currentTarget as HTMLElement).style.color = accent;
        (e.currentTarget as HTMLElement).style.background = accent + "0d";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
        (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
        (e.currentTarget as HTMLElement).style.background = "var(--bg-card)";
      }}
    >
      {label}
    </span>
  );
}

export default function Skills() {
  const { t } = useLang();

  return (
    <section
      id="skills"
      className="py-32"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp>
          <p
            className="font-mono text-xs tracking-widest uppercase mb-3"
            style={{ color: "var(--accent-cyan)" }}
          >
            {t.skills.subtitle}
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold mb-16"
            style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}
          >
            {t.skills.title}
          </h2>
        </FadeUp>

        <div className="grid md:grid-cols-2 gap-6">
          {skillGroups.map((group, gi) => (
            <FadeUp key={group.labelKey} delay={gi * 0.1}>
              <div
                className="rounded-2xl p-6 card-border"
                style={{ background: "var(--bg-card)" }}
              >
                <div className="flex items-center gap-2 mb-5">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: group.accent }}
                  />
                  <span
                    className="font-mono text-xs tracking-widest uppercase font-semibold"
                    style={{ color: group.accent }}
                  >
                    {t.skills.categories[group.labelKey]}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <SkillTag key={skill} label={skill} accent={group.accent} />
                  ))}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
