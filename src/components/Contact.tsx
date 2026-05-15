"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLang } from "@/lib/i18n";
import { Mail } from "lucide-react";
import { GithubIcon, XIcon, TelegramIcon } from "@/components/icons";

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
      initial={false}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function Contact() {
  const { t } = useLang();

  const socials = [
    {
      href: "https://github.com/Anomuru",
      icon: <GithubIcon size={18} />,
      label: "GitHub",
      handle: "@Anomuru",
    },
    {
      href: "https://x.com/Anomuru",
      icon: <XIcon size={18} />,
      label: "X / Twitter",
      handle: "@Anomuru",
    },
    {
      href: "https://t.me/Anomuru",
      icon: <TelegramIcon size={18} />,
      label: "Telegram",
      handle: "@Anomuru",
    },
  ];

  return (
    <section
      id="contact"
      className="py-32"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl">
          <FadeUp>
            <p
              className="font-mono text-xs tracking-widest uppercase mb-3"
              style={{ color: "var(--accent-cyan)" }}
            >
              {t.contact.subtitle}
            </p>
            <h2
              className="text-4xl md:text-5xl font-bold mb-6"
              style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}
            >
              {t.contact.title}
            </h2>
          </FadeUp>

          <FadeUp delay={0.1}>
            <p
              className="text-base leading-relaxed mb-6"
              style={{ color: "var(--text-secondary)" }}
            >
              {t.contact.description}
            </p>
          </FadeUp>

          <FadeUp delay={0.15}>
            <div className="mb-10">
              <p
                className="font-mono text-xs tracking-widest uppercase mb-3"
                style={{ color: "var(--text-muted)" }}
              >
                {t.contact.available_for}
              </p>
              <div className="flex flex-wrap gap-2">
                {t.contact.offers.map((offer) => (
                  <span
                    key={offer}
                    className="rounded-full border px-3 py-1.5 font-mono text-xs"
                    style={{
                      borderColor: "var(--border)",
                      background: "var(--bg-card)",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {offer}
                  </span>
                ))}
              </div>
            </div>
          </FadeUp>

          {/* Email CTA */}
          <FadeUp delay={0.2}>
            <a
              href="mailto:raymuruvsanomuru@gmail.com"
              className="inline-flex items-center gap-3 px-6 py-4 rounded-xl border transition-all duration-300 group mb-12"
              style={{
                borderColor: "var(--border)",
                background: "var(--bg-card)",
                color: "var(--text-secondary)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "var(--border-hover)";
                (e.currentTarget as HTMLElement).style.color =
                  "var(--text-primary)";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 0 24px rgba(0,212,255,0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "var(--border)";
                (e.currentTarget as HTMLElement).style.color =
                  "var(--text-secondary)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              <Mail size={18} style={{ color: "var(--accent-cyan)" }} />
              <div>
                <div className="text-xs font-mono mb-0.5" style={{ color: "var(--text-muted)" }}>
                  {t.contact.email_label}
                </div>
                <div className="text-sm font-medium">
                  raymuruvsanomuru@gmail.com
                </div>
              </div>
            </a>
          </FadeUp>

          {/* Social links */}
          <FadeUp delay={0.3}>
            <p
              className="text-sm mb-5"
              style={{ color: "var(--text-muted)" }}
            >
              {t.contact.or}
            </p>
            <div className="flex flex-wrap gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm transition-all duration-200"
                  style={{
                    borderColor: "var(--border)",
                    color: "var(--text-secondary)",
                    background: "var(--bg-card)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "var(--border-hover)";
                    (e.currentTarget as HTMLElement).style.color =
                      "var(--accent-cyan)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "var(--border)";
                    (e.currentTarget as HTMLElement).style.color =
                      "var(--text-secondary)";
                  }}
                >
                  {social.icon}
                  <span>{social.handle}</span>
                </a>
              ))}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
