import express from "express";
import {
  checkAvailability,
  createAppointment,
  updateAppointmentStatus,
  getAllAppointments,
  getAppointmentById,
} from "../controllers/appointmentController.js";

const appointmentRouter = express.Router();

appointmentRouter.get("/check-availability", checkAvailability);
appointmentRouter.post("/", createAppointment);
appointmentRouter.patch("/:id/update-status", updateAppointmentStatus);
appointmentRouter.get("/", getAllAppointments);
appointmentRouter.get("/:id", getAppointmentById);

export default appointmentRouter;
