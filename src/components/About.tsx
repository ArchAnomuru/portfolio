"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { Fragment, useRef } from "react";
import { useLang } from "@/lib/i18n";
import { MapPin, Briefcase } from "lucide-react";

const profileRows = [
  ["name", "Bekhruz Mirkhamidov"],
  ["role", "Full-Stack Dev"],
  ["focus", "AI Integration"],
] as const;

const stackItems = ["React", "Next.js", "TypeScript", "Python", "Claude API"];

function FadeUp({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={false}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  const { t } = useLang();

  return (
    <section
      id="about"
      className="py-32"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left: text */}
          <div>
            <FadeUp>
              <p
                className="font-mono text-xs tracking-widest uppercase mb-3"
                style={{ color: "var(--accent-cyan)" }}
              >
                {t.about.subtitle}
              </p>
              <h2
                className="text-4xl md:text-5xl font-bold mb-10"
                style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}
              >
                {t.about.title}
              </h2>
            </FadeUp>

            <div className="space-y-5">
              {[t.about.bio1, t.about.bio2, t.about.bio3].map((bio, i) => (
                <FadeUp key={i} delay={i * 0.1}>
                  <p
                    className="text-base leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {bio}
                  </p>
                </FadeUp>
              ))}
            </div>

            <FadeUp delay={0.4}>
              <div className="flex flex-col gap-3 mt-10">
                <div className="flex items-center gap-3">
                  <MapPin size={15} style={{ color: "var(--accent-cyan)" }} />
                  <span
                    className="text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <span style={{ color: "var(--text-muted)" }}>
                      {t.about.based}
                    </span>{" "}
                    {t.about.location}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Briefcase size={15} style={{ color: "var(--accent-purple)" }} />
                  <span
                    className="text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <span style={{ color: "var(--text-muted)" }}>
                      {t.about.open}
                    </span>{" "}
                    {t.about.work}
                  </span>
                </div>
              </div>
            </FadeUp>
          </div>

          {/* Right: visual card */}
          <FadeUp delay={0.2}>
            <div
              className="rounded-2xl p-8 card-border"
              style={{ background: "var(--bg-card)" }}
            >
              {/* Terminal-style header */}
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
                <div className="w-3 h-3 rounded-full" style={{ background: "#febc2e" }} />
                <div className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
                <span
                  className="font-mono text-xs ml-2"
                  style={{ color: "var(--text-muted)" }}
                >
                  bekhruz.json
                </span>
              </div>

              <pre
                className="overflow-x-auto font-mono text-sm leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                <code>
                  {"{\n"}
                  {profileRows.map(([key, value]) => (
                    <Fragment key={key}>
                      {"  "}
                      <span style={{ color: "var(--accent-cyan)" }}>
                        &quot;{key}&quot;
                      </span>
                      {": "}
                      <span style={{ color: "#a8e6a3" }}>
                        &quot;{value}&quot;
                      </span>
                      {",\n"}
                    </Fragment>
                  ))}
                  {"  "}
                  <span style={{ color: "var(--accent-cyan)" }}>
                    &quot;stack&quot;
                  </span>
                  {": [\n"}
                  {stackItems.map((item, index) => (
                    <Fragment key={item}>
                      {"    "}
                      <span style={{ color: "#a8e6a3" }}>
                        &quot;{item}&quot;
                      </span>
                      {index === stackItems.length - 1 ? "\n" : ",\n"}
                    </Fragment>
                  ))}
                  {"  ],\n  "}
                  <span style={{ color: "var(--accent-cyan)" }}>
                    &quot;status&quot;
                  </span>
                  {": "}
                  <span style={{ color: "var(--accent-purple)" }}>
                    &quot;available&quot;
                  </span>
                  {"\n}"}
                </code>
              </pre>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
