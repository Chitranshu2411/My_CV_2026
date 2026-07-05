import mongoose from "mongoose";

const EducationSchema = new mongoose.Schema({
  school: { type: String, required: true },
  degree: { type: String, required: true },
  duration: { type: String, required: true },
  details: { type: String, default: "" }
}, { timestamps: true });

export default mongoose.model("Education", EducationSchema);
