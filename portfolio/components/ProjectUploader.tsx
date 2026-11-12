"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, Loader2, ArrowLeft, Send, ImagePlus, LogOut } from "lucide-react";
import Link from "next/link";

const projectSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  tech: z.string().min(2, "Tech stack is required (comma-separated)"),
  imageUrl: z.string().url("Must be a valid cover image URL (e.g. https://images.unsplash.com/...)"),
  githubUrl: z.string().url("Must be a valid GitHub URL (e.g. https://github.com/...)").or(z.literal("")),
  liveUrl: z.string().url("Must be a valid Live demo URL (e.g. https://...)"),
});

type ProjectFormData = {
  title: string;
  description: string;
  tech: string;
  imageUrl: string;
  githubUrl: string;
  liveUrl: string;
};

export default function ProjectUploader() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [savingImage, setSavingImage] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<ProjectFormData>({
    defaultValues: {
      title: "",
      description: "",
      tech: "",
      imageUrl: "",
      githubUrl: "",
      liveUrl: "",
    },
  });

  useEffect(() => {
    fetch("/api/admin/session", { cache: "no-store" })
      .then((response) => response.json())
      .then((data: { authenticated?: boolean }) => setAuthenticated(Boolean(data.authenticated)))
      .catch(() => setAuthError("Could not check admin login."))
      .finally(() => setCheckingAuth(false));
  }, []);

  const login = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAuthError("");
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Sign in failed.");
      setPassword("");
      setAuthenticated(true);
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : "Sign in failed. Please try again.");
    }
  };

  const saveProfileImage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!profileFile) return;
    setSavingImage(true);
    setToast(null);
    try {
      const image = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => typeof reader.result === "string" ? resolve(reader.result) : reject(new Error("Could not read image."));
        reader.onerror = () => reject(new Error("Could not read image."));
        reader.readAsDataURL(profileFile);
      });
      const response = await fetch("/api/profile-image", {
        method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ image }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not save image.");
      setToast({ type: "success", message: "Home profile image updated." });
      setProfileFile(null);
      router.refresh();
    } catch (err) {
      setToast({ type: "error", message: err instanceof Error ? err.message : "Could not save image." });
    } finally {
      setSavingImage(false);
    }
  };

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthenticated(false);
  };

  if (checkingAuth) return <div className="glass-panel p-8 rounded-3xl text-center text-slate-600 dark:text-slate-300">Checking admin access…</div>;

  if (!authenticated) {
    const params = new URLSearchParams(typeof window === "undefined" ? "" : window.location.search);
    const googleMessage = params.get("authError") === "supabase-not-configured"
      ? "Set the Supabase project URL and publishable key in the deployment environment."
      : params.get("authError") === "not-admin"
        ? "That Google account is not authorized to manage this site."
        : params.get("authError") ? "Google sign-in is unavailable. Enable the Google provider in Supabase Authentication > Sign In / Providers, or use password sign-in." : "";
    return (
      <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-2xl max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Admin sign in</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 mb-6">Sign in with the portfolio admin account to update the home image or publish projects.</p>
        {(authError || googleMessage) && <p role="alert" className="mb-4 text-sm text-rose-500">{authError || googleMessage}</p>}
        <form onSubmit={login} className="space-y-4">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200" htmlFor="admin-password">Admin password</label>
          <input id="admin-password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white" />
          <button className="w-full rounded-xl px-4 py-3 font-semibold text-white bg-gradient-to-r from-brand-500 to-indigo-600">Sign in with password</button>
        </form>
        <div className="my-5 text-center text-xs text-slate-400">OR</div>
        <a href="/api/admin/google" className="w-full inline-flex justify-center rounded-xl px-4 py-3 font-semibold border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800">Continue with Google</a>
      </div>
    );
  }

  const onSubmit = async (data: ProjectFormData) => {
    // Validate with Zod
    const validation = projectSchema.safeParse(data);
    if (!validation.success) {
      const fieldErrors = validation.error.flatten().fieldErrors;
      if (fieldErrors.title) setError("title", { message: fieldErrors.title[0] });
      if (fieldErrors.description) setError("description", { message: fieldErrors.description[0] });
      if (fieldErrors.tech) setError("tech", { message: fieldErrors.tech[0] });
      if (fieldErrors.imageUrl) setError("imageUrl", { message: fieldErrors.imageUrl[0] });
      if (fieldErrors.githubUrl) setError("githubUrl", { message: fieldErrors.githubUrl[0] });
      if (fieldErrors.liveUrl) setError("liveUrl", { message: fieldErrors.liveUrl[0] });
      return;
    }

    setSubmitting(true);
    setToast(null);

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save project");
      }

      setToast({
        type: "success",
        message: "Project successfully uploaded and added to the portfolio!",
      });
      reset();

      setTimeout(() => {
        router.push("/#projects");
        router.refresh();
      }, 1500);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred.";
      setToast({
        type: "error",
        message: errorMessage,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6 flex items-center justify-between rounded-2xl border border-slate-200/80 dark:border-white/10 glass-panel px-4 py-3">
        <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Admin session active</span>
        <button type="button" onClick={logout} className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 hover:text-rose-500">
          <LogOut className="w-4 h-4" /> Sign out
        </button>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={`mb-6 p-4 rounded-2xl flex items-center gap-3 border shadow-lg ${
              toast.type === "success"
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                : "bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400"
            }`}
          >
            {toast.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
            )}
            <span className="text-sm font-medium">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={saveProfileImage} className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-xl mb-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Update home profile image</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 mb-5">Upload a JPEG, PNG, WebP, or GIF image up to 2 MB.</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <label htmlFor="profile-image-file" className="sr-only">Choose a home profile image</label>
          <input id="profile-image-file" type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={(event) => setProfileFile(event.target.files?.[0] ?? null)} required className="min-w-0 flex-1 text-sm text-slate-600 dark:text-slate-300 file:mr-4 file:rounded-lg file:border-0 file:bg-brand-500/10 file:px-4 file:py-2 file:font-semibold file:text-brand-600 dark:file:text-accent-300" />
          <button type="submit" disabled={!profileFile || savingImage} className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold text-white bg-gradient-to-r from-brand-500 to-indigo-600 disabled:opacity-50">
            {savingImage ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImagePlus className="w-4 h-4" />}
            {savingImage ? "Saving image…" : "Update home image"}
          </button>
        </div>
      </form>

      {/* Form Container */}
      <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-2xl relative">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200/60 dark:border-white/10">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Add New Project
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Save a project to the configured portfolio database and showcase it live
            </p>
          </div>
          <Link
            href="/#projects"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back
          </Link>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Title */}
          <div>
            <label htmlFor="project-title" className="block text-xs font-mono font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1.5">
              Project Title *
            </label>
            <input
              id="project-title"
              type="text"
              autoComplete="off"
              placeholder="e.g. AI-Powered SaaS Content Generator"
              {...register("title", { required: "Project title is required" })}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm transition-all"
            />
            {errors.title && (
              <p className="text-rose-500 text-xs mt-1">{errors.title.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="project-description" className="block text-xs font-mono font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1.5">
              Description *
            </label>
            <textarea
              id="project-description"
              rows={3}
              autoComplete="off"
              placeholder="Brief summary of architecture, features, and technical value..."
              {...register("description", { required: "Description is required" })}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm transition-all resize-none"
            />
            {errors.description && (
              <p className="text-rose-500 text-xs mt-1">{errors.description.message}</p>
            )}
          </div>

          {/* Tech Stack */}
          <div>
            <label htmlFor="project-tech" className="block text-xs font-mono font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1.5">
              Technologies (comma-separated) *
            </label>
            <input
              id="project-tech"
              type="text"
              autoComplete="off"
              placeholder="Next.js 14, TypeScript, TailwindCSS, Prisma, SQLite"
              {...register("tech", { required: "Tech stack is required" })}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm transition-all"
            />
            {errors.tech && (
              <p className="text-rose-500 text-xs mt-1">{errors.tech.message}</p>
            )}
          </div>

          {/* Image URL */}
          <div>
            <label htmlFor="project-image-url" className="block text-xs font-mono font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1.5">
              Cover Image URL *
            </label>
            <input
              id="project-image-url"
              type="url"
              autoComplete="url"
              placeholder="https://images.unsplash.com/photo-..."
              {...register("imageUrl", { required: "Image URL is required" })}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm transition-all"
            />
            {errors.imageUrl && (
              <p className="text-rose-500 text-xs mt-1">{errors.imageUrl.message}</p>
            )}
          </div>

          {/* URLs row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="project-github-url" className="block text-xs font-mono font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1.5">
                GitHub Repository URL (optional)
              </label>
              <input
                id="project-github-url"
                type="url"
                autoComplete="url"
                placeholder="https://github.com/..."
                {...register("githubUrl")}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm transition-all"
              />
              {errors.githubUrl && (
                <p className="text-rose-500 text-xs mt-1">{errors.githubUrl.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="project-live-url" className="block text-xs font-mono font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1.5">
                Live Demo URL *
              </label>
              <input
                id="project-live-url"
                type="url"
                autoComplete="url"
                placeholder="https://yourproject.com"
                {...register("liveUrl", { required: "Live URL is required" })}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm transition-all"
              />
              {errors.liveUrl && (
                <p className="text-rose-500 text-xs mt-1">{errors.liveUrl.message}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={submitting}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-brand-500 via-indigo-600 to-accent-400 hover:from-brand-600 hover:to-indigo-700 text-white font-semibold shadow-lg shadow-brand-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99]"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Publishing project...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Publish Project
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
