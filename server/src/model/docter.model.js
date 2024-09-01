import mongoose, { Schema } from "mongoose";

const experienceSchema = new mongoose.Schema({
  yearStart: { type: Number },
  yearEnd: { type: Number, default: null },
  position: { type: String },
  hospital: { type: String },
});

const doctorSchema = new mongoose.Schema({
  auth: {
    type: Schema.Types.ObjectId,
    ref: "Auth",
  },
  firstname: { type: String },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
  },
  lastname: { type: String },
  phone: { type: String },
  description: { type: String },
  address: { type: String },
  verified: { type: Boolean, default: false },
  reviews: { type: Number, default: 0 },
  specialty: { type: String },
  yearsExperience: { type: Number },
  about: { type: String },
  services: { type: [String] },
  education: { type: [String] },
  specializations: { type: [String] },
  languages: { type: [String] },
  experience: { type: [experienceSchema], default:null },
  otherLocations: { type: [String], default: [] },
  fees: { type: Number },
  daysAvailable: { type: [String] },
});

const Doctor = mongoose.model("Doctor", doctorSchema);
export default Doctor;
