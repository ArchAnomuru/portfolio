import { ImageResponse } from "next/og";

export const alt = "Bekhruz Mirkhamidov — Full-Stack Developer & AI Enthusiast";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#08080a",
          color: "#f0f0f2",
          padding: "72px",
          position: "relative",
          overflow: "hidden",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            width: 560,
            height: 560,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(0,212,255,0.22) 0%, rgba(0,212,255,0.06) 38%, transparent 70%)",
            position: "absolute",
            left: -140,
            bottom: -180,
          }}
        />
        <div
          style={{
            width: 640,
            height: 640,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(139,92,246,0.24) 0%, rgba(139,92,246,0.07) 40%, transparent 72%)",
            position: "absolute",
            right: -120,
            top: -140,
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "#00d4ff",
              fontSize: 22,
              letterSpacing: 8,
              fontWeight: 700,
            }}
          >
            <span>ANOMURU</span>
            <span style={{ color: "#888890", fontSize: 18, letterSpacing: 0 }}>
              anomuru.dev
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div
              style={{
                display: "flex",
                color: "#00d4ff",
                fontSize: 24,
                letterSpacing: 4,
                fontWeight: 700,
              }}
            >
              FULL-STACK DEVELOPER / AI INTEGRATION
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: 90,
                lineHeight: 0.95,
                fontWeight: 800,
                letterSpacing: -3,
              }}
            >
              <span>Bekhruz</span>
              <span
                style={{
                  color: "#00d4ff",
                }}
              >
                Mirkhamidov
              </span>
            </div>
            <div
              style={{
                color: "#a5a5ad",
                fontSize: 30,
                maxWidth: 760,
                lineHeight: 1.35,
              }}
            >
              Building intelligent web experiences, real-time dashboards, and
              conversational AI systems.
            </div>
          </div>

          <div style={{ display: "flex", gap: 14 }}>
            {["React", "Next.js", "TypeScript", "Python", "LLM"].map((tag) => (
              <div
                key={tag}
                style={{
                  display: "flex",
                  padding: "12px 18px",
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.12)",
                  background: "rgba(255,255,255,0.04)",
                  color: "#d8d8de",
                  fontSize: 22,
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
