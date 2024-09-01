// @desc    Notification
// @route   POST http://localhost:3000/api/v1/notification/get-notification

import Auth from "../model/auth.model.js";
import Notification from "../model/notification.model.js";

// @access  Public
export const getNotificationsByUserId = async (req, res) => {
  try {
    const authData = await Auth.findOne({_id:req.userId})
    console.log(authData)
    if(!authData){
    return  res.status(404).json({ success: false, data: [], message:'UnAutherized User' });
    }
    const notifications = await Notification.find({
      user: authData._id,
      userType:authData.userType,
    }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: notifications });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch notifications." });
  }
};

// @desc    Mark Us Seen
// @route   POST http://localhost:3000/api/v1/notification/mark-as-seen/:notificationId
// @access  Public
export const markNotificationAsSeen = async (req, res) => {
  try {
    const { notificationId } = req.params;

    const notification = await Notification.findByIdAndUpdate(
      notificationId,
      { seen: true },
      { new: true }
    );

    if (!notification) {
      return res
        .status(404)
        .json({ success: false, message: "Notification not found.", data: [] });
    }

    res
      .status(200)
      .json({
        success: true,
        message: "Notification marked as seen.",
        data: notification,
      });
  } catch (error) {
    console.error("Error marking notification as seen:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to mark notification as seen.",
        data: [],
      });
  }
};
