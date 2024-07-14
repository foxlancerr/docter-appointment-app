import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "./user.model.js";

const adminSchema = new mongoose.Schema(
  {
    isDoctor: {
      type: Boolean,
      default: false,
    },
    notifications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Notification",
      },
    ],
  },
  { timestamps: true }
);

const Admin = mongoose.model("admin", adminSchema);
export default Admin;
