import express from "express";
// import User from "../model/user.model.js";
import authMiddleware from "../middleware/authMiddleware.js";
import jwt from "jsonwebtoken";
import Notification from "../model/notification.model.js"; // Import Notification model

const notificationRouter = express.Router();



notificationRouter.get("/]get-notification/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Fetch admin user with notifications populated
    const admin = await User.findById(userId).populate("notifications");
    if (!admin) {
      return res.status(404).json({ message: "Admin not found", success: false });
    }

    res.status(200).json({ success: true, notifications: admin.notification });
  } catch (error) {
    console.error("Error fetching notifications:", error.message);
    res.status(500).json({ message: "Server error", success: false });
  }
});


// notificationRouter.get("/get-notifications/:userId", async (req, res) => {
//   try {
//     const userId = req.params.userId;

//     const user = await User.findById(userId)
    
//     if (!user) {
//       return res.status(404).json({ message: "User not found", success: false });
//     }

//     const notifications = user.unseenNotifications;

//     res.status(200).json({
//       success: true,
//       data: notifications,
//     });
//   } catch (error) {
//     console.error("Error fetching notifications:", error.message);
//     res.status(500).json({ message: "Server error", success: false });
//   }
// });

export default notificationRouter;
