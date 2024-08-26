import mongoose from "mongoose";
import bcrypt from "bcrypt";

const authSchema = new mongoose.Schema(
  {
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
      default: null
    },
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      default: null
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
      default: null
    },
    username: {
      type: String,
      unique: true,
      trim: true,
      index: true,
    },
    profileImage: String,
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
    isProfileComplete:{
      type:Boolean
    },
    appointments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment",
      },
    ],
    userType: {
      type: String,
      enum: ["admin", "doctor", "patient"],
      default: "patient",
      required: true,
    },

    isEmailVerified: Boolean,
    emailVerificationToken: String,
  },
  {
    timestamps: true,
  }
);

// Hash the password before saving the user
authSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare input password with the stored hashed password
authSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const Auth = mongoose.model("auth", authSchema);

export default Auth;
