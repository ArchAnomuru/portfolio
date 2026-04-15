"use client";

import { motion } from "framer-motion";
import { useLang } from "@/lib/i18n";
import { Mail, ArrowDown } from "lucide-react";
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

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Background orbs */}
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

      <div className="relative max-w-6xl mx-auto px-6 py-32">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-3xl"
        >
          {/* Greeting */}
          <motion.p
            variants={item}
            className="font-mono text-sm tracking-widest uppercase mb-6"
            style={{ color: "var(--accent-cyan)" }}
          >
            {t.hero.greeting}
          </motion.p>

          {/* Name */}
          <motion.h1
            variants={item}
            className="font-mono font-bold leading-none mb-2"
            style={{
              fontSize: "clamp(3rem, 8vw, 7rem)",
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
              fontSize: "clamp(3rem, 8vw, 7rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Mirkhamidov
          </motion.h1>

          {/* Role */}
          <motion.p
            variants={item}
            className="text-lg md:text-xl font-medium mb-4"
            style={{ color: "var(--text-secondary)" }}
          >
            {t.hero.role}
          </motion.p>

          {/* Tagline */}
          <motion.p
            variants={item}
            className="text-base md:text-lg max-w-xl mb-12"
            style={{ color: "var(--text-muted)", lineHeight: 1.7 }}
          >
            {t.hero.tagline}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={item}
            className="flex flex-wrap gap-4 mb-16"
          >
            <a
              href="#projects"
              className="px-6 py-3 rounded-full font-medium text-sm transition-all duration-200"
              style={{
                background: "var(--accent-gradient)",
                color: "#fff",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 8px 30px rgba(0,212,255,0.25)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
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

          {/* Social links */}
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
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
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
