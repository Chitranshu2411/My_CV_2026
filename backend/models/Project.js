import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  tech: { type: [String], default: [] },
  desc: { type: String, required: true },
  architecture: { type: String, default: "" },
  achievements: { type: [String], default: [] },
  github: { type: String, default: "" },
  live: { type: String, default: "" },
  image: { type: String, default: "" }, // uploaded image url
  glowColor: { type: String, default: "hover:border-purple-500/50 hover:shadow-purple-500/10" }
}, { timestamps: true });

export default mongoose.model("Project", ProjectSchema);
