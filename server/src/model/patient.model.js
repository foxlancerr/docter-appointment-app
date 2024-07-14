import mongoose from "mongoose";
import User from "./user.model.js";

const patientSchema = new mongoose.Schema(
  {
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isDoctor: {
      type: Boolean,
      default: false,
    },
    notifications: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Notification" },
    ],
    
    treatmentDetails: {
      type: String,
      default: "",
    },
    diseases: {
      type: [String],
      default: [],
    },
    doctors: [
      {
        doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
        doctorName: { type: String },
        // Add more doctor-specific details here as needed
      },
    ],
    medicines: [
      {
        medicineName: { type: String },
        dosage: { type: String },
        // Add more medicine details here as needed
      },
    ],
    appointments: [
      {
        doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
        appointmentDate: { type: Date },
        reason: { type: String },
        // Add more appointment details as needed
      },
    ],
    
    // Add more necessary fields relevant to the patient here
  },
  { timestamps: true }
);

const Patient = User.discriminator("patient", patientSchema);
export default Patient;
