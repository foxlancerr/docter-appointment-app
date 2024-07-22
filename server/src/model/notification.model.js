import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    message: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    // admin: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
    // doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
    seen: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Notification = mongoose.model("notification", notificationSchema);
export default Notification;
