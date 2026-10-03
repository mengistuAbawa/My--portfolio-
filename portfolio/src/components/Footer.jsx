import { FaHeart, FaGithub, FaLinkedin, FaTelegram, FaTiktok, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  const socials = [
    { icon: <FaGithub />, href: "https://github.com" },
    { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/mengistu-abawa" },
    { icon: <FaTelegram />, href: "https://t.me/mengeQuarit" },
    { icon: <FaTiktok />, href: "https://www.tiktok.com/@iambanjaw" },
    { icon: <FaEnvelope />, href: "mailto:mengistuabawa21@gmail.com" },
  ];

  return (
    <footer className="py-10 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold gradient-text mb-2">
              Mengistu.dev
            </h3>
            <p className="text-gray-400 text-sm">
              Building the future, one line of code at a time.
            </p>
          </div>

          <div className="flex gap-4">
            {socials.map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-lg glass flex items-center justify-center text-gray-400 hover:text-white hover:scale-110 transition-all"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="text-gray-400 text-sm flex items-center justify-center gap-1 flex-wrap">
            © {new Date().getFullYear()} Mengistu Abawa. Made with{" "}
            <FaHeart className="text-red-500 animate-pulse" /> using React &
            Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;