import express from "express";
import { getStatisticsV3Dashboard } from "../controllers/statsControllar.js";

const statsRouter = express.Router();

// @desc    GET Stats
// @route   GET /api/v1/stats/dashboard-v3-stats
// @access  Public

statsRouter.get("/dashboard-v3-stats", getStatisticsV3Dashboard);


export default statsRouter;
