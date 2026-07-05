import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  name?: string;
}

export default function Navbar({ darkMode, setDarkMode, name }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }

      // Calculate scroll progress
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  const navItems = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Achievements", href: "#achievements" },
    { name: "Profiles", href: "#profiles" },
    { name: "Contact", href: "#contact" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent duplicate trigger from global click handler
    setIsOpen(false); // Close mobile menu drawer

    if (href === "#") {
      const smoother = (window as any).smootherInstance;
      if (smoother) {
        smoother.scrollTo(0, true);
      } else {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }
      return;
    }

    if (href.startsWith("#")) {
      const smoother = (window as any).smootherInstance;
      if (smoother) {
        // Use GSAP's scroll smoother for modern smooth scrolling, offsetting 80px for sticky navbar
        smoother.scrollTo(href, true, "top 80px");
      } else {
        // Fallback for native smooth scrolling, offsetting 80px for sticky navbar
        const target = document.querySelector(href);
        if (target) {
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - 80;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        scrolled
          ? "bg-black/75 backdrop-blur-md border-b border-white/5 py-3"
          : "bg-transparent py-5"
      }`}
    >
      {/* Scroll Progress Indicator */}
      <div
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a
              href="#"
              onClick={(e) => handleNavClick(e, "#")}
              className="font-display text-2xl font-extrabold tracking-wider bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent hover:brightness-110 transition-all cursor-pointer"
            >
              {name ? (name.split(" ")[0].toUpperCase() + ".") : "CHITRANSHU."}
            </a>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="font-sans text-sm font-medium transition-colors hover:text-cyan-400 text-slate-300 cursor-pointer"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Swapper button */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg border border-white/10 text-cyan-400 hover:bg-white/5 hover:text-amber-400 transition-all cursor-pointer animate-[pulse_3s_infinite]"
              title={darkMode ? "Switch to Emerald Gold Theme" : "Switch to Purple Cyan Theme"}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg border border-white/5 text-slate-400 cursor-pointer"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg transition-all text-slate-300 hover:text-white cursor-pointer"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full border-b shadow-2xl transition-all duration-300 bg-black/95 border-white/5 text-slate-300">
          <div className="px-4 pt-2 pb-6 space-y-3">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="block text-base font-semibold py-2 px-3 rounded-lg hover:bg-white/5 hover:text-cyan-400 transition-colors cursor-pointer"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
