import mongoose from "mongoose";

const ArchitectureNodeSchema = new mongoose.Schema({
  id: { type: Number, required: true }, // 1, 2, 3, etc. (order in node stack)
  label: { type: String, required: true }, // e.g. "React Frontend"
  type: { type: String, required: true },  // e.g. "front", "sec", "back", "db", "ai"
  desc: { type: String, default: "" },     // short description
  details: { type: [String], default: [] }  // detailed bullets when clicked
}, { timestamps: true });

export default mongoose.model("ArchitectureNode", ArchitectureNodeSchema);
