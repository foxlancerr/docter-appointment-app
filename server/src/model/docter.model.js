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
