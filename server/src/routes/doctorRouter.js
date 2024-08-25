import express from 'express';
import { getAllDoctors, getDoctorById, createDoctor, updateDoctorById, deleteDoctorById } from '../controllers/doctorController.js';

const doctorRouter = express.Router();

// Routes for handling doctors
doctorRouter.get('/', getAllDoctors);
doctorRouter.get('/:id', getDoctorById);
doctorRouter.post('/', createDoctor);
doctorRouter.put('/:id', updateDoctorById);
doctorRouter.delete('/:id', deleteDoctorById);

export default doctorRouter;

