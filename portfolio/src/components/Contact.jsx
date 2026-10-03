import { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  FaEnvelope,
  FaTelegram,
  FaLinkedin,
  FaTiktok,
  FaPaperPlane,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";

const Contact = () => {
  const formRef = useRef();
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus(null);

    const { VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY } =
      import.meta.env;

    if (!VITE_EMAILJS_SERVICE_ID || !VITE_EMAILJS_TEMPLATE_ID || !VITE_EMAILJS_PUBLIC_KEY) {
      console.error("EmailJS is not configured. Set the required VITE_EMAILJS_* variables.");
      setStatus("error");
      return;
    }

    setLoading(true);

    emailjs
      .sendForm(
        VITE_EMAILJS_SERVICE_ID,
        VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setStatus("success");
          setFormData({ user_name: "", user_email: "", subject: "", message: "" });
          setLoading(false);
          setTimeout(() => setStatus(null), 5000);
        },
        (error) => {
          console.error(error);
          setStatus("error");
          setLoading(false);
          setTimeout(() => setStatus(null), 5000);
        }
      );
  };

  const contacts = [
    {
      icon: <FaEnvelope />,
      label: "Email",
      value: "mengistuabawa21@gmail.com",
      href: "mailto:mengistuabawa21@gmail.com",
      color: "from-red-500 to-orange-500",
    },
    {
      icon: <FaTelegram />,
      label: "Telegram",
      value: "@mengeQuarit",
      href: "https://t.me/mengeQuarit",
      color: "from-sky-500 to-blue-500",
    },
    {
      icon: <FaTiktok />,
      label: "TikTok",
      value: "iambanjaw",
      href: "https://www.tiktok.com/@iambanjaw",
      color: "from-pink-500 to-purple-500",
    },
    {
      icon: <FaLinkedin />,
      label: "LinkedIn",
      value: "Mengistu Abawa",
      href: "https://www.linkedin.com/in/mengistu-abawa",
      color: "from-blue-600 to-cyan-500",
    },
  ];

  return (
    <section id="contact" className="py-20 md:py-32 bg-darker/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Have a project in mind? Let's build something amazing together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6 text-white">
              Let's Connect
            </h3>
            <p className="text-gray-400 mb-8 leading-relaxed">
              I'm always open to discussing new projects, creative ideas, or
              opportunities. Feel free to reach out through any channel below.
            </p>

            <div className="space-y-4">
              {contacts.map((c, i) => (
                <motion.a
                  key={i}
                  href={c.href}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass rounded-xl p-4 flex items-center gap-4 hover:scale-[1.02] transition-transform group"
                >
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${c.color} flex items-center justify-center text-white text-xl group-hover:rotate-12 transition-transform`}
                  >
                    {c.icon}
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">{c.label}</p>
                    <p className="text-white font-semibold break-all">{c.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-6 sm:p-8"
          >
            <h3 className="text-2xl font-bold mb-6 text-white">
              Send me a Message
            </h3>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="user_name"
                  value={formData.user_name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                />
                <input
                  type="email"
                  name="user_email"
                  value={formData.user_email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                required
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message..."
                rows="5"
                required
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors resize-none"
              ></textarea>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  "Sending..."
                ) : (
                  <>
                    <FaPaperPlane /> Send Message
                  </>
                )}
              </button>

              {status === "success" && (
                <div className="flex items-center gap-2 text-green-400 text-sm">
                  <FaCheckCircle /> Message sent successfully!
                </div>
              )}
              {status === "error" && (
                <div className="flex items-center gap-2 text-red-400 text-sm">
                  <FaExclamationCircle /> Failed to send. Please try email directly.
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;