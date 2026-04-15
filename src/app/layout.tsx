import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bekhruz Mirkhamidov — Full-Stack Developer & AI Enthusiast",
  description:
    "Full-stack developer building intelligent web experiences. Specializing in React, Next.js, TypeScript, and AI/LLM integration.",
  keywords: ["developer", "full-stack", "AI", "React", "Next.js", "TypeScript"],
  authors: [{ name: "Bekhruz Mirkhamidov" }],
  openGraph: {
    title: "Bekhruz Mirkhamidov — Full-Stack Developer",
    description: "Building intelligent web experiences with React, Next.js, and AI.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
