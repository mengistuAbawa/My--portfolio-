"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-xl bg-slate-200/50 dark:bg-slate-800/50 border border-slate-300/30 dark:border-slate-700/30" />
    );
  }

  const currentTheme = theme === "system" ? resolvedTheme : theme;
  const isDark = currentTheme === "dark";

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800/80 dark:hover:bg-slate-700/80 border border-slate-300/60 dark:border-slate-700/60 text-slate-700 dark:text-slate-200 shadow-sm transition-colors duration-200"
    >
      <motion.div
        key={isDark ? "dark" : "light"}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: 90, opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        {isDark ? (
          <Sun className="w-5 h-5 text-amber-400" />
        ) : (
          <Moon className="w-5 h-5 text-indigo-600" />
        )}
      </motion.div>
    </motion.button>
  );
}
