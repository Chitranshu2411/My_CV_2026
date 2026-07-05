import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Cpu, Layout, Server, Sparkles } from "lucide-react";
import { Github } from "./Icons";

export interface Project {
  title: string;
  category: string;
  tech: string[];
  desc: string;
  architecture: string;
  achievements: string[];
  github?: string;
  live?: string;
  glowColor: string;
}

interface ProjectsProps {
  darkMode: boolean;
  projectsData?: Project[];
}

const fallbackProjects = [
  {
    title: "AI Code Generation SaaS",
    category: "AI & Distributed Systems",
    tech: ["Spring Boot", "Spring AI", "React.js", "Kubernetes", "Docker", "SSE Streaming"],
    desc: "A multi-tenant SaaS platform that generates fully operational backend/frontend files in real-time, capable of autoscaling under heavy request volumes.",
    architecture: "React SPA client -> Kubernetes Ingress -> Spring Boot Backend running Spring AI -> OpenAI/Gemini APIs. PostgreSQL stores tenants' context. Kubernetes Horizontal Pod Autoscaler handles peaks.",
    achievements: [
      "Engineered real-time server-sent events (SSE) to stream generated code tokens dynamically.",
      "Optimized Docker container sizes and startup time, enabling Kubernetes pod replication in under 4 seconds.",
      "Tested architecture to sustain 50,000+ code requests/day with multi-tenant rate limits.",
    ],
    github: "https://github.com/Chitranshu2411/CodeNova-AI",
    // live: "https://google.com",
    glowColor: "hover:border-purple-500/50 hover:shadow-purple-500/10",
  },
  {
    title: "Dr. Jivika — AI Healthcare",
    category: "Healthcare & AI Assistant",
    tech: ["React.js", "Spring Boot", "MySQL", "Tailwind CSS", "OpenAI Chat API"],
    desc: "An intelligent healthcare coordinator system that processes symptoms, maps consultations, and automates patient dashboard operations.",
    architecture: "React Client -> REST Controller -> Spring Security -> Chatbot Symptom Analysis Service -> MySQL DB for booking and medical records.",
    achievements: [
      "Designed an AI-powered diagnostic chatbot using OpenAI models to parse natural language health symptoms.",
      "Developed a real-time doctor appointment scheduler with conflict resolution rules and email templates.",
      "Implemented a secure medicine inventory ordering system with instant checkout.",
    ],
    github: "https://github.com/Chitranshu2411/Dr.-Jivika-",
   // live: "https://google.com",
    glowColor: "hover:border-cyan-500/50 hover:shadow-cyan-500/10",
  },
  {
  title: "SkillSensei — AI Career & Learning Platform",
  category: "EdTech & Career Guidance",
  tech: [
    "React.js",
    "Spring Boot",
    "Spring AI",
    "PostgreSQL",
    "Spring Security",
    "JWT",
    "TailwindCSS"
  ],
  desc: "An AI-powered career guidance and learning platform that helps students discover career paths, generate personalized learning roadmaps, analyze resumes, and prepare for interviews through intelligent recommendations.",

  architecture:
    "React Frontend -> JWT Authentication -> Spring Boot REST APIs -> Spring AI Service Layer -> PostgreSQL Database -> Gemini/OpenAI LLMs.",

  achievements: [
    "Built an AI-powered career assistant providing personalized career recommendations, skill-gap analysis, and roadmap generation.",
    
    "Integrated LLM-based chatbot capabilities for resume feedback, interview preparation, and learning guidance using Spring AI.",
    
    "Developed secure JWT authentication, role-based access control, and scalable REST APIs with Spring Boot and PostgreSQL.",
    
    "Designed responsive dashboards and learning modules with React.js and TailwindCSS, delivering a modern user experience.",
  ],

  github: "https://github.com/Chitranshu2411/SKILL-SENSEI-PROJECT",
 // live: "https://skillsensei.vercel.app",

  glowColor:
    "hover:border-pink-500/50 hover:shadow-pink-500/10",
},
  {
    title: "YatraAI — Smart Travel Planner",
    category: "AI Travel Engine",
    tech: ["React.js", "Spring Boot", "PostgreSQL", "Tailwind CSS", "Spring AI"],
    desc: "A smart itinerary generator that processes budgets, travel timelines, and preferences to draft custom, interactive maps.",
    architecture: "React Dashboard -> Spring Boot Web MVC Client -> Gemini Model Endpoint -> PostgreSQL Geolocation index.",
    achievements: [
      "Designed a responsive dashboard featuring weather data widgets and destination maps.",
      "Programmed structured Prompt Templates in Spring AI to ensure output conforms to standard JSON maps.",
      "Optimized itinerary calculation times by caching frequent routes inside PostgreSQL memory stores.",
    ],
    //github: "https://github.com/Chitranshu2411",
    //live: "https://google.com",
    glowColor: "hover:border-amber-500/50 hover:shadow-amber-500/10",
  },
];

