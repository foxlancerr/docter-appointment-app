import Patient from "../model/patient.model.js";
import jwt from "jsonwebtoken";

// @desc    User Registration
// @route   POST http://localhost:3000/api/v1/patients/register
// @access  Public
export const userRegister = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Validate required fields
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    // check if the user already exist or not
    const existUser = await Patient.findOne({ email: email });
    if (existUser) {
      return res
        .status(404)
        .json({ message: "user already register", success: false });
    }

    await Patient.create({
      username,
      email,
      password,
    });

    return res.status(201).json({
      message: `${username} are successfully registered`,
      success: true,
    });
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(500).json({ message: "Server error", success: false });
  }
};

// @desc    User Signin
// @route   POST http://localhost:3000/api/v1/patients/signin
// @access  Public
export const userSignIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate if email and password are provided
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required", success: false });
    }

    // Find user by email
    const user = await Patient.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found in database", success: false });
    }

    // Validate password
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "User not found in database", success: false });
    }

    // Generate JWT token for authenticated user
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    res
      .status(200)
      .json({ message: "User logged in successfully", token, success: true });
  } catch (error) {
    console.error("Error during signin:", error.message);
    res.status(500).json({ message: "Server error", success: false });
  }
};

// @desc    Get User Info by ID
// @route   POST http://localhost:3000/api/v1/patients/get-user-info-by-id
// @access  Private (requires authentication)
export const userAuthenticateBasedOnAccessToken = async (req, res) => {
  try {
    // Fetch user information by user ID (assuming `req.userId` is set by your authentication middleware)
    const user = await Patient.findById(req.userId).select("-password");

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    res.status(200).json({ message: "User found", success: true, data: user });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error", success: false });
  }
};

// ON ADMIN CASE:
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// @desc    Create a new patient
// @route   POST http://localhost:3000/api/v1/patients
// @access  Public
export const createPatient = async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.status(201).json({
      message: "Patient created successfully",
      success: true,
      data: patient,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating patient",
      success: false,
      error: error.message,
    });
  }
};

// @desc    Get a list of all patients
// @route   GET http://localhost:3000/api/v1/patients
// @access  Public
export const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json({
      message: "Patients retrieved successfully",
      success: true,
      data: patients,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching patients",
      success: false,
      error: error.message,
    });
  }
};
// @desc    Get a patient by ID
// @route   GET http://localhost:3000/api/v1/patients/:id
// @access  Public
export const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({
        message: "Patient not found",
        success: false,
      });
    }
    res.status(200).json({
      message: "Patient retrieved successfully",
      success: true,
      data: patient,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching patient",
      success: false,
      error: error.message,
    });
  }
};

// @desc    Update patient by ID
// @route   PUT http://localhost:3000/api/v1/patients/:id
// @access  Public
export const updatePatientById = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!patient) {
      return res.status(404).json({
        message: "Patient not found",
        success: false,
      });
    }
    res.status(200).json({
      message: "Patient updated successfully",
      success: true,
      data: patient,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating patient",
      success: false,
      error: error,
    });
  }
};

// @desc    Delete patient by ID
// @route   DELETE http://localhost:3000/api/v1/patients/:id
// @access  Public
export const deletePatientById = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) {
      return res.status(404).json({
        message: "Patient not found",
        success: false,
      });
    }
    res.status(200).json({
      message: "Patient deleted successfully",
      success: true,
      data: patient,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting patient",
      success: false,
      error: error,
    });
  }
};

//
//
//
//
//
//
//
//
//
// ON DOCTOR CASE:
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// @desc    Get a list of all patients
// @route   GET http://localhost:3000/api/v1/patients/
// @access  Public
export const getAllPatientsWhoBookAppointment = async (req, res) => {
  try {
    const patients = await Patient.find().populate("appointments");
    res.status(200).json({
      message: "Patients retrieved successfully",
      success: true,
      data: patients,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching patients",
      success: false,
      error: error.message,
    });
  }
};
// @desc    Get a patient by ID
// @route   GET http://localhost:3000/api/v1/patients/:id
// @access  Public
export const getSinglePatientsWhoBookAppointment = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id).populate(
      "appointments"
    );
    if (!patient) {
      return res.status(404).json({
        message: "Patient not found",
        success: false,
      });
    }
    res.status(200).json({
      message: "Patient retrieved successfully",
      success: true,
      data: patient,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching patient",
      success: false,
      error: error.message,
    });
  }
};
