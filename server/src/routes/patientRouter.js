import express from "express";
import {
  createPatient,
  deletePatientById,
  getAllPatients,
  getPatientById,
  updatePatientById,
} from "../controllers/patientController.js";
const patientRouter = express.Router();

patientRouter.post("/", createPatient);
patientRouter.get("/", getAllPatients);
patientRouter.get("/:id", getPatientById);
patientRouter.put("/:id", updatePatientById);
patientRouter.delete("/:id", deletePatientById);

export default patientRouter;
