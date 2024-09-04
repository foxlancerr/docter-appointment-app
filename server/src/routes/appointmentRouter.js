import express from "express";
import {
  checkAvailability,
  createAppointment,
  updateAppointmentStatus,
  getAllAppointments,
  getAppointmentById,
  getSpecificDoctorAppointmentsList,
  deleteAppointmentById,
} from "../controllers/appointmentController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const appointmentRouter = express.Router();

appointmentRouter.get("/check-availability", checkAvailability);
appointmentRouter.post("/", authMiddleware,createAppointment);
appointmentRouter.patch("/:id/update-status", updateAppointmentStatus);
appointmentRouter.get("/", getAllAppointments);
appointmentRouter.get("/specific-doctor",authMiddleware, getSpecificDoctorAppointmentsList);
appointmentRouter.get("/:id", getAppointmentById);
appointmentRouter.delete("/:id", deleteAppointmentById);

export default appointmentRouter;
