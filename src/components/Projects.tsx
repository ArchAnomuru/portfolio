"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useLang } from "@/lib/i18n";
import {
  projects,
  type Project,
  type ProjectCategory,
  type ProjectStatus,
} from "@/data/projects";
import { ExternalLink, Images, Lock } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import ScreenshotViewer from "@/components/ScreenshotViewer";

const FEATURED_STACK_LIMIT = 9;
const COMPACT_STACK_LIMIT = 5;

function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={false}
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

const statusColors: Record<ProjectStatus, string> = {
  live: "#34d399",
  wip: "#f59e0b",
  archived: "var(--text-muted)",
};

function StatusPill({ status }: { status: ProjectStatus }) {
  const { t } = useLang();
  const color = statusColors[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-wide px-2.5 py-1 rounded-full border"
      style={{
        color,
        borderColor: status === "archived" ? "var(--border)" : color + "33",
        background: status === "archived" ? "transparent" : color + "0f",
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: color }}
        aria-hidden
      />
      {t.projects.status[status]}
    </span>
  );
}

function StackTags({ stack, limit }: { stack: string[]; limit: number }) {
  const shown = stack.slice(0, limit);
  const rest = stack.length - shown.length;

  return (
    <div className="flex flex-wrap gap-1.5">
      {shown.map((tech) => (
        <span
          key={tech}
          className="font-mono text-[11px] px-2 py-1 rounded"
          style={{
            background: "var(--bg-surface)",
            color: "var(--text-secondary)",
          }}
        >
          {tech}
        </span>
      ))}
      {rest > 0 && (
        <span
          className="font-mono text-[11px] px-2 py-1 rounded"
          style={{ color: "var(--text-muted)" }}
        >
          +{rest}
        </span>
      )}
    </div>
  );
}

function ProjectLinks({ project, color }: { project: Project; color: string }) {
  const { t } = useLang();

  return (
    <div className="flex items-center gap-5">
      {project.github ? (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link flex items-center gap-1.5 text-xs transition-colors duration-200"
          style={{ color: "var(--text-muted)" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--text-primary)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--text-muted)";
          }}
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
          onMouseEnter={(e) => {
            e.currentTarget.style.color = color;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--text-muted)";
          }}
        >
          <ExternalLink size={13} />
          {t.projects.live}
        </a>
      )}
    </div>
  );
}

/** Screenshot panel — falls back to a monogram plate until a shot is dropped in. */
function ShotPanel({
  project,
  color,
  onOpen,
}: {
  project: Project;
  color: string;
  onOpen: (index: number) => void;
}) {
  const { t, lang } = useLang();
  const shots = project.shots ?? [];
  const cover = shots[0];

  // No screenshot: show the shape of the system in numbers instead. Reads as a
  // deliberate panel rather than a gap waiting to be filled.
  if (!cover) {
    return (
      <div
        className="relative h-full min-h-[240px] flex flex-col justify-center gap-7 p-7 md:p-9"
        style={{
          background: `radial-gradient(120% 120% at 30% 10%, ${color}14, transparent 60%), var(--bg-surface)`,
        }}
      >
        {project.facts ? (
          <>
            <div className="flex flex-col gap-6">
              {project.facts.map((fact) => (
                <div key={fact.label.en} className="flex items-baseline gap-4">
                  <span
                    className="text-4xl md:text-5xl font-bold tabular-nums shrink-0"
                    style={{ color, letterSpacing: "-0.03em" }}
                  >
                    {fact.value}
                  </span>
                  <span
                    className="text-sm leading-snug"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {fact.label[lang]}
                  </span>
                </div>
              ))}
            </div>

            {project.shotsWithheld && (
              <p
                className="text-xs leading-relaxed pt-5"
                style={{
                  color: "var(--text-muted)",
                  borderTop: "1px solid var(--border)",
                }}
              >
                {project.shotsWithheld[lang]}
              </p>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center gap-3 h-full">
            <span
              className="text-5xl font-bold select-none"
              style={{ color: color + "40", letterSpacing: "-0.04em" }}
              aria-hidden
            >
              {project.title.slice(0, 2)}
            </span>
            <span
              className="font-mono text-[11px] tracking-widest uppercase"
              style={{ color: "var(--text-muted)" }}
            >
              {t.projects.shotSoon}
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onOpen(0)}
      aria-label={`${project.title} — ${t.projects.shotsLabel}`}
      className="relative block w-full h-full min-h-[240px] overflow-hidden cursor-zoom-in"
      style={{ background: "var(--bg-surface)" }}
    >
      <Image
        src={cover.src}
        alt={cover.caption[lang]}
        fill
        sizes="(max-width: 1024px) 100vw, 55vw"
        className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(to top, var(--bg-card) 0%, transparent 45%)",
          opacity: 0.5,
        }}
      />
      {shots.length > 1 && (
        <span
          className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 font-mono text-[11px] px-2.5 py-1 rounded-full backdrop-blur-sm"
          style={{
            background: "rgba(8, 8, 10, 0.72)",
            color: "var(--text-secondary)",
            border: "1px solid var(--border)",
          }}
        >
          <Images size={12} />
          {t.projects.shotsLabel}: {shots.length}
        </span>
      )}
    </button>
  );
}

function FeaturedProject({
  project,
  flip,
}: {
  project: Project;
  flip: boolean;
}) {
  const { t, lang } = useLang();
  const color = categoryColors[project.category];
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);
  const shots = project.shots ?? [];

  return (
    <article
      className="group grid lg:grid-cols-[1.05fr_1fr] rounded-3xl overflow-hidden card-border"
      style={{ background: "var(--bg-card)" }}
    >
      <AnimatePresence>
        {viewerIndex !== null && shots.length > 0 && (
          <ScreenshotViewer
            shots={shots}
            index={viewerIndex}
            title={project.title}
            onIndexChange={setViewerIndex}
            onClose={() => setViewerIndex(null)}
          />
        )}
      </AnimatePresence>

      <div className={flip ? "lg:order-2" : undefined}>
        <ShotPanel project={project} color={color} onOpen={setViewerIndex} />
      </div>

      <div
        className={`p-7 md:p-9 flex flex-col gap-5 ${flip ? "lg:order-1" : ""}`}
      >
        <div className="flex flex-wrap items-center gap-3">
          <StatusPill status={project.status} />
          <span
            className="font-mono text-[11px] tracking-widest uppercase"
            style={{ color }}
          >
            {t.projects.filters[project.category]}
          </span>
          {project.period && (
            <span
              className="font-mono text-[11px]"
              style={{ color: "var(--text-muted)" }}
            >
              {project.period}
            </span>
          )}
        </div>

        <div>
          <h3
            className="text-2xl md:text-3xl font-bold mb-2"
            style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}
          >
            {project.title}
          </h3>
          <p className="text-sm" style={{ color }}>
            {project.subtitle[lang]}
          </p>
        </div>

        <p
          className="text-sm leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          {project.description[lang]}
        </p>

        {project.highlights && (
          <ul className="flex flex-col gap-2">
            {project.highlights[lang].map((item) => (
              <li
                key={item}
                className="flex gap-2.5 text-sm leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                <span
                  className="mt-[7px] w-1 h-1 rounded-full shrink-0"
                  style={{ background: color }}
                  aria-hidden
                />
                {item}
              </li>
            ))}
          </ul>
        )}

        {project.role && (
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            <span className="font-mono uppercase tracking-widest">
              {t.projects.role}
            </span>{" "}
            — {project.role[lang]}
          </p>
        )}

        <div className="mt-auto flex flex-col gap-5 pt-1">
          <StackTags stack={project.stack} limit={FEATURED_STACK_LIMIT} />
          <ProjectLinks project={project} color={color} />
        </div>
      </div>
    </article>
  );
}

