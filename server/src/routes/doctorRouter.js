import express from "express";
import {
  getAllDoctors,
  getDoctorById,
  createDoctor,
  updateDoctorById,
  deleteDoctorById,
  afterSiginBasicInfoForm,
} from "../controllers/doctorController.js";

const doctorRouter = express.Router();

// Routes for handling doctors
doctorRouter.post("/basic-info/:id", afterSiginBasicInfoForm);
doctorRouter.get("/", getAllDoctors);
doctorRouter.get("/:id", getDoctorById);
doctorRouter.post("/", createDoctor);
doctorRouter.put("/:id", updateDoctorById);
doctorRouter.delete("/:id", deleteDoctorById);

export default doctorRouter;
