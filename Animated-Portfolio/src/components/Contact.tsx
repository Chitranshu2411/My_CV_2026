import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Mail, MapPin, Send, CheckCircle } from "lucide-react";
import { Github, Linkedin } from "./Icons";

interface ContactProps {
  darkMode: boolean;
  contactData?: any;
  socialsData?: any[];
}

export default function Contact({ darkMode, contactData, socialsData }: ContactProps) {
  const activeEmail = contactData?.email || "chitranshu2411@gmail.com";
  const activeLocation = contactData?.location || "Bhopal, Madhya Pradesh, India";
  
  const githubUrl = socialsData?.find(s => s.platform.toLowerCase() === "github")?.url || "https://github.com/Chitranshu2411";
  const linkedinUrl = socialsData?.find(s => s.platform.toLowerCase() === "linkedin")?.url || "https://linkedin.com";
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError("Please fill out all fields.");
      return;
    }
    setError("");
    setLoading(true);

    // Simulate sending message
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });

      // Celebration confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });

      // Auto dismiss success card
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 bg-purple-600/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">Get In Touch</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-cyan-400 mx-auto mt-3 rounded-full"></div>
          <p className="mt-4 text-slate-400 max-w-xl mx-auto text-sm">
            Let's discuss distributed systems, scalable backends, remote opportunities, or internship roles.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Contact Info */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div
              className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-950/20 flex-grow flex flex-col justify-between"
            >
              <div>
                <h3 className="font-display text-lg font-bold text-white mb-4">Contact Info</h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-8">
                  Feel free to reach out directly via email or drop a message using the form. I'm always open to discussing new backend projects, architecture refactoring, and AI integrations.
                </p>

                {/* Info List */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-slate-300 text-sm">
                    <div className="p-2.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400">
                      <Mail size={16} />
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase font-mono font-bold">Email</div>
                      <a href={`mailto:${activeEmail}`} className="hover:text-cyan-400 transition-colors font-mono">
                        {activeEmail}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-slate-300 text-sm">
                    <div className="p-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                      <MapPin size={16} />
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase font-mono font-bold">Location</div>
                      <span>{activeLocation}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media links */}
              <div className="mt-8 pt-6 border-t border-white/5">
                <div className="text-[10px] text-slate-500 uppercase font-mono font-bold mb-3">Connect on Socials</div>
                <div className="flex gap-3">
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl border border-white/5 bg-slate-900/40 text-slate-400 hover:text-white hover:border-purple-500/30 transition-all"
                  >
                    <Github size={18} />
                  </a>
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl border border-white/5 bg-slate-900/40 text-slate-400 hover:text-white hover:border-cyan-500/30 transition-all"
                  >
                    <Linkedin size={18} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7">
            <div
              className="glass-panel p-6 sm:p-8 rounded-2xl border h-full relative bg-slate-950/20 border-slate-800"
            >
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    {error && <div className="text-xs text-rose-400 font-mono font-semibold">{error}</div>}

                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase font-bold">Your Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent transition-all placeholder-slate-700"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase font-bold">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent transition-all placeholder-slate-700"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase font-bold">Message</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Hey Chitranshu, I would love to talk about an internship role at..."
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent transition-all placeholder-slate-700 resize-none"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-medium text-sm flex items-center justify-center gap-2 hover:brightness-110 shadow-lg shadow-purple-500/10 disabled:opacity-50 transition-all cursor-pointer"
                    >
                      {loading ? (
                        <span>Sending message...</span>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send size={14} />
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center text-center h-full py-12"
                  >
                    <div className="p-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-4 animate-[bounce_1s_1]">
                      <CheckCircle size={36} />
                    </div>
                    <h3 className="font-display text-xl font-bold text-white mb-2">Message Sent Successfully!</h3>
                    <p className="text-slate-400 text-sm max-w-sm">
                      Thank you for reaching out. I have received your message and will get back to you shortly.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-6 text-xs text-purple-400 font-mono hover:text-purple-300 transition-colors cursor-pointer"
                    >
                      &larr; Send another message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
