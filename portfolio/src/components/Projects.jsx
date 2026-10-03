import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const STORAGE_KEY = "portfolio-added-projects";
const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800";

const initialProjects = [
  {
    title: "Employee Management System",
    desc: "A full-stack employee management system for organizing employee records, roles, and workplace information.",
    tech: ["React", "Node.js", "MongoDB", "Stripe"],
    gradient: "from-primary to-secondary",
    image: "/images/project1.png",
  },
  {
    title: "Task Manager App",
    desc: "Collaborative task management with real-time updates and team workspaces.",
    tech: ["Next.js", "Firebase", "Tailwind"],
    gradient: "from-primary via-secondary to-accent",
    image: "/images/Project3.png",
  },
  {
    title: "Weather Dashboard",
    desc: "Beautiful weather app with maps, forecasts, and location search.",
    tech: ["React", "API", "Chart.js"],
    gradient: "from-accent to-primary",
    image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800",
  },
  {
    title: "Portfolio CMS",
    desc: "Dynamic portfolio builder with admin dashboard and content management.",
    tech: ["Vue.js", "Express", "PostgreSQL"],
    gradient: "from-primary via-secondary to-accent",
    image: "/images/project4.png",
  },
];

const normalizeSavedProjects = (projects) => {
  if (!Array.isArray(projects)) {
    return [];
  }

  return projects.filter(
    (project) =>
      project &&
      typeof project.title === "string" &&
      project.title.trim() &&
      typeof project.desc === "string" &&
      project.desc.trim()
  );
};

const loadAddedProjects = () => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const savedProjects = window.localStorage.getItem(STORAGE_KEY);
    if (!savedProjects) {
      return [];
    }

    const parsedProjects = JSON.parse(savedProjects);
    return normalizeSavedProjects(parsedProjects);
  } catch (error) {
    console.error("Could not load saved projects from this browser.", error);
    return [];
  }
};

const Projects = ({ onProjectCountChange }) => {
  const [addedProjects, setAddedProjects] = useState(loadAddedProjects);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formError, setFormError] = useState("");
  const [formValues, setFormValues] = useState({
    title: "",
    desc: "",
    tech: "",
    image: "",
    github: "",
    demo: "",
  });
  const projects = [...initialProjects, ...normalizeSavedProjects(addedProjects)];

  useEffect(() => {
    if (typeof onProjectCountChange === "function") {
      onProjectCountChange(addedProjects.length);
    }
  }, [addedProjects.length, onProjectCountChange]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const project = {
      ...formValues,
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      tech: formValues.tech
        .split(",")
        .map((technology) => technology.trim())
        .filter(Boolean),
      image: formValues.image.trim() || DEFAULT_IMAGE,
      gradient: "from-primary to-secondary",
    };
    const updatedProjects = [...addedProjects, project];

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProjects));
    } catch (error) {
      console.error("Could not save the project in this browser.", error);
      setFormError("Could not save this project. Check your browser storage and try again.");
      return;
    }

    setAddedProjects(updatedProjects);
    setFormValues({
      title: "",
      desc: "",
      tech: "",
      image: "",
      github: "",
      demo: "",
    });
    setFormError("");
    setIsFormOpen(false);
  };

  return (
    <section id="projects" className="py-20 md:py-32 bg-darker/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
            My <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            A showcase of my recent work and side projects
          </p>
          <button
            type="button"
            onClick={() => setIsFormOpen((open) => !open)}
            aria-expanded={isFormOpen}
            className="mt-6 rounded-lg bg-gradient-to-r from-primary to-secondary px-5 py-3 font-semibold text-white transition-transform hover:scale-105"
          >
            {isFormOpen ? "Cancel" : "+ Add Project"}
          </button>
        </motion.div>

        {isFormOpen && (
          <form
            onSubmit={handleSubmit}
            className="glass mb-10 grid gap-4 rounded-2xl p-6 sm:grid-cols-2"
          >
            <label className="text-sm text-gray-300">
              Project name *
              <input
                required
                value={formValues.title}
                onChange={(event) =>
                  setFormValues({ ...formValues, title: event.target.value })
                }
                className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 p-3 text-white"
                placeholder="My new project"
              />
            </label>
            <label className="text-sm text-gray-300">
              Technologies (comma-separated)
              <input
                value={formValues.tech}
                onChange={(event) =>
                  setFormValues({ ...formValues, tech: event.target.value })
                }
                className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 p-3 text-white"
                placeholder="React, TypeScript, ..."
              />
            </label>
            <label className="text-sm text-gray-300 sm:col-span-2">
              Description *
              <textarea
                required
                value={formValues.desc}
                onChange={(event) =>
                  setFormValues({ ...formValues, desc: event.target.value })
                }
                className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 p-3 text-white"
                rows="3"
                placeholder="What did you build?"
              />
            </label>
            <label className="text-sm text-gray-300">
              Image URL
              <input
                type="url"
                value={formValues.image}
                onChange={(event) =>
                  setFormValues({ ...formValues, image: event.target.value })
                }
                className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 p-3 text-white"
                placeholder="https://..."
              />
            </label>
            <label className="text-sm text-gray-300">
              GitHub URL
              <input
                type="url"
                value={formValues.github}
                onChange={(event) =>
                  setFormValues({ ...formValues, github: event.target.value })
                }
                className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 p-3 text-white"
                placeholder="https://github.com/..."
              />
            </label>
            <label className="text-sm text-gray-300 sm:col-span-2">
              Live project URL
              <input
                type="url"
                value={formValues.demo}
                onChange={(event) =>
                  setFormValues({ ...formValues, demo: event.target.value })
                }
                className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 p-3 text-white"
                placeholder="https://..."
              />
            </label>
            {formError && (
              <p role="alert" className="text-sm text-red-400 sm:col-span-2">
                {formError}
              </p>
            )}
            <button
              type="submit"
              className="rounded-lg bg-gradient-to-r from-primary to-secondary px-5 py-3 font-semibold text-white sm:col-span-2"
            >
              Save Project
            </button>
          </form>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((p, i) => (
            <motion.div
              key={p.id || p.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group glass rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-tr ${p.gradient} opacity-60 group-hover:opacity-80 transition-opacity`}></div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-white">{p.title}</h3>
                <p className="text-gray-400 mb-4 text-sm">{p.desc}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2 py-1 rounded-md bg-white/5 text-gray-300 border border-white/10"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${p.title} GitHub repository`}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <FaGithub />
                    </a>
                  )}
                  {p.demo && (
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${p.title} live project`}
                      className="text-gray-400 hover:text-primary transition-colors"
                    >
                      <FaExternalLinkAlt />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;