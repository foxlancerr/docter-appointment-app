import mongoose from 'mongoose';
import User from './user.model.js';
import Admin from './admin.model.js';
import Notification from './notification.model.js';

const doctorSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  profession: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  license: {
    type: String,
    required: true,
  },
  feePerConsultation: {
    type: Number,
    required: true,
  },
  daysAvailable: {
    type: [String],
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  seenNotifications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Notification' }],
  unseenNotifications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Notification' }],
  patients: [
    {
      patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
      disease: { type: String },
      // Add more patient-related details here as needed
    },
  ],
}, { timestamps: true });

const Doctor = mongoose.model("doctor", doctorSchema)


export default Doctor;
