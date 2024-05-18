import Doctor from "../model/docter.model.js";
import asyncHandler from "express-async-handler";

// @desc    Apply for doctor account
// @route   POST /api/v1/doctors/apply-as-doctor
// @access  Public
export const applyDoctor = asyncHandler(async (req, res) => {
  console.log(req.body);
  const {
    firstname,
    lastname,
    phone,
    email,
    address,
    department,
    profession,
    experience,
    license,
    feePerConsultation,
    daysAvailable,
    startTime,
    endTime,
  } = req.body;

  const doctorExists = await Doctor.findOne({ email });

  if (doctorExists) {
    res.status(400);
    throw new Error("Doctor already applied with this email");
  }

  const doctor = new Doctor({
    firstname,
    lastname,
    phone,
    email,
    address,
    department,
    profession,
    experience,
    license,
    feePerConsultation,
    daysAvailable,
    startTime,
    endTime,
  });

  const createdDoctor = await doctor.save();
  res.status(201).json({
    success: true,
    data: createdDoctor,
  });
});

// @desc    Get all pending doctor applications
// @route   GET /api/v1/doctors/pending
// @access  Admin
export const getAllPendingDoctors = asyncHandler(async (req, res) => {
  const doctors = await Doctor.find({ status: "pending" });
  res.json(doctors);
});

// @desc    Update doctor application status
// @route   PUT /api/v1/doctors/status/:id
// @access  Admin
export const updateDoctorStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const doctor = await Doctor.findById(id);

  if (!doctor) {
    res.status(404);
    throw new Error("Doctor not found");
  }

  doctor.status = status;
  const updatedDoctor = await doctor.save();

  res.json({
    success: true,
    data: updatedDoctor,
  });
});

export const patientRequestedForTreatment = asyncHandler(async (req, res) => {
  const { doctorId } = req.params;
  const { patientId } = req.body;

  try {
    // Find the doctor by ID
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Add patient ID to unseenNotification array
    doctor.unseenNotification.push(patientId);

    // Save the updated doctor document
    await doctor.save();

    res.status(200).json({ message: "Patient added to unseen notifications" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
