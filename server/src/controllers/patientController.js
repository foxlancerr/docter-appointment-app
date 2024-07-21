import Patient from "../model/patient.model.js";
import { createAppointment } from "./appointmentController.js";

// ON ADMIN CASE:
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// @desc    Create a new patient
// @route   POST http://localhost:3000/api/v1/patients
// @access  Public
export const createPatient = async (req, res) => {
  try {
    console.log("frontend data >>>>>>>>>>>", req.body);
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
