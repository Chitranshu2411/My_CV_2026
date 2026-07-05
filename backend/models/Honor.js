import mongoose from "mongoose";

const HonorSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  badge: { type: String, default: "" }, // e.g. "National Finalist"
  color: { type: String, default: "from-purple-500/10 to-indigo-500/5 border-purple-500/20 text-purple-400" } // css styling classes
}, { timestamps: true });

export default mongoose.model("Honor", HonorSchema);
