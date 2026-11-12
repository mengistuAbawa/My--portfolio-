"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import Logo from "./Logo";
import { navLinks } from "@/lib/data";

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
          <Logo />

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

          {/* Theme Toggle */}
          <div className="hidden md:flex items-center gap-2 lg:gap-3">
            <ThemeToggle />
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
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
