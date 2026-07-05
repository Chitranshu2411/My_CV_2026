import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema({
  url: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model("Resume", ResumeSchema);
