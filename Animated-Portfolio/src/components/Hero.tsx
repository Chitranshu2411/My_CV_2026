import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, Mail, Shield, Server, Cpu, Database } from "lucide-react";
import { Github } from "./Icons";
import profileImg from "../assets/profile.jpg";

interface HeroProps {
  darkMode: boolean;
  heroData?: any;
  resumeUrl?: string;
}

const phrases = [
  "Building scalable AI SaaS platforms",
  "Developing distributed backend systems",
  "Engineering modern full-stack experiences",
  "Integrating AI into real-world products",
];

function Typewriter({ phrasesList }: { phrasesList?: string[] }) {
  const activePhrases = phrasesList && phrasesList.length > 0 ? phrasesList : phrases;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: any;
    const phrase = activePhrases[currentIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setText((prev) => prev.substring(0, prev.length - 1));
      }, 30);
    } else {
      timer = setTimeout(() => {
        setText((prev) => phrase.substring(0, prev.length + 1));
      }, 60);
    }

    if (!isDeleting && text === phrase) {
      timer = setTimeout(() => setIsDeleting(true), 2500);
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setCurrentIndex((prev) => (prev + 1) % activePhrases.length);
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, currentIndex]);

  return (
    <span className="text-cyan-400 font-mono font-medium border-r-2 border-cyan-400 pr-1 animate-[pulse_1s_infinite]">
      {text}
    </span>
  );
}

const generateMockContributions = () => {
  const cols = 28;
  const rows = 7;
  const arr = [];
  for (let i = 0; i < cols * rows; i++) {
    const rand = Math.random();
    let level = 0;
    if (rand > 0.85) level = 4;
    else if (rand > 0.6) level = 3;
    else if (rand > 0.4) level = 2;
    else if (rand > 0.15) level = 1;
    arr.push({ level, index: i });
  }
  return arr;
};

const mockContributions = generateMockContributions();

