"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useLang } from "@/lib/i18n";
import { projects, type ProjectCategory } from "@/data/projects";
import { ExternalLink, Lock } from "lucide-react";
import { GithubIcon } from "@/components/icons";

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

const categoryColors: Record<ProjectCategory, string> = {
  personal: "var(--accent-cyan)",
  work: "var(--accent-purple)",
  opensource: "#f59e0b",
};

function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  const { t, lang } = useLang();
  const color = categoryColors[project.category];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl p-6 card-border flex flex-col h-full"
      style={{ background: "var(--bg-card)" }}
    >
      {/* Category dot + featured */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full"
            style={{ background: color }}
          />
          <span
            className="font-mono text-xs tracking-widest uppercase"
            style={{ color }}
          >
            {t.projects.filters[project.category === "opensource" ? "opensource" : project.category === "personal" ? "personal" : "work"]}
          </span>
        </div>
        {project.featured && (
          <span
            className="font-mono text-xs px-2 py-0.5 rounded-full border"
            style={{
              borderColor: color + "44",
              color,
              background: color + "10",
            }}
          >
            ★
          </span>
        )}
      </div>

      {/* Title */}
      <h3
        className="text-lg font-bold mb-3"
        style={{ color: "var(--text-primary)", letterSpacing: "-0.01em" }}
      >
        {project.title}
      </h3>

      {/* Description */}
      <p
        className="text-sm leading-relaxed mb-5 flex-1"
        style={{ color: "var(--text-secondary)" }}
      >
        {project.description[lang]}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.tags.map((tag) => (
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

      {/* Links */}
      <div className="flex items-center gap-4">
        {project.github ? (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs transition-colors duration-200"
            style={{ color: "var(--text-muted)" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "var(--text-primary)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")
            }
          >
            <GithubIcon size={13} />
            {t.projects.github}
          </a>
        ) : (
          <span
            className="flex items-center gap-1.5 text-xs"
            style={{ color: "var(--text-muted)" }}
          >
            <Lock size={13} />
            {t.projects.private}
          </span>
        )}

        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs transition-colors duration-200"
            style={{ color: "var(--text-muted)" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.color = color)
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")
            }
          >
            <ExternalLink size={13} />
            {t.projects.live}
          </a>
        )}
      </div>
    </motion.div>
  );
}

type FilterKey = "all" | ProjectCategory;

export default function Projects() {
  const { t } = useLang();
  const [filter, setFilter] = useState<FilterKey>("all");

  const filters: { key: FilterKey; label: string }[] = [
    { key: "all", label: t.projects.filters.all },
    { key: "personal", label: t.projects.filters.personal },
    { key: "work", label: t.projects.filters.work },
    { key: "opensource", label: t.projects.filters.opensource },
  ];

  const filtered =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section
      id="projects"
      className="py-32"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp>
          <p
            className="font-mono text-xs tracking-widest uppercase mb-3"
            style={{ color: "var(--accent-cyan)" }}
          >
            {t.projects.subtitle}
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold mb-10"
            style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}
          >
            {t.projects.title}
          </h2>
        </FadeUp>

        {/* Filter tabs */}
        <FadeUp delay={0.1}>
          <div
            className="flex flex-wrap gap-2 mb-12 p-1.5 rounded-xl w-fit"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
          >
            {filters.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                style={{
                  background: filter === key ? "var(--bg-surface)" : "transparent",
                  color: filter === key ? "var(--text-primary)" : "var(--text-muted)",
                  borderBottom:
                    filter === key
                      ? "1px solid var(--border-hover)"
                      : "1px solid transparent",
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </FadeUp>

        {/* Projects grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
