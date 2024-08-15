import mongoose from "mongoose";
import bcrypt from "bcrypt";

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    username: {
      type: String,
      unique: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    password: {
      type: String,
      trim: true,
    },
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
    emergencyContact: {
      name: String,
      relationship: String,
      phone: String,
      email: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: String,
  },
  {
    timestamps: true,
  }
);

// Hash the password before saving the user
patientSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare input password with the stored hashed password
patientSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const Patient = mongoose.model("Patient", patientSchema);

export default Patient;




// backup user model

// import mongoose from "mongoose";
// import bcrypt from "bcrypt";

// const userSchema = new mongoose.Schema(
//   {
//     username: {
//       type: String,
//       required: [true, "The username is required"],
//       unique: true,
//       trim: true,
//       index: true,
//     },
//     email: {
//       type: String,
//       required: [true, "The email is required"],
//       trim: true,
//     },
//     password: {
//       type: String,
//       required: [true, "The password is required"],
//       trim: true,
//     },
//     userType: {
//       type: String,
//       default: "patient",
//       enum: ["admin", "patient", "doctor"],
//     },
//     roleDetails: {
//       type: mongoose.Schema.Types.ObjectId,
//       refPath: "userType",
//     },
//     notification: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Notification",
//       },
//     ],

//     // Add more common fields if needed
//   },
//   { timestamps: true }
// );

// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// userSchema.methods.isPasswordCorrect = async function (password) {
//   console.log(password);
//   return await bcrypt.compare(password, this.password);
// };

// const User = mongoose.model("user", userSchema);
// export default User;
