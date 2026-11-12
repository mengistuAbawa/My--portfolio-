"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Github, ExternalLink, PlusCircle, Layers, AlertCircle, RefreshCw, Pencil, Trash2, X, Save, Loader2 } from "lucide-react";
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
  const [isAdmin, setIsAdmin] = useState(false);
  const [portalReady, setPortalReady] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [pendingAction, setPendingAction] = useState<{ type: "edit" | "delete"; project: Project } | null>(null);
  const [loginPromptOpen, setLoginPromptOpen] = useState(false);
  const [manageMenuProjectId, setManageMenuProjectId] = useState<string | null>(null);
  const [adminPassword, setAdminPassword] = useState("");
  const [adminLoginError, setAdminLoginError] = useState<string | null>(null);
  const [savingProject, setSavingProject] = useState(false);
  const [projectActionError, setProjectActionError] = useState<string | null>(null);
  const [busyProjectId, setBusyProjectId] = useState<string | null>(null);

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
    setPortalReady(true);
    fetchProjects();
    const authError = new URLSearchParams(window.location.search).get("authError");
    if (authError === "supabase-not-configured") setProjectActionError("Set the Supabase project URL and publishable key in the deployment environment.");
    else if (authError === "not-admin") setProjectActionError("Sign in with the authorized admin account.");
    else if (authError === "google-sign-in") setProjectActionError("Google sign-in failed. Check the Google provider and redirect URL in Supabase Auth settings.");
    fetch("/api/admin/session", { cache: "no-store" })
      .then((response) => response.json())
      .then((data: { authenticated?: boolean }) => {
        setIsAdmin(Boolean(data.authenticated));
        if (data.authenticated) {
          const savedAction = sessionStorage.getItem("pendingProjectAdminAction");
          if (savedAction) {
            sessionStorage.removeItem("pendingProjectAdminAction");
            try {
              const action = JSON.parse(savedAction) as { type: "edit" | "delete"; project: Project } | null;
              if (action && (action.type === "edit" || action.type === "delete") && action.project?.id) setPendingAction(action);
            } catch {
              sessionStorage.removeItem("pendingProjectAdminAction");
            }
          }
        }
      })
      .catch(() => setIsAdmin(false));
  }, []);

  const saveProject = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editingProject) return;
    setSavingProject(true);
    setProjectActionError(null);
    try {
      const response = await fetch(`/api/projects/${encodeURIComponent(editingProject.id)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingProject),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not update project.");
      setEditingProject(null);
      await fetchProjects();
    } catch (err) {
      setProjectActionError(err instanceof Error ? err.message : "Could not update project.");
    } finally {
      setSavingProject(false);
    }
  };

  const deleteProject = useCallback(async (project: Project) => {
    if (!window.confirm(`Delete “${project.title}”? This cannot be undone.`)) return;
    setBusyProjectId(project.id);
    setProjectActionError(null);
    try {
      const response = await fetch(`/api/projects/${encodeURIComponent(project.id)}`, { method: "DELETE" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not delete project.");
      setProjects((current) => current.filter((item) => item.id !== project.id));
    } catch (err) {
      setProjectActionError(err instanceof Error ? err.message : "Could not delete project.");
    } finally {
      setBusyProjectId(null);
    }
  }, []);

  useEffect(() => {
    if (!isAdmin || !pendingAction) return;
    setPendingAction(null);
    if (pendingAction.type === "edit") setEditingProject({ ...pendingAction.project });
    else void deleteProject(pendingAction.project);
  }, [deleteProject, isAdmin, pendingAction]);

  const beginProjectAction = (type: "edit" | "delete", project: Project) => {
    if (!isAdmin) {
      setPendingAction({ type, project });
      setLoginPromptOpen(true);
      setAdminLoginError(null);
      return;
    }
    setManageMenuProjectId(null);
    if (type === "edit") {
      setEditingProject({ ...project });
      setProjectActionError(null);
    } else {
      void deleteProject(project);
    }
  };

  const loginForProjectAction = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAdminLoginError(null);
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: adminPassword }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Admin sign-in failed.");

      setIsAdmin(true);
      setLoginPromptOpen(false);
      setAdminPassword("");
    } catch (err) {
      setAdminLoginError(err instanceof Error ? err.message : "Admin sign-in failed.");
    }
  };

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

            {!isAdmin ? (
              <button type="button" onClick={() => { setPendingAction(null); setAdminLoginError(null); setLoginPromptOpen(true); }} className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-brand-500 to-indigo-600 hover:from-brand-600 hover:to-indigo-700 text-white font-medium shadow-lg shadow-brand-500/25 transition-all">
                Admin sign in
              </button>
            ) : (
              <div className="flex gap-2">
                <Link href="/upload" className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-brand-500 to-indigo-600 hover:from-brand-600 hover:to-indigo-700 text-white font-medium shadow-lg shadow-brand-500/25 transition-all">
                  <PlusCircle className="w-4 h-4" /> Upload Project
                </Link>
                <button type="button" onClick={async () => { await fetch("/api/admin/logout", { method: "POST" }); setIsAdmin(false); setManageMenuProjectId(null); }} className="px-4 py-3 rounded-2xl glass-panel text-sm font-medium text-slate-600 dark:text-slate-300">Sign out</button>
              </div>
            )}
          </motion.div>
        </div>

        {error && (
          <div className="mb-8 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {projectActionError && (
          <div role="alert" className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-300 text-sm">
            {projectActionError}
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

                  {/* Project details */}
                  <div className="space-y-4 pt-2">
                    {techList.length > 0 && <div className="flex flex-wrap gap-1.5">
                      {techList.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>}

                    {/* Links Buttons */}
                    <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between gap-3">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white transition-colors"
                        >
                          <Github className="w-3.5 h-3.5" />
                          Code
                        </a>
                      )}

                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${project.githubUrl ? "flex-1" : "w-full"} inline-flex items-center justify-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl bg-brand-500 hover:bg-brand-600 text-white shadow-sm shadow-brand-500/25 transition-colors`}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Live Demo
                      </a>
                    </div>
                  </div>

                  {isAdmin && (
                    <div className="relative border-t border-slate-100 dark:border-white/5 pt-4">
                      <button type="button" aria-expanded={manageMenuProjectId === project.id} onClick={() => setManageMenuProjectId((current) => current === project.id ? null : project.id)} className="w-full rounded-xl px-3 py-2.5 text-sm font-semibold text-brand-700 dark:text-accent-300 bg-brand-500/10 hover:bg-brand-500/20">
                        Manage project
                      </button>
                      {manageMenuProjectId === project.id && (
                        <div className="absolute bottom-full right-0 z-20 mb-2 w-48 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-2 shadow-xl">
                          <button type="button" onClick={() => beginProjectAction("edit", project)} className="w-full flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">
                            <Pencil className="w-4 h-4" /> Edit project
                          </button>
                          <button type="button" disabled={busyProjectId === project.id} onClick={() => beginProjectAction("delete", project)} className="w-full flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-rose-600 hover:bg-rose-500/10 disabled:opacity-50">
                            {busyProjectId === project.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                            Delete project
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>

        {editingProject && portalReady && createPortal((
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget && !savingProject) setEditingProject(null); }}>
            <form onSubmit={saveProject} role="dialog" aria-modal="true" aria-labelledby="edit-project-title" className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl glass-panel bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 p-6 sm:p-8 shadow-2xl space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h3 id="edit-project-title" className="text-xl font-bold text-slate-900 dark:text-white">Update project</h3>
                <button type="button" aria-label="Close edit project form" disabled={savingProject} onClick={() => setEditingProject(null)} className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"><X className="w-5 h-5" /></button>
              </div>
              {projectActionError && <p role="alert" className="text-sm text-rose-500">{projectActionError}</p>}
              {([
                ["title", "Project title"],
                ["description", "Description"],
                ["tech", "Technologies (comma-separated)"],
                ["imageUrl", "Cover image URL"],
                ["githubUrl", "GitHub URL"],
                ["liveUrl", "Live demo URL"],
              ] as const).map(([field, label]) => (
                <label key={field} className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                  {label}
                  {field === "description" ? (
                    <textarea autoComplete="off" required minLength={10} rows={3} value={editingProject[field]} onChange={(event) => setEditingProject({ ...editingProject, [field]: event.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-4 py-3 text-slate-900 dark:text-white" />
                  ) : (
                    <input autoComplete={field.endsWith("Url") ? "url" : "off"} required={field !== "githubUrl"} minLength={field === "title" || field === "tech" ? 2 : undefined} type={field.endsWith("Url") ? "url" : "text"} value={editingProject[field]} onChange={(event) => setEditingProject({ ...editingProject, [field]: event.target.value })} className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-4 py-3 text-slate-900 dark:text-white" />
                  )}
                </label>
              ))}
              <button type="submit" disabled={savingProject} className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold text-white bg-gradient-to-r from-brand-500 to-indigo-600 disabled:opacity-50">
                {savingProject ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {savingProject ? "Saving changes…" : "Save project"}
              </button>
            </form>
          </div>
        ), document.body)}

        {loginPromptOpen && portalReady && createPortal((
          <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) { setPendingAction(null); setLoginPromptOpen(false); } }}>
            <div role="dialog" aria-modal="true" aria-labelledby="project-admin-login-title" className="w-full max-w-md rounded-3xl glass-panel bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 p-6 sm:p-8 shadow-2xl">
              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <h3 id="project-admin-login-title" className="text-xl font-bold text-slate-900 dark:text-white">Admin sign in required</h3>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{pendingAction ? `Sign in to ${pendingAction.type === "edit" ? "edit" : "delete"} “${pendingAction.project.title}”.` : "Sign in to manage your projects."}</p>
                </div>
                <button type="button" aria-label="Close sign-in prompt" onClick={() => { setPendingAction(null); setLoginPromptOpen(false); }} className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"><X className="w-5 h-5" /></button>
              </div>
              {adminLoginError && <p role="alert" className="mb-4 text-sm text-rose-500">{adminLoginError}</p>}
              <form onSubmit={loginForProjectAction} className="space-y-3">
                <label htmlFor="project-admin-password" className="block text-sm font-medium text-slate-700 dark:text-slate-200">Admin password</label>
                <input id="project-admin-password" type="password" autoComplete="current-password" required value={adminPassword} onChange={(event) => setAdminPassword(event.target.value)} className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-4 py-3 text-slate-900 dark:text-white" />
                <button type="submit" className="w-full rounded-xl px-4 py-3 font-semibold text-white bg-gradient-to-r from-brand-500 to-indigo-600">Sign in and continue</button>
              </form>
              <div className="my-4 text-center text-xs text-slate-400">OR</div>
              <a href="/api/admin/google" onClick={() => { if (pendingAction) sessionStorage.setItem("pendingProjectAdminAction", JSON.stringify(pendingAction)); }} className="w-full inline-flex justify-center rounded-xl px-4 py-3 font-semibold border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800">Continue with Google</a>
            </div>
          </div>
        ), document.body)}

      </div>
    </section>
  );
}
