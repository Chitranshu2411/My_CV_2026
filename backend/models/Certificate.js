import mongoose from "mongoose";

const CertificateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  issuer: { type: String, required: true },
  date: { type: String, default: "" },
  image: { type: String, default: "" }, // Stores uploaded certificate image URL
  link: { type: String, default: "" }
}, { timestamps: true });

export default mongoose.model("Certificate", CertificateSchema);
