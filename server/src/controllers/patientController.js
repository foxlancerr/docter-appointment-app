import Patient from "../model/patient.model.js";
import jwt from "jsonwebtoken";
import { createAppointment } from "./appointmentController.js";
import { generateVerificationToken } from "../utils/generateToken.js";
import { verifyEmailTemplate } from "../view/EmailTemplate.js";
import {
  sendEmailToKnowUserQuery,
  sendEmailToVerifyUser,
} from "../utils/email.js";
import { verificationSuccessTemplate } from "../view/VerificationTemplate.js";
import uploadToCloudinary from "../utils/cloudnaryConfig.js";

// @desc    User Registration
// @route   POST http://localhost:3000/api/v1/patients/register
// @access  Public
export const userRegister = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    let profileImageUrl = null;
    if (req.file) {
      // Upload image to Cloudinary
      profileImageUrl = await uploadToCloudinary(req.file.path);
    }

    // Validate required fields
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    // Check if the user already exists
    const existUser = await Patient.findOne({ email });
    if (existUser) {
      return res
        .status(409)
        .json({ message: "User already registered", success: false });
    }

    // Generate verification token
    const verificationToken = generateVerificationToken();

    // Generate verification URL
    const verificationUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/patients/verify-email/${verificationToken}`;

    // Create new user with unverified status
    const newUser = await Patient.create({
      username,
      email,
      password,
      isVerified: false,
      profileImage: profileImageUrl,
      verificationToken,
    });

    // Send verification email
    const message = verifyEmailTemplate(username, verificationUrl);
    const emailSended = await sendEmailToVerifyUser({
      email: newUser.email,
      subject: "Verify Your Email",
      message,
    });

    return res.status(201).json({
      message: `${username}, you have successfully registered. Please check your email to verify your account.`,
      success: true,
    });
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(500).json({ message: "Server error", success: false });
  }
};

// @desc    User Signin
// @route   POST http://localhost:3000/api/v1/patients/verify-email/:token
// @access  Public
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    // Find the user by verification token
    const user = await Patient.findOne({ verificationToken: token });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid or expired token", success: false });
    }

    // Mark the user as verified and remove the token
    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    const baseUrl = `${req.protocol}://${req.get("host")}`;
    return res
      .status(201)
      .send(
        verificationSuccessTemplate(
          user.username,
          `${baseUrl}/signin`,
          `${baseUrl}/signup`
        )
      );
  } catch (error) {
    console.error("Error verifying email:", error.message);
    res.status(500).json({ message: "Server error", success: false });
  }
};

// @desc    User Signin
// @route   POST http://localhost:3000/api/v1/patients/contact-us
// @access  Public
export const userQueryEmail = async (req, res) => {
  try {
    const result = await sendEmailToKnowUserQuery(req.body);
    if (result.success) {
      return res.status(200).json({
        message: result.message,
        success: result.success,
      });
    } else {
      return res.status(500).json({
        message: result.message,
        success: result.success,
      });
    }
  } catch (error) {
    console.error("Error verifying email:", error.message);
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

    // Check if the user's email is verified
    if (!user.isVerified) {
      return res.status(403).json({
        message: "Please verify your email before logging in",
        success: false,
      });
    }

    // Validate password
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Invalid credentials", success: false });
    }

    // Generate JWT token for authenticated user
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    res.status(200).json({
      message: "User logged in successfully",
      token,
      success: true,
    });
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
    const {
      name,
      email,
      phone,
      dateOfBirth,
      gender,
      address,
      medicalHistory,
      medications,
      allergies,
      emergencyContact,
      endTime,
      startTime,
      doctorId,
      patientId,
    } = req.body;
    // const checkAvailiblity = await createAppointment(
    //   patientId,
    //   doctorId,
    //   startTime,
    //   endTime
    // );
    // if (!checkAvailiblity.success) {
    //   return res.status(201).json({
    //     message: "Patient created successfully",
    //     success: true,
    //     data: patient,
    //   });
    // }
    const patient = new Patient({
      name,
      email,
      phone,
      dateOfBirth,
      gender,
      address,
      medicalHistory,
      medications,
      allergies,
      emergencyContact,
    });
    await patient.save();
    res.status(201).json({
      message: "Record updated & wait unless doctor approved it",
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
