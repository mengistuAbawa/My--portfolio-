"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Github, ExternalLink, PlusCircle, Layers, AlertCircle, RefreshCw } from "lucide-react";
import { initialProjects } from "@/lib/data";

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string;
  imageUrl: string;
  githubUrl: string;
  liveUrl: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/projects", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to load projects");
      const data = await res.json();
      setProjects(data);
    } catch (err: unknown) {
      console.warn("Using fallback seed data for projects:", err);
      // fallback already set to initialProjects
      setError("Note: Showing cached projects. Database connection syncing.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Title + "Upload Project" Action */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold uppercase tracking-wider text-brand-600 dark:text-accent-400 bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800/40 mb-3"
            >
              <Layers className="w-3.5 h-3.5" />
              Featured Work
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white"
            >
              Real-World{" "}
              <span className="bg-gradient-to-r from-brand-500 via-indigo-600 to-accent-400 bg-clip-text text-transparent">
                Full-Stack Projects
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300"
            >
              Live applications showcasing modern architecture, responsive interfaces, secure APIs, and optimal performance.
            </motion.p>
          </div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <button
              onClick={fetchProjects}
              aria-label="Refresh projects"
              className="p-3 rounded-2xl glass-panel text-slate-600 dark:text-slate-300 hover:text-brand-500 transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>

            <Link
              href="/upload"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-brand-500 to-indigo-600 hover:from-brand-600 hover:to-indigo-700 text-white font-medium shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              Upload Project
            </Link>
          </motion.div>
        </div>

        {error && (
          <div className="mb-8 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Loading Skeleton */}
        {loading && projects.length === 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-96 rounded-3xl glass-panel animate-pulse bg-slate-200/50 dark:bg-slate-800/40"
              />
            ))}
          </div>
        )}

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => {
            const techList = project.tech
              ? project.tech.split(",").map((t) => t.trim())
              : [];

            return (
              <motion.article
                key={project.id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group flex flex-col rounded-3xl glass-panel overflow-hidden border border-slate-200/80 dark:border-white/10 shadow-lg shadow-indigo-500/5 hover:border-brand-500/40 dark:hover:border-accent-400/40 transition-all duration-300"
              >
                {/* Project Image Container */}
                <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-slate-900">
                  <Image
                    src={project.imageUrl || "/images/placeholder.jpg"}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent opacity-75 group-hover:opacity-60 transition-opacity duration-300" />

                  {/* Badges on image */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-slate-950/70 text-white backdrop-blur-md border border-white/20 shadow-md">
                      Project #{index + 1}
                    </span>
                  </div>

                  {/* Corner glow accent */}
                  <div className="absolute bottom-0 right-0 w-24 h-24 bg-brand-500/20 rounded-full blur-2xl group-hover:bg-accent-400/30 transition-colors pointer-events-none" />
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-brand-500 dark:group-hover:text-accent-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech stack tags */}
                  <div className="space-y-4 pt-2">
                    <div className="flex flex-wrap gap-1.5">
                      {techList.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Links Buttons */}
                    <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between gap-3">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                        Code
                      </a>

                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl bg-brand-500 hover:bg-brand-600 text-white shadow-sm shadow-brand-500/25 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Live Demo
                      </a>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