export default function Projects({ darkMode, projectsData }: ProjectsProps) {
  const activeProjects = projectsData?.length ? projectsData : fallbackProjects;
  const [activeDetails, setActiveDetails] = useState<{ [key: number]: "arch" | "achieve" | null }>({});

  const toggleDetail = (idx: number, type: "arch" | "achieve") => {
    setActiveDetails((prev) => {
      const current = prev[idx];
      return {
        ...prev,
        [idx]: current === type ? null : type,
      };
    });
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/3 right-10 w-96 h-96 rounded-full bg-cyan-600/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">Featured Projects</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-cyan-400 mx-auto mt-3 rounded-full"></div>
          <p className="mt-4 text-slate-400 max-w-xl mx-auto text-sm">
            Scalable SaaS products, AI pipelines, and distributed applications built from scratch.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {activeProjects.map((project, idx) => {
            const activeType = activeDetails[idx] || null;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`glass-panel rounded-2xl border p-6 flex flex-col justify-between transition-all duration-300 ${
                  project.glowColor
                } bg-slate-950/20 border-slate-800`}
              >
                <div>
                  {/* Category and Title */}
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 font-mono">
                      {project.category}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-white/5 border border-white/5 px-2 py-0.5 rounded">
                      <Sparkles size={12} className="text-cyan-400" />
                      <span>AI Integrated</span>
                    </div>
                  </div>
                  <h3 className="font-display text-xl font-bold text-white mb-3 hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tech.map((badge) => (
                      <span
                        key={badge}
                        className="px-2 py-1 rounded text-[10px] font-mono bg-slate-900/80 border border-white/5 text-slate-300"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>

                  {/* Description */}
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                    {project.desc}
                  </p>

                  {/* Interactive Details Toggles */}
                  <div className="flex gap-2 mb-4 border-b border-white/5 pb-3">
                    <button
                      onClick={() => toggleDetail(idx, "arch")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                        activeType === "arch"
                          ? "bg-purple-600/20 border border-purple-500 text-purple-300 shadow-md shadow-purple-500/5"
                          : "bg-white/5 border border-white/10 text-slate-400 hover:text-white"
                      }`}
                    >
                      Architecture
                    </button>
                    <button
                      onClick={() => toggleDetail(idx, "achieve")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                        activeType === "achieve"
                          ? "bg-cyan-600/20 border border-cyan-500 text-cyan-300 shadow-md shadow-cyan-500/5"
                          : "bg-white/5 border border-white/10 text-slate-400 hover:text-white"
                      }`}
                    >
                      Achievements
                    </button>
                  </div>

                  {/* Tab Contents */}
                  <div className="relative overflow-hidden mb-6 h-28">
                    <AnimatePresence mode="wait">
                      {activeType === null && (
                        <motion.div
                          key="null"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="text-slate-500 text-xs italic flex items-center justify-center h-full border border-dashed border-white/5 rounded-lg bg-black/10"
                        >
                          Select Architecture or Achievements above to view technical details.
                        </motion.div>
                      )}

                      {activeType === "arch" && (
                        <motion.div
                          key="arch"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="text-slate-300 text-xs leading-relaxed p-3 rounded-lg bg-slate-900/60 border border-white/5 h-full overflow-y-auto"
                        >
                          <div className="font-bold text-[10px] text-purple-400 font-mono uppercase mb-1">
                            System Flow:
                          </div>
                          {project.architecture}
                        </motion.div>
                      )}

                      {activeType === "achieve" && (
                        <motion.div
                          key="achieve"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="text-slate-300 text-xs leading-relaxed p-3 rounded-lg bg-slate-900/60 border border-white/5 h-full overflow-y-auto"
                        >
                          <div className="font-bold text-[10px] text-cyan-400 font-mono uppercase mb-1">
                            Impact Metrics:
                          </div>
                          <ul className="space-y-1">
                            {project.achievements.map((item, index) => (
                              <li key={index} className="flex items-start gap-1">
                                <span className="text-cyan-400 mr-1">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex gap-3 mt-4 border-t border-white/5 pt-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-3 rounded-xl border border-white/10 bg-slate-900/40 text-slate-300 hover:text-white hover:bg-slate-900/80 font-medium text-xs flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Github size={14} />
                    Source Code
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-medium text-xs flex items-center justify-center gap-1.5 hover:brightness-110 shadow shadow-purple-500/10 transition-all"
                  >
                    <ExternalLink size={14} />
                    Live Demo
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
