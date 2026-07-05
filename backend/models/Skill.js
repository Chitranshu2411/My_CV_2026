import mongoose from "mongoose";

const SkillSchema = new mongoose.Schema({
  category: { type: String, required: true }, // e.g., "Backend Architecture"
  icon: { type: String, required: true },     // lucide icon key like "Server" or "Code"
  skills: { type: [String], required: true },
  accent: { type: String, default: "rgba(170, 59, 255, 0.4)" },
  glow: { type: String, default: "shadow-[0_0_20px_rgba(170,59,255,0.15)]" }
}, { timestamps: true });

export default mongoose.model("Skill", SkillSchema);
