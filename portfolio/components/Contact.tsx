"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Send,
  Github,
  Video,
  Copy,
  Check,
  ExternalLink,
  MessageSquare,
  User,
  FileText,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { personalInfo } from "@/lib/data";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  // Contact form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setToast({
        type: "error",
        message: "Please fill in your name, email, and message.",
      });
      return;
    }

    setIsSubmitting(true);
    setToast(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send message. Please try again.");
      }

      setToast({
        type: "success",
        message: "Thank you! Your message has been sent directly to Mengistu.",
      });

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "An error occurred while sending.";
      setToast({
        type: "error",
        message: errorMsg,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generate mailto link for direct client opening
  const mailtoUrl = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
    formData.subject || `Inquiry from ${formData.name || "Portfolio Visitor"}`
  )}&body=${encodeURIComponent(
    `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
  )}`;

  const contactChannels = [
    {
      label: "Direct Email",
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      icon: Mail,
      gradient: "from-rose-500 to-amber-500",
      isCopy: true,
    },
    {
      label: "Telegram",
      value: personalInfo.telegramHandle,
      href: personalInfo.telegramUrl,
      icon: Send,
      gradient: "from-sky-400 to-indigo-500",
      isCopy: false,
    },
    {
      label: "TikTok",
      value: `@${personalInfo.tiktokHandle}`,
      href: personalInfo.tiktokUrl,
      icon: Video,
      gradient: "from-fuchsia-500 to-pink-500",
      isCopy: false,
    },
    {
      label: "GitHub",
      value: personalInfo.githubHandle,
      href: personalInfo.githubUrl,
      icon: Github,
      gradient: "from-slate-700 to-slate-900",
      isCopy: false,
    },
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-slate-50/50 dark:bg-[#080d16]/50">
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
            <MessageSquare className="w-3.5 h-3.5" />
            Let&apos;s Connect
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white"
          >
            Get In Touch &{" "}
            <span className="bg-gradient-to-r from-brand-500 via-indigo-600 to-accent-400 bg-clip-text text-transparent">
              Collaborate
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300"
          >
            Have a project in mind, an engineering opening, or want to discuss modern web architecture? Reach out via any platform below or send a message directly.
          </motion.p>
        </div>

        {/* 4 Contact Channels Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactChannels.map((channel, index) => {
            const Icon = channel.icon;
            return (
              <motion.div
                key={channel.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group p-6 rounded-3xl glass-panel relative overflow-hidden border border-slate-200/80 dark:border-white/10 shadow-lg shadow-indigo-500/5 hover:border-brand-500/40 dark:hover:border-accent-400/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Icon in gradient square */}
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${channel.gradient} flex items-center justify-center text-white mb-5 shadow-md shadow-brand-500/10 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-7 h-7" />
                  </div>

                  <p className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    {channel.label}
                  </p>
                  <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-1 break-all">
                    {channel.value}
                  </p>
                </div>

                {/* Bottom Action */}
                <div className="pt-6 mt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                  {channel.isCopy ? (
                    <button
                      onClick={handleCopyEmail}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 dark:text-accent-400 hover:opacity-80 transition-opacity"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                          <span className="text-emerald-500">Copied to clipboard!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Address</span>
                        </>
                      )}
                    </button>
                  ) : (
                    <a
                      href={channel.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 dark:text-accent-400 hover:opacity-80 transition-opacity"
                    >
                      <span>Open Link</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}

                  <span className="text-[10px] font-mono text-slate-400">
                    24h response
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* DIRECT EMAIL CONTACT FORM WITH TEXT AREA (NEW)                            */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-2xl relative overflow-hidden">
            {/* Top decorative gradient line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-500 via-indigo-600 to-accent-400" />

            {/* Header info */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider text-brand-600 dark:text-accent-400 bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800/40 mb-2">
                <Sparkles className="w-3 h-3 text-accent-400" />
                Send a Message Directly
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                Email Mengistu Directly
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Type your message below. It will be dispatched straight to{" "}
                <span className="font-mono text-brand-600 dark:text-accent-400 font-semibold">
                  {personalInfo.email}
                </span>{" "}
                and stored securely.
              </p>
            </div>

            {/* Toast Notification */}
            <AnimatePresence>
              {toast && (
                <motion.div
                  initial={{ opacity: 0, y: -15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -15, scale: 0.95 }}
                  className={`mb-6 p-4 rounded-2xl flex items-center gap-3 border shadow-md ${
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

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-mono font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-brand-500" />
                    Your Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Alex Johnson"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm transition-all"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="contact-email" className="block text-xs font-mono font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-accent-400" />
                    Your Email *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="e.g. alex@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm transition-all"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="contact-subject" className="block text-xs font-mono font-semibold uppercase text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-indigo-500" />
                  Subject
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  autoComplete="off"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. Full-Stack Web Development Project / Consultation"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm transition-all"
                />
              </div>

              {/* Message (Textarea) */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label htmlFor="contact-message" className="block text-xs font-mono font-semibold uppercase text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-brand-500" />
                    Message *
                  </label>
                  <span className="text-[11px] font-mono text-slate-400">
                    {formData.message.length} characters
                  </span>
                </div>
                <textarea
                  id="contact-message"
                  name="message"
                  autoComplete="off"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Hello Mengistu, I came across your portfolio and would love to discuss a project..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm transition-all resize-y min-h-[120px]"
                />
              </div>

              {/* Submit & Mail Client Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-brand-500 via-indigo-600 to-accent-400 hover:from-brand-600 hover:to-indigo-700 text-white font-semibold shadow-lg shadow-brand-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending Email...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>

                <a
                  href={mailtoUrl}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl glass-panel text-slate-700 dark:text-slate-200 hover:text-brand-600 dark:hover:text-white text-sm font-medium hover:scale-[1.01] active:scale-[0.99] transition-all"
                  title="Open message directly in your default email client"
                >
                  <Mail className="w-4 h-4 text-rose-500" />
                  <span>Open in Mail App</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                </a>
              </div>
            </form>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
