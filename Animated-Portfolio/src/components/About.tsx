import { motion } from "framer-motion";
import { Cpu, Server, Brain, Network, Cloud, Code, Layers, GraduationCap, Globe } from "lucide-react";

interface AboutProps {
  darkMode: boolean;
  aboutData?: any;
}

export default function About({ darkMode, aboutData }: AboutProps) {
  const defaultStory1 = "Currently pursuing my degree in Computer Science Engineering. My academic foundation is deeply intertwined with practical, real-world development, focusing on backend efficiency and robust full-stack pipelines.\n\nI have a strong affinity for distributed systems, database optimization, and cloud scalability. I build code that holds up under pressure—testing microservices and building platforms meant to serve real traffic.";
  const defaultStory2 = "With a strong command of modern backend frameworks and cloud architectures, I am actively targeting international remote engineering roles, product-based tech firms, and high-growth AI startups.";

  const highlights = [
    {
      title: "Java Full Stack",
      desc: "Robust experience building end-to-end applications combining Java backends with modern React frontend setups.",
      icon: <Cpu className="text-purple-400" size={24} />,
      color: "border-purple-500/20 hover:border-purple-500/50 hover:shadow-purple-500/10",
    },
    {
      title: "Spring Boot",
      desc: "Advanced backend engineering including Spring MVC, Spring Security (JWT), Spring Data JPA, and RESTful web services.",
      icon: <Server className="text-cyan-400" size={24} />,
      color: "border-cyan-500/20 hover:border-cyan-500/50 hover:shadow-cyan-500/10",
    },
    {
      title: "AI Systems",
      desc: "Integrating Large Language Models using Spring AI, LangChain, RAG frameworks, OpenAI, and Gemini APIs.",
      icon: <Brain className="text-pink-400" size={24} />,
      color: "border-pink-500/20 hover:border-pink-500/50 hover:shadow-pink-500/10",
    },
    {
      title: "Kubernetes & Cloud",
      desc: "Deploying microservices to Kubernetes clusters, containerizing with Docker, and setting up autoscaling architecture.",
      icon: <Network className="text-blue-400" size={24} />,
      color: "border-blue-500/20 hover:border-blue-500/50 hover:shadow-blue-500/10",
    },
    {
      title: "Cloud-native Development",
      desc: "Building highly available, resilient, and fault-tolerant cloud systems utilizing CI/CD pipelines (GitHub Actions).",
      icon: <Cloud className="text-teal-400" size={24} />,
      color: "border-teal-500/20 hover:border-teal-500/50 hover:shadow-teal-500/10",
    },
    {
      title: "SaaS Architecture",
      desc: "Engineering multi-tenant database architectures, payment integrations (Razorpay), and scalable transaction logs.",
      icon: <Layers className="text-amber-400" size={24} />,
      color: "border-amber-500/20 hover:border-amber-500/50 hover:shadow-amber-500/10",
    },
  ];

  const highlightsList = aboutData?.highlights?.length
    ? aboutData.highlights.map((h: any) => {
        let iconEl = <Cpu className="text-purple-400" size={24} />;
        if (h.icon === "Server") iconEl = <Server className="text-cyan-400" size={24} />;
        else if (h.icon === "Brain") iconEl = <Brain className="text-pink-400" size={24} />;
        else if (h.icon === "Network") iconEl = <Network className="text-blue-400" size={24} />;
        else if (h.icon === "Cloud") iconEl = <Cloud className="text-teal-400" size={24} />;
        else if (h.icon === "Layers") iconEl = <Layers className="text-amber-400" size={24} />;
        else if (h.icon === "Code") iconEl = <Code className="text-cyan-400" size={24} />;
        else if (h.icon === "Terminal") iconEl = <Layers className="text-purple-400" size={24} />;

        return {
          title: h.title,
          desc: h.desc,
          icon: iconEl,
          color: h.color || "border-purple-500/20 hover:border-purple-500/50 hover:shadow-purple-500/10"
        };
      })
    : highlights;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 rounded-full bg-purple-600/5 blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">About Me</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-cyan-400 mx-auto mt-3 rounded-full"></div>
          <p className="mt-4 text-slate-400 max-w-xl mx-auto text-sm">
            Bridging theoretical computer science with high-performance production engineering.
          </p>
        </div>

        {/* Contents Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Story */}
          <div className="lg:col-span-5 space-y-6">
            <div
              className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-950/20"
            >
              <h3 className="text-xl font-bold font-display mb-4 text-white flex items-center gap-2">
                <GraduationCap className="text-purple-400" />
                {aboutData?.storyTitle || "Engineering & Foundations"}
              </h3>
              {(aboutData?.storyBody || defaultStory1).split("\n\n").map((para: string, pIdx: number) => (
                <p key={pIdx} className={`text-slate-300 text-sm leading-relaxed ${pIdx > 0 ? "mt-3" : ""}`}>
                  {para}
                </p>
              ))}
            </div>

            <div
              className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-950/20"
            >
              <h3 className="text-xl font-bold font-display mb-4 text-white flex items-center gap-2">
                <Globe className="text-cyan-400" />
                {aboutData?.storySubTitle || "Global Ambitions"}
              </h3>
              {(aboutData?.storySubBody || defaultStory2).split("\n\n").map((para: string, pIdx: number) => (
                <p key={pIdx} className={`text-slate-300 text-sm leading-relaxed ${pIdx > 0 ? "mt-3" : ""}`}>
                  {para}
                </p>
              ))}
              <div className="mt-4 flex flex-wrap gap-2">
                {(aboutData?.storyTags || ["Remote Teams", "AI Startups", "Global Scale"]).map((tag: string) => (
                  <span key={tag} className="px-2.5 py-1 rounded-md text-xs font-mono bg-purple-500/10 border border-purple-500/20 text-purple-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Highlights Cards Grid */}
          <div className="lg:col-span-7">
            <h3 className="text-lg font-bold font-display mb-6 text-slate-200">Engineering Focus Areas</h3>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {highlightsList.map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  className={`glass-panel p-5 rounded-xl border transition-all duration-300 ${item.color} bg-slate-950/25`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-white/5 border border-white/10">{item.icon}</div>
                    <h4 className="font-bold text-base text-slate-100">{item.title}</h4>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
