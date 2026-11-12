"use client";

import Link from "next/link";
import { Github, Send, Mail, Video, Heart, ArrowUp } from "lucide-react";
import { personalInfo, navLinks } from "@/lib/data";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-white dark:bg-[#070b13] border-t border-slate-200/80 dark:border-white/10 pt-16 pb-12 overflow-hidden">
      {/* Decorative top blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-r from-brand-500/10 via-accent-400/10 to-indigo-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-slate-200/60 dark:border-white/10">
          
          {/* Logo + Bio (Col 1) */}
          <div className="md:col-span-6 space-y-4">
            <Link href="/#home" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-accent-400 flex items-center justify-center text-white font-mono font-bold text-xl shadow-md shadow-brand-500/25">
                M
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">
                {personalInfo.name}
              </span>
            </Link>

            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-md">
              Full Stack Developer specializing in Next.js, Node.js, and modern cloud ecosystems. Building resilient web experiences that transform complex requirements into seamless, high-performance digital products.
            </p>

            {/* Social Icons Row */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={personalInfo.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-brand-500 dark:hover:text-accent-400 hover:scale-105 transition-all"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href={personalInfo.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-brand-500 dark:hover:text-accent-400 hover:scale-105 transition-all"
              >
                <Send className="w-4 h-4" />
              </a>

              <a
                href={personalInfo.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-brand-500 dark:hover:text-accent-400 hover:scale-105 transition-all"
              >
                <Video className="w-4 h-4" />
              </a>

              <a
                href={`mailto:${personalInfo.email}`}
                aria-label="Email"
                className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-brand-500 dark:hover:text-accent-400 hover:scale-105 transition-all"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick links (Col 2) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-600 dark:text-slate-400 hover:text-brand-500 dark:hover:text-accent-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Technical Info (Col 3) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Architecture
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Constructed with Next.js 14 App Router, TypeScript, TailwindCSS, Framer Motion, Recharts & Prisma SQLite.
            </p>
            <div className="pt-2">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono text-slate-600 dark:text-slate-300 glass-panel hover:text-brand-500 transition-colors"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                Back to Top
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright row with dynamic year */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-4">
          <p>
            &copy; {currentYear} {personalInfo.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-1">
            Engineered with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> & Next.js 14
          </p>
        </div>
      </div>
    </footer>
  );
}
