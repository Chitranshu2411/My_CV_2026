import mongoose from "mongoose";

const HeroSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    default: "Chitranshu Yadav",
  },
  subtitle: {
    type: String,
    required: [true, "Subtitle is required"],
    default: "Java Full Stack Developer | AI & Backend Engineer",
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    default: "Passionate software engineer focused on scalable backend architecture, AI-powered applications, and modern full-stack development. Building production-ready, distributed SaaS platforms.",
  },
  profileImage: {
    type: String,
    default: "",
  },
  phrases: {
    type: [String],
    default: [
      "Building scalable AI SaaS platforms",
      "Developing distributed backend systems",
      "Engineering modern full-stack experiences",
      "Integrating AI into real-world products",
    ],
  },
}, { timestamps: true });

export default mongoose.model("Hero", HeroSchema);
