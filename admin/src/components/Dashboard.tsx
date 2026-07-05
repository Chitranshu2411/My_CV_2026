import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import {
  LogOut,
  User,
  Settings,
  Briefcase,
  Layers,
  Code,
  Award,
  BookOpen,
  Mail,
  Share2,
  Upload,
  Plus,
  Trash2,
  Edit2,
  Save,
  Grid,
  Image as ImageIcon,
  Cpu
} from "lucide-react";

// Set Axios Authorization Header
const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
  }
});

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("hero");
  const [portfolioData, setPortfolioData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Fetch all portfolio data on load
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE}/portfolio`);
      setPortfolioData(response.data);
    } catch (error: any) {
      toast.error("Failed to load portfolio database.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  // Image Upload helper
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, callback: (url: string) => void) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];

    const formData = new FormData();
    formData.append("file", file);

    const uploadToast = toast.loading(`Uploading ${file.name}...`);

    try {
      const res = await axios.post(`${API_BASE}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      toast.success("File uploaded successfully!", { id: uploadToast });
      callback(res.data.url);
    } catch (error: any) {
      const errMsg = error.response?.data?.message || "File upload failed";
      toast.error(errMsg, { id: uploadToast });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#040308] text-slate-100 flex flex-col items-center justify-center font-mono">
        <div className="text-center space-y-4">
          <div className="text-xl font-extrabold animate-pulse text-cyan-400">CONNECTING CORE DATABASE...</div>
          <div className="w-48 h-1 bg-slate-900 overflow-hidden relative rounded-full border border-white/5 mx-auto">
            <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-purple-500 to-cyan-400 animate-[loading_1.5s_infinite]"></div>
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "hero", label: "Hero Section", icon: <User size={18} /> },
    { id: "about", label: "About Me", icon: <Settings size={18} /> },
    { id: "projects", label: "Projects", icon: <Grid size={18} /> },
    { id: "skills", label: "Skills", icon: <Code size={18} /> },
    { id: "experience", label: "Experience & Architecture", icon: <Briefcase size={18} /> },
    { id: "education", label: "Education", icon: <BookOpen size={18} /> },
    { id: "certificates", label: "Certificates", icon: <Award size={18} /> },
    { id: "achievements", label: "Stats & Honors", icon: <Layers size={18} /> },
    { id: "contact", label: "Contact Details", icon: <Mail size={18} /> },
    { id: "socials", label: "Social Links", icon: <Share2 size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-[#040308] text-slate-100 flex font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-72 bg-slate-950/40 border-r border-slate-900 p-6 flex flex-col justify-between backdrop-blur-xl relative z-10 shrink-0">
        <div>
          {/* Logo Title */}
          <div className="flex items-center gap-3 mb-10 pb-5 border-b border-white/5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-cyan-500 p-0.5 shadow flex items-center justify-center">
              <div className="w-full h-full bg-[#040308] rounded-[9px] flex items-center justify-center">
                <Cpu className="text-cyan-400 animate-spin" size={18} style={{ animationDuration: "10s" }} />
              </div>
            </div>
            <div>
              <h2 className="font-extrabold text-sm tracking-wider font-display bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                PORTFOLIO CMS
              </h2>
              <span className="text-[9px] font-mono text-slate-500">v1.2.0 - SECURED</span>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="space-y-1.5">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-medium font-mono tracking-wide transition-all border cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-purple-600/10 border-purple-500/20 text-purple-300 shadow-md shadow-purple-500/5"
                    : "bg-transparent border-transparent text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Footer actions */}
        <div className="pt-5 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-rose-950/20 border border-rose-500/20 hover:border-rose-500/40 text-rose-400 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer"
          >
            <LogOut size={14} />
            <span>TERMINATE SESSION</span>
          </button>
        </div>
      </aside>

      {/* Main Edit Screen */}
      <main className="flex-1 p-8 overflow-y-auto max-h-screen">
        <header className="mb-8 flex justify-between items-center pb-5 border-b border-white/5">
          <div>
            <h1 className="text-2xl font-bold font-display text-white capitalize">{activeTab.replace("-", " ")}</h1>
            <p className="text-xs text-slate-500 font-mono mt-1">Configure and publish updates instantly</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-white/5 rounded-xl font-mono text-[10px] text-slate-400 select-none">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            CONNECTED DB: ATLAS_CLUSTER_0
          </div>
        </header>

        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-900 bg-slate-950/20 backdrop-blur-xl relative">
          {/* TAB EDITORS */}
          {activeTab === "hero" && <HeroEditor data={portfolioData?.hero} onUpdate={fetchData} handleImageUpload={handleImageUpload} />}
          {activeTab === "about" && <AboutEditor data={portfolioData?.about} onUpdate={fetchData} />}
          {activeTab === "projects" && <ProjectsManager data={portfolioData?.projects} onUpdate={fetchData} handleImageUpload={handleImageUpload} />}
          {activeTab === "skills" && <SkillsManager data={portfolioData?.skills} onUpdate={fetchData} />}
          {activeTab === "experience" && (
            <ExperienceManager
              jobs={portfolioData?.experience}
              stats={portfolioData?.experienceStats}
              nodes={portfolioData?.architectureNodes}
              onUpdate={fetchData}
            />
          )}
          {activeTab === "education" && <EducationManager data={portfolioData?.education} onUpdate={fetchData} />}
          {activeTab === "certificates" && <CertificatesManager data={portfolioData?.certificates} onUpdate={fetchData} handleImageUpload={handleImageUpload} />}
          {activeTab === "achievements" && <AchievementsManager stats={portfolioData?.achievementStats} honors={portfolioData?.honors} onUpdate={fetchData} />}
          {activeTab === "contact" && <ContactInfoEditor data={portfolioData?.contact} onUpdate={fetchData} />}
          {activeTab === "socials" && <SocialLinksManager data={portfolioData?.socials} onUpdate={fetchData} />}
        </div>
      </main>
    </div>
  );
}

// ============================================
// 1. HERO EDITOR
// ============================================
function HeroEditor({ data, onUpdate, handleImageUpload }: any) {
  const [form, setForm] = useState({
    name: data?.name || "",
    subtitle: data?.subtitle || "",
    description: data?.description || "",
    profileImage: data?.profileImage || "",
    phrases: data?.phrases?.join("\n") || ""
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        phrases: form.phrases.split("\n").filter((p: string) => p.trim() !== "")
      };
      await axios.put(`${API_BASE}/hero`, payload, getAuthHeaders());
      toast.success("Hero configurations updated!");
      onUpdate();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to update Hero details");
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase font-bold">Developer Name</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent transition-all"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase font-bold">Sub-headline Role</label>
          <input
            type="text"
            value={form.subtitle}
            onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent transition-all"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase font-bold">Intro Description</label>
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={3}
          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
          required
        ></textarea>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase font-bold">Profile Illustration (Avatar)</label>
          <div className="flex gap-4 items-center">
            {form.profileImage && (
              <img src={form.profileImage} alt="Avatar" className="w-16 h-16 rounded-full object-cover border border-purple-500/30 shrink-0" />
            )}
            <div className="flex-1 relative">
              <input
                type="text"
                value={form.profileImage}
                onChange={(e) => setForm({ ...form, profileImage: e.target.value })}
                placeholder="Image URL"
                className="w-full bg-black/40 border border-white/10 rounded-xl pl-4 pr-12 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent transition-all"
              />
              <label className="absolute right-2 top-2 p-1.5 bg-purple-600/80 hover:bg-purple-600 text-white rounded-lg cursor-pointer transition-all">
                <Upload size={14} />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, (url: string) => setForm({ ...form, profileImage: url }))}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase font-bold">
            Typewriter Objectives (one phrase per line)
          </label>
          <textarea
            value={form.phrases}
            onChange={(e) => setForm({ ...form, phrases: e.target.value })}
            rows={4}
            placeholder="Line 1&#10;Line 2"
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white font-mono focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
            required
          ></textarea>
        </div>
      </div>

      <button
        type="submit"
        className="py-3 px-6 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-medium text-xs flex items-center justify-center gap-1.5 hover:brightness-110 shadow shadow-purple-500/10 cursor-pointer"
      >
        <Save size={14} />
        Save Details
      </button>
    </form>
  );
}

