import mongoose from "mongoose";
import bcrypt from "bcrypt";

const patientSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      trim: true,
    },   
    lastname: {
      type: String,
      trim: true,
    },
    profileImage: String,
    adminRef: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", default: null },
    phone: {
      type: String,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    address: {
      street: String,
      city: String,
      state: String,
      zip: String,
      country: String,
    },
    medicalHistory: [
      {
        condition: String,
        diagnosisDate: Date,
        treatment: String,
        currentStatus: String,
      },
    ],
    medications: [
      {
        name: String,
        dosage: String,
        frequency: String,
        startDate: Date,
        endDate: Date,
        prescribingDoctor: String,
      },
    ],
    allergies: [
      {
        allergen: String,
        reaction: String,
        severity: String,
        firstObserved: Date,
      },
    ],
    appointments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment",
      },
    ],
    vitalSigns: {
      bloodPressure: {
        systolic: Number,
        diastolic: Number,
      },
      heartRate: Number,
      temperature: Number,
      weight: Number,
      height: Number,
    },
    emergencyContact: {
      name: String,
      relationship: String,
      phone: String,
      email: String,
    },
  },
  {
    timestamps: true,
  }
);


const Patient = mongoose.model("Patient", patientSchema);

export default Patient;
