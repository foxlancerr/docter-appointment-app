import mongoose from 'mongoose';

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
  email: {
    type: String,
    required: true,
    unique: true,
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
  unseenNotification: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }],
  seenNotification: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }],
}, { timestamps: true });

const Doctor = mongoose.model('Doctor', doctorSchema);

export default Doctor;
