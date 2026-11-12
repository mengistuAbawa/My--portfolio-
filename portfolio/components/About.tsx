"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Code2, FolderGit2, Users2, Sparkles, CheckCircle2 } from "lucide-react";
import { personalInfo, aboutFeatures } from "@/lib/data";

const iconMap = {
  Code2: Code2,
  FolderGit2: FolderGit2,
  Users2: Users2,
  Sparkles: Sparkles,
};

export default function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold uppercase tracking-wider text-brand-600 dark:text-accent-400 bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800/40 mb-3"
          >
            About Me
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white"
          >
            Building Thoughtful{" "}
            <span className="bg-gradient-to-r from-brand-500 to-accent-400 bg-clip-text text-transparent">
              Digital Products
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed"
          >
            I care about turning everyday challenges into useful, approachable software.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto mb-16 grid md:grid-cols-[0.8fr_1.2fr] gap-8 md:gap-12 items-center"
        >
          <div className="relative mx-auto w-full max-w-sm">
            <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-brand-500/30 via-indigo-500/20 to-accent-400/30 blur-xl" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-slate-200/80 dark:border-white/10 bg-slate-100 dark:bg-slate-900 shadow-2xl">
              <Image
                src="/images/about.jpg"
                alt={`${personalInfo.name}, ${personalInfo.role}`}
                fill
                sizes="(max-width: 768px) 90vw, 320px"
                className="object-cover object-top"
              />
            </div>
            <div className="absolute -bottom-4 -right-3 rounded-2xl glass-panel px-4 py-3 shadow-xl">
              <span className="block text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">Role</span>
              <span className="text-sm font-bold text-slate-900 dark:text-white">{personalInfo.role}</span>
            </div>
          </div>

          <div className="glass-panel rounded-3xl p-7 sm:p-9 border border-slate-200/80 dark:border-white/10">
            <span className="text-xs font-mono font-semibold uppercase tracking-[0.18em] text-brand-600 dark:text-accent-400">
              A little about me
            </span>
            <h3 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Hello, I&apos;m {personalInfo.name}.
            </h3>
            <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">
              {personalInfo.bio}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Full-stack development", "Product thinking", "Accessible design"].map((item) => (
                <span key={item} className="rounded-full border border-brand-200/80 dark:border-brand-800/60 bg-brand-50/80 dark:bg-brand-950/40 px-3 py-1.5 text-xs font-medium text-brand-700 dark:text-accent-300">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {aboutFeatures.map((feature, index) => {
            const Icon = iconMap[feature.iconName] || Code2;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group p-6 rounded-3xl glass-panel relative overflow-hidden border border-slate-200/80 dark:border-white/10 shadow-lg shadow-indigo-500/5 hover:border-brand-500/50 dark:hover:border-accent-400/50 transition-all duration-300"
              >
                {/* Subtle top indicator */}
                <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-brand-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Icon Container with gradient square */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500/10 to-accent-400/20 dark:from-brand-500/20 dark:to-accent-400/30 flex items-center justify-center text-brand-600 dark:text-accent-300 mb-5 group-hover:scale-110 group-hover:from-brand-500 group-hover:to-accent-400 group-hover:text-white transition-all duration-300 shadow-sm">
                  <Icon className="w-7 h-7" />
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-brand-500 dark:group-hover:text-accent-400 transition-colors">
                  {feature.title}
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {feature.description}
                </p>

                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/5 flex items-center gap-2 text-xs font-medium text-brand-600 dark:text-accent-400 opacity-80 group-hover:opacity-100">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Thoughtful by design
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
