import { motion } from "framer-motion";
import { FaCode, FaLaptopCode, FaRocket, FaGraduationCap } from "react-icons/fa";

const About = ({ addedProjectsCount = 0 }) => {
  const stats = [
    {
      icon: <FaLaptopCode />,
      num: `${20 + addedProjectsCount}+`,
      label: "Projects",
      color: "text-primary",
    },
    { icon: <FaCode />, num: "3+", label: "Years Coding", color: "text-secondary" },
    { icon: <FaRocket />, num: "15+", label: "Technologies", color: "text-accent" },
    { icon: <FaGraduationCap />, num: "100%", label: "Dedication", color: "text-primary" },
  ];

  return (
    <section id="about" className="py-20 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold mb-4 gradient-text">
              Who am I?
            </h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              I'm <span className="text-white font-semibold">Mengistu Abawa</span>,
              a passionate full-stack developer with a deep love for creating
              beautiful, functional, and user-centric web applications. My
              journey in programming started with curiosity and has grown into a
              dedicated career.
            </p>
            <p className="text-gray-400 leading-relaxed mb-4">
              I specialize in modern web technologies including{" "}
              <span className="text-primary">React</span>,{" "}
              <span className="text-secondary">Node.js</span>,{" "}
              <span className="text-accent">JavaScript</span>, and various
              databases. I believe great software is built with clean code,
              thoughtful design, and continuous learning.
            </p>
            <p className="text-gray-400 leading-relaxed">
              When I'm not coding, I'm exploring new technologies, contributing
              to open-source, and helping others on their developer journey.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {["Problem Solver", "Fast Learner", "Team Player", "Detail Oriented"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm rounded-full bg-primary/20 text-primary border border-primary/30"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                className="glass rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300"
              >
                <div className={`text-4xl mb-3 ${stat.color}`}>{stat.icon}</div>
                <h4 className="text-3xl font-bold text-white mb-1">{stat.num}</h4>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;