export default function Hero({ darkMode, heroData, resumeUrl }: HeroProps) {
  const floatingIcons = [
    { name: "Java", icon: "☕", color: "from-orange-500 to-red-500", x: "-20vw", y: "-10vh", delay: 0 },
    { name: "React", icon: "⚛️", color: "from-cyan-400 to-blue-500", x: "25vw", y: "-15vh", delay: 1.5 },
    { name: "Spring", icon: "🍃", color: "from-green-400 to-emerald-600", x: "-25vw", y: "15vh", delay: 0.8 },
    { name: "Docker", icon: "🐳", color: "from-blue-500 to-sky-400", x: "20vw", y: "10vh", delay: 2.2 },
    { name: "K8s", icon: "☸️", color: "from-indigo-600 to-blue-600", x: "0vw", y: "-22vh", delay: 1.1 },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* Background Decorative Gradients */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-purple-600/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 rounded-full bg-cyan-600/10 blur-[120px] pointer-events-none"></div>

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-40"></div>

      {/* Floating Tech Stack Circles */}
      <div className="absolute inset-0 pointer-events-none hidden md:block overflow-hidden">
        {floatingIcons.map((item, idx) => (
          <motion.div
            key={idx}
            className={`absolute top-1/2 left-1/2 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg border ${
              darkMode 
                ? "bg-slate-900/60 border-slate-700/50 text-white" 
                : "bg-white/60 border-slate-200 text-slate-800"
            }`}
            style={{ x: item.x, y: item.y }}
            animate={{
              y: [0, -15, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: item.delay,
            }}
            whileHover={{ scale: 1.2, transition: { duration: 0.2 } }}
          >
            <span className="select-none">{item.icon}</span>
            <div className="absolute -bottom-6 text-[10px] font-mono opacity-0 hover:opacity-100 transition-opacity bg-slate-900 text-slate-300 px-1.5 py-0.5 rounded border border-slate-700">
              {item.name}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Profile Photo: Show first on mobile, right column on desktop */}
          <div className="order-first lg:order-last lg:col-span-5 flex flex-col items-center justify-center gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="relative group cursor-pointer"
            >
              {/* Outer neon border glow */}
              <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-400 opacity-75 blur-md group-hover:opacity-100 group-hover:blur-lg transition duration-500 animate-[pulse_3s_infinite]"></div>
              
              {/* Image Frame */}
              <div className="relative rounded-full p-[4px] bg-gradient-to-r from-purple-500 to-cyan-400 overflow-hidden shadow-2xl">
                <img
                  src={heroData?.profileImage || profileImg}
                  alt={heroData?.name || "Chitranshu Yadav"}
                  className="rounded-full w-52 h-52 sm:w-64 sm:h-64 object-cover object-center bg-black transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </motion.div>

            {/* GitHub Heatmap Preview Section */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="w-full max-w-sm hidden sm:block"
            >
              <div
                className="glass-panel p-4 rounded-2xl border transition-all hover:border-purple-500/20 border-slate-800/80 bg-slate-950/40"
              >
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-[pulse_1.5s_infinite]"></div>
                    <span className="font-mono text-[10px] text-slate-400 font-medium">ChitranshuYadav / Activity</span>
                  </div>
                  <span className="text-[9px] font-mono text-slate-500">2700+ Commits</span>
                </div>

                {/* Grid of contribution boxes */}
                <div className="grid grid-cols-28 gap-[2.5px] select-none p-1 bg-black/30 rounded-lg">
                  {mockContributions.map((cell) => {
                    let colorClass = "bg-slate-800/40";
                    if (cell.level === 1) colorClass = "bg-purple-900/30";
                    else if (cell.level === 2) colorClass = "bg-purple-700/50";
                    else if (cell.level === 3) colorClass = "bg-purple-500/70 border border-purple-400/20";
                    else if (cell.level === 4) colorClass = "bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.3)]";

                    return (
                      <div
                        key={cell.index}
                        className={`aspect-square w-full rounded-[1px] transition-all hover:scale-125 duration-100 ${colorClass}`}
                      ></div>
                    );
                  })}
                </div>
                <div className="flex justify-between items-center mt-2 text-[8px] font-mono text-slate-500">
                  <span>Less</span>
                  <div className="flex gap-[2px]">
                    <div className="w-1.5 h-1.5 rounded-[0.5px] bg-slate-800/40"></div>
                    <div className="w-1.5 h-1.5 rounded-[0.5px] bg-purple-900/30"></div>
                    <div className="w-1.5 h-1.5 rounded-[0.5px] bg-purple-700/50"></div>
                    <div className="w-1.5 h-1.5 rounded-[0.5px] bg-purple-500/70"></div>
                    <div className="w-1.5 h-1.5 rounded-[0.5px] bg-cyan-400"></div>
                  </div>
                  <span>More</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Left Column: Title description and controls */}
          <div className="lg:col-span-7 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
            {/* Intro Tag */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/5 text-purple-400 text-xs font-mono mb-6"
            >
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-purple-500"></span>
              </span>
              Open to International Remote Roles & Product Companies
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight"
            >
              {heroData?.name || "Chitranshu Yadav"}
            </motion.h1>

            {/* Role title explicitly matching "Java Full Stack Developer" */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl sm:text-2xl font-bold tracking-wide mt-3 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent font-display"
            >
              {heroData?.subtitle || "Java Full Stack Developer | AI & Backend Engineer"}
            </motion.h2>

            {/* Typing objectives */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="h-8 mt-4 flex items-center justify-center text-sm sm:text-base text-slate-400"
            >
              <Typewriter phrasesList={heroData?.phrases} />
            </motion.div>

            {/* Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-6 text-sm sm:text-base text-slate-400 leading-relaxed max-w-xl"
            >
              {heroData?.description || "Passionate software engineer focused on scalable backend architecture, AI-powered applications, and modern full-stack development. Building production-ready, distributed SaaS platforms."}
            </motion.p>

            {/* Call to action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8 flex flex-wrap gap-3 justify-center lg:justify-start items-center"
            >
              <a
                href="#projects"
                className="group px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-medium text-xs sm:text-sm flex items-center gap-2 hover:brightness-110 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 transition-all cursor-pointer"
              >
                View Projects
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#contact"
                className="px-5 py-3 rounded-xl border border-slate-800 bg-slate-950/40 text-slate-300 hover:bg-slate-900/50 hover:text-white font-medium text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer"
              >
                Contact Me
                <Mail size={14} />
              </a>

              <a
                href={heroData?.githubUrl || "https://github.com/Chitranshu2411"}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl border border-slate-800 bg-slate-950/40 text-slate-300 hover:bg-slate-900/50 hover:text-white font-medium text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer"
              >
                <Github size={14} />
                GitHub
              </a>

              <a
                href={resumeUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl border border-purple-500/30 bg-purple-500/5 text-purple-400 hover:bg-purple-500/10 hover:border-purple-500/50 font-medium text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer"
              >
                <Download size={14} />
                Resume
              </a>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
