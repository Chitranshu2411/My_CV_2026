import mongoose from "mongoose";

const HighlightSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  icon: { type: String, required: true }, // Name of Lucide Icon (e.g. "Cpu", "Server", "Brain")
  color: { type: String, default: "border-purple-500/20 hover:border-purple-500/50 hover:shadow-purple-500/10" }
});

const AboutSchema = new mongoose.Schema({
  storyTitle: { type: String, default: "Engineering & Foundations" },
  storyBody: { type: String, default: "" },
  storySubTitle: { type: String, default: "Global Ambitions" },
  storySubBody: { type: String, default: "" },
  storyTags: { type: [String], default: ["Remote Teams", "AI Startups", "Global Scale"] },
  highlights: { type: [HighlightSchema], default: [] }
}, { timestamps: true });

export default mongoose.model("About", AboutSchema);
