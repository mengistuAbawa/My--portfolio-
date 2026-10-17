"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, Loader2, ArrowLeft, Send } from "lucide-react";
import Link from "next/link";

const projectSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  tech: z.string().min(2, "Tech stack is required (comma-separated)"),
  imageUrl: z.string().url("Must be a valid cover image URL (e.g. https://images.unsplash.com/...)"),
  githubUrl: z.string().url("Must be a valid GitHub URL (e.g. https://github.com/...)"),
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

      {/* Form Container */}
      <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-2xl relative">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200/60 dark:border-white/10">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Add New Project
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Store a project in SQLite via Prisma and showcase it live
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
            <label className="block text-xs font-mono font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1.5">
              Project Title *
            </label>
            <input
              type="text"
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
            <label className="block text-xs font-mono font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1.5">
              Description *
            </label>
            <textarea
              rows={3}
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
            <label className="block text-xs font-mono font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1.5">
              Technologies (comma-separated) *
            </label>
            <input
              type="text"
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
            <label className="block text-xs font-mono font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1.5">
              Cover Image URL *
            </label>
            <input
              type="url"
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
              <label className="block text-xs font-mono font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1.5">
                GitHub Repository URL *
              </label>
              <input
                type="url"
                placeholder="https://github.com/..."
                {...register("githubUrl", { required: "GitHub URL is required" })}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm transition-all"
              />
              {errors.githubUrl && (
                <p className="text-rose-500 text-xs mt-1">{errors.githubUrl.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-mono font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1.5">
                Live Demo URL *
              </label>
              <input
                type="url"
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
                  Saving to SQLite...
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
