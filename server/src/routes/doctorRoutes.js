import express from "express";
import {
  applyDoctor,
  getAllPendingDoctors,
  patientRequestedForTreatment,
  updateDoctorStatus,
} from "../controllers/doctorController.js";

const doctorRouter = express.Router();

doctorRouter.post("/apply-as-doctor", applyDoctor);
doctorRouter.get("/pending", getAllPendingDoctors);
doctorRouter.put("/status/:id", updateDoctorStatus);
doctorRouter.post("/:doctorId/request-treatment", patientRequestedForTreatment);

// import { protect, admin } from "../middleware/authMiddleware.js";
// doctorRouter.get("/pending", protect, admin, getAllPendingDoctors);
// doctorRouter.put("/status/:id", protect, admin, updateDoctorStatus);
export default doctorRouter;
