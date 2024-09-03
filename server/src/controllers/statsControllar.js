import Appointment from "../model/appointment.model.js";
import Auth from "../model/auth.model.js";
import Doctor from "../model/docter.model.js";
import Patient from "../model/patient.model.js";

// @desc    GET Stats
// @route   GET /api/v1/stats/dashboard-v3-stats
// @access  Public
export const getStatisticsV3Dashboard = async (req, res) => {
  try {
    // Fetch count of documents for each model
    const totalUsers = await Auth.countDocuments();
    const totalDoctors = await Doctor.countDocuments();
    const totalPatients = await Patient.countDocuments();
    const totalAppointments = await Appointment.countDocuments();

    console.log(totalUsers, totalPatients, totalAppointments, totalDoctors)
    // Send fetched data as a response
    res.status(200).json({
      message: "Stats are successfully retrieved",
      success: true,
      data: {
        totalUsers,
        totalDoctors,
        totalPatients,
        totalAppointments,
      },
    });
  } catch (error) {
    console.error("Error fetching statistics:", error);
    res.status(500).json({ message: error.message });
  }
};
