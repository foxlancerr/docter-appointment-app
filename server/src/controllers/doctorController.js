import Doctor from "../model/docter.model.js";
import User from "../model/user.model.js";
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

  console.log(req.body);
  const doctorExists = await Doctor.findOne({ email });

  // if (doctorExists) {
  //   res.status(400);
  //   throw new Error("Doctor already applied with this email");
  // }

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

// @desc    Get all pending doctor applications
// @route   GET /api/v1/doctors/approve/:doctorId
// @access  Admin
export const approveDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const doctor = await Doctor.findByIdAndUpdate(
      doctorId,
      {
        status: "approved",
      },
      { new: true }
    );

    if (doctor) {
      const user = await User.findOneAndUpdate(
        { email: doctor.email },
        { isDocter: true },
        { new: true } // To return the updated document
      );

      if (user) {
        console.log(user);
        user.unseenNotifications.push(
          `Your application as Doctor has been approved.`
        );
        await user.save();

        res.status(200).json({
          success: true,
          message: "Doctor approved successfully",
          doctor,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "user not found with corresponding email",
        });
      }
    } else {
      res.status(404).json({ success: false, message: "Doctor not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const rejectDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;

    console.log(doctorId);

    const doctor = await Doctor.findByIdAndUpdate(
      doctorId,
      { status: "rejected" },
      { new: true }
    );

    if (doctor) {
      const user = await User.findOne({ email: doctor.email });

      if (user) {
        user.unseenNotifications.push(
          `Your application as Doctor has been rejected.`
        );
        await user.save();

        res.status(200).json({
          success: true,
          message: "Doctor rejected successfully",
          doctor,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "user not found with corresponding email",
        });
      }
    } else {
      res.status(404).json({ success: false, message: "Doctor not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
