import express from "express";
import User from "../model/user.model.js";
import authMiddleware from "../middleware/authMiddleware.js";
import jwt from "jsonwebtoken";
import Docter from "../model/docter.model.js";

const notificationRouter = express.Router();

// @desc    Apply for doctor account
// @route   POST http://localhost:3000/api/v1/notification/mark-as-seen/:notificationId
// @access  Public
const findUserByIdAndType = async (userId, userType) => {
  if (userType === "user") {
    return await User.findById(userId).populate(
      "unseenNotifications seenNotifications"
    );
  } else if (userType === "doctor") {
    return await Doctor.findById(userId).populate(
      "unseenNotifications seenNotifications"
    );
  } else if (userType === "admin") {
    return await User.findById(userId).populate(
      "unseenNotifications seenNotifications"
    );
  }
  throw new Error("Invalid user type");
};

notificationRouter.put(
  "/mark-as-seen/:notificationId",
  async (req, res) => {
    const { notificationId } = req.params;
    const { userId, userType } = req.body;

    try {
      const user = await findUserByIdAndType(userId, userType);

      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      const notificationIndex = user.unseenNotifications.findIndex(
        (notification) => notification._id.toString() === notificationId
      );

      if (notificationIndex === -1) {
        return res
          .status(404)
          .json({ success: false, message: "Notification not found" });
      }

      const [notification] = user.unseenNotifications.splice(
        notificationIndex,
        1
      );
      user.seenNotifications.push(notification);

      await user.save();

      res
        .status(200)
        .json({
          success: true,
          message: "Notification marked as seen",
          notification,
        });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);




export default notificationRouter;
