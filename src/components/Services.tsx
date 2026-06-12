"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLang } from "@/lib/i18n";
import { Bot, Workflow, Blocks, Check, ArrowRight, Clock } from "lucide-react";

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

type ServiceId = "chatbot" | "automation" | "integration";

interface ServiceMeta {
  id: ServiceId;
  accent: string;
  Icon: typeof Bot;
}

const services: ServiceMeta[] = [
  { id: "chatbot", accent: "var(--accent-cyan)", Icon: Bot },
  { id: "automation", accent: "#34d399", Icon: Workflow },
  { id: "integration", accent: "var(--accent-purple)", Icon: Blocks },
];

export default function Services() {
  const { t } = useLang();

  return (
    <section
      id="services"
      className="py-32"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp>
          <p
            className="font-mono text-xs tracking-widest uppercase mb-3"
            style={{ color: "var(--accent-cyan)" }}
          >
            {t.services.subtitle}
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold mb-16"
            style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}
          >
            {t.services.title}
          </h2>
        </FadeUp>

        <div className="grid md:grid-cols-3 gap-5">
          {services.map((service, si) => {
            const data = t.services.items[service.id];
            return (
              <FadeUp key={service.id} delay={si * 0.1}>
                <div
                  className="rounded-2xl p-6 card-border flex flex-col h-full"
                  style={{ background: "var(--bg-card)" }}
                >
                  {/* Icon */}
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                    style={{
                      background: service.accent + "14",
                      color: service.accent,
                    }}
                  >
                    <service.Icon size={22} />
                  </div>

                  {/* Title + description */}
                  <h3
                    className="text-lg font-bold mb-2"
                    style={{
                      color: "var(--text-primary)",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {data.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed mb-5"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {data.desc}
                  </p>

                  {/* What you get */}
                  <ul className="space-y-2.5 mb-6 flex-1">
                    {data.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2.5 text-sm"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        <Check
                          size={16}
                          className="mt-0.5 shrink-0"
                          style={{ color: service.accent }}
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {data.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-xs px-2 py-1 rounded"
                        style={{
                          background: "var(--bg-surface)",
                          color: "var(--text-muted)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer: timeline + CTA */}
                  <div
                    className="pt-4"
                    style={{ borderTop: "1px solid var(--border)" }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className="flex items-center gap-1.5 text-xs"
                        style={{ color: "var(--text-muted)" }}
                      >
                        <Clock size={13} />
                        {t.services.timeline_label}
                      </span>
                      <span
                        className="font-mono text-xs font-semibold"
                        style={{ color: service.accent }}
                      >
                        {data.timeline}
                      </span>
                    </div>
                    <a
                      href="#contact"
                      className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-lg text-sm font-medium border transition-all duration-200"
                      style={{
                        borderColor: "var(--border)",
                        color: "var(--text-secondary)",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor =
                          service.accent + "55";
                        (e.currentTarget as HTMLElement).style.color =
                          service.accent;
                        (e.currentTarget as HTMLElement).style.background =
                          service.accent + "0d";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor =
                          "var(--border)";
                        (e.currentTarget as HTMLElement).style.color =
                          "var(--text-secondary)";
                        (e.currentTarget as HTMLElement).style.background =
                          "transparent";
                      }}
                    >
                      {t.services.cta}
                      <ArrowRight size={15} />
                    </a>
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
