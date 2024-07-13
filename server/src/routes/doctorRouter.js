import express from "express";
import {
  applyDoctor,
  approveDoctor,
  getAllPendingDoctors,
  patientRequestedForTreatment,
  rejectDoctor,
  updateDoctorStatus,
} from "../controllers/doctorController.js";
import Doctor from "../model/docter.model.js";
import User from "../model/user.model.js";
import Notification from "../model/notification.model.js";

const doctorRouter = express.Router();

// doctorRouter.get("/pending", getAllPendingDoctors);
// doctorRouter.post("/apply-as-doctor", applyDoctor);
// doctorRouter.post("/:doctorId/request-treatment", patientRequestedForTreatment);
// doctorRouter.put("/status/:id", updateDoctorStatus);
// doctorRouter.put("/approve/:doctorId", approveDoctor);
// doctorRouter.put("/reject/:doctorId", rejectDoctor);
// doctor.routes.js

// Route: POST http://localhost:3000/api/v1/doctor/apply
// Description: Apply to become a doctor
// Access: Public
// doctorRouter.post("/apply", async (req, res) => {
//   try {
//     const {
//       firstname,
//       lastname,
//       email,
//       phone,
//       address,
//       department,
//       profession,
//       experience,
//       license,
//       feePerConsultation,
//       daysAvailable,
//       startTime,
//       endTime,
//     } = req.body;

//     console.log(req.body);

//     if (
//       !firstname ||
//       !lastname ||
//       !email ||
//       !phone ||
//       !address ||
//       !department ||
//       !profession ||
//       !experience ||
//       !license ||
//       !feePerConsultation ||
//       !daysAvailable ||
//       !startTime ||
//       !endTime
//     ) {
//       return res
//         .status(400)
//         .json({ message: "All fields are required", success: false });
//     }

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res
//         .status(404)
//         .json({ message: "User not found", success: false });
//     }

//     // check if user is already appliad for docter account
//     if (user.roleDetails) {
//       const doctor = await Doctor.findById(user.roleDetails);
//       if (doctor && doctor.status === "pending") {
//         return res.status(200).json({
//           message:
//             "Doctor application is already submitted and pending approval. Please wait until the admin approves it.",
//           success: true,
//         });
//       }
//     }

//     if (user.userType === "doctor") {
//       return res.status(200).json({
//         message:
//           "You Already Appliad for Doctor account, Congrulation Admin approve for provide doctor service",
//         success: true,
//       });
//     }

//     const newDoctor = new Doctor({
//       firstname,
//       lastname,
//       phone,
//       address,
//       department,
//       profession,
//       experience,
//       license,
//       feePerConsultation,
//       daysAvailable,
//       startTime,
//       endTime,
//       user: user._id,
//     });

//     await newDoctor.save();

//     user.roleDetails = newDoctor._id;
//     await user.save();

//     const admins = await User.find({ userType: "admin" });
//     const notifications = admins.map((admin) => ({
//       message: `${firstname} ${lastname} has applied to become a doctor.`,
//       user: admin._id,
//     }));

//     const createdNotifications = await Notification.insertMany(notifications);

//     for (const admin of admins) {
//       admin.unseenNotifications.push(...createdNotifications.map((n) => n._id));
//       await admin.save();
//     }

//     res.status(201).json({
//       message: "Doctor application submitted successfully",
//       success: true,
//     });
//   } catch (error) {
//     console.error("Error applying as a doctor:", error.message);
//     res.status(500).json({ message: "Server error", success: false });
//   }
// });


// Route: POST http://localhost:3000/api/v1/doctor/apply
// Description: Apply to become a doctor
// Access: Public
doctorRouter.post("/apply", async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      phone,
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

    // Check if all required fields are provided
    if (
      !firstname ||
      !lastname ||
      !email ||
      !phone ||
      !address ||
      !department ||
      !profession ||
      !experience ||
      !license ||
      !feePerConsultation ||
      !daysAvailable ||
      !startTime ||
      !endTime
    ) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    // Check if user is already applied for doctor account
    if (user.roleDetails) {
      const doctor = await Doctor.findById(user.roleDetails);
      if (doctor && doctor.status === "pending") {
        return res.status(200).json({
          message:
            "Your application to become a doctor is pending approval. Please wait for admin confirmation.",
          success: true,
        });
      } else if (doctor && doctor.status === "approved") {
        return res.status(200).json({
          message:
            "Congratulations! Your application to become a doctor has been approved. You can now start providing medical services.",
          success: true,
        });
      }
    }

    // // Check if user is already marked as a doctor (but application is not pending)
    // if (user.userType === "doctor") {
    //   return res.status(200).json({
    //     message:
    //       "You have already applied to become a doctor. Please wait for admin approval to start offering your medical services.",
    //     success: true,
    //   });
    // }

    // Create a new Doctor record
    const newDoctor = new Doctor({
      firstname,
      lastname,
      phone,
      address,
      department,
      profession,
      experience,
      license,
      feePerConsultation,
      daysAvailable,
      startTime,
      endTime,
      user: user._id,
    });

    await newDoctor.save();

    // Update user's roleDetails to link with the new Doctor record
    user.roleDetails = newDoctor._id;
    await user.save();

    // Notify admins about the new doctor application
    const admins = await User.find({ userType: "admin" });
    const notifications = admins.map((admin) => ({
      message: `${firstname} ${lastname} has applied to become a doctor.`,
      user: admin._id,
    }));

    const createdNotifications = await Notification.insertMany(notifications);

    for (const admin of admins) {
      admin.unseenNotifications.push(...createdNotifications.map((n) => n._id));
      await admin.save();
    }

    // Return success response
    res.status(201).json({
      message: "Your application to become a doctor has been submitted successfully.",
      success: true,
    });
  } catch (error) {
    console.error("Error applying as a doctor:", error.message);
    res.status(500).json({ message: "Server error", success: false });
  }
});

export default doctorRouter;

