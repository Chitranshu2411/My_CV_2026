import { motion } from "framer-motion";
import { ExternalLink, Award, Trophy } from "lucide-react";
import { Github, Linkedin } from "./Icons";

interface CodingProfilesProps {
  darkMode: boolean;
  socialsData?: any[];
}

const profiles = [
  {
    name: "LeetCode",
    url: "https://leetcode.com/u/Chitranshu2411/",
    icon: <Trophy className="text-orange-400" size={20} />,
    status: "Active Daily",
    theme: "border-orange-500/20 hover:border-orange-500/40 hover:shadow-orange-500/5",
    colorText: "text-orange-400",
    stats: [
      { label: "Problems Solved", value: "300+" },
      { label: "Solve Rate", value: "Top 12%" },
      { label: "Daily Streak", value: "100+" },
    ],
    // Renders a mini difficulty break down bar
    extra: (
      <div className="mt-4 space-y-1.5">
        <div className="flex justify-between text-[10px] font-mono text-slate-400">
          <span>Easy (100)</span>
          <span>Medium (170)</span>
          <span>Hard (30)</span>
        </div>
        <div className="h-1.5 w-full bg-slate-900 rounded-full flex overflow-hidden">
          <div className="bg-emerald-500 h-full" style={{ width: "33%" }}></div>
          <div className="bg-orange-500 h-full" style={{ width: "57%" }}></div>
          <div className="bg-rose-500 h-full" style={{ width: "10%" }}></div>
        </div>
      </div>
    ),
  },
  {
    name: "GeeksforGeeks",
    url: "https://www.geeksforgeeks.org/profile/chitranshu07",
    icon: <Award className="text-emerald-400" size={20} />,
    status: "Monthly Active",
    theme: "border-emerald-500/20 hover:border-emerald-500/40 hover:shadow-emerald-500/5",
    colorText: "text-emerald-400",
    stats: [
      { label: "Practice Score", value: "1200+" },
      { label: "Rank", value: "Top 5%" },
      { label: "Topics", value: "Algorithms" },
    ],
    extra: (
      <div className="mt-4 flex gap-1.5 justify-between">
        <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
          Graphs
        </span>
        <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
          Trees
        </span>
        <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
          DP
        </span>
        <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
          Trie
        </span>
      </div>
    ),
  },
  {
    name: "GitHub Developer",
    url: "https://github.com/Chitranshu2411",
    icon: <Github className="text-purple-400" size={20} />,
    status: "Pushing Daily",
    theme: "border-purple-500/20 hover:border-purple-500/40 hover:shadow-purple-500/5",
    colorText: "text-purple-400",
    stats: [
      { label: "Total Commits", value: "2700+" },
      { label: "Repositories", value: "45+" },
      { label: "Pull Requests", value: "200+" },
    ],
    extra: (
      <div className="mt-4 space-y-1.5">
        <div className="flex justify-between text-[10px] font-mono text-slate-400">
          <span>Java (65%)</span>
          <span>TypeScript (25%)</span>
          <span>Other (10%)</span>
        </div>
        <div className="h-1.5 w-full bg-slate-900 rounded-full flex overflow-hidden">
          <div className="bg-purple-500 h-full" style={{ width: "65%" }}></div>
          <div className="bg-cyan-400 h-full" style={{ width: "25%" }}></div>
          <div className="bg-slate-500 h-full" style={{ width: "10%" }}></div>
        </div>
      </div>
    ),
  },
  {
    name: "LinkedIn Network",
    url: "https://www.linkedin.com/in/chitranshu-yadav/",
    icon: <Linkedin className="text-cyan-400" size={20} />,
    status: "Open for Jobs",
    theme: "border-cyan-500/20 hover:border-cyan-500/40 hover:shadow-cyan-500/5",
    colorText: "text-cyan-400",
    stats: [
      { label: "Connections", value: "500+" },
      { label: "Post Activity", value: "Weekly" },
      { label: "In-mails Response", value: "<2 hrs" },
    ],
    extra: (
      <div className="mt-4 text-[10px] font-mono text-slate-400 border border-dashed border-white/5 bg-black/10 rounded-lg p-2 flex items-center justify-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
        <span>Recruiter Spotlight Enabled</span>
      </div>
    ),
  },
];

export default function CodingProfiles({ darkMode, socialsData }: CodingProfilesProps) {
  const activeProfiles = profiles.map((p) => {
    let dynamicUrl = p.url;
    if (socialsData?.length) {
      // match "LeetCode", "GeeksforGeeks", "GitHub", "LinkedIn" by prefix
      const match = socialsData.find(
        (s) => s.platform.toLowerCase() === p.name.split(" ")[0].toLowerCase()
      );
      if (match) {
        dynamicUrl = match.url;
      }
    }
    return { ...p, url: dynamicUrl };
  });
  return (
    <section id="profiles" className="py-24 relative overflow-hidden">
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-cyan-600/5 blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">Coding Profiles</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-cyan-400 mx-auto mt-3 rounded-full"></div>
          <p className="mt-4 text-slate-400 max-w-xl mx-auto text-sm">
            Interactive portals detailing my daily coding habits, problem-solving progress, and professional networks.
          </p>
        </div>

        {/* Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {activeProfiles.map((profile, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className={`glass-panel rounded-2xl border p-5 flex flex-col justify-between transition-all duration-300 ${
                profile.theme
              } bg-slate-950/20 border-slate-800`}
            >
              <div>
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-white/5 border border-white/5">{profile.icon}</div>
                    <span className="font-display font-bold text-sm text-slate-100">{profile.name}</span>
                  </div>

                  {/* Pulsing Status Tag */}
                  <div className="flex items-center gap-1.5 bg-emerald-500/5 border border-emerald-500/10 px-2 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-[pulse_1s_infinite]"></span>
                    <span className="text-[8px] font-bold font-mono text-emerald-400 uppercase tracking-wider">
                      {profile.status}
                    </span>
                  </div>
                </div>

                {/* Profile Stats List */}
                <div className="space-y-2 mb-4">
                  {profile.stats.map((stat, sIdx) => (
                    <div key={sIdx} className="flex justify-between items-center border-b border-white/5 pb-1">
                      <span className="text-[10px] font-mono text-slate-400">{stat.label}</span>
                      <span className={`text-xs font-bold font-mono ${profile.colorText}`}>{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Extra visualization and Action Link */}
              <div>
                {profile.extra}

                <a
                  href={profile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 w-full py-2 px-3 rounded-xl border border-white/10 bg-slate-900/40 text-slate-300 hover:text-white hover:bg-slate-900/80 font-medium text-[10px] flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  Visit Profile
                  <ExternalLink size={12} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
