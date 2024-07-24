import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authMiddleware from "../middleware/authMiddleware.js";
import Patient from "../model/patient.model.js";
import {
  createPatient,
  deletePatientById,
  getAllPatients,
  getPatientById,
  updatePatientById,
  userAuthenticateBasedOnAccessToken,
  userRegister,
  userSignIn,
} from "../controllers/patientController.js";
const patientRouter = express.Router();

patientRouter.post("/", createPatient);
patientRouter.get("/", getAllPatients);
patientRouter.get("/:id", getPatientById);
patientRouter.put("/:id", updatePatientById);
patientRouter.delete("/:id", deletePatientById);

export default patientRouter;

// @desc    User Registration
// @route   POST http://localhost:3000/api/v1/patients/register
// @access  Public
patientRouter.post("/register", userRegister);

// @desc    User Signin
// @route   POST http://localhost:3000/api/v1/patients/signin
// @access  Public
patientRouter.post("/signin", userSignIn);

// @desc    Get User Info by ID
// @route   POST http://localhost:3000/api/v1/patients/get-user-info-by-id
// @access  Private (requires authentication)
patientRouter.post(
  "/get-user-info-by-id",
  authMiddleware,
  userAuthenticateBasedOnAccessToken
);

// // @desc    Apply for doctor account
// // @route   POST http://localhost:3000/api/v1/users/apply-as-doctor
// // @access  Public

// userRouter.route("/apply-as-doctor").post(async (req, res) => {
//   try {
//     console.log(req.body);
//     const newDocter = new Docter({ ...req.body, status: "pending" });
//     await newDocter.save();
//     const admin = await User.findOne({ isAdmin: true });
//     const notification = admin.notification;
//     notification.push({
//       type: "new docter request",
//       message: `${newDocter.firstname} ${newDocter.lastname} has applied for docter account`,
//       data: {
//         docterId: newDocter._id,
//         name: newDocter.firstname + " " + newDocter.lastname,
//       },

//       onClickPath: "admin/docters",
//     });

//     await User.findByIdAndUpdate(admin._id, { unseenNotifications });
//   } catch (error) {
//     res.status(400).json({ message: error.message, success: false });
//   }
// });

// userRouter.put("/mark-as-seen/:notificationId", async (req, res) => {
//   const { notificationId } = req.params;
//   const { userId } = req.body;

//   try {
//     const admin = await User.findById(userId);

//     if (!admin) {
//       return res
//         .status(404)
//         .json({ success: false, message: "User not found" });
//     }

//     const notification = admin.unseenNotifications.id(notificationId);

//     if (!notification) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Notification not found" });
//     }

//     // Remove from unseen and add to seen
//     admin.unseenNotifications.id(notificationId).remove();
//     admin.seenNotifications.push(notification);

//     await admin.save();

//     res
//       .status(200)
//       .json({
//         success: true,
//         message: "Notification marked as seen",
//         notification,
//       });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ success: false, message: "Internal server error", error });
//   }
// });
