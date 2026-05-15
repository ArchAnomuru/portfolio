"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useLang } from "@/lib/i18n";
import {
  Activity,
  ArrowDown,
  Bot,
  Code2,
  Database,
  Mail,
  Sparkles,
} from "lucide-react";
import { GithubIcon, XIcon } from "@/components/icons";
import type { Variants } from "framer-motion";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function Hero() {
  const { t } = useLang();

  const highlights = [
    { label: "AI assistants", value: "Claude API", icon: <Bot size={15} /> },
    { label: "Real-time apps", value: "Socket.io", icon: <Activity size={15} /> },
    { label: "Frontend", value: "React / Next.js", icon: <Code2 size={15} /> },
    { label: "Systems", value: "Python / DB", icon: <Database size={15} /> },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      <div
        className="absolute pointer-events-none"
        style={{
          top: "15%",
          right: "10%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "20%",
          left: "5%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 py-28 md:py-32">
        <motion.div
          variants={container}
          initial={false}
          animate="show"
          className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_420px]"
        >
          <div className="max-w-3xl">
            <motion.div
              variants={item}
              className="mb-8 h-24 w-24 overflow-hidden rounded-2xl border lg:hidden"
              style={{
                borderColor: "var(--border-hover)",
                background: "var(--bg-card)",
                boxShadow: "0 16px 50px rgba(0, 212, 255, 0.12)",
              }}
            >
              <Image
                src="/avatar.png"
                alt="Stylized avatar of Bekhruz Mirkhamidov"
                width={750}
                height={947}
                priority
                sizes="96px"
                className="h-full w-full object-cover"
                style={{ objectPosition: "50% 8%" }}
              />
            </motion.div>

            <motion.p
              variants={item}
              className="font-mono text-sm tracking-widest uppercase mb-6"
              style={{ color: "var(--accent-cyan)" }}
            >
              {t.hero.greeting}
            </motion.p>

            <motion.h1
              variants={item}
              className="font-mono font-bold leading-none mb-2"
              style={{
                fontSize: "clamp(3rem, 6.5vw, 5.75rem)",
                color: "var(--text-primary)",
                letterSpacing: "-0.02em",
              }}
            >
              Bekhruz
            </motion.h1>
            <motion.h1
              variants={item}
              className="font-mono font-bold leading-none mb-8 gradient-text"
              style={{
                fontSize: "clamp(3rem, 6.5vw, 5.75rem)",
                letterSpacing: "-0.02em",
              }}
            >
              Mirkhamidov
            </motion.h1>

            <motion.p
              variants={item}
              className="text-lg md:text-xl font-medium mb-4"
              style={{ color: "var(--text-secondary)" }}
            >
              {t.hero.role}
            </motion.p>

            <motion.p
              variants={item}
              className="text-base md:text-lg max-w-xl mb-12"
              style={{ color: "var(--text-muted)", lineHeight: 1.7 }}
            >
              {t.hero.tagline}
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap gap-4 mb-16">
              <a
                href="#projects"
                className="px-6 py-3 rounded-full font-medium text-sm transition-all duration-200"
                style={{
                  background: "var(--accent-gradient)",
                  color: "#fff",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform =
                    "translateY(-2px)";
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 8px 30px rgba(0,212,255,0.25)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform =
                    "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                {t.hero.cta_projects}
              </a>
              <a
                href="#contact"
                className="px-6 py-3 rounded-full font-medium text-sm border transition-all duration-200"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--text-secondary)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "var(--border-hover)";
                  (e.currentTarget as HTMLElement).style.color =
                    "var(--text-primary)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "var(--border)";
                  (e.currentTarget as HTMLElement).style.color =
                    "var(--text-secondary)";
                }}
              >
                {t.hero.cta_contact}
              </a>
            </motion.div>

            <motion.div variants={item} className="flex items-center gap-5">
              {[
                {
                  href: "https://github.com/Anomuru",
                  icon: <GithubIcon size={18} />,
                  label: "GitHub",
                },
                {
                  href: "https://x.com/Anomuru",
                  icon: <XIcon size={18} />,
                  label: "X / Twitter",
                },
                {
                  href: "mailto:raymuruvsanomuru@gmail.com",
                  icon: <Mail size={18} />,
                  label: "Email",
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="transition-all duration-200"
                  style={{ color: "var(--text-muted)" }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.color =
                      "var(--accent-cyan)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.color =
                      "var(--text-muted)")
                  }
                >
                  {social.icon}
                </a>
              ))}

              <span
                className="font-mono text-xs ml-1"
                style={{ color: "var(--text-muted)" }}
              >
                @Anomuru
              </span>
            </motion.div>
          </div>

          <motion.div variants={item} className="hidden lg:block" aria-hidden="true">
            <div
              className="card-border rounded-2xl p-5"
              style={{
                background:
                  "linear-gradient(180deg, rgba(20,20,26,0.92), rgba(16,16,20,0.78))",
              }}
            >
              <div
                className="relative mb-5 aspect-[4/3] overflow-hidden rounded-xl"
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <Image
                src="/avatar.png"
                alt=""
                fill
                sizes="420px"
                className="object-cover"
                style={{ objectPosition: "50% 10%" }}
              />
                <div
                  className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent, rgba(8,8,10,0.88))",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Sparkles size={16} style={{ color: "var(--accent-cyan)" }} />
                    <span
                      className="font-mono text-xs tracking-widest uppercase"
                      style={{ color: "var(--text-primary)" }}
                    >
                      anomuru
                    </span>
                  </div>
                  <span
                    className="rounded-full px-2 py-1 font-mono text-[10px]"
                    style={{
                      background: "rgba(52, 211, 153, 0.14)",
                      color: "#34d399",
                      border: "1px solid rgba(52, 211, 153, 0.25)",
                    }}
                  >
                    available
                  </span>
                </div>
              </div>

              <div className="mb-4 flex items-center gap-2">
                <Sparkles size={16} style={{ color: "var(--accent-cyan)" }} />
                <span
                  className="font-mono text-xs tracking-widest uppercase"
                  style={{ color: "var(--text-secondary)" }}
                >
                  selected stack
                </span>
              </div>

              <div className="grid gap-3">
                {highlights.map((highlight) => (
                  <div
                    key={highlight.label}
                    className="flex items-center justify-between rounded-xl px-4 py-3"
                    style={{
                      background: "rgba(255,255,255,0.025)",
                      border: "1px solid rgba(255,255,255,0.055)",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span style={{ color: "var(--accent-cyan)" }}>
                        {highlight.icon}
                      </span>
                      <span
                        className="text-sm"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {highlight.label}
                      </span>
                    </div>
                    <span
                      className="font-mono text-xs"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {highlight.value}
                    </span>
                  </div>
                ))}
              </div>

              <div
                className="mt-5 rounded-xl p-4 font-mono text-xs leading-relaxed"
                style={{
                  background: "rgba(8,8,10,0.72)",
                  color: "var(--text-muted)",
                  border: "1px solid rgba(255,255,255,0.055)",
                }}
              >
                <span style={{ color: "var(--accent-cyan)" }}>deploy</span>
                {" portfolio --focus "}
                <span style={{ color: "var(--text-secondary)" }}>
                  ai, dashboards, realtime
                </span>
                <br />
                <span style={{ color: "#34d399" }}>status</span>
                {" ready for remote work"}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={false}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: "var(--text-muted)" }}
      >
        <span className="font-mono text-xs tracking-widest uppercase">
          {t.hero.scroll}
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={14} />
        </motion.div>
      </motion.div>
    </section>
  );
}
