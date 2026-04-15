"use client";

import { useLang } from "@/lib/i18n";
import { Heart } from "lucide-react";

export default function Footer() {
  const { t } = useLang();

  return (
    <footer
      className="py-10"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <span
          className="font-mono text-xs"
          style={{ color: "var(--text-muted)" }}
        >
          anomuru.dev
        </span>

        <div
          className="flex items-center gap-1.5 text-xs"
          style={{ color: "var(--text-muted)" }}
        >
          {t.footer.built}
          <Heart
            size={11}
            className="fill-current"
            style={{ color: "var(--accent-cyan)" }}
          />
          {t.footer.by}
        </div>

        <span
          className="font-mono text-xs"
          style={{ color: "var(--text-muted)" }}
        >
          {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  );
}
