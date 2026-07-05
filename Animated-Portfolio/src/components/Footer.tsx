import { Mail, Trophy } from "lucide-react";
import { Github, Linkedin } from "./Icons";

interface FooterProps {
  name?: string;
  socialsData?: any[];
  email?: string;
}

export default function Footer({ name, socialsData, email }: FooterProps) {
  const githubUrl = socialsData?.find(s => s.platform.toLowerCase() === "github")?.url || "https://github.com/Chitranshu2411";
  const linkedinUrl = socialsData?.find(s => s.platform.toLowerCase() === "linkedin")?.url || "https://linkedin.com";
  const leetcodeUrl = socialsData?.find(s => s.platform.toLowerCase() === "leetcode")?.url || "https://leetcode.com/u/Chitranshu2411/";
  const activeEmail = email || "chitranshu2411@gmail.com";
  return (
    <footer className="border-t border-white/5 bg-black/60 py-10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo / Brand */}
          <div className="flex-shrink-0 flex items-center">
            <span className="font-display text-lg font-extrabold tracking-wider bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              {name ? name.toUpperCase() : "CHITRANSHU YADAV"}
            </span>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors"
            >
              <Github size={18} />
            </a>
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors"
            >
              <Linkedin size={18} />
            </a>
            <a
              href={leetcodeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors"
            >
              <Trophy size={18} />
            </a>
            <a href={`mailto:${activeEmail}`} className="text-slate-400 hover:text-white transition-colors">
              <Mail size={18} />
            </a>
          </div>

          {/* Copyright / Credit */}
          <div className="text-xs text-slate-500 font-mono text-center md:text-right">
            Designed & Engineered by {name || "Chitranshu Yadav"}
          </div>
        </div>
      </div>
    </footer>
  );
}
