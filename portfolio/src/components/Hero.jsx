import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTelegram, FaEnvelope, FaDownload } from "react-icons/fa";

const Hero = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }}></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "4s" }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="order-2 md:order-1 text-center md:text-left"
        >
          <p className="text-accent font-semibold mb-3 tracking-widest uppercase">
            Hello, I'm
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight">
            Mengistu <span className="gradient-text">Abawa Bayih</span>
          </h1>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-300 mb-6">
            Full-Stack <span className="text-primary">Developer</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto md:mx-0 mb-8 leading-relaxed">
            I craft modern, scalable web applications with cutting-edge
            technologies. Passionate about building elegant solutions to
            complex problems with clean, efficient code.
          </p>

          <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-8">
            <a
              href="#contact"
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:scale-105 transition-transform shadow-lg shadow-primary/50"
            >
              Hire Me
            </a>
            <a
              href="#projects"
              className="px-6 py-3 rounded-lg glass text-white font-semibold hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              <FaDownload /> View Projects
            </a>
          </div>

          <div className="flex gap-4 justify-center md:justify-start">
            {[
              { icon: <FaGithub />, href: "https://github.com", color: "hover:text-white" },
              { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/mengistu-abawa", color: "hover:text-blue-400" },
              { icon: <FaTelegram />, href: "https://t.me/mengeQuarit", color: "hover:text-sky-400" },
              { icon: <FaEnvelope />, href: "mailto:mengistuabawa21@gmail.com", color: "hover:text-red-400" },
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className={`text-2xl text-gray-400 ${social.color} transition-colors`}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="order-1 md:order-2 flex justify-center"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary via-secondary to-accent rounded-full blur-2xl opacity-50 animate-pulse"></div>
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full p-1 bg-gradient-to-tr from-primary via-secondary to-accent">
              <img
                src="/images/profile.jpg"
                alt="Mengistu Abawa"
                className="w-full h-full rounded-full object-cover border-4 border-darker"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;