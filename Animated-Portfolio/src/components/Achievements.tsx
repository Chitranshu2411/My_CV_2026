import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Award, Code2, Flame, GitCommit, GitPullRequest, FolderGit, Star, ShieldAlert } from "lucide-react";

interface AchievementsProps {
  darkMode: boolean;
  achievementsData?: any[];
  honorsData?: any[];
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
    <span ref={elementRef} className="font-display font-extrabold">
      {count}
      {suffix}
    </span>
  );
}

export default function Achievements({ darkMode, achievementsData, honorsData }: AchievementsProps) {
  const triggerConfetti = (colors?: string[]) => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.8 },
      colors: colors || ["#aa3bff", "#00f2fe", "#f43f5e"],
    });
  };

  const fallbackStatCards = [
    {
      title: "DSA Solved",
      end: 300,
      suffix: "+",
      icon: <Code2 className="text-purple-400" size={20} />,
      desc: "Problems solved across LeetCode & GFG platforms.",
      colors: ["#aa3bff", "#8b5cf6"],
    },
    {
      title: "LeetCode Streak",
      end: 100,
      suffix: "+ Days",
      icon: <Flame className="text-orange-400 animate-pulse" size={20} />,
      desc: "Daily consistent code submissions.",
      colors: ["#ea580c", "#f97316"],
    },
    {
      title: "GitHub Commits",
      end: 2700,
      suffix: "+",
      icon: <GitCommit className="text-cyan-400" size={20} />,
      desc: "Version controller contribution updates.",
      colors: ["#06b6d4", "#3b82f6"],
    },
    {
      title: "Repositories",
      end: 45,
      suffix: "+",
      icon: <FolderGit className="text-emerald-400" size={20} />,
      desc: "Public and private codebase repositories.",
      colors: ["#10b981", "#059669"],
    },
    {
      title: "Pull Requests",
      end: 200,
      suffix: "+",
      icon: <GitPullRequest className="text-pink-400" size={20} />,
      desc: "Merged contributions and features.",
      colors: ["#ec4899", "#f43f5e"],
    },
  ];

  const activeStats = achievementsData?.length
    ? achievementsData.map((s: any) => {
        let iconEl = <Code2 className="text-purple-400" size={20} />;
        if (s.icon === "Flame") iconEl = <Flame className="text-orange-400 animate-pulse" size={20} />;
        else if (s.icon === "GitCommit") iconEl = <GitCommit className="text-cyan-400" size={20} />;
        else if (s.icon === "FolderGit") iconEl = <FolderGit className="text-emerald-400" size={20} />;
        else if (s.icon === "GitPullRequest") iconEl = <GitPullRequest className="text-pink-400" size={20} />;

        return {
          title: s.title,
          end: s.end,
          suffix: s.suffix || "",
          icon: iconEl,
          desc: s.desc || "",
          colors: s.colors || ["#aa3bff", "#8b5cf6"],
        };
      })
    : fallbackStatCards;

  const fallbackHonors = [
    {
      title: "Smart India Hackathon (SIH) Finalist",
      desc: "Ranked amongst the nation's top candidates. Selected for final stages of India's biggest digital product hackathon solving real government problem statements.",
      badge: "National Finalist",
      color: "from-purple-500/10 to-indigo-500/5 border-purple-500/20 text-purple-400",
    },
    {
      title: "IIT Bombay Techfest Selection",
      desc: "Selected to participate in competitive programming hacks and technical challenges held at the prestigious Indian Institute of Technology Bombay.",
      badge: "Selected Competitor",
      color: "from-cyan-500/10 to-blue-500/5 border-cyan-500/20 text-cyan-400",
    },
  ];

  const activeHonors = honorsData?.length ? honorsData : fallbackHonors;

  return (
    <section id="achievements" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 bg-purple-600/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">Technical Achievements</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-cyan-400 mx-auto mt-3 rounded-full"></div>
          <p className="mt-4 text-slate-400 max-w-xl mx-auto text-sm">
            Milestones in algorithm design, open-source work, and competitive programming hacks.
          </p>
        </div>

        {/* Counters Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
          {activeStats.map((card, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              onClick={() => triggerConfetti(card.colors)}
              className="glass-panel p-5 rounded-2xl border text-center cursor-pointer select-none transition-all border-slate-800/80 bg-slate-950/20 hover:border-slate-700 hover:bg-slate-900/10"
            >
              <div className="mx-auto w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center mb-3">
                {card.icon}
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                <CountUp end={card.end} suffix={card.suffix} />
              </div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-2">{card.title}</div>
              <div className="text-[9px] text-slate-500 mt-1 leading-snug">{card.desc}</div>
            </motion.div>
          ))}
        </div>

        {/* Honors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {activeHonors.map((honor, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative glass-panel rounded-2xl border p-6 overflow-hidden flex flex-col justify-between bg-slate-950/10 border-slate-800"
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <div className="p-2 bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border border-yellow-500/30 text-yellow-400 rounded-lg">
                    <Star size={18} fill="rgba(234, 179, 8, 0.2)" />
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-wider bg-purple-500/10 border border-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full font-mono">
                    {honor.badge}
                  </span>
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-2">{honor.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">{honor.desc}</p>
              </div>
              <button
                onClick={() => triggerConfetti()}
                className="text-[10px] font-mono text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1 self-start cursor-pointer"
              >
                Trigger celebration &rarr;
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
