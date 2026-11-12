"use client";

import { motion } from "framer-motion";
import { BookOpen, BriefcaseBusiness, CheckCircle2 } from "lucide-react";
import { skillsData, initialProjects } from "@/lib/data";

const projectAreas = initialProjects.map((project) => ({
  title: project.title,
  description: project.description,
}));

const timeline = [
  {
    date: "Currently studying",
    title: "Software Engineering studies",
    organization: "Injibara University",
    description:
      "Developing a foundation in software engineering through university studies and hands-on application work.",
    highlights: [
      "Applying software engineering concepts to practical web projects.",
      "Exploring frontend interfaces, backend services, and database design.",
    ],
    icon: BookOpen,
  },
  {
    date: "Throughout my studies",
    title: "Personal & academic projects",
    organization: "Practical project experience",
    description:
      "Building applications around practical needs in team workflows, education, healthcare, and online learning.",
    projects: projectAreas,
    icon: BriefcaseBusiness,
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative overflow-hidden py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="mb-3 inline-flex rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-brand-600 dark:border-brand-800/40 dark:bg-brand-950/40 dark:text-accent-400"
          >
            Education &amp; experience
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl"
          >
            Learning by{" "}
            <span className="bg-gradient-to-r from-brand-500 via-indigo-500 to-accent-400 bg-clip-text text-transparent">
              building
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.16 }}
            className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg"
          >
            My journey combines Software Engineering studies with practical
            experience from personal and academic web projects.
          </motion.p>
        </div>

        <div className="relative mx-auto max-w-4xl">
          <div
            aria-hidden="true"
            className="absolute bottom-8 left-5 top-8 w-px bg-gradient-to-b from-brand-400 via-indigo-400 to-accent-400 sm:left-7"
          />

          <div className="space-y-8">
            {timeline.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.12 }}
                  className="relative pl-14 sm:pl-20"
                >
                  <div className="absolute left-0 top-6 z-10 flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-brand-500 to-indigo-600 text-white shadow-md shadow-brand-500/20 dark:border-[#0b0f19] sm:left-2 sm:h-12 sm:w-12">
                    <Icon aria-hidden="true" className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>

                  <div className="rounded-3xl border border-slate-200/80 bg-white/70 p-6 shadow-lg shadow-indigo-500/5 dark:border-white/10 dark:bg-slate-900/50 sm:p-8">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <span className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-mono font-semibold uppercase tracking-wider text-brand-600 dark:border-brand-800/60 dark:bg-brand-950/40 dark:text-accent-400">
                          {item.date}
                        </span>
                        <h3 className="mt-2 text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-sm font-medium text-slate-600 dark:text-slate-300">
                          {item.organization}
                        </p>
                      </div>
                      <p className="max-w-xl text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                        {item.description}
                      </p>
                    </div>

                    {item.highlights && (
                      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                        {item.highlights.map((highlight) => (
                          <li
                            key={highlight}
                            className="flex items-start gap-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300"
                          >
                            <CheckCircle2
                              aria-hidden="true"
                              className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-500 dark:text-accent-400"
                            />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    )}

                    {item.projects && (
                      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                        {item.projects.map((project) => (
                          <li
                            key={project.title}
                            className="rounded-2xl border border-slate-200/70 bg-slate-50/70 p-4 dark:border-white/10 dark:bg-slate-950/30"
                          >
                            <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                              {project.title}
                            </h4>
                            <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                              {project.description}
                            </p>
                          </li>
                        ))}
                      </ul>
                    )}

                    {item.projects && (
                      <div className="mt-6 border-t border-slate-200/70 pt-5 dark:border-white/10">
                        <p className="mb-3 text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                          Technologies explored
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {skillsData.map((skill) => (
                            <span
                              key={skill.name}
                              className="rounded-full border border-brand-200/80 bg-brand-50/80 px-3 py-1 text-xs font-medium text-brand-700 dark:border-brand-800/60 dark:bg-brand-950/40 dark:text-accent-300"
                            >
                              {skill.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
