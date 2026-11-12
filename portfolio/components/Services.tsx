"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Braces,
  Database,
  Layers3,
  PanelsTopLeft,
  Server,
  Smartphone,
} from "lucide-react";

const services = [
  {
    title: "Full-Stack Web Development",
    description:
      "End-to-end web applications that connect polished interfaces with dependable server-side functionality.",
    icon: Layers3,
  },
  {
    title: "Frontend Development",
    description:
      "Responsive, accessible interfaces built with React and Next.js, with care for the details in every state.",
    icon: PanelsTopLeft,
  },
  {
    title: "Backend Development",
    description:
      "Node.js and Express services for application logic, data workflows, and integrations.",
    icon: Server,
  },
  {
    title: "PostgreSQL Database Design",
    description:
      "Thoughtful relational schemas and data models designed around the needs of your application.",
    icon: Database,
  },
  {
    title: "REST API Development",
    description:
      "Clear, consistent API endpoints that help web applications exchange data reliably.",
    icon: Braces,
  },
  {
    title: "Responsive UI/UX Implementation",
    description:
      "Mobile-first layouts and intuitive interactions that feel at home across screen sizes.",
    icon: Smartphone,
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="relative overflow-hidden py-24 bg-slate-50/50 dark:bg-[#080d16]/50"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="mb-3 inline-flex rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-brand-600 dark:border-brand-800/40 dark:bg-brand-950/40 dark:text-accent-400"
          >
            What I can help with
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl"
          >
            Services for your{" "}
            <span className="bg-gradient-to-r from-brand-500 via-indigo-500 to-accent-400 bg-clip-text text-transparent">
              next web project
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.16 }}
            className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg"
          >
            From interface to database, I build practical web experiences with
            modern tools and a focus on the people using them.
          </motion.p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.07 }}
                whileHover={{ y: -5 }}
                className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/70 p-6 shadow-lg shadow-indigo-500/5 transition-colors duration-300 hover:border-brand-400/60 dark:border-white/10 dark:bg-slate-900/50 dark:hover:border-accent-400/40 sm:p-7"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500/10 to-accent-400/20 text-brand-600 transition-all duration-300 group-hover:from-brand-500 group-hover:to-indigo-600 group-hover:text-white dark:text-accent-300">
                  <Icon aria-hidden="true" className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {service.description}
                </p>
                <div className="absolute inset-x-8 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-brand-500 to-accent-400 transition-transform duration-300 group-hover:scale-x-100" />
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mt-10 text-center"
        >
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-brand-500 via-indigo-600 to-accent-400 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-500/20 transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Discuss Your Project
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
