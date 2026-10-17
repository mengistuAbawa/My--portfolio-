"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Mail, Send, Github, ArrowUpRight } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { personalInfo, navLinks } from "@/lib/data";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-[#0b0f19]/80 backdrop-blur-xl border-b border-slate-200/60 dark:border-white/10 shadow-lg shadow-indigo-500/5 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/#home" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 via-indigo-600 to-accent-400 flex items-center justify-center text-white font-mono font-bold text-xl shadow-md shadow-brand-500/30 group-hover:scale-105 transition-transform duration-300">
              MA
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white group-hover:text-brand-500 dark:group-hover:text-accent-400 transition-colors">
                {personalInfo.name}
              </span>
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400 hidden sm:inline-block">
                {personalInfo.role}
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 bg-slate-100/60 dark:bg-slate-900/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200/50 dark:border-white/10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative px-4 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-white transition-colors duration-200 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-brand-500 to-accent-400 transition-all duration-300 -translate-x-1/2 group-hover:w-4/5 rounded-full" />
              </Link>
            ))}
          </nav>

          {/* Right Side Socials & Theme Toggle */}
          <div className="hidden md:flex items-center gap-2 lg:gap-3">
            <a
              href={personalInfo.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-brand-500 dark:hover:text-accent-400 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-all"
            >
              <Github className="w-5 h-5" />
            </a>

            <a
              href={personalInfo.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-brand-500 dark:hover:text-accent-400 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-all"
            >
              <Send className="w-5 h-5" />
            </a>

            <a
              href={`mailto:${personalInfo.email}`}
              aria-label="Email"
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-brand-500 dark:hover:text-accent-400 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-all"
            >
              <Mail className="w-5 h-5" />
            </a>

            <div className="h-5 w-px bg-slate-300 dark:bg-slate-700 mx-1" />

            <ThemeToggle />

            <Link
              href="/upload"
              className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-gradient-to-r from-brand-500 to-indigo-600 hover:from-brand-600 hover:to-indigo-700 text-white shadow-sm shadow-brand-500/25 transition-all hover:scale-105"
            >
              Upload Project
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile hamburger & ThemeToggle */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Animated Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-white/95 dark:bg-[#0b0f19]/95 backdrop-blur-2xl border-b border-slate-200 dark:border-white/10 shadow-xl"
          >
            <div className="px-6 py-5 space-y-4">
              <nav className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2 text-base font-medium text-slate-700 dark:text-slate-200 hover:text-brand-500 dark:hover:text-accent-400 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
                <Link
                  href="/upload"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-base font-medium text-brand-600 dark:text-accent-400 rounded-lg bg-brand-50 dark:bg-brand-950/30 border border-brand-200 dark:border-brand-800/40"
                >
                  Upload New Project
                </Link>
              </nav>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-around text-slate-600 dark:text-slate-300">
                <a
                  href={personalInfo.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2 text-sm"
                >
                  <Github className="w-5 h-5 text-brand-500" />
                  GitHub
                </a>
                <a
                  href={personalInfo.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2 text-sm"
                >
                  <Send className="w-5 h-5 text-accent-400" />
                  Telegram
                </a>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2 text-sm"
                >
                  <Mail className="w-5 h-5 text-rose-500" />
                  Email
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
