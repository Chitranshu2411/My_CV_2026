import { useState, useRef, useEffect } from "react";
import { Terminal, Send, HelpCircle, Code, Briefcase, FileText } from "lucide-react";

interface LogLine {
  text: string;
  type: "input" | "output" | "error" | "info" | "success";
}

interface DeveloperTerminalProps {
  darkMode: boolean;
}

export default function DeveloperTerminal({ darkMode }: DeveloperTerminalProps) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<LogLine[]>([
    { text: "Chitranshu OS [Version 1.0.4]", type: "info" },
    { text: "Initializing kernel... Core modules loaded.", type: "info" },
    { text: "Type 'help' to see list of available commands or click the shortcut chips below.", type: "success" },
    { text: "", type: "output" },
  ]);
  const consoleBottomRef = useRef<HTMLDivElement>(null);

  const shortcutChips = [
    { label: "help", cmd: "help" },
    { label: "about", cmd: "about" },
    { label: "skills", cmd: "skills" },
    { label: "projects", cmd: "projects" },
    { label: "cat resume.txt", cmd: "cat resume.txt" },
  ];

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const newHistory = [...history, { text: `visitor@chitranshu-portfolio:~$ ${cmd}`, type: "input" as const }];

    if (trimmed === "") {
      setHistory(newHistory);
      return;
    }

    if (trimmed === "clear") {
      setHistory([]);
      return;
    }

    let outputLines: LogLine[] = [];

    switch (trimmed) {
      case "help":
        outputLines = [
          { text: "Available Commands:", type: "info" },
          { text: "  about         - Print engineer background & profile summary", type: "output" },
          { text: "  skills        - List backend, frontend, databases, DevOps, AI tags", type: "output" },
          { text: "  projects      - Summarize key production SaaS & AI applications", type: "output" },
          { text: "  cat resume.txt- Open structural developer resume details", type: "output" },
          { text: "  contact       - Output email, locations, and social paths", type: "output" },
          { text: "  clear         - Clear terminal memory screen logs", type: "output" },
        ];
        break;
      case "about":
        outputLines = [
          { text: "Engineer Overview:", type: "info" },
          { text: "  Name: Chitranshu Yadav", type: "output" },
          { text: "  Title: AI-Powered Full Stack & Scalable Backend Engineer", type: "output" },
          { text: "  Focus: Spring Boot, Distributed architecture, AI RAG Pipelines, React", type: "output" },
          { text: "  Preferred: Product firms, global remote teams, AI Startups", type: "output" },
          { text: "  Education: Computer Science Engineering student", type: "output" },
        ];
        break;
      case "skills":
        outputLines = [
          { text: "Technical Matrix:", type: "info" },
          { text: "  [Backend]: Java, Spring Boot, Spring Security (JWT), Spring AI, Microservices", type: "output" },
          { text: "  [Frontend]: React.js, Redux Toolkit, Tailwind CSS, JavaScript", type: "output" },
          { text: "  [Cloud]: Docker, Kubernetes, CI/CD, GitHub Actions", type: "output" },
          { text: "  [AI Core]: OpenAI API, Gemini API, LangChain, RAG Systems", type: "output" },
          { text: "  [Database]: PostgreSQL, MySQL, MongoDB", type: "output" },
        ];
        break;
      case "projects":
        outputLines = [
          { text: "Production Portfolio Projects:", type: "info" },
          { text: "  1. AI Code Gen SaaS  - Kubernetes, Spring AI, React, SSE stream, Multi-tenant", type: "output" },
          { text: "  2. Dr. Jivika        - Medical AI chatbot, booking slots, symptom parsing", type: "output" },
          { text: "  3. CampusGuru        - Student query router, MongoDB vector search", type: "output" },
          { text: "  4. YatraAI           - Prompt-optimized itinerary planner, caching layer", type: "output" },
        ];
        break;
      case "cat resume.txt":
        outputLines = [
          { text: "=== CHITRANSHU YADAV | RESUME SUMMARY ===", type: "info" },
          { text: "EDUCATION: CSE Student (Bhopal, India)", type: "output" },
          { text: "EXPERIENCE: Full Stack Developer at FAKHRI IT SERVICES", type: "output" },
          { text: "  • Designed multi-tenant e-commerce system using Spring Boot", type: "output" },
          { text: "  • Integrated Razorpay gateway & optimized PostgreSQL (35% speedup)", type: "output" },
          { text: "  • Deployed microservices utilizing Docker & GitHub Actions pipelines", type: "output" },
          { text: "  • Integrated Gemini LLM vectors using Spring AI", type: "output" },
          { text: "DSA STATS: 300+ Solved, 100+ streak, SIH & IITB selection", type: "output" },
        ];
        break;
      case "contact":
        outputLines = [
          { text: "Contact Credentials:", type: "info" },
          { text: "  Email: chitranshu2411@gmail.com", type: "output" },
          { text: "  Location: Bhopal, India", type: "output" },
          { text: "  GitHub: https://github.com/Chitranshu2411", type: "output" },
          { text: "  LinkedIn: https://linkedin.com", type: "output" },
        ];
        break;
      default:
        outputLines = [
          { text: `Command not found: '${trimmed}'. Type 'help' to see list of valid commands.`, type: "error" },
        ];
    }

    setHistory([...newHistory, ...outputLines]);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(input);
    setInput("");
  };

  useEffect(() => {
    if (consoleBottomRef.current) {
      consoleBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [history]);

  return (
    <section className="py-12 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Console Box */}
        <div className="w-full rounded-2xl overflow-hidden border border-purple-500/20 shadow-2xl shadow-purple-500/5 bg-slate-950/80 backdrop-blur-xl">
          {/* Console Header */}
          <div className="bg-slate-900 px-4 py-3 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal size={16} className="text-purple-400 animate-pulse" />
              <span className="font-mono text-xs font-semibold text-slate-400">bash - chitranshu@terminal:~$</span>
            </div>
            {/* Window control dots */}
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/60"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/60"></div>
            </div>
          </div>

          {/* Console Output Screen */}
          <div className="p-5 h-[320px] overflow-y-auto font-mono text-xs sm:text-sm text-slate-300 space-y-2 select-text no-scrollbar">
            {history.map((line, idx) => {
              let colorClass = "text-slate-300";
              if (line.type === "input") colorClass = "text-cyan-400 font-semibold";
              else if (line.type === "info") colorClass = "text-purple-400";
              else if (line.type === "success") colorClass = "text-emerald-400";
              else if (line.type === "error") colorClass = "text-rose-400 font-semibold";

              return (
                <div key={idx} className={`${colorClass} whitespace-pre-wrap`}>
                  {line.text}
                </div>
              );
            })}
            <div ref={consoleBottomRef}></div>
          </div>

          {/* Console Form Input */}
          <form onSubmit={handleFormSubmit} className="flex border-t border-white/5 bg-slate-900/60">
            <div className="pl-5 flex items-center text-cyan-400 font-mono text-xs sm:text-sm select-none">
              visitor@chitranshu-portfolio:~$
            </div>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="type help or cat resume.txt..."
              className="flex-1 py-3.5 px-3 bg-transparent border-0 outline-0 focus:ring-0 text-white font-mono text-xs sm:text-sm placeholder-slate-600"
            />
            <button
              type="submit"
              className="px-5 text-purple-400 hover:text-cyan-400 transition-colors flex items-center justify-center cursor-pointer"
            >
              <Send size={16} />
            </button>
          </form>
        </div>

        {/* Chip Commands */}
        <div className="mt-4 flex flex-wrap gap-2 justify-center items-center">
          <span className="text-[10px] font-mono text-slate-500 mr-1 flex items-center gap-1">
            <HelpCircle size={12} />
            Quick Commands:
          </span>
          {shortcutChips.map((chip) => (
            <button
              key={chip.label}
              onClick={() => handleCommand(chip.cmd)}
              className="px-2.5 py-1 rounded-md text-[10px] font-mono bg-white/5 border border-white/10 hover:border-purple-500/30 text-slate-400 hover:text-white hover:bg-purple-950/20 transition-all cursor-pointer"
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
