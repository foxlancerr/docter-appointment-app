import Appointment from "../model/appointment.model.js";

import Patient from "../model/patient.model.js";
import Notification from "../model/notification.model.js"; // Import Notification model
import Admin from "../model/admin.model.js"; // Import Notification model
import { getPatientById } from "./patientController.js";
import Auth from "../model/auth.model.js";
import Doctor from "../model/docter.model.js";

// @desc    Check if doctor is available
// @route   GET /api/v1/appointments/check-availability
// @access  Public
export const checkAvailability = async (req, res) => {
  console.log(req.query);
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

// // @desc    Create a new appointment
// // @route   POST /api/v1/appointments
// // @access  Public
// export const createAppointment = async (req, res) => {
//   try {
//     const {
//       address,
//       medicalHistory,
//       medications,
//       allergies,
//       emergencyContact,
//       endTime,
//       startTime,
//       doctorId,
//       patientId,
//     } = req.body;

//     console.log("Frontend data (patientId):", patientId);

//     // Convert startTime and endTime to Date objects for comparison
//     const start = new Date(startTime);
//     const end = new Date(endTime);

//     // Check for overlapping appointments
//     const overlappingAppointment = await Appointment.findOne({
//       doctor: doctorId,
//       startTime: { $lt: end },
//       endTime: { $gt: start },
//     });

//     if (overlappingAppointment) {
//       return res.status(400).json({
//         message: "The doctor has an overlapping appointment at this time.",
//         success: false,
//       });
//     }

//     // Verify authenticated user
//     const authUser = await Auth.findById(req.userId);
//     if (!authUser) {
//       return res.status(401).json({
//         message: "Unauthorized user.",
//         success: false,
//       });
//     }

//     // Retrieve current patient data based on user type
//     let currentPatient;
//     if (authUser.userType === "admin") {
//       currentPatient = await Admin.findById(patientId);
//     } else if (authUser.userType === "patient") {
//       currentPatient = await Patient.findById(patientId);
//     }

//     if (!currentPatient) {
//       return res.status(404).json({
//         message: "Patient not found in the admin or patient records.",
//         success: false,
//       });
//     }

//     // Create the new appointment
//     const newAppointment = await new Appointment({
//       patient: patientId,
//       doctor: doctorId,
//       startTime,
//       endTime,
//     }).save();

//     console.log("current patient >>>>>>>>>>>>", currentPatient);

//     // Update patient records or create new patient based on user type
//     if (authUser.userType === "patient") {
//       const updatedPatient = await Patient.findByIdAndUpdate(
//         currentPatient._id,
//         { address, medicalHistory, medications, allergies, emergencyContact },
//         { new: true, runValidators: true }
//       );

//       if (!updatedPatient) {
//         return res.status(404).json({
//           message: "Patient update failed, patient not found.",
//           success: false,
//         });
//       }

//       console.log("updated patient >>>>>>>>>>>>>>>>>", updatedPatient);
//     } else if (authUser.userType === "admin") {
//       const newPatient = new Patient({
//         firstname: currentPatient.firstname,
//         lastname: currentPatient.lastname,
//         address,
//         medicalHistory,
//         medications,
//         allergies,
//         emergencyContact,
//       });

//       await newPatient.save();
//     }

//     // Create notifications for doctor and patient
//     await Promise.all([
//       new Notification({
//         message: `New appointment scheduled by ${
//           currentPatient.name || "a user"
//         }.`,
//         user: doctorId,
//       }).save(),
//       new Notification({
//         message: "Your appointment request has been submitted.",
//         user: patientId,
//       }).save(),
//     ]);

//     // Response after successful appointment creation
//     return res.status(201).json({
//       message: "Appointment created successfully.",
//       success: true,
//       data: newAppointment,
//     });
//   } catch (error) {
//     console.error("Error creating appointment:", error);
//     return res.status(500).json({
//       message: "Internal Server Error: Unable to create appointment.",
//       success: false,
//       error: error.message,
//     });
//   }
// };

export const createAppointment = async (req, res) => {
  try {
    const {
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

    // Convert startTime and endTime to Date objects for comparison
    const start = new Date(startTime);
    const end = new Date(endTime);

    // Check for overlapping appointments
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

    const authUser = await Auth.findById(req.userId);
    if (!authUser) {
      return res.status(401).json({
        message: "Unauthentic user",
        success: false,
      });
    }

    // Determine if the user is a patient or admin
    let currentPatient = null;
    if (authUser.userType === "admin") {
      // If userType is admin, the admin acts as a patient
      currentPatient = await Admin.findById(patientId);
      
      // Create a new patient record for the admin
      const newPatient = new Patient({
        firstname: currentPatient.firstname,
        lastname: currentPatient.lastname,
        address,
        medicalHistory,
        medications,
        allergies,
        emergencyContact,
        adminRef: currentPatient._id, // Set the adminRef to the admin's ID
        auth: req.userId, // Set the adminRef to the admin's ID
      });
      await newPatient.save();
      
      // patientId = newPatient._id; // Update patientId for the appointment
    } else if (authUser.userType === "patient") {
      // If userType is patient, find patient data
      currentPatient = await Patient.findByIdAndUpdate(
        patientId,
        {
          address,
          medicalHistory,
          medications,
          allergies,
          emergencyContact,
          auth:req.userId
        },
        { new: true }
      );
    }

    if (!currentPatient) {
      return res.status(404).json({
        message: "No patient found in admin or patient model",
        success: false,
      });
    }

    // Create the new appointment
    const newAppointment = new Appointment({
      patient: patientId,
      doctor: doctorId,
      auth: req.userId,
      startTime,
      endTime,
    });
    await newAppointment.save();

    // Update Auth model to link patientId for admin
    if (authUser.userType === "admin") {
      await Auth.findByIdAndUpdate(authUser._id, { patientId });
    }

    // Notifications for doctor and patient
    const doctorNotification = new Notification({
      message: `New appointment scheduled by ${
        currentPatient.name || "a user"
      }.`,
      user: doctorId,
    });
    const patientNotification = new Notification({
      message: `Your appointment request has been submitted.`,
      user: patientId,
    });

    await doctorNotification.save();
    await patientNotification.save();

    console.log(req.body)
    return res.status(201).json({
      message: "Appointment created successfully",
      success: true,
      data: newAppointment,
    });
  } catch (error) {
    console.error("Error creating appointment:", error.message);
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
      .populate({
        path: 'patient',
        populate: {
          path: 'auth',
          select: 'username email isProfileComplete isAdminVerifyTheUser appointments userType isEmailVerified profileImage'
        }
      })
      .populate({
        path: 'doctor',
        populate: {
          path: 'auth',
          select: 'username email isProfileComplete isAdminVerifyTheUser appointments userType isEmailVerified profileImage'
        }
      });

      console.log(appointments)

    res.status(200).json({ success: true, data: appointments });
  } catch (error) {
    console.error('Error fetching appointments:', error); // Log error for debugging
    res.status(500).json({ success: false, message: error.message });
  }
};


// @desc    Get all appointments
// @route   GET /api/v1/appointments/specific-doctor
// @access  Public
export const getSpecificDoctorAppointmentsList = async (req, res) => {
  try {
    const appointments = await Appointment.find({doctor:req.userId})
      .populate({
        path: 'patient',
        populate: {
          path: 'auth',
          select: 'username email isProfileComplete isAdminVerifyTheUser appointments userType isEmailVerified profileImage'
        }
      })
      .populate({
        path: 'doctor',
        populate: {
          path: 'auth',
          select: 'username email isProfileComplete isAdminVerifyTheUser appointments userType isEmailVerified profileImage'
        }
      });

      if(!appointments){
        return res.status(404).json({message:'No Appointment is found',success:false, data:[]})
      }
      console.log(appointments)

    res.status(200).json({ success: true, data: appointments });
  } catch (error) {
    console.error('Error fetching appointments:', error); // Log error for debugging
    res.status(500).json({ success: false, message: error.message });
  }
};








// @desc    Get an appointment by ID
// @route   GET /api/v1/appointments/:id
// @access  Public
export const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate({
        path: 'patient',
        populate: {
          path: 'auth',
          select: '-password'
        }
      })
      .populate({
        path: 'doctor',
        populate: {
          path: 'auth',
        }
      });

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

// @desc    Get an appointment by ID
// @route   DELETE /api/v1/appointments/:id
// @access  Public
export const deleteAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id)

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Appointment Deleted successfully",
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
