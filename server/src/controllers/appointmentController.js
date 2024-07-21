import Appointment from "../model/appointment.model.js";

// @desc    Check if doctor is available
// @route   GET /api/v1/appointments/check-availability
// @access  Public
export const checkAvailability = async (req, res) => {
  console.log(req.query)
  try {
    const { doctorId, startTime, endTime } = req.query;

    // Convert startTime and endTime to Date objects
    const start = new Date(startTime);
    const end = endTime
      ? new Date(endTime)
      : new Date(start.getTime() + 30 * 60000);

    // Check if any existing appointments overlap with the requested time
    const overlappingAppointment = await Appointment.findOne({
      doctor: doctorId,
      $or: [{ startTime: { $lt: end }, endTime: { $gt: start } }],
    });

    if (overlappingAppointment) {
      return res.status(400).json({
        message: "Doctor has overlapping appointments at this time",
        success: false,
      });
    }

    res.status(200).json({
      message: "Doctor is available",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error checking availability",
      success: false,
      error: error.message,
    });
  }
};

// @desc    Create a new appointment
// @route   POST /api/v1/appointments
// @access  Public
export const createAppointment = async (req, res) => {
  try {
    console.log("frontend data:",req.body)
    const { patientId, doctorId, startTime, endTime } = req.body;

    // Convert startTime and endTime to Date objects
    const start = new Date(startTime);
    const end = new Date(endTime);

    // Check if any existing appointments overlap with the requested time
    const overlappingAppointment = await Appointment.findOne({
      doctor: doctorId,
      $or: [{ startTime: { $lt: end }, endTime: { $gt: start } }],
    });

    if (overlappingAppointment) {
      return res.status(400).json({
        message: "Doctor has overlapping appointments at this time",
        success: false,
      });
    }

    // Create the appointment
    const newAppointment = new Appointment({
      patient: patientId,
      doctor: doctorId,
      startTime,
      endTime,
    });

    await newAppointment.save();

    res.status(201).json({
      message: "Appointment created successfully",
      success: true,
      data: newAppointment,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Error creating appointment",
      success: false,
      error: error.message,
    });
  }
};

// @desc    Update appointment status
// @route   POST /api/v1/appointments/:id/update-status
// @access  Public
export const updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
        success: false,
      });
    }

    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status",
        success: false,
      });
    }

    appointment.status = status;
    await appointment.save();

    res.status(200).json({
      message: "Appointment status updated successfully",
      success: true,
      data: appointment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating appointment status",
      success: false,
      error: error.message,
    });
  }
};

// @desc    Get all appointments
// @route   GET /api/v1/appointments
// @access  Public
export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("patient")
      .populate("doctor");

    res.status(200).json({
      message: "Appointments retrieved successfully",
      success: true,
      data: appointments,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching appointments",
      success: false,
      error: error.message,
    });
  }
};

// @desc    Get an appointment by ID
// @route   GET /api/v1/appointments/:id
// @access  Public
export const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate("patient")
      .populate("doctor");

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Appointment retrieved successfully",
      success: true,
      data: appointment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching appointment",
      success: false,
      error: error.message,
    });
  }
};
