import express from "express";
// import User from "../model/user.model.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import jwt from "jsonwebtoken";
import Notification from "../model/notification.model.js"; // Import Notification model
import { getNotificationsByUserId, markNotificationAsSeen } from "../controllers/notificationController.js";

const notificationRouter = express.Router();

// @desc    Notification
// @route   POST http://localhost:3000/api/v1/notification/get-notification
// @access  Public
notificationRouter.get("/get-notification", authMiddleware,getNotificationsByUserId);

// @desc    Mark Us Seen
// @route   POST http://localhost:3000/api/v1/notification/mark-as-seen/:notificationId
// @access  Public
notificationRouter.patch('/mark-as-seen/:notificationId', authMiddleware, markNotificationAsSeen);



export default notificationRouter;
