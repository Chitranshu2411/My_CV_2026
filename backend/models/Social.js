import mongoose from "mongoose";

const SocialSchema = new mongoose.Schema({
  platform: { type: String, required: true }, // e.g. "GitHub", "LinkedIn", "LeetCode", etc.
  url: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model("Social", SocialSchema);
