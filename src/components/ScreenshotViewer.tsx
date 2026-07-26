"use client";

import { useCallback, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useLang } from "@/lib/i18n";
import type { Shot } from "@/data/projects";

interface ScreenshotViewerProps {
  shots: Shot[];
  index: number;
  title: string;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}

export default function ScreenshotViewer({
  shots,
  index,
  title,
  onIndexChange,
  onClose,
}: ScreenshotViewerProps) {
  const { lang } = useLang();
  const shot = shots[index];

  const step = useCallback(
    (delta: number) => {
      onIndexChange((index + delta + shots.length) % shots.length);
    },
    [index, shots.length, onIndexChange],
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };

    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose, step]);

  if (!shot) return null;

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-50 flex flex-col"
      style={{ background: "rgba(4, 4, 6, 0.97)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <div className="flex items-center justify-between gap-4 px-5 py-4 shrink-0">
        <div className="min-w-0">
          <p
            className="text-sm font-semibold truncate"
            style={{ color: "var(--text-primary)" }}
          >
            {title}
          </p>
          <p className="text-xs truncate" style={{ color: "var(--text-muted)" }}>
            {shot.caption[lang]}
          </p>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <span
            className="font-mono text-xs"
            style={{ color: "var(--text-muted)" }}
          >
            {index + 1} / {shots.length}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="p-2 rounded-lg transition-colors duration-200"
            style={{ color: "var(--text-secondary)" }}
          >
            <X size={18} />
          </button>
        </div>
      </div>

      <div
        className="relative flex-1 min-h-0 flex items-center gap-3 px-3 pb-3"
        onClick={(event) => event.stopPropagation()}
      >
        {shots.length > 1 && (
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous screenshot"
            className="shrink-0 p-3 rounded-full card-border"
            style={{ background: "var(--bg-card)", color: "var(--text-secondary)" }}
          >
            <ChevronLeft size={20} />
          </button>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={shot.src}
            className="relative flex-1 h-full rounded-xl overflow-hidden card-border"
            style={{ background: "var(--bg-surface)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Image
              src={shot.src}
              alt={shot.caption[lang]}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {shots.length > 1 && (
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next screenshot"
            className="shrink-0 p-3 rounded-full card-border"
            style={{ background: "var(--bg-card)", color: "var(--text-secondary)" }}
          >
            <ChevronRight size={20} />
          </button>
        )}
      </div>

      {shots.length > 1 && (
        <div
          className="flex gap-2 overflow-x-auto px-5 pb-5 shrink-0"
          onClick={(event) => event.stopPropagation()}
        >
          {shots.map((item, i) => (
            <button
              key={item.src}
              type="button"
              onClick={() => onIndexChange(i)}
              aria-label={item.caption[lang]}
              aria-current={i === index}
              className="relative w-28 aspect-[16/10] rounded-md overflow-hidden shrink-0 transition-opacity duration-200"
              style={{
                opacity: i === index ? 1 : 0.45,
                outline:
                  i === index ? "1px solid var(--accent-cyan)" : "1px solid var(--border)",
              }}
            >
              <Image
                src={item.src}
                alt=""
                fill
                sizes="112px"
                className="object-cover object-top"
              />
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
}