// ============================================
// 2. ABOUT EDITOR
// ============================================
function AboutEditor({ data, onUpdate }: any) {
  const [form, setForm] = useState({
    storyTitle: data?.storyTitle || "Engineering & Foundations",
    storyBody: data?.storyBody || "",
    storySubTitle: data?.storySubTitle || "Global Ambitions",
    storySubBody: data?.storySubBody || "",
    storyTags: data?.storyTags?.join(", ") || "",
    highlights: data?.highlights || []
  });

  const [newHighlight, setNewHighlight] = useState({ title: "", desc: "", icon: "Cpu" });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        storyTags: form.storyTags.split(",").map((t: string) => t.trim()).filter((t: string) => t !== "")
      };
      await axios.put(`${API_BASE}/about`, payload, getAuthHeaders());
      toast.success("About sections published!");
      onUpdate();
    } catch (err: any) {
      toast.error("Failed to save About.");
    }
  };

  const addHighlight = () => {
    if (!newHighlight.title || !newHighlight.desc) {
      toast.error("Fill highlight details.");
      return;
    }
    const colorClasses = [
      "border-purple-500/20 hover:border-purple-500/50 hover:shadow-purple-500/10",
      "border-cyan-500/20 hover:border-cyan-500/50 hover:shadow-cyan-500/10",
      "border-pink-500/20 hover:border-pink-500/50 hover:shadow-pink-500/10",
      "border-blue-500/20 hover:border-blue-500/50 hover:shadow-blue-500/10",
      "border-teal-500/20 hover:border-teal-500/50 hover:shadow-teal-500/10",
      "border-amber-500/20 hover:border-amber-500/50 hover:shadow-amber-500/10"
    ];
    const randColor = colorClasses[Math.floor(Math.random() * colorClasses.length)];

    setForm({
      ...form,
      highlights: [...form.highlights, { ...newHighlight, color: randColor }]
    });
    setNewHighlight({ title: "", desc: "", icon: "Cpu" });
    toast.success("Highlight added to layout!");
  };

  const removeHighlight = (idx: number) => {
    setForm({
      ...form,
      highlights: form.highlights.filter((_: any, i: number) => i !== idx)
    });
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left story editor */}
        <div className="space-y-4">
          <h3 className="font-bold text-sm font-mono border-b border-white/5 pb-2 text-cyan-400">Story 1: Academic & CSE Foundations</h3>
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase font-bold">Story Headline</label>
            <input
              type="text"
              value={form.storyTitle}
              onChange={(e) => setForm({ ...form, storyTitle: e.target.value })}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase font-bold">Story Contents</label>
            <textarea
              value={form.storyBody}
              onChange={(e) => setForm({ ...form, storyBody: e.target.value })}
              rows={4}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
            ></textarea>
          </div>
        </div>

        {/* Right story editor */}
        <div className="space-y-4">
          <h3 className="font-bold text-sm font-mono border-b border-white/5 pb-2 text-cyan-400">Story 2: Career Targets</h3>
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase font-bold">Story Headline</label>
            <input
              type="text"
              value={form.storySubTitle}
              onChange={(e) => setForm({ ...form, storySubTitle: e.target.value })}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase font-bold">Story Contents</label>
            <textarea
              value={form.storySubBody}
              onChange={(e) => setForm({ ...form, storySubBody: e.target.value })}
              rows={4}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
            ></textarea>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase font-bold">Focus Area Tag Badges (comma separated)</label>
        <input
          type="text"
          value={form.storyTags}
          onChange={(e) => setForm({ ...form, storyTags: e.target.value })}
          placeholder="e.g. Remote Teams, AI Startups, Global Scale"
          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent transition-all"
        />
      </div>

      {/* Focus Area Highlights Sub-CRUD */}
      <div className="border-t border-white/5 pt-6 space-y-4">
        <h3 className="font-bold text-sm font-mono text-cyan-400">Engineering Focus Cards ({form.highlights.length})</h3>
        
        {/* Existing highlight badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {form.highlights.map((h: any, idx: number) => (
            <div key={idx} className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 flex justify-between items-start gap-2">
              <div>
                <div className="text-xs font-bold text-white font-mono flex items-center gap-1.5">
                  <span className="text-[10px] text-slate-500 px-1 bg-black rounded">Icon: {h.icon}</span>
                  {h.title}
                </div>
                <p className="text-[10px] text-slate-400 mt-1">{h.desc}</p>
              </div>
              <button
                type="button"
                onClick={() => removeHighlight(idx)}
                className="text-rose-400 hover:text-rose-300 p-1 bg-white/5 rounded hover:bg-white/10 transition-all cursor-pointer"
              >
                <Trash2 size={12} />
              </button>
            </div>
          ))}
        </div>

        {/* Add new focus card */}
        <div className="p-5 rounded-2xl border border-dashed border-white/10 bg-black/20 grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
          <div className="sm:col-span-3">
            <label className="block text-[10px] font-mono text-slate-400 mb-1.5 uppercase font-bold">Card Title</label>
            <input
              type="text"
              value={newHighlight.title}
              onChange={(e) => setNewHighlight({ ...newHighlight, title: e.target.value })}
              placeholder="e.g. Docker & Kubernetes"
              className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>
          <div className="sm:col-span-6">
            <label className="block text-[10px] font-mono text-slate-400 mb-1.5 uppercase font-bold">Short Description</label>
            <input
              type="text"
              value={newHighlight.desc}
              onChange={(e) => setNewHighlight({ ...newHighlight, desc: e.target.value })}
              placeholder="Brief summary of competence..."
              className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-[10px] font-mono text-slate-400 mb-1.5 uppercase font-bold">Lucide Icon name</label>
            <select
              value={newHighlight.icon}
              onChange={(e) => setNewHighlight({ ...newHighlight, icon: e.target.value })}
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent transition-all"
            >
              <option value="Cpu">Cpu</option>
              <option value="Server">Server</option>
              <option value="Brain">Brain</option>
              <option value="Network">Network</option>
              <option value="Cloud">Cloud</option>
              <option value="Layers">Layers</option>
              <option value="Code">Code</option>
              <option value="Terminal">Terminal</option>
            </select>
          </div>
          <div className="sm:col-span-1">
            <button
              type="button"
              onClick={addHighlight}
              className="w-full py-2 bg-cyan-600/20 border border-cyan-500 hover:bg-cyan-600 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center cursor-pointer"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="py-3 px-6 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-medium text-xs flex items-center justify-center gap-1.5 hover:brightness-110 shadow shadow-purple-500/10 cursor-pointer"
      >
        <Save size={14} />
        Save Details
      </button>
    </form>
  );
}

