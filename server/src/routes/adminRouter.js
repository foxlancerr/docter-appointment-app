import express from "express";
// import User from "../model/user.model.js";
import authMiddleware from "../middleware/authMiddleware.js";
import jwt from "jsonwebtoken";
import Docter from "../model/docter.model.js";

const adminRouter = express.Router();

// @desc    Apply for doctor account
// @route   POST /api/v1/users/apply-as-doctor
// @access  Public

adminRouter.put("/notification/mark-as-seen/:notificationId", async (req, res) => {
  const { notificationId } = req.params;
  const { userId } = req.body;

  try {
    const admin = await User.findById(userId);

    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const notification = admin.unseenNotifications.id(notificationId);

    if (!notification) {
      return res
        .status(404)
        .json({ success: false, message: "Notification not found" });
    }

    // Remove from unseen and add to seen
    admin.unseenNotifications.id(notificationId).remove();
    admin.seenNotifications.push(notification);

    await admin.save();

    res
      .status(200)
      .json({
        success: true,
        message: "Notification marked as seen",
        notification,
      });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
});


export default adminRouter;
