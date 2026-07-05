import mongoose from "mongoose";

const AchievementStatSchema = new mongoose.Schema({
  title: { type: String, required: true }, // e.g. "DSA Solved"
  end: { type: Number, required: true },   // e.g. 300
  suffix: { type: String, default: "" },   // e.g. "+"
  icon: { type: String, required: true },   // lucide icon key, e.g. "Code2" or "Flame"
  desc: { type: String, default: "" },     // short description
  colors: { type: [String], default: ["#aa3bff", "#8b5cf6"] } // color gradient endpoints for confetti
}, { timestamps: true });

export default mongoose.model("AchievementStat", AchievementStatSchema);
