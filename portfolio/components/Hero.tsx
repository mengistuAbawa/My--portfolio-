"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Download, Mail, Sparkles, ArrowRight } from "lucide-react";
import { personalInfo, heroStats } from "@/lib/data";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-grid-pattern"
    >
      {/* Animated gradient blob background */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-brand-500/20 dark:bg-brand-500/25 rounded-full filter blur-[100px] animate-blob pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 translate-x-1/3 w-72 sm:w-96 h-72 sm:h-96 bg-accent-400/20 dark:bg-accent-400/20 rounded-full filter blur-[100px] animate-blob animation-delay-2000 pointer-events-none" />
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-80 sm:w-96 h-80 sm:h-96 bg-indigo-600/15 dark:bg-indigo-600/20 rounded-full filter blur-[120px] animate-blob animation-delay-4000 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 text-center lg:text-left space-y-6"
          >
            {/* Status pill */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 dark:bg-brand-950/50 border border-brand-200/80 dark:border-brand-800/60 shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-xs font-semibold tracking-wide text-brand-700 dark:text-accent-300 uppercase">
                Available for new projects & opportunities
              </span>
              <Sparkles className="w-3.5 h-3.5 text-accent-400 hidden sm:inline" />
            </div>

            {/* Headline */}
            <div className="space-y-2">
              <h2 className="text-lg sm:text-xl font-mono text-slate-600 dark:text-slate-300 font-medium">
                Hello, I&apos;m
              </h2>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight">
                <span className="bg-gradient-to-r from-brand-500 via-indigo-600 to-accent-400 bg-clip-text text-transparent">
                  {personalInfo.name}
                </span>
              </h1>
              <p className="text-2xl sm:text-3xl font-semibold text-slate-800 dark:text-slate-200 pt-1">
                {personalInfo.role}
              </p>
            </div>

            {/* Bio paragraph */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {personalInfo.bio}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              {/* Download CV */}
              <a
                href={personalInfo.cvUrl}
                download="Mengistu_Abawa_CV.pdf"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-brand-500 to-indigo-600 hover:from-brand-600 hover:to-indigo-700 text-white font-medium shadow-lg shadow-brand-500/30 hover:shadow-brand-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Download className="w-4 h-4" />
                Download CV
              </a>

              {/* Email */}
              <a
                href={`mailto:${personalInfo.email}`}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl glass-panel text-slate-700 dark:text-slate-200 hover:text-brand-600 dark:hover:text-white font-medium hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Mail className="w-4 h-4 text-rose-500" />
                Email Me
              </a>
            </div>

            {/* Explore Projects Link */}
            <div className="pt-2 text-sm text-slate-500 dark:text-slate-400 flex items-center justify-center lg:justify-start gap-2">
              <span>Looking for work samples?</span>
              <Link
                href="/#projects"
                className="inline-flex items-center gap-1 font-semibold text-brand-600 dark:text-accent-400 hover:underline"
              >
                View 4 Featured Projects
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>

          {/* Right Floating Profile Image Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-5 flex justify-center items-center"
          >
            <div className="relative group">
              {/* Outer decorative pulsing ambient glow */}
              <motion.div
                animate={{
                  scale: [1, 1.08, 1],
                  opacity: [0.35, 0.55, 0.35],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -inset-6 bg-gradient-to-tr from-brand-500 via-accent-400 to-indigo-600 rounded-[3.5rem] blur-3xl opacity-40 group-hover:opacity-70 transition duration-700 pointer-events-none"
              />

              {/* Modern Squircle with Animated Rotating Neon Gradient Border */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
                className="relative p-[3px] rounded-[2.2rem] sm:rounded-[2.8rem] overflow-hidden shadow-2xl shadow-brand-500/25"
              >
                {/* Continuously rotating neon gradient ribbon */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-[150%] bg-[conic-gradient(from_0deg,#6366f1,#22d3ee,#a855f7,#38bdf8,#6366f1)]"
                />

                {/* Inner Squircle Container */}
                <div className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-[2rem] sm:rounded-[2.6rem] overflow-hidden bg-slate-950 border border-white/20 dark:border-white/10 flex items-center justify-center">
                  <Image
                    src={personalInfo.profileImage}
                    alt={personalInfo.name}
                    width={288}
                    height={288}
                    priority
                    unoptimized
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  
                  {/* Subtle vignette lighting overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-50 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none" />

                  {/* Glass reflection highlight on top edge */}
                  <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white/15 to-transparent pointer-events-none" />
                </div>
              </motion.div>

              {/* Floating tech badge 1 (Top-Left) */}
              <motion.div
                animate={{ y: [0, -6, 0], x: [0, 2, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-3 -left-2 sm:top-1 sm:-left-4 px-3 py-1.5 rounded-xl glass-panel shadow-xl flex items-center gap-2 border border-brand-500/40 backdrop-blur-xl"
              >
                <div className="w-6 h-6 rounded-lg bg-brand-500/20 text-brand-500 dark:text-accent-400 flex items-center justify-center text-xs font-bold">
                  🚀
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <p className="text-[9px] text-slate-400 uppercase font-mono tracking-wider">Stack</p>
                  </div>
                  <p className="text-[11px] font-bold text-slate-800 dark:text-white">Next.js 14</p>
                </div>
              </motion.div>

              {/* Floating tech badge 2 (Bottom-Right) */}
              <motion.div
                animate={{ y: [0, 6, 0], x: [0, -2, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                className="absolute -bottom-3 -right-2 sm:bottom-1 sm:-right-4 px-3 py-1.5 rounded-xl glass-panel shadow-xl flex items-center gap-2 border border-accent-400/40 backdrop-blur-xl"
              >
                <div className="w-6 h-6 rounded-lg bg-accent-400/20 text-accent-500 flex items-center justify-center text-xs font-bold">
                  ⚡
                </div>
                <div className="text-left">
                  <p className="text-[9px] text-slate-400 uppercase font-mono tracking-wider">Engine</p>
                  <p className="text-[11px] font-bold text-slate-800 dark:text-white">Tailwind + Node</p>
                </div>
              </motion.div>

              {/* Floating badge 3 (Top-Right accent) */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="hidden sm:flex absolute -top-2 -right-2 px-2.5 py-1 rounded-xl glass-panel shadow-lg items-center gap-1 border border-white/20 dark:border-white/10 backdrop-blur-xl"
              >
                <span className="text-[11px]">🏆</span>
                <span className="text-[10px] font-bold font-mono text-brand-600 dark:text-accent-300">
                  4 Featured Projects
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Highlighted project and engineering focus areas */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 sm:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6"
        >
          {heroStats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              whileHover={{ y: -4 }}
              className="glass-panel p-5 sm:p-6 rounded-2xl text-center relative overflow-hidden group border border-slate-200/80 dark:border-white/10"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-500 to-accent-400 opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="text-3xl sm:text-4xl font-extrabold font-mono bg-gradient-to-r from-brand-500 to-accent-400 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-slate-800 dark:text-slate-100 mt-1">
                {stat.label}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
