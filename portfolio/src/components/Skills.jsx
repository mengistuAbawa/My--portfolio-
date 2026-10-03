import { motion } from "framer-motion";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";

const Skills = () => {
  const radarData = [
    { skill: "Frontend", level: 90 },
    { skill: "Backend", level: 85 },
    { skill: "Database", level: 80 },
    { skill: "DevOps", level: 70 },
    { skill: "UI/UX", level: 75 },
    { skill: "Mobile", level: 65 },
  ];

  const barData = [
    { name: "HTML/CSS", level: 95, color: "#e34c26" },
    { name: "JavaScript", level: 92, color: "#f7df1e" },
    { name: "React", level: 90, color: "#61dafb" },
    { name: "Node.js", level: 85, color: "#68a063" },
    { name: "Python", level: 80, color: "#3776ab" },
    { name: "MongoDB", level: 82, color: "#4db33d" },
    { name: "TypeScript", level: 78, color: "#3178c6" },
    { name: "Tailwind", level: 88, color: "#38bdf8" },
  ];

  const skillList = [
    { name: "HTML5", level: 95, color: "from-orange-500 to-red-500" },
    { name: "CSS3", level: 93, color: "from-blue-500 to-cyan-500" },
    { name: "JavaScript", level: 92, color: "from-yellow-400 to-yellow-600" },
    { name: "React.js", level: 90, color: "from-cyan-400 to-blue-500" },
    { name: "Node.js", level: 85, color: "from-green-500 to-emerald-600" },
    { name: "Python", level: 80, color: "from-blue-600 to-indigo-600" },
    { name: "MongoDB", level: 82, color: "from-green-400 to-green-600" },
    { name: "TypeScript", level: 78, color: "from-blue-500 to-blue-700" },
    { name: "Tailwind CSS", level: 88, color: "from-sky-400 to-cyan-500" },
    { name: "Git/GitHub", level: 90, color: "from-gray-500 to-gray-700" },
    { name: "REST API", level: 87, color: "from-purple-500 to-pink-500" },
    { name: "Next.js", level: 82, color: "from-gray-300 to-gray-500" },
  ];

  return (
    <section id="skills" className="py-20 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
            My <span className="gradient-text">Skills</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Technologies and tools I use to build modern applications
          </p>
        </motion.div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Radar Chart */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-6"
          >
            <h3 className="text-xl font-bold mb-4 text-center gradient-text">
              Skill Distribution
            </h3>
            <ResponsiveContainer width="100%" height={350}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="skill" tick={{ fill: "#cbd5e1", fontSize: 12 }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: "#64748b", fontSize: 10 }} />
                <Radar
                  name="Level"
                  dataKey="level"
                  stroke="#6366f1"
                  fill="#6366f1"
                  fillOpacity={0.5}
                />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Bar Chart */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-6"
          >
            <h3 className="text-xl font-bold mb-4 text-center gradient-text">
              Tech Proficiency
            </h3>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 10 }} angle={-30} textAnchor="end" height={60} />
                <YAxis tick={{ fill: "#94a3b8", fontSize: 10 }} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{
                    background: "#0f172a",
                    border: "1px solid #334155",
                    borderRadius: "8px",
                    color: "#f1f5f9",
                  }}
                />
                <Bar dataKey="level" radius={[8, 8, 0, 0]}>
                  {barData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Animated Skill Bars */}
        <div className="grid sm:grid-cols-2 gap-6">
          {skillList.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass rounded-xl p-4"
            >
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-white">{skill.name}</span>
                <span className="text-gray-400 text-sm">{skill.level}%</span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: i * 0.05 }}
                  className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                ></motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;