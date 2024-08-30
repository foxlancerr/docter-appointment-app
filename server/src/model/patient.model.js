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

// // Hash the password before saving the user
// patientSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   try {
//     this.password = await bcrypt.hash(this.password, 10);
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

// // Method to compare input password with the stored hashed password
// patientSchema.methods.isPasswordCorrect = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };

const Patient = mongoose.model("Patient", patientSchema);

export default Patient;
