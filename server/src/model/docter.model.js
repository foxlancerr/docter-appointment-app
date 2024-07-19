// import mongoose from "mongoose";
// import User from "./user.model.js";
// import Admin from "./admin.model.js";
// import Notification from "./notification.model.js";

// const doctorSchema = new mongoose.Schema(
//   {
//     firstname: {
//       type: String,
//       required: true,
//     },
//     lastname: {
//       type: String,
//       required: true,
//     },
//     phone: {
//       type: String,
//       required: true,
//     },
//     address: {
//       type: String,
//       required: true,
//     },
//     department: {
//       type: String,
//       required: true,
//     },
//     profession: {
//       type: String,
//       required: true,
//     },
//     experience: {
//       type: Number,
//       required: true,
//     },
//     license: {
//       type: String,
//       required: true,
//     },
//     feePerConsultation: {
//       type: Number,
//       required: true,
//     },
//     daysAvailable: {
//       type: [String],
//       required: true,
//     },
//     startTime: {
//       type: String,
//       required: true,
//     },
//     endTime: {
//       type: String,
//       required: true,
//     },
//     status: {
//       type: String,
//       enum: ["pending", "approved", "rejected"],
//       default: "pending",
//     },

//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },

//     notifications: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Notification",
//       },
//     ],
//     patients: [
//       {
//         patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
//         disease: { type: String },
//         // Add more patient-related details here as needed
//       },
//     ],
//   },
//   { timestamps: true }
// );

// const Doctor = mongoose.model("doctor", doctorSchema);

// export default Doctor;

import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
  yearStart: { type: Number, required: true },
  yearEnd: { type: Number, default: null },
  position: { type: String, required: true },
  hospital: { type: String, required: true },
});

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  verified: { type: Boolean, default: true },
  reviews: { type: Number, default: 0 },
  specialty: { type: String, required: true },
  yearsExperience: { type: Number, required: true },
  about: { type: String, required: true },
  services: { type: [String], required: true },
  education: { type: [String], required: true },
  specializations: { type: [String], required: true },
  languages: { type: [String], required: true },
  experience: { type: [experienceSchema], required: true },
  otherLocations: { type: [String], default: [] },
  fees: { type: Number, required: true },
  daysAvailable: { type: [String], required: true },
});

const Doctor = mongoose.model("Doctor", doctorSchema);
export default Doctor;

// format
// {
//   "name": "Dr Arit Parkash",
//   "verified": true,
//   "reviews": 0,
//   "specialty": "Pediatric Gastroenterologist",
//   "yearsExperience": 16,
//   "about": "Professor Dr. Arit Parkash is a competent and experienced child specialist, with 16 years of work experience in Paediatric Medicine and 10 years of experience in Paediatric Gastroenterology, Hepatology and Nutrition as sub-speciality. Dr. Parkash performs both, Upper and Lower Gastrointestinal Endoscopies in children.",
//   "services": ["Paediatrician & Child Specialist", "Paediatric Gastroenterologist", "Hepatologists", "Nutrition Specialist"],
//   "education": ["M.B.B.S - Liaquat University Jamshoro", "F.C.P.S - College of Physicians & Surgeons Pakistan", "F.C.P.S - College of Physicians & Surgeons Pakistan"],
//   "specializations": ["Pediatric Gastroenterologist"],
//   "languages": ["Urdu", "English"],
//   "experience": [
//     {
//       "yearStart": 2008,
//       "position": "Paediatric Gastroenterologist",
//       "hospital": "Dr. Ziauddin Hospital (Clifton)"
//     }
//   ],
//   "otherLocations": ["Shifaam Peads Neurology and Wellness Place", "Zulekha comforts, Main Shaheed-e-Millat Rd, CP & Berar CHS, Karachi"],
//   "fees": 2500,
//   "daysAvailable": ["Friday"]
// }
