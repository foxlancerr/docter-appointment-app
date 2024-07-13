import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "./user.model.js";

const adminSchema = new mongoose.Schema(
  {
    isDoctor: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Admin = User.discriminator("admin", adminSchema);
export default Admin;
