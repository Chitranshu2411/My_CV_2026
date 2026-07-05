import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Calendar, CheckCircle2, ChevronRight, Zap, Database, Cpu, Layout } from "lucide-react";

interface ExperienceProps {
  darkMode: boolean;
  jobsData?: any[];
  statsData?: any[];
  nodesData?: any[];
}

interface CounterProps {
  end: number;
  suffix?: string;
  duration?: number;
}

function CountUp({ end, suffix = "", duration = 1.5 }: CounterProps) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrameId: number;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
            setCount(Math.floor(progress * end));

            if (progress < 1) {
              animationFrameId = requestAnimationFrame(animate);
            } else {
              setCount(end);
            }
          };
          animationFrameId = requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, [end, duration]);

  return (
    <span ref={elementRef}>
      {count}
      {suffix}
    </span>
  );
}

export default function Experience({ darkMode, jobsData, statsData, nodesData }: ExperienceProps) {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const achievements = [
    "Engineered and deployed a multi-tenant e-commerce SaaS architecture using Spring Boot and React.",
    "Designed and developed highly secure JWT-based stateless authentication filters and permission hierarchies.",
    "Optimized PostgreSQL queries, indexing patterns, and connection pools, reducing data retrieval latency by 35%.",
    "Integrated Razorpay gateway with secure webhook processing and automated reconciliation pipelines.",
    "Containerized application components with Docker and established automated staging deployments using GitHub Actions.",
    "Integrated Spring AI to power a travel destination recommendation engine and customer support chatbot.",
  ];

  const stats = [
    { label: "API Latency Red.", end: 35, suffix: "%", desc: "PostgreSQL query tuning & caching" },
    { label: "SaaS Tenants", end: 10, suffix: "+", desc: "Multi-tenant database schema isolation" },
    { label: "AI Recommendations", end: 98, suffix: "%", desc: "Accuracy on user profiling queries" },
    { label: "Deployment Speed", end: 3, suffix: "x", desc: "Automated GitHub Actions pipelines" },
  ];

  const architectureNodes = [
    { id: 1, label: "React Frontend", type: "front", desc: "Client SPA with state management" },
    { id: 2, label: "JWT Gatekeeper", type: "sec", desc: "Stateless security & token validation" },
    { id: 3, label: "Spring Boot App", type: "back", desc: "Scalable REST APIs & MVC Logic" },
    { id: 4, label: "PostgreSQL Db", type: "db", desc: "Optimized relational multi-tenant schemas" },
    { id: 5, label: "Spring AI Core", type: "ai", desc: "OpenAI/Gemini LLM Orchestrator" },
  ];

  const activeJobs = jobsData?.length ? jobsData : [{
    title: "Full Stack Developer",
    company: "Fakhri IT Services Pvt. Ltd.",
    duration: "2024 - Present",
    achievements
  }];

  const activeStats = statsData?.length ? statsData : stats;
  const activeNodes = nodesData?.length ? nodesData : architectureNodes;

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="absolute top-10 left-1/3 w-96 h-96 rounded-full bg-purple-600/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">Professional Experience</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-cyan-400 mx-auto mt-3 rounded-full"></div>
          <p className="mt-4 text-slate-400 max-w-xl mx-auto text-sm">
            Proven track record of engineering backend APIs, databases, and AI systems in production.
          </p>
        </div>

        {/* Experience Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Left Column: Timeline & Achievements */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="space-y-6">
              {activeJobs.map((job, jIdx) => (
                <div key={jIdx} className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-950/20 transition-all">
                  {/* Job Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-5 mb-5">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-xl bg-purple-600/10 border border-purple-500/20 text-purple-400">
                        <Briefcase size={22} />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-slate-100 font-display">{job.title}</h3>
                        <p className="text-cyan-400 text-sm font-medium">{job.company}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg self-start sm:self-center">
                      <Calendar size={14} />
                      <span>{job.duration}</span>
                    </div>
                  </div>

                  {/* Achievements list */}
                  <ul className="space-y-3.5">
                    {job.achievements.map((item: string, idx: number) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed"
                      >
                        <CheckCircle2 className="text-purple-400 shrink-0 mt-1" size={16} />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Stats Block */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
              {activeStats.map((item: any, idx: number) => (
                <div
                  key={idx}
                  className="glass-panel p-4 rounded-xl border border-slate-800/80 bg-slate-950/40 text-center"
                >
                  <div className="text-2xl sm:text-3xl font-extrabold font-display bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    <CountUp end={item.end} suffix={item.suffix} />
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1">{item.label}</div>
                  <div className="text-[9px] text-slate-500 mt-1 leading-normal">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive System Architecture Diagram */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="glass-panel p-6 rounded-2xl border border-slate-800 bg-slate-950/20 flex-grow flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-base text-slate-200 font-display mb-2">Interactive Microservices Architecture</h3>
                <p className="text-xs text-slate-400 mb-6">
                  Click on any microservice block to inspect its technical details and scaling rules.
                </p>
              </div>

              {/* Node Stack Visual */}
              <div className="relative flex flex-col gap-4 items-center py-4 bg-black/40 rounded-xl p-4 border border-white/5">


                {activeNodes.map((node: any) => {
                  let icon = <Layout size={16} />;
                  let nodeColor = "border-slate-700/50 hover:border-slate-500 bg-slate-900/90";
                  if (node.type === "sec") {
                    icon = <Zap size={16} className="text-amber-400" />;
                    nodeColor = "border-amber-500/30 hover:border-amber-400 bg-amber-950/20";
                  } else if (node.type === "back") {
                    icon = <Cpu size={16} className="text-purple-400" />;
                    nodeColor = "border-purple-500/30 hover:border-purple-400 bg-purple-950/20";
                  } else if (node.type === "db") {
                    icon = <Database size={16} className="text-emerald-400" />;
                    nodeColor = "border-emerald-500/30 hover:border-emerald-400 bg-emerald-950/20";
                  } else if (node.type === "ai") {
                    icon = <Cpu size={16} className="text-pink-400" />;
                    nodeColor = "border-pink-500/30 hover:border-pink-400 bg-pink-950/20";
                  }

                  const isActive = activeStep === node.id;

                  return (
                    <div key={node.id} className="w-full relative z-10">
                      <button
                        onClick={() => setActiveStep(isActive ? null : node.id)}
                        className={`w-full text-left px-4 py-3 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${nodeColor} ${
                          isActive ? "ring-2 ring-purple-500 scale-[1.02]" : ""
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-1.5 rounded-lg bg-black/40 border border-white/5">{icon}</div>
                          <div>
                            <div className="text-xs font-bold text-white font-mono">{node.label}</div>
                            <div className="text-[10px] text-slate-400 truncate max-w-[200px]">{node.desc}</div>
                          </div>
                        </div>
                        <ChevronRight
                          size={14}
                          className={`text-slate-400 transition-transform ${isActive ? "rotate-90 text-purple-400" : ""}`}
                        />
                      </button>

                      {/* Expandable Details */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden bg-black/60 rounded-xl mt-1 border border-white/5 text-xs text-slate-300 p-3.5 space-y-2"
                          >
                            {node.details?.map((detail: string, dIdx: number) => {
                              const isSpecial = detail.startsWith("• Optimized") || detail.startsWith("• Handles") || detail.startsWith("• Dockerized") || detail.startsWith("• Reduced") || detail.startsWith("• Streams");
                              let specialColor = "text-purple-400";
                              if (node.type === "sec") specialColor = "text-amber-400";
                              else if (node.type === "db") specialColor = "text-emerald-400";
                              else if (node.type === "ai") specialColor = "text-pink-400";

                              return (
                                <p key={dIdx} className={isSpecial ? `${specialColor} font-mono text-[10px]` : ""}>
                                  {detail.startsWith("• ") ? detail : `• ${detail}`}
                                </p>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
