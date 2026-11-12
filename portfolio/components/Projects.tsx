"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { AlertCircle, ExternalLink, Github, Layers, RefreshCw } from "lucide-react";
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/projects", { cache: "no-store" });
      if (!response.ok) throw new Error("Failed to load projects.");
      const data: Project[] = await response.json();
      setProjects(data);
    } catch (loadError) {
      console.warn("Using fallback project data:", loadError);
      setError("Showing featured projects while the project list is unavailable.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchProjects();
  }, [fetchProjects]);

  return (
    <section id="projects" className="relative overflow-hidden py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-brand-600 dark:border-brand-800/40 dark:bg-brand-950/40 dark:text-accent-400"
            >
              <Layers aria-hidden="true" className="h-3.5 w-3.5" />
              Featured Work
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl"
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
              className="mt-4 text-base text-slate-600 dark:text-slate-300 sm:text-lg"
            >
              Live applications showcasing modern architecture, responsive
              interfaces, and practical solutions.
            </motion.p>
          </div>

          <button
            type="button"
            onClick={() => void fetchProjects()}
            aria-label="Refresh projects"
            className="inline-flex h-fit items-center gap-2 self-start rounded-2xl glass-panel p-3 text-sm text-slate-600 transition-colors hover:text-brand-500 dark:text-slate-300 md:self-auto"
          >
            <RefreshCw
              aria-hidden="true"
              className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
            />
            Refresh
          </button>
        </div>

        {error && (
          <div className="mb-8 flex items-center gap-2 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-700 dark:text-amber-300">
            <AlertCircle aria-hidden="true" className="h-4 w-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => {
            const techList = project.tech
              ? project.tech.split(",").map((technology) => technology.trim())
              : [];

            return (
              <motion.article
                key={project.id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group flex flex-col overflow-hidden rounded-3xl glass-panel border border-slate-200/80 shadow-lg shadow-indigo-500/5 transition-all duration-300 hover:border-brand-500/40 dark:border-white/10 dark:hover:border-accent-400/40"
              >
                <div className="relative h-52 w-full overflow-hidden bg-slate-900 sm:h-56">
                  <Image
                    src={project.imageUrl || "/images/placeholder.jpg"}
                    alt={`${project.title} project preview`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent opacity-75 transition-opacity duration-300 group-hover:opacity-60" />
                  <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-slate-950/70 px-3 py-1 text-xs font-mono font-bold text-white shadow-md backdrop-blur-md">
                    Project #{index + 1}
                  </span>
                </div>

                <div className="flex flex-1 flex-col justify-between space-y-4 p-6">
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-slate-900 transition-colors group-hover:text-brand-500 dark:text-white dark:group-hover:text-accent-400">
                      {project.title}
                    </h3>
                    <p className="line-clamp-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                      {project.description}
                    </p>
                  </div>

                  <div className="space-y-4 pt-2">
                    {techList.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {techList.map((technology) => (
                          <span
                            key={technology}
                            className="rounded-lg border border-slate-200 bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 dark:border-slate-700/60 dark:bg-slate-800/80 dark:text-slate-300"
                          >
                            {technology}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between gap-3 border-t border-slate-100 pt-4 dark:border-white/5">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-100 px-3.5 py-2 text-xs font-semibold text-slate-800 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
                        >
                          <Github aria-hidden="true" className="h-3.5 w-3.5" />
                          Code
                        </a>
                      )}

                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${project.githubUrl ? "flex-1" : "w-full"} inline-flex items-center justify-center gap-2 rounded-xl bg-brand-500 px-3.5 py-2 text-xs font-semibold text-white shadow-sm shadow-brand-500/25 transition-colors hover:bg-brand-600`}
                      >
                        <ExternalLink
                          aria-hidden="true"
                          className="h-3.5 w-3.5"
                        />
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
