import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Warp from "./components/Warp";
import Cursor from "./ui/cursor/Cursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Achievements from "./components/Achievements";
import CodingProfiles from "./components/CodingProfiles";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Login from "./admin/Login";
import Dashboard from "./admin/Dashboard";
import ProtectedRoute from "./admin/ProtectedRoute";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

function PortfolioMain() {
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [portfolioData, setPortfolioData] = useState<any>(null);

  // Fetch dynamic database on mount
  useEffect(() => {
    const apiBase = import.meta.env.VITE_API_BASE_URL || (import.meta.env.DEV || window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" ? "http://localhost:5000/api" : "/api");
    fetch(`${apiBase}/portfolio`)
      .then((res) => {
        if (!res.ok) throw new Error("API status check failed");
        return res.json();
      })
      .then((data) => {
        setPortfolioData(data);
      })
      .catch((err) => {
        console.warn("CMS Backend offline. Falling back to local hardcoded layouts.", err);
      });
  }, []);

  // Manage Dark/Light theme class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("emerald-theme");
      document.body.style.backgroundColor = "#040308";
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("emerald-theme");
      document.body.style.backgroundColor = "#020b14";
    }
  }, [darkMode]);

  // Loading Progress simulator
  useEffect(() => {
    let interval: any;
    if (loading) {
      interval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setLoading(false), 500); // Small pause for smooth transition
            return 100;
          }
          return prev + Math.floor(Math.random() * 15) + 5;
        });
      }, 80);
    }
    return () => clearInterval(interval);
  }, [loading]);

  // GSAP Smooth Scroll Setup
  useEffect(() => {
    if (loading) return;

    // Use GSAP's native context manager for safe scoping and auto-cleanup in React
    const ctx = gsap.context(() => {
      const smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.5,
        effects: true,
      });
      (window as any).smootherInstance = smoother;

      // Refresh layout calculations when images finish loading
      const handleRefresh = () => {
        ScrollTrigger.refresh();
      };

      // Global click handler to intercept anchor link clicks and scroll smoothly
      const handleAnchorClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const anchor = target.closest("a");
        if (!anchor) return;

        const href = anchor.getAttribute("href");
        if (!href) return;

        if (href === "#") {
          e.preventDefault();
          if (smoother) {
            smoother.scrollTo(0, true);
          } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
          return;
        }

        if (href.startsWith("#") && href.length > 1) {
          e.preventDefault();
          if (smoother) {
            smoother.scrollTo(href, true, "top 80px");
          } else {
            const element = document.querySelector(href);
            if (element) {
              const elementPosition = element.getBoundingClientRect().top;
              const offsetPosition = elementPosition + window.scrollY - 80;
              window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
              });
            }
          }
        }
      };

      window.addEventListener("load", handleRefresh);
      document.addEventListener("click", handleAnchorClick);
      
      // Also perform delayed updates to account for React rendering and layout settles
      const timer1 = setTimeout(handleRefresh, 250);
      const timer2 = setTimeout(handleRefresh, 1000);
      const timer3 = setTimeout(handleRefresh, 2500);

      // Clean up event listeners and timers inside the context
      return () => {
        (window as any).smootherInstance = null;
        window.removeEventListener("load", handleRefresh);
        document.removeEventListener("click", handleAnchorClick);
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    });

    // Revert context (automatically kills ScrollSmoother and executes our custom cleanups)
    return () => {
      ctx.revert();
    };
  }, [loading]);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center font-mono select-none">
        <div className="text-center space-y-4">
          <div className="text-2xl font-extrabold tracking-widest bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent animate-pulse">
            CHITRANSHU YADAV
          </div>
          <div className="text-xs text-slate-500 tracking-wider">
            INITIALIZING CORE BACKEND SYSTEM...
          </div>
          <div className="w-56 h-[3px] bg-slate-900 rounded-full overflow-hidden relative border border-white/5">
            <div
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-purple-500 to-cyan-400 transition-all duration-150"
              style={{ width: `${Math.min(loadingProgress, 100)}%` }}
            ></div>
          </div>
          <div className="text-[10px] text-cyan-400">
            {Math.min(loadingProgress, 100)}%
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-x-hidden text-slate-100">
      {/* Background stars canvas */}
      <Warp />

      {/* Futuristic custom cursor */}
      <Cursor />

      {/* Sticky header navbar */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        name={portfolioData?.hero?.name}
      />

      {/* Scroll Wrapper required by GSAP ScrollSmoother */}
      <div id="smooth-wrapper" className="w-full">
        <div id="smooth-content" className="w-full flex flex-col">
          {/* Main Portfolio Sections */}
          <Hero
            darkMode={darkMode}
            heroData={portfolioData?.hero}
            resumeUrl={portfolioData?.resume?.url}
          />


          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <About darkMode={darkMode} aboutData={portfolioData?.about} />
            <Skills darkMode={darkMode} skillsData={portfolioData?.skills} />
            <Experience
              darkMode={darkMode}
              jobsData={portfolioData?.experience}
              statsData={portfolioData?.experienceStats}
              nodesData={portfolioData?.architectureNodes}
            />
            <Projects darkMode={darkMode} projectsData={portfolioData?.projects} />
            <Achievements
              darkMode={darkMode}
              achievementsData={portfolioData?.achievementStats}
              honorsData={portfolioData?.honors}
            />
            <CodingProfiles darkMode={darkMode} socialsData={portfolioData?.socials} />
            <Contact
              darkMode={darkMode}
              contactData={portfolioData?.contact}
              socialsData={portfolioData?.socials}
            />
          </div>

          {/* Footer branding */}
          <Footer
            name={portfolioData?.hero?.name}
            socialsData={portfolioData?.socials}
            email={portfolioData?.contact?.email}
          />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#0a0814",
            color: "#e2e8f0",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            fontSize: "12px",
            fontFamily: "monospace",
          },
        }}
      />
      <Routes>
        <Route path="/" element={<PortfolioMain />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
