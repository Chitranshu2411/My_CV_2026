import { motion } from "framer-motion";
import { Server, Code, Database, Cloud, Brain, Terminal, Shield } from "lucide-react";

interface SkillsProps {
  darkMode: boolean;
  skillsData?: any;
}

const skillCategories = [
  {
    title: "Backend Architecture",
    icon: <Server className="text-purple-400" size={20} />,
    skills: ["Java", "Spring Boot", "Spring MVC", "Spring Security", "Spring AI", "JWT", "REST APIs", "Microservices"],
    accent: "rgba(170, 59, 255, 0.4)",
    glow: "shadow-[0_0_20px_rgba(170,59,255,0.15)]",
  },
  {
    title: "Frontend Development",
    icon: <Code className="text-cyan-400" size={20} />,
    skills: ["React.js", "Redux Toolkit", "Tailwind CSS", "JavaScript (ES6+)", "HTML5", "CSS3"],
    accent: "rgba(6, 182, 212, 0.4)",
    glow: "shadow-[0_0_20px_rgba(6,182,212,0.15)]",
  },
  {
    title: "Databases & Storage",
    icon: <Database className="text-emerald-400" size={20} />,
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Spring Data JPA", "SQL Tuning"],
    accent: "rgba(16, 185, 129, 0.4)",
    glow: "shadow-[0_0_20px_rgba(16,185,129,0.15)]",
  },
  {
    title: "Cloud & DevOps",
    icon: <Cloud className="text-blue-400" size={20} />,
    skills: ["Docker", "Kubernetes", "CI/CD Pipelines", "GitHub Actions", "Nginx"],
    accent: "rgba(59, 130, 246, 0.4)",
    glow: "shadow-[0_0_20px_rgba(59,130,246,0.15)]",
  },
  {
    title: "AI & Integrations",
    icon: <Brain className="text-pink-400" size={20} />,
    skills: ["OpenAI API", "Gemini API", "LangChain", "RAG Framework", "Twilio API", "Razorpay Payment", "Cloudinary"],
    accent: "rgba(236, 72, 153, 0.4)",
    glow: "shadow-[0_0_20px_rgba(236,72,153,0.15)]",
  },
  {
    title: "Tools & Workflow",
    icon: <Terminal className="text-amber-400" size={20} />,
    skills: ["Git", "GitHub", "Postman", "Swagger UI", "IntelliJ IDEA", "VS Code", "Grafana", "Maven"],
    accent: "rgba(245, 158, 11, 0.4)",
    glow: "shadow-[0_0_20px_rgba(245,158,11,0.15)]",
  },
];

export default function Skills({ darkMode, skillsData }: SkillsProps) {
  const categoriesList = skillsData?.length
    ? skillsData.map((c: any) => {
        let iconEl = <Server className="text-purple-400" size={20} />;
        if (c.icon === "Code") iconEl = <Code className="text-cyan-400" size={20} />;
        else if (c.icon === "Database") iconEl = <Database className="text-emerald-400" size={20} />;
        else if (c.icon === "Cloud") iconEl = <Cloud className="text-blue-400" size={20} />;
        else if (c.icon === "Brain") iconEl = <Brain className="text-pink-400" size={20} />;
        else if (c.icon === "Terminal") iconEl = <Terminal className="text-amber-400" size={20} />;

        return {
          title: c.category,
          icon: iconEl,
          skills: c.skills,
          accent: c.accent || "rgba(170, 59, 255, 0.4)",
          glow: c.glow || "shadow-[0_0_20px_rgba(170,59,255,0.15)]",
        };
      })
    : skillCategories;
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants: any = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 80, damping: 15 },
    },
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-cyan-600/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">Technical Stack</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-cyan-400 mx-auto mt-3 rounded-full"></div>
          <p className="mt-4 text-slate-400 max-w-xl mx-auto text-sm">
            Categorized checklist of technologies I utilize for scaling backends and creating responsive web platforms.
          </p>
        </div>

        {/* Skills Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {categoriesList.map((category: any, idx: number) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -6, boxShadow: `0 12px 30px -10px ${category.accent}` }}
              className={`glass-panel p-6 rounded-2xl border transition-all duration-300 ${category.glow} bg-slate-950/20 border-slate-800`}
            >
              {/* Card Header */}
              <div className="flex items-center gap-3 mb-5 border-b border-white/5 pb-3">
                <div className="p-2 rounded-lg bg-slate-900/80 border border-white/5">{category.icon}</div>
                <h3 className="font-bold text-base text-white font-display">{category.title}</h3>
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    whileHover={{ scale: 1.05 }}
                    className="px-3 py-1.5 rounded-lg text-xs font-mono border transition-all cursor-default bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
