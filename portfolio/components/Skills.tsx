"use client";

import { motion } from "framer-motion";
import { Cpu, BarChart3, Sparkles } from "lucide-react";
import SkillChart from "./SkillChart";
import { skillsData } from "@/lib/data";

export default function Skills() {
  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-slate-50/50 dark:bg-[#080d16]/50">
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
            <Cpu className="w-3.5 h-3.5" />
            Technical Proficiency
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white"
          >
            Core Competencies &{" "}
            <span className="bg-gradient-to-r from-brand-500 via-indigo-500 to-accent-400 bg-clip-text text-transparent">
              Skill Metrics
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300"
          >
            Combining modern frontend ecosystems, scalable backend APIs, and efficient database architectures with clean styling.
          </motion.p>
        </div>

        {/* Dual-Column Display: Horizontal Bars + Radar Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Horizontal Progress Bars */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-brand-500" />
                Performance Breakdown
              </h3>
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                scroll-triggered
              </span>
            </div>

            <div className="space-y-5">
              {skillsData.map((skill, index) => (
                <div
                  key={skill.name}
                  className="glass-panel p-4 rounded-2xl border border-slate-200/80 dark:border-white/10 shadow-sm"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                      {skill.name}
                    </span>
                    <span className="text-xs font-mono font-bold text-brand-600 dark:text-accent-400 bg-brand-50 dark:bg-brand-950/40 px-2 py-0.5 rounded-md border border-brand-200/50 dark:border-brand-800/40">
                      {skill.level}%
                    </span>
                  </div>

                  {/* Outer Bar Track */}
                  <div className="h-2.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden p-[2px]">
                    {/* Animated Fill Bar */}
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: index * 0.15, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-brand-500 via-indigo-500 to-accent-400 relative"
                    >
                      <div className="absolute top-0 right-0 bottom-0 w-2 bg-white/50 rounded-full animate-pulse" />
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Recharts RadarChart with Glass Card Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-6"
          >
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200/60 dark:border-white/5 mb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Radar Competency Map
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Multidimensional evaluation across core tech domains
                  </p>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-400/10 text-accent-500 text-xs font-mono">
                  <Sparkles className="w-3.5 h-3.5" />
                  Full-Stack
                </div>
              </div>

              {/* Render SkillChart */}
              <SkillChart />
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
