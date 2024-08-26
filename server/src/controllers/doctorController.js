import Doctor from "../model/docter.model.js";

// @desc    Get All Doctors
// @route   POST http://localhost:3000/api/v1/doctor
// @access  Public
export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json({
      data: doctors,
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error", success: false, error: error });
  }
};

// @desc    Get Doctor based on id
// @route   POST http://localhost:3000/api/v1/doctor/:id
// @access  Public
export const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
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
    name,
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

  try {
    const newDoctor = new Doctor({
      name,
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

    const savedDoctor = await newDoctor.save();
    res.status(201).json({
      data: savedDoctor,
      success: true,
      message: "new doctor saved successfully",
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating doctor", success: false, error: error });
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
