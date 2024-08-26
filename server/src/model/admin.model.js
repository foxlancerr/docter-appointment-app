import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    phone: {
      type: String,
      unique: true,
    },
    hireDate: {
      type: Date,
    },
    department: {
      type: String,
    },
    address: {
      type: String,
    },
    permissionLevel: {
      type: String,
      enum: ["view", "access"],
      default: "view",
    },
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

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;
