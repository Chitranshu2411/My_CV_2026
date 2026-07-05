import mongoose from "mongoose";

const ExperienceStatSchema = new mongoose.Schema({
  label: { type: String, required: true }, // e.g. "API Latency Red."
  end: { type: Number, required: true },   // e.g. 35
  suffix: { type: String, default: "" },   // e.g. "%"
  desc: { type: String, default: "" }      // e.g. "PostgreSQL query tuning & caching"
}, { timestamps: true });

export default mongoose.model("ExperienceStat", ExperienceStatSchema);
