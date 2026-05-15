import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";

export const metadata: Metadata = {
  metadataBase: new URL("https://anomuru.dev"),
  title: "Bekhruz Mirkhamidov — Full-Stack Developer & AI Enthusiast",
  description:
    "Full-stack developer building intelligent web experiences. Specializing in React, Next.js, TypeScript, and AI/LLM integration.",
  keywords: ["developer", "full-stack", "AI", "React", "Next.js", "TypeScript"],
  authors: [{ name: "Bekhruz Mirkhamidov" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Bekhruz Mirkhamidov — Full-Stack Developer",
    description: "Building intelligent web experiences with React, Next.js, and AI.",
    url: "/",
    siteName: "Bekhruz Mirkhamidov Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bekhruz Mirkhamidov — Full-Stack Developer",
    description: "Building intelligent web experiences with React, Next.js, and AI.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
