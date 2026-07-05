import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Terminal, Shield, Lock, User, Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      toast.error("Please fill in all credentials.");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Verifying security clearance...");

    try {
      // Connect to the backend
      const apiBase = import.meta.env.VITE_API_BASE_URL || (import.meta.env.DEV || window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" ? "http://localhost:5000/api" : "/api");
      const response = await axios.post(`${apiBase}/auth/login`, {
        username,
        password,
      });

      const { token } = response.data;
      localStorage.setItem("token", token);
      
      toast.success("Security access granted!", { id: toastId });
      setTimeout(() => {
        navigate("/admin");
      }, 800);
    } catch (error: any) {
      const errMsg = error.response?.data?.message || "Verification failed. Access Denied.";
      toast.error(errMsg, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#040308] text-slate-100 font-sans overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-purple-600/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 rounded-full bg-cyan-600/10 blur-[120px] pointer-events-none"></div>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.01)_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />

      {/* Login Box */}
      <div className="w-full max-w-md p-8 rounded-3xl border border-slate-800 bg-slate-950/40 backdrop-blur-xl shadow-2xl relative z-10 mx-4">
        
        {/* Header Icon */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-cyan-500 p-0.5 shadow-lg shadow-purple-500/20 mb-4 flex items-center justify-center animate-[pulse_2s_infinite]">
            <div className="w-full h-full bg-[#040308] rounded-[14px] flex items-center justify-center">
              <Shield className="text-cyan-400" size={28} />
            </div>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight font-display bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            CMS SECURITY CONTROL
          </h1>
          <p className="text-[10px] text-slate-500 tracking-widest uppercase font-mono mt-1">
            AUTHORIZED PERSONNEL ONLY
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-[10px] font-mono text-slate-400 mb-1.5 uppercase tracking-wider font-bold">
              Username
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500 pointer-events-none">
                <User size={16} />
              </span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Secure user identifier"
                disabled={loading}
                className="w-full bg-black/40 border border-white/10 rounded-2xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all placeholder-slate-700"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-mono text-slate-400 mb-1.5 uppercase tracking-wider font-bold">
              Access Code
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500 pointer-events-none">
                <Lock size={16} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                disabled={loading}
                className="w-full bg-black/40 border border-white/10 rounded-2xl pl-10 pr-12 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all placeholder-slate-700"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-slate-300 focus:outline-none transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold text-sm flex items-center justify-center gap-2 hover:brightness-110 shadow-lg shadow-purple-500/20 active:scale-[0.98] disabled:opacity-50 transition-all cursor-pointer"
          >
            {loading ? (
              <span>Initializing Session...</span>
            ) : (
              <>
                <span>Access Dashboard</span>
                <Terminal size={16} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
