import mongoose from "mongoose";

const ExperienceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  duration: { type: String, required: true }, // e.g., "2024 - Present"
  achievements: { type: [String], default: [] }
}, { timestamps: true });

export default mongoose.model("Experience", ExperienceSchema);