// ============================================
// 3. PROJECTS MANAGER
// ============================================
function ProjectsManager({ data, onUpdate, handleImageUpload }: any) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<any>({
    title: "",
    category: "",
    tech: "",
    desc: "",
    architecture: "",
    achievements: "",
    github: "",
    live: "",
    image: "",
    glowColor: "hover:border-purple-500/50 hover:shadow-purple-500/10"
  });

  const startEdit = (project: any) => {
    setEditingId(project._id);
    setForm({
      title: project.title,
      category: project.category,
      tech: project.tech.join(", "),
      desc: project.desc,
      architecture: project.architecture || "",
      achievements: project.achievements.join("\n"),
      github: project.github || "",
      live: project.live || "",
      image: project.image || "",
      glowColor: project.glowColor || "hover:border-purple-500/50 hover:shadow-purple-500/10"
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({
      title: "",
      category: "",
      tech: "",
      desc: "",
      architecture: "",
      achievements: "",
      github: "",
      live: "",
      image: "",
      glowColor: "hover:border-purple-500/50 hover:shadow-purple-500/10"
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.desc || !form.category) {
      toast.error("Please fill required fields.");
      return;
    }

    const payload = {
      ...form,
      tech: form.tech.split(",").map((t: string) => t.trim()).filter((t: string) => t !== ""),
      achievements: form.achievements.split("\n").map((a: string) => a.trim()).filter((a: string) => a !== "")
    };

    try {
      if (editingId) {
        await axios.put(`${API_BASE}/projects/${editingId}`, payload, getAuthHeaders());
        toast.success("Project updated!");
      } else {
        await axios.post(`${API_BASE}/projects`, payload, getAuthHeaders());
        toast.success("Project published successfully!");
      }
      cancelEdit();
      onUpdate();
    } catch (err) {
      toast.error("Failed to save project.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Confirm delete project? This cannot be undone.")) return;
    try {
      await axios.delete(`${API_BASE}/projects/${id}`, getAuthHeaders());
      toast.success("Project deleted.");
      onUpdate();
    } catch (err) {
      toast.error("Failed to delete project.");
    }
  };

  return (
    <div className="space-y-8">
      {/* Editor Form */}
      <form onSubmit={handleSave} className="space-y-5 p-6 rounded-2xl border border-slate-900 bg-slate-950/40">
        <h3 className="font-bold text-sm font-mono text-cyan-400 border-b border-white/5 pb-2">
          {editingId ? "Modify Existing Project" : "Publish New Feature Project"}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase font-bold">Project Name</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. AI Code Generation SaaS"
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase font-bold">Sub-Category</label>
            <input
              type="text"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              placeholder="e.g. Distributed Systems"
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent transition-all"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase font-bold">Tech Stack Badges (comma separated)</label>
            <input
              type="text"
              value={form.tech}
              onChange={(e) => setForm({ ...form, tech: e.target.value })}
              placeholder="e.g. React.js, Spring Boot, Kubernetes"
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase font-bold">Glow Border Styling Accent</label>
            <select
              value={form.glowColor}
              onChange={(e) => setForm({ ...form, glowColor: e.target.value })}
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent transition-all"
            >
              <option value="hover:border-purple-500/50 hover:shadow-purple-500/10">Purple glow</option>
              <option value="hover:border-cyan-500/50 hover:shadow-cyan-500/10">Cyan glow</option>
              <option value="hover:border-pink-500/50 hover:shadow-pink-500/10">Pink glow</option>
              <option value="hover:border-amber-500/50 hover:shadow-amber-500/10">Amber glow</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase font-bold">Elevator Pitch Description</label>
          <textarea
            value={form.desc}
            onChange={(e) => setForm({ ...form, desc: e.target.value })}
            rows={3}
            placeholder="Describe what this app does..."
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
            required
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase font-bold">System Architecture Logs</label>
            <textarea
              value={form.architecture}
              onChange={(e) => setForm({ ...form, architecture: e.target.value })}
              rows={4}
              placeholder="e.g. React client -> Kubernetes Ingress -> Spring Boot..."
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
            ></textarea>
          </div>
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase font-bold">Key Performance Achievements (one per line)</label>
            <textarea
              value={form.achievements}
              onChange={(e) => setForm({ ...form, achievements: e.target.value })}
              rows={4}
              placeholder="e.g. Sustained 50,000+ requests/day&#10;Reduced latency by 40%"
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white font-mono focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
            ></textarea>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase font-bold">Source Code Repository</label>
            <input
              type="text"
              value={form.github}
              onChange={(e) => setForm({ ...form, github: e.target.value })}
              placeholder="GitHub link"
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase font-bold">Live Production Host URL</label>
            <input
              type="text"
              value={form.live}
              onChange={(e) => setForm({ ...form, live: e.target.value })}
              placeholder="Live Demo URL"
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase font-bold">Feature Illustration Image</label>
            <div className="relative">
              <input
                type="text"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                placeholder="Uploaded Image URL"
                className="w-full bg-black/40 border border-white/10 rounded-xl pl-4 pr-12 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent transition-all"
              />
              <label className="absolute right-2 top-2 p-1.5 bg-purple-600/80 hover:bg-purple-600 text-white rounded-lg cursor-pointer transition-all">
                <Upload size={14} />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, (url: string) => setForm({ ...form, image: url }))}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="py-3 px-6 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-medium text-xs flex items-center justify-center gap-1.5 hover:brightness-110 shadow shadow-purple-500/10 cursor-pointer"
          >
            <Save size={14} />
            {editingId ? "Save Modifications" : "Publish Project"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={cancelEdit}
              className="py-3 px-6 rounded-xl bg-slate-900 border border-white/10 text-slate-400 hover:text-white text-xs font-medium cursor-pointer"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {/* Projects list */}
      <div className="space-y-4">
        <h3 className="font-bold text-sm font-mono text-cyan-400">Current Projects ({data?.length || 0})</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data?.map((project: any) => (
            <div key={project._id} className="p-5 rounded-2xl border border-slate-900 bg-slate-950/10 flex justify-between items-start gap-4 hover:border-slate-800 transition-all">
              <div>
                <span className="text-[9px] font-mono text-purple-400 uppercase tracking-wider">{project.category}</span>
                <h4 className="text-base font-bold text-white mt-1">{project.title}</h4>
                <p className="text-xs text-slate-400 mt-2 line-clamp-2">{project.desc}</p>
                <div className="flex flex-wrap gap-1 mt-3">
                  {project.tech.map((t: string) => (
                    <span key={t} className="text-[9px] font-mono bg-white/5 border border-white/5 px-1.5 py-0.5 rounded text-slate-400">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => startEdit(project)}
                  className="p-2 bg-slate-900 border border-white/5 hover:border-white/10 text-cyan-400 hover:text-cyan-300 rounded-xl cursor-pointer"
                >
                  <Edit2 size={14} />
                </button>
                <button
                  onClick={() => handleDelete(project._id)}
                  className="p-2 bg-slate-900 border border-white/5 hover:border-white/10 text-rose-400 hover:text-rose-300 rounded-xl cursor-pointer"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================
// 4. SKILLS MANAGER
// ============================================
function SkillsManager({ data, onUpdate }: any) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    category: "",
    icon: "Server",
    skills: "",
    accent: "rgba(170, 59, 255, 0.4)",
    glow: "shadow-[0_0_20px_rgba(170,59,255,0.15)]"
  });

  const startEdit = (skill: any) => {
    setEditingId(skill._id);
    setForm({
      category: skill.category,
      icon: skill.icon,
      skills: skill.skills.join(", "),
      accent: skill.accent || "rgba(170, 59, 255, 0.4)",
      glow: skill.glow || "shadow-[0_0_20px_rgba(170,59,255,0.15)]"
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({
      category: "",
      icon: "Server",
      skills: "",
      accent: "rgba(170, 59, 255, 0.4)",
      glow: "shadow-[0_0_20px_rgba(170,59,255,0.15)]"
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.category || !form.skills) {
      toast.error("Please fill in the fields.");
      return;
    }

    const payload = {
      ...form,
      skills: form.skills.split(",").map((s: string) => s.trim()).filter((s: string) => s !== "")
    };

    try {
      if (editingId) {
        await axios.put(`${API_BASE}/skills/${editingId}`, payload, getAuthHeaders());
        toast.success("Skill category updated!");
      } else {
        await axios.post(`${API_BASE}/skills`, payload, getAuthHeaders());
        toast.success("Skill category created!");
      }
      cancelEdit();
      onUpdate();
    } catch (err) {
      toast.error("Failed to save skills.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Confirm delete skills?")) return;
    try {
      await axios.delete(`${API_BASE}/skills/${id}`, getAuthHeaders());
      toast.success("Skills deleted.");
      onUpdate();
    } catch (err) {
      toast.error("Failed to delete skills.");
    }
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSave} className="space-y-4 p-6 rounded-2xl border border-slate-900 bg-slate-950/40">
        <h3 className="font-bold text-sm font-mono text-cyan-400 border-b border-white/5 pb-2">
          {editingId ? "Edit Tech Stack Category" : "Add New Tech Stack Category"}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase font-bold">Category Title</label>
            <input
              type="text"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              placeholder="e.g. Backend Architecture"
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase font-bold">Lucide Icon Key</label>
            <select
              value={form.icon}
              onChange={(e) => setForm({ ...form, icon: e.target.value })}
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
            >
              <option value="Server">Server</option>
              <option value="Code">Code</option>
              <option value="Database">Database</option>
              <option value="Cloud">Cloud</option>
              <option value="Brain">Brain</option>
              <option value="Terminal">Terminal</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase font-bold">Accent Color Code (rgba)</label>
            <input
              type="text"
              value={form.accent}
              onChange={(e) => setForm({ ...form, accent: e.target.value })}
              placeholder="rgba(170, 59, 255, 0.4)"
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase font-bold">Skills List (comma separated)</label>
          <input
            type="text"
            value={form.skills}
            onChange={(e) => setForm({ ...form, skills: e.target.value })}
            placeholder="e.g. Java, Spring Boot, REST APIs"
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
            required
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="py-3 px-6 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-medium text-xs flex items-center justify-center gap-1.5 hover:brightness-110 shadow shadow-purple-500/10 cursor-pointer"
          >
            <Save size={14} />
            Save Skills
          </button>
          {editingId && (
            <button
              type="button"
              onClick={cancelEdit}
              className="py-3 px-6 rounded-xl bg-slate-900 border border-white/10 text-slate-400 hover:text-white text-xs font-medium cursor-pointer"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {/* Grid of skills */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data?.map((skill: any) => (
          <div key={skill._id} className="p-5 rounded-2xl border border-slate-900 bg-slate-950/20 flex justify-between items-start gap-4">
            <div>
              <div className="text-xs font-bold text-white font-mono flex items-center gap-2">
                <span className="p-1 rounded bg-black border border-white/5 text-purple-400">{skill.icon}</span>
                {skill.category}
              </div>
              <div className="flex flex-wrap gap-1 mt-4">
                {skill.skills.map((s: string) => (
                  <span key={s} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/5 text-slate-300">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex gap-1.5">
              <button
                onClick={() => startEdit(skill)}
                className="p-1.5 bg-slate-900 border border-white/5 text-cyan-400 rounded-lg cursor-pointer"
              >
                <Edit2 size={12} />
              </button>
              <button
                onClick={() => handleDelete(skill._id)}
                className="p-1.5 bg-slate-900 border border-white/5 text-rose-400 rounded-lg cursor-pointer"
              >
                <Trash2 size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================
// 5. EXPERIENCE & ARCHITECTURE MANAGER
// ============================================
function ExperienceManager({ jobs, stats, nodes, onUpdate }: any) {
  // We manage Jobs first, and can manage stats / diagram nodes in sub-panels
  const [editJobId, setEditJobId] = useState<string | null>(null);
  const [jobForm, setJobForm] = useState({
    title: "",
    company: "",
    duration: "",
    achievements: ""
  });

  const [editStatId, setEditStatId] = useState<string | null>(null);
  const [statForm, setStatForm] = useState({
    label: "",
    end: 0,
    suffix: "",
    desc: ""
  });

  const [editNodeId, setEditNodeId] = useState<string | null>(null);
  const [nodeForm, setNodeForm] = useState({
    id: 1,
    label: "",
    type: "back",
    desc: "",
    details: ""
  });

  // --- JOB CRUDS ---
  const saveJob = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...jobForm,
      achievements: jobForm.achievements.split("\n").map(a => a.trim()).filter(a => a !== "")
    };
    try {
      if (editJobId) {
        await axios.put(`${API_BASE}/experience/${editJobId}`, payload, getAuthHeaders());
        toast.success("Job updated!");
      } else {
        await axios.post(`${API_BASE}/experience`, payload, getAuthHeaders());
        toast.success("Job added!");
      }
      setJobForm({ title: "", company: "", duration: "", achievements: "" });
      setEditJobId(null);
      onUpdate();
    } catch {
      toast.error("Failed to save job.");
    }
  };

  const deleteJob = async (id: string) => {
    if (!window.confirm("Delete job?")) return;
    try {
      await axios.delete(`${API_BASE}/experience/${id}`, getAuthHeaders());
      toast.success("Job deleted.");
      onUpdate();
    } catch {
      toast.error("Failed to delete job.");
    }
  };

  // --- STAT CRUDS ---
  const saveStat = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editStatId) {
        await axios.put(`${API_BASE}/experience-stats/${editStatId}`, statForm, getAuthHeaders());
        toast.success("Stat updated!");
      } else {
        await axios.post(`${API_BASE}/experience-stats`, statForm, getAuthHeaders());
        toast.success("Stat created!");
      }
      setStatForm({ label: "", end: 0, suffix: "", desc: "" });
      setEditStatId(null);
      onUpdate();
    } catch {
      toast.error("Failed to save stat.");
    }
  };

  const deleteStat = async (id: string) => {
    if (!window.confirm("Delete stat?")) return;
    try {
      await axios.delete(`${API_BASE}/experience-stats/${id}`, getAuthHeaders());
      toast.success("Stat deleted.");
      onUpdate();
    } catch {
      toast.error("Failed to delete stat.");
    }
  };

  // --- NODE CRUDS ---
  const saveNode = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...nodeForm,
      details: nodeForm.details.split("\n").map(d => d.trim()).filter(d => d !== "")
    };
    try {
      if (editNodeId) {
        await axios.put(`${API_BASE}/architecture-nodes/${editNodeId}`, payload, getAuthHeaders());
        toast.success("Diagram Node updated!");
      } else {
        await axios.post(`${API_BASE}/architecture-nodes`, payload, getAuthHeaders());
        toast.success("Diagram Node created!");
      }
      setNodeForm({ id: 1, label: "", type: "back", desc: "", details: "" });
      setEditNodeId(null);
      onUpdate();
    } catch {
      toast.error("Failed to save architecture node.");
    }
  };

  const deleteNode = async (id: string) => {
    if (!window.confirm("Delete node?")) return;
    try {
      await axios.delete(`${API_BASE}/architecture-nodes/${id}`, getAuthHeaders());
      toast.success("Node deleted.");
      onUpdate();
    } catch {
      toast.error("Failed to delete node.");
    }
  };

  return (
    <div className="space-y-12">
      {/* 1. PROFESSIONAL JOBS EDITOR */}
      <div className="space-y-6">
        <form onSubmit={saveJob} className="p-6 rounded-2xl border border-slate-900 bg-slate-950/40 space-y-4">
          <h3 className="font-bold text-sm font-mono text-cyan-400 border-b border-white/5 pb-2">
            {editJobId ? "Edit Job Information" : "Add Job Information"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase font-bold">Role Title</label>
              <input
                type="text"
                value={jobForm.title}
                onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                placeholder="Full Stack Developer"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase font-bold">Company</label>
              <input
                type="text"
                value={jobForm.company}
                onChange={(e) => setJobForm({ ...jobForm, company: e.target.value })}
                placeholder="Fakhri IT Services"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase font-bold">Duration / Dates</label>
              <input
                type="text"
                value={jobForm.duration}
                onChange={(e) => setJobForm({ ...jobForm, duration: e.target.value })}
                placeholder="2024 - Present"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase font-bold">Achievements (one per line)</label>
            <textarea
              value={jobForm.achievements}
              onChange={(e) => setJobForm({ ...jobForm, achievements: e.target.value })}
              rows={4}
              placeholder="Engineered multi-tenant SaaS...&#10;Optimized queries by 35%..."
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white font-mono"
            ></textarea>
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="py-2.5 px-6 bg-gradient-to-r from-purple-600 to-cyan-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <Save size={14} />
              Save Job
            </button>
            {editJobId && (
              <button
                type="button"
                onClick={() => {
                  setEditJobId(null);
                  setJobForm({ title: "", company: "", duration: "", achievements: "" });
                }}
                className="py-2.5 px-6 bg-slate-900 border border-white/10 text-slate-400 rounded-xl text-xs"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* Existing Jobs List */}
        <div className="space-y-3">
          {jobs?.map((job: any) => (
            <div key={job._id} className="p-5 rounded-xl border border-slate-900 bg-slate-950/20 flex justify-between items-start gap-4">
              <div>
                <h4 className="text-sm font-bold text-white">{job.title}</h4>
                <p className="text-xs text-cyan-400 font-mono mt-0.5">{job.company} — {job.duration}</p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-400 text-xs">
                  {job.achievements.map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => {
                    setEditJobId(job._id);
                    setJobForm({
                      title: job.title,
                      company: job.company,
                      duration: job.duration,
                      achievements: job.achievements.join("\n")
                    });
                  }}
                  className="p-2 bg-slate-900 text-cyan-400 rounded-xl cursor-pointer"
                >
                  <Edit2 size={12} />
                </button>
                <button
                  onClick={() => deleteJob(job._id)}
                  className="p-2 bg-slate-900 text-rose-400 rounded-xl cursor-pointer"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. EXPERIENCE METRIC STATS */}
      <div className="border-t border-white/5 pt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <form onSubmit={saveStat} className="p-6 rounded-2xl border border-slate-900 bg-slate-950/40 space-y-4">
            <h3 className="font-bold text-sm font-mono text-cyan-400 border-b border-white/5 pb-2">
              {editStatId ? "Edit Job Metric Stat" : "Add Job Metric Stat"}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-[10px] font-mono text-slate-400 mb-1.5 uppercase font-bold">Stat Label</label>
                <input
                  type="text"
                  value={statForm.label}
                  onChange={(e) => setStatForm({ ...statForm, label: e.target.value })}
                  placeholder="e.g. API Latency Red."
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-1.5 uppercase font-bold">Numeric End</label>
                <input
                  type="number"
                  value={statForm.end}
                  onChange={(e) => setStatForm({ ...statForm, end: parseInt(e.target.value) || 0 })}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-1.5 uppercase font-bold">Suffix</label>
                <input
                  type="text"
                  value={statForm.suffix}
                  onChange={(e) => setStatForm({ ...statForm, suffix: e.target.value })}
                  placeholder="e.g. %, +"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-[10px] font-mono text-slate-400 mb-1.5 uppercase font-bold">Short Description</label>
                <input
                  type="text"
                  value={statForm.desc}
                  onChange={(e) => setStatForm({ ...statForm, desc: e.target.value })}
                  placeholder="PostgreSQL query tuning..."
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="py-2 px-4 bg-cyan-600/20 border border-cyan-500 hover:bg-cyan-600 text-white rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <Save size={12} />
                Save Stat
              </button>
              {editStatId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditStatId(null);
                    setStatForm({ label: "", end: 0, suffix: "", desc: "" });
                  }}
                  className="py-2 px-4 bg-slate-900 border border-white/10 text-slate-400 rounded-xl text-xs"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          {/* List of Stats */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            {stats?.map((stat: any) => (
              <div key={stat._id} className="p-4 rounded-xl border border-slate-900 bg-slate-950/20 flex justify-between items-start">
                <div>
                  <div className="text-xl font-extrabold text-cyan-400 font-display">
                    {stat.end}{stat.suffix}
                  </div>
                  <div className="text-[10px] font-mono font-bold text-white mt-1 uppercase">{stat.label}</div>
                  <div className="text-[9px] text-slate-500 mt-0.5">{stat.desc}</div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <button
                    onClick={() => {
                      setEditStatId(stat._id);
                      setStatForm({ label: stat.label, end: stat.end, suffix: stat.suffix, desc: stat.desc });
                    }}
                    className="p-1 bg-slate-900 text-cyan-400 rounded cursor-pointer"
                  >
                    <Edit2 size={10} />
                  </button>
                  <button
                    onClick={() => deleteStat(stat._id)}
                    className="p-1 bg-slate-900 text-rose-400 rounded cursor-pointer"
                  >
                    <Trash2 size={10} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. INTERACTIVE DIAGRAM NODES */}
        <div>
          <form onSubmit={saveNode} className="p-6 rounded-2xl border border-slate-900 bg-slate-950/40 space-y-4">
            <h3 className="font-bold text-sm font-mono text-cyan-400 border-b border-white/5 pb-2">
              {editNodeId ? "Edit Architecture Node" : "Add Architecture Node"}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-1.5 uppercase font-bold">Node Order ID</label>
                <input
                  type="number"
                  value={nodeForm.id}
                  onChange={(e) => setNodeForm({ ...nodeForm, id: parseInt(e.target.value) || 1 })}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-1.5 uppercase font-bold">Node Title</label>
                <input
                  type="text"
                  value={nodeForm.label}
                  onChange={(e) => setNodeForm({ ...nodeForm, label: e.target.value })}
                  placeholder="e.g. Spring Boot App"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-1.5 uppercase font-bold">Node Type (Icon Style)</label>
                <select
                  value={nodeForm.type}
                  onChange={(e) => setNodeForm({ ...nodeForm, type: e.target.value })}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                >
                  <option value="front">Frontend (Layout)</option>
                  <option value="sec">Security (Zap)</option>
                  <option value="back">Backend (Cpu)</option>
                  <option value="db">Database (Database)</option>
                  <option value="ai">AI Node (Brain)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono text-slate-400 mb-1.5 uppercase font-bold">Short Desc</label>
              <input
                type="text"
                value={nodeForm.desc}
                onChange={(e) => setNodeForm({ ...nodeForm, desc: e.target.value })}
                placeholder="Brief summary..."
                className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono text-slate-400 mb-1.5 uppercase font-bold">Detailed Bullets (one per line)</label>
              <textarea
                value={nodeForm.details}
                onChange={(e) => setNodeForm({ ...nodeForm, details: e.target.value })}
                rows={3}
                placeholder="Bullet points on click..."
                className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-mono resize-none"
              ></textarea>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="py-2 px-4 bg-cyan-600/20 border border-cyan-500 hover:bg-cyan-600 text-white rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <Save size={12} />
                Save Node
              </button>
              {editNodeId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditNodeId(null);
                    setNodeForm({ id: 1, label: "", type: "back", desc: "", details: "" });
                  }}
                  className="py-2 px-4 bg-slate-900 border border-white/10 text-slate-400 rounded-xl text-xs"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          {/* List of nodes */}
          <div className="space-y-2 mt-4 max-h-48 overflow-y-auto">
            {nodes?.map((node: any) => (
              <div key={node._id} className="p-3 rounded-xl border border-slate-900 bg-slate-950/20 flex justify-between items-center text-xs">
                <div>
                  <span className="font-mono text-purple-400 mr-2">[{node.id}]</span>
                  <strong>{node.label}</strong> <span className="text-[10px] text-slate-500 font-mono">({node.type})</span>
                  <p className="text-[10px] text-slate-400 truncate max-w-[200px] mt-0.5">{node.desc}</p>
                </div>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => {
                      setEditNodeId(node._id);
                      setNodeForm({
                        id: node.id,
                        label: node.label,
                        type: node.type,
                        desc: node.desc || "",
                        details: node.details?.join("\n") || ""
                      });
                    }}
                    className="p-1 bg-slate-900 text-cyan-400 rounded cursor-pointer"
                  >
                    <Edit2 size={10} />
                  </button>
                  <button
                    onClick={() => deleteNode(node._id)}
                    className="p-1 bg-slate-900 text-rose-400 rounded cursor-pointer"
                  >
                    <Trash2 size={10} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// 6. EDUCATION MANAGER
// ============================================
function EducationManager({ data, onUpdate }: any) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    school: "",
    degree: "",
    duration: "",
    details: ""
  });

  const startEdit = (edu: any) => {
    setEditingId(edu._id);
    setForm({
      school: edu.school,
      degree: edu.degree,
      duration: edu.duration,
      details: edu.details || ""
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ school: "", degree: "", duration: "", details: "" });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.school || !form.degree || !form.duration) {
      toast.error("Fill required fields.");
      return;
    }
    try {
      if (editingId) {
        await axios.put(`${API_BASE}/education/${editingId}`, form, getAuthHeaders());
        toast.success("Education record updated!");
      } else {
        await axios.post(`${API_BASE}/education`, form, getAuthHeaders());
        toast.success("Education record created!");
      }
      cancelEdit();
      onUpdate();
    } catch {
      toast.error("Failed to save education.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete education?")) return;
    try {
      await axios.delete(`${API_BASE}/education/${id}`, getAuthHeaders());
      toast.success("Education deleted.");
      onUpdate();
    } catch {
      toast.error("Failed to delete education.");
    }
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSave} className="space-y-4 p-6 rounded-2xl border border-slate-900 bg-slate-950/40">
        <h3 className="font-bold text-sm font-mono text-cyan-400 border-b border-white/5 pb-2">
          {editingId ? "Edit Education Item" : "Add Education Item"}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase font-bold">School/University</label>
            <input
              type="text"
              value={form.school}
              onChange={(e) => setForm({ ...form, school: e.target.value })}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase font-bold">Degree / Course</label>
            <input
              type="text"
              value={form.degree}
              onChange={(e) => setForm({ ...form, degree: e.target.value })}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase font-bold">Duration</label>
            <input
              type="text"
              value={form.duration}
              onChange={(e) => setForm({ ...form, duration: e.target.value })}
              placeholder="e.g. 2022 - 2026"
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase font-bold">Details</label>
          <input
            type="text"
            value={form.details}
            onChange={(e) => setForm({ ...form, details: e.target.value })}
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white"
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="py-3 px-6 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-medium text-xs flex items-center justify-center gap-1.5 hover:brightness-110 shadow shadow-purple-500/10 cursor-pointer"
          >
            <Save size={14} />
            Save Education
          </button>
          {editingId && (
            <button
              type="button"
              onClick={cancelEdit}
              className="py-3 px-6 rounded-xl bg-slate-900 border border-white/10 text-slate-400 hover:text-white text-xs font-medium cursor-pointer"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {/* List of items */}
      <div className="space-y-4">
        {data?.map((edu: any) => (
          <div key={edu._id} className="p-5 rounded-2xl border border-slate-900 bg-slate-950/20 flex justify-between items-start">
            <div>
              <h4 className="text-sm font-bold text-white font-mono">{edu.school}</h4>
              <p className="text-xs text-cyan-400 mt-1">{edu.degree} ({edu.duration})</p>
              {edu.details && <p className="text-xs text-slate-400 mt-2">{edu.details}</p>}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => startEdit(edu)}
                className="p-2 bg-slate-900 text-cyan-400 rounded-xl cursor-pointer"
              >
                <Edit2 size={12} />
              </button>
              <button
                onClick={() => handleDelete(edu._id)}
                className="p-2 bg-slate-900 text-rose-400 rounded-xl cursor-pointer"
              >
                <Trash2 size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================
// 7. CERTIFICATES MANAGER
// ============================================
function CertificatesManager({ data, onUpdate, handleImageUpload }: any) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    issuer: "",
    date: "",
    image: "",
    link: ""
  });

  const startEdit = (cert: any) => {
    setEditingId(cert._id);
    setForm({
      name: cert.name,
      issuer: cert.issuer,
      date: cert.date || "",
      image: cert.image || "",
      link: cert.link || ""
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ name: "", issuer: "", date: "", image: "", link: "" });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.issuer) {
      toast.error("Please enter Name and Issuer.");
      return;
    }
    try {
      if (editingId) {
        await axios.put(`${API_BASE}/certificates/${editingId}`, form, getAuthHeaders());
        toast.success("Certificate updated!");
      } else {
        await axios.post(`${API_BASE}/certificates`, form, getAuthHeaders());
        toast.success("Certificate added!");
      }
      cancelEdit();
      onUpdate();
    } catch {
      toast.error("Failed to save certificate.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete certificate?")) return;
    try {
      await axios.delete(`${API_BASE}/certificates/${id}`, getAuthHeaders());
      toast.success("Certificate deleted.");
      onUpdate();
    } catch {
      toast.error("Failed to delete certificate.");
    }
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSave} className="space-y-4 p-6 rounded-2xl border border-slate-900 bg-slate-950/40">
        <h3 className="font-bold text-sm font-mono text-cyan-400 border-b border-white/5 pb-2">
          {editingId ? "Edit Certificate Item" : "Add Certificate Item"}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase font-bold">Certificate Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase font-bold">Issuer</label>
            <input
              type="text"
              value={form.issuer}
              onChange={(e) => setForm({ ...form, issuer: e.target.value })}
              placeholder="e.g. Oracle, AWS"
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase font-bold">Date</label>
            <input
              type="text"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              placeholder="e.g. 2024"
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase font-bold">Credential URL / Verification Link</label>
            <input
              type="text"
              value={form.link}
              onChange={(e) => setForm({ ...form, link: e.target.value })}
              placeholder="Verification link"
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase font-bold">Image / Attachment URL</label>
            <div className="relative">
              <input
                type="text"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                placeholder="Uploaded Certificate file URL"
                className="w-full bg-black/40 border border-white/10 rounded-xl pl-4 pr-12 py-2.5 text-sm text-white"
              />
              <label className="absolute right-2 top-1.5 p-1.5 bg-purple-600/80 hover:bg-purple-600 text-white rounded-lg cursor-pointer transition-all">
                <Upload size={14} />
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={(e) => handleImageUpload(e, (url: string) => setForm({ ...form, image: url }))}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="py-3 px-6 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-medium text-xs flex items-center justify-center gap-1.5 hover:brightness-110 shadow shadow-purple-500/10 cursor-pointer"
          >
            <Save size={14} />
            Save Certificate
          </button>
          {editingId && (
            <button
              type="button"
              onClick={cancelEdit}
              className="py-3 px-6 rounded-xl bg-slate-900 border border-white/10 text-slate-400 hover:text-white text-xs font-medium cursor-pointer"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {/* Grid of items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data?.map((cert: any) => (
          <div key={cert._id} className="p-5 rounded-2xl border border-slate-900 bg-slate-950/20 flex justify-between items-center gap-4">
            <div className="flex gap-3 items-center">
              {cert.image ? (
                <ImageIcon className="text-cyan-400 shrink-0" size={24} />
              ) : (
                <Award className="text-purple-400 shrink-0" size={24} />
              )}
              <div>
                <h4 className="text-sm font-bold text-white">{cert.name}</h4>
                <p className="text-xs text-slate-400 mt-0.5">{cert.issuer} ({cert.date || "N/A"})</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => startEdit(cert)}
                className="p-2 bg-slate-900 text-cyan-400 rounded-xl cursor-pointer"
              >
                <Edit2 size={12} />
              </button>
              <button
                onClick={() => handleDelete(cert._id)}
                className="p-2 bg-slate-900 text-rose-400 rounded-xl cursor-pointer"
              >
                <Trash2 size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================
// 8. ACHIEVEMENTS & STATS & HONORS MANAGER
// ============================================
function AchievementsManager({ stats, honors, onUpdate }: any) {
  const [editStatId, setEditStatId] = useState<string | null>(null);
  const [statForm, setStatForm] = useState({
    title: "",
    end: 0,
    suffix: "",
    desc: "",
    icon: "Code2"
  });

  const [editHonorId, setEditHonorId] = useState<string | null>(null);
  const [honorForm, setHonorForm] = useState({
    title: "",
    desc: "",
    badge: "",
    color: "from-purple-500/10 to-indigo-500/5 border-purple-500/20 text-purple-400"
  });

  // --- STAT CRUDS ---
  const saveStat = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const colors = statForm.icon === "Flame" ? ["#ea580c", "#f97316"] : ["#aa3bff", "#8b5cf6"];
      const payload = { ...statForm, colors };

      if (editStatId) {
        await axios.put(`${API_BASE}/achievement-stats/${editStatId}`, payload, getAuthHeaders());
        toast.success("Achievement Stat updated!");
      } else {
        await axios.post(`${API_BASE}/achievement-stats`, payload, getAuthHeaders());
        toast.success("Achievement Stat added!");
      }
      setStatForm({ title: "", end: 0, suffix: "", desc: "", icon: "Code2" });
      setEditStatId(null);
      onUpdate();
    } catch {
      toast.error("Failed to save stat.");
    }
  };

  const deleteStat = async (id: string) => {
    if (!window.confirm("Delete stat?")) return;
    try {
      await axios.delete(`${API_BASE}/achievement-stats/${id}`, getAuthHeaders());
      toast.success("Stat deleted.");
      onUpdate();
    } catch {
      toast.error("Failed to delete stat.");
    }
  };

  // --- HONOR CRUDS ---
  const saveHonor = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editHonorId) {
        await axios.put(`${API_BASE}/honors/${editHonorId}`, honorForm, getAuthHeaders());
        toast.success("Honor updated!");
      } else {
        await axios.post(`${API_BASE}/honors`, honorForm, getAuthHeaders());
        toast.success("Honor added!");
      }
      setHonorForm({ title: "", desc: "", badge: "", color: "from-purple-500/10 to-indigo-500/5 border-purple-500/20 text-purple-400" });
      setEditHonorId(null);
      onUpdate();
    } catch {
      toast.error("Failed to save honor.");
    }
  };

  const deleteHonor = async (id: string) => {
    if (!window.confirm("Delete honor?")) return;
    try {
      await axios.delete(`${API_BASE}/honors/${id}`, getAuthHeaders());
      toast.success("Honor deleted.");
      onUpdate();
    } catch {
      toast.error("Failed to delete honor.");
    }
  };

  return (
    <div className="space-y-12">
      {/* 1. COUNTERS STATS CRUDS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <form onSubmit={saveStat} className="p-6 rounded-2xl border border-slate-900 bg-slate-950/40 space-y-4">
            <h3 className="font-bold text-sm font-mono text-cyan-400 border-b border-white/5 pb-2">
              {editStatId ? "Edit Achievement Count Card" : "Add Achievement Count Card"}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-1.5 uppercase font-bold">Stat Title</label>
                <input
                  type="text"
                  value={statForm.title}
                  onChange={(e) => setStatForm({ ...statForm, title: e.target.value })}
                  placeholder="e.g. DSA Solved"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-1.5 uppercase font-bold">End Value</label>
                <input
                  type="number"
                  value={statForm.end}
                  onChange={(e) => setStatForm({ ...statForm, end: parseInt(e.target.value) || 0 })}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-1.5 uppercase font-bold">Suffix</label>
                <input
                  type="text"
                  value={statForm.suffix}
                  onChange={(e) => setStatForm({ ...statForm, suffix: e.target.value })}
                  placeholder="e.g. +, + Days"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-1.5 uppercase font-bold">Lucide Icon Key</label>
                <select
                  value={statForm.icon}
                  onChange={(e) => setStatForm({ ...statForm, icon: e.target.value })}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                >
                  <option value="Code2">Code2 (Brackets)</option>
                  <option value="Flame">Flame (Streak)</option>
                  <option value="GitCommit">GitCommit (Git)</option>
                  <option value="FolderGit">FolderGit (Repos)</option>
                  <option value="GitPullRequest">GitPullRequest (PRs)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono text-slate-400 mb-1.5 uppercase font-bold">Description</label>
              <input
                type="text"
                value={statForm.desc}
                onChange={(e) => setStatForm({ ...statForm, desc: e.target.value })}
                placeholder="Brief metric overview"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="py-2 px-4 bg-cyan-600/20 border border-cyan-500 hover:bg-cyan-600 text-white rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <Save size={12} />
                Save Stat
              </button>
              {editStatId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditStatId(null);
                    setStatForm({ title: "", end: 0, suffix: "", desc: "", icon: "Code2" });
                  }}
                  className="py-2 px-4 bg-slate-900 border border-white/10 text-slate-400 rounded-xl text-xs"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          {/* Existing Stats counters */}
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {stats?.map((stat: any) => (
              <div key={stat._id} className="p-3 rounded-xl border border-slate-900 bg-slate-950/20 flex justify-between items-center text-xs">
                <div>
                  <strong>{stat.title}</strong> — <span className="font-mono text-cyan-400">{stat.end}{stat.suffix}</span>
                  <p className="text-[10px] text-slate-500 mt-0.5">{stat.desc} ({stat.icon})</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditStatId(stat._id);
                      setStatForm({ title: stat.title, end: stat.end, suffix: stat.suffix || "", desc: stat.desc || "", icon: stat.icon || "Code2" });
                    }}
                    className="p-1 bg-slate-900 text-cyan-400 rounded cursor-pointer"
                  >
                    <Edit2 size={12} />
                  </button>
                  <button
                    onClick={() => deleteStat(stat._id)}
                    className="p-1 bg-slate-900 text-rose-400 rounded cursor-pointer"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. HONORS / CONTEST AWARDS EDITOR */}
        <div className="space-y-4">
          <form onSubmit={saveHonor} className="p-6 rounded-2xl border border-slate-900 bg-slate-950/40 space-y-4">
            <h3 className="font-bold text-sm font-mono text-cyan-400 border-b border-white/5 pb-2">
              {editHonorId ? "Edit Honor Milestone" : "Add Honor Milestone"}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-1.5 uppercase font-bold">Honor Title</label>
                <input
                  type="text"
                  value={honorForm.title}
                  onChange={(e) => setHonorForm({ ...honorForm, title: e.target.value })}
                  placeholder="e.g. SIH National Finalist"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-1.5 uppercase font-bold">Badge Text</label>
                <input
                  type="text"
                  value={honorForm.badge}
                  onChange={(e) => setHonorForm({ ...honorForm, badge: e.target.value })}
                  placeholder="e.g. Winner, Competitor"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono text-slate-400 mb-1.5 uppercase font-bold">Description details</label>
              <textarea
                value={honorForm.desc}
                onChange={(e) => setHonorForm({ ...honorForm, desc: e.target.value })}
                rows={3}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white resize-none"
                required
              ></textarea>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="py-2 px-4 bg-cyan-600/20 border border-cyan-500 hover:bg-cyan-600 text-white rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <Save size={12} />
                Save Honor
              </button>
              {editHonorId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditHonorId(null);
                    setHonorForm({ title: "", desc: "", badge: "", color: "from-purple-500/10 to-indigo-500/5 border-purple-500/20 text-purple-400" });
                  }}
                  className="py-2 px-4 bg-slate-900 border border-white/10 text-slate-400 rounded-xl text-xs"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          {/* Honors Milestones list */}
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {honors?.map((honor: any) => (
              <div key={honor._id} className="p-3 rounded-xl border border-slate-900 bg-slate-950/20 flex justify-between items-center text-xs">
                <div>
                  <strong>{honor.title}</strong> — <span className="font-mono text-purple-400 bg-purple-500/5 border border-purple-500/10 px-1.5 rounded">{honor.badge}</span>
                  <p className="text-[10px] text-slate-500 mt-1 line-clamp-1">{honor.desc}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => {
                      setEditHonorId(honor._id);
                      setHonorForm({ title: honor.title, desc: honor.desc, badge: honor.badge || "", color: honor.color || "" });
                    }}
                    className="p-1 bg-slate-900 text-cyan-400 rounded cursor-pointer"
                  >
                    <Edit2 size={12} />
                  </button>
                  <button
                    onClick={() => deleteHonor(honor._id)}
                    className="p-1 bg-slate-900 text-rose-400 rounded cursor-pointer"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// 9. CONTACT INFO EDITOR
// ============================================
function ContactInfoEditor({ data, onUpdate }: any) {
  const [form, setForm] = useState({
    email: data?.email || "",
    location: data?.location || "",
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`${API_BASE}/contact`, form, getAuthHeaders());
      toast.success("Contact configurations saved!");
      onUpdate();
    } catch {
      toast.error("Failed to update contact info.");
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase font-bold">Email Address</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase font-bold">Location</label>
          <input
            type="text"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            placeholder="e.g. Bhopal, Madhya Pradesh, India"
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="py-3 px-6 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-medium text-xs flex items-center justify-center gap-1.5 hover:brightness-110 shadow shadow-purple-500/10 cursor-pointer"
      >
        <Save size={14} />
        Save Details
      </button>
    </form>
  );
}

// ============================================
// 10. SOCIAL LINKS MANAGER
// ============================================
function SocialLinksManager({ data, onUpdate }: any) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    platform: "GitHub",
    url: ""
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.url) {
      toast.error("Please enter a URL.");
      return;
    }
    try {
      if (editingId) {
        await axios.put(`${API_BASE}/socials/${editingId}`, form, getAuthHeaders());
        toast.success("Social network updated!");
      } else {
        await axios.post(`${API_BASE}/socials`, form, getAuthHeaders());
        toast.success("Social network added!");
      }
      setForm({ platform: "GitHub", url: "" });
      setEditingId(null);
      onUpdate();
    } catch {
      toast.error("Failed to save social link.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Remove social link?")) return;
    try {
      await axios.delete(`${API_BASE}/socials/${id}`, getAuthHeaders());
      toast.success("Social link removed.");
      onUpdate();
    } catch {
      toast.error("Failed to delete social link.");
    }
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSave} className="space-y-4 p-6 rounded-2xl border border-slate-900 bg-slate-950/40">
        <h3 className="font-bold text-sm font-mono text-cyan-400 border-b border-white/5 pb-2">
          {editingId ? "Edit Social Link" : "Add Social Link"}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase font-bold">Platform / Service</label>
            <select
              value={form.platform}
              onChange={(e) => setForm({ ...form, platform: e.target.value })}
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white"
            >
              <option value="GitHub">GitHub</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="LeetCode">LeetCode</option>
              <option value="GeeksforGeeks">GeeksforGeeks</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase font-bold">Profile URL</label>
            <input
              type="text"
              value={form.url}
              onChange={(e) => setForm({ ...form, url: e.target.value })}
              placeholder="e.g. https://github.com/..."
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white"
              required
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-medium text-xs flex items-center justify-center gap-1.5 hover:brightness-110 shadow shadow-purple-500/10 cursor-pointer"
          >
            <Save size={14} />
            Save Social Link
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setForm({ platform: "GitHub", url: "" });
              }}
              className="py-2.5 px-6 bg-slate-900 border border-white/10 text-slate-400 hover:text-white text-xs font-medium cursor-pointer"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {/* List of items */}
      <div className="space-y-3">
        {data?.map((soc: any) => (
          <div key={soc._id} className="p-4 rounded-xl border border-slate-900 bg-slate-950/20 flex justify-between items-center text-xs">
            <div>
              <strong>{soc.platform}</strong>: <span className="font-mono text-cyan-400">{soc.url}</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setEditingId(soc._id);
                  setForm({ platform: soc.platform, url: soc.url });
                }}
                className="p-1.5 bg-slate-900 text-cyan-400 rounded cursor-pointer"
              >
                <Edit2 size={12} />
              </button>
              <button
                onClick={() => handleDelete(soc._id)}
                className="p-1.5 bg-slate-900 text-rose-400 rounded cursor-pointer"
              >
                <Trash2 size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