function CompactProject({ project }: { project: Project }) {
  const { t, lang } = useLang();
  const color = categoryColors[project.category];

  return (
    <article
      className="rounded-2xl p-6 card-border flex flex-col gap-4 h-full"
      style={{ background: "var(--bg-card)" }}
    >
      <div className="flex items-center justify-between gap-3">
        <span
          className="font-mono text-[11px] tracking-widest uppercase"
          style={{ color }}
        >
          {t.projects.filters[project.category]}
        </span>
        <StatusPill status={project.status} />
      </div>

      <div>
        <h3
          className="text-lg font-bold mb-1.5"
          style={{ color: "var(--text-primary)", letterSpacing: "-0.01em" }}
        >
          {project.title}
        </h3>
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          {project.subtitle[lang]}
          {project.period ? ` · ${project.period}` : ""}
        </p>
      </div>

      <p
        className="text-sm leading-relaxed flex-1"
        style={{ color: "var(--text-secondary)" }}
      >
        {project.description[lang]}
      </p>

      <StackTags stack={project.stack} limit={COMPACT_STACK_LIMIT} />
      <ProjectLinks project={project} color={color} />
    </article>
  );
}

type FilterKey = "all" | ProjectCategory;

export default function Projects() {
  const { t } = useLang();
  const [filter, setFilter] = useState<FilterKey>("all");

  const filters: { key: FilterKey; label: string }[] = [
    { key: "all", label: t.projects.filters.all },
    { key: "work", label: t.projects.filters.work },
    { key: "personal", label: t.projects.filters.personal },
    { key: "opensource", label: t.projects.filters.opensource },
  ];

  const visible =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);
  const featured = visible.filter((p) => p.featured);
  const rest = visible.filter((p) => !p.featured);

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

        <FadeUp delay={0.1}>
          <div
            className="flex flex-wrap gap-2 mb-14 p-1.5 rounded-xl w-fit"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
            }}
          >
            {filters.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                aria-pressed={filter === key}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                style={{
                  background:
                    filter === key ? "var(--bg-surface)" : "transparent",
                  color:
                    filter === key
                      ? "var(--text-primary)"
                      : "var(--text-muted)",
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

        {featured.length > 0 && (
          <div className="mb-20">
            <FadeUp>
              <p
                className="font-mono text-[11px] tracking-widest uppercase mb-6"
                style={{ color: "var(--text-muted)" }}
              >
                {t.projects.selected}
              </p>
            </FadeUp>
            <div className="flex flex-col gap-6">
              {featured.map((project, i) => (
                <FadeUp key={project.id} delay={i * 0.05}>
                  <FeaturedProject project={project} flip={i % 2 === 1} />
                </FadeUp>
              ))}
            </div>
          </div>
        )}

        {rest.length > 0 && (
          <div>
            <FadeUp>
              <p
                className="font-mono text-[11px] tracking-widest uppercase mb-6"
                style={{ color: "var(--text-muted)" }}
              >
                {featured.length > 0 ? t.projects.more : t.projects.selected}
              </p>
            </FadeUp>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {rest.map((project, i) => (
                <FadeUp key={project.id} delay={i * 0.04} className="h-full">
                  <CompactProject project={project} />
                </FadeUp>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
