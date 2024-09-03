import Auth from "../model/auth.model.js";
import Doctor from "../model/docter.model.js";
import Notification from "../model/notification.model.js";

// @desc    Get All Doctors
// @route   POST http://localhost:3000/api/v1/doctor
// @access  Public
export const getAllDoctors = async (req, res) => {
  try {
    // Fetch all doctors and populate the 'auth' field using the 'authId' reference
    const doctors = await Doctor.find().populate("auth");

    res.status(200).json({
      data: doctors,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      success: false,
      error: error.message,
    });
  }
};

// @desc    Get Doctor based on id
// @route   POST http://localhost:3000/api/v1/doctor/:id
// @access  Public
export const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate('auth').select('-password');
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json({
      data: doctor,

      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error", success: false, error: error });
  }
};

// @desc    Create New doctors
// @route   POST http://localhost:3000/api/v1/doctor
// @access  Public
export const createDoctor = async (req, res) => {
  const {
    firstname,
    lastname,
    verified,
    reviews,
    specialty,
    yearsExperience,
    about,
    services,
    education,
    specializations,
    languages,
    experience,
    otherLocations,
    fees,
    daysAvailable,
  } = req.body;

  // Check if user is logged in
  if (!req.userId) {
    return res.status(401).json({
      message: "Unauthorized access. Please log in to perform this action.",
      success: false,
      data: [],
    });
  }

  try {
    // Check if the user has already applied for a doctor account
    const alreadyAppliedForAccount = await Doctor.findOne({ auth: req.userId });
    if (alreadyAppliedForAccount) {
      return res.status(400).json({
        message: "You have already applied for a doctor account.",
        success: false,
        data: [],
      });
    }

    // Create a new doctor record
    const newDoctor = new Doctor({
      auth: req.userId,
      firstname,
      lastname,
      verified,
      reviews,
      specialty,
      yearsExperience,
      about,
      services,
      education,
      specializations,
      languages,
      experience,
      otherLocations,
      fees,
      daysAvailable,
    });

    // Save the new doctor record to the database
    const savedDoctor = await newDoctor.save();

    // Update the user profile to mark profile completion
    const authUser = await Auth.findById(req.userId);
    authUser.isProfileComplete = true;
    await authUser.save();

    // Notify all admins about the new doctor application
    const admins = await Auth.find({ userType: "admin" });
    const adminNotifications = admins.map((admin) => ({
      message: `${firstname} ${lastname} has applied for a doctor account.`,
      user: admin._id,
      userType: "admin",
    }));

    // Notify the user confirming their application
    const userNotification = new Notification({
      message: "Your application for a doctor account has been submitted successfully. Please wait for admin approval.",
      user: authUser._id,
      userType: authUser.userType,
    });

    // Save all notifications
    await Notification.insertMany(adminNotifications);
    await userNotification.save();

    // Return a success response
    res.status(201).json({
      data: savedDoctor,
      success: true,
      message:
        "You have successfully applied for a doctor account. Please wait for admin approval.",
    });
  } catch (error) {
    // Handle any errors
    res.status(500).json({
      message: "An error occurred while creating doctor account.",
      success: false,
      error: error.message,
    });
  }
};


// @desc    Update Doctors based on ID
// @route   POST http://localhost:3000/api/v1/doctor/:id
// @access  Public
export const updateDoctorById = async (req, res) => {
  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedDoctor) {
      return res
        .status(404)
        .json({ message: "Doctor not found", success: false });
    }
    res
      .status(200)
      .json({ message: "Doctor updated", success: true, data: updatedDoctor });
  } catch (error) {
    res.status(400).json({ message: "Error updating doctor", error });
  }
};

// @desc   Delete Doctors based on ID
// @route   POST http://localhost:3000/api/v1/doctor
// @access  Public
export const deleteDoctorById = async (req, res) => {
  try {
    const deletedDoctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!deletedDoctor) {
      return res
        .status(404)
        .json({ message: "Doctor not found", success: false });
    }
    res.status(200).json({
      message: "Doctor deleted successfully",
      data: deletedDoctor,
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error", success: false, error: error });
  }
};
