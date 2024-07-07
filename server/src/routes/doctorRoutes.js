import express from "express";
import {
  applyDoctor,
  approveDoctor,
  getAllPendingDoctors,
  patientRequestedForTreatment,
  rejectDoctor,
  updateDoctorStatus,
} from "../controllers/doctorController.js";

const doctorRouter = express.Router();

doctorRouter.get("/pending", getAllPendingDoctors);
doctorRouter.post("/apply-as-doctor", applyDoctor);
doctorRouter.post("/:doctorId/request-treatment", patientRequestedForTreatment);
doctorRouter.put("/status/:id", updateDoctorStatus);
doctorRouter.put("/approve/:doctorId", approveDoctor);
doctorRouter.put("/reject/:doctorId", rejectDoctor);

// import { protect, admin } from "../middleware/authMiddleware.js";
// doctorRouter.get("/pending", protect, admin, getAllPendingDoctors);
// doctorRouter.put("/status/:id", protect, admin, updateDoctorStatus);
export default doctorRouter;
