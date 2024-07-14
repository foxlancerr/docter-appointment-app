import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/user.model.js";
import authMiddleware from "../middleware/authMiddleware.js";
const userRouter = express.Router();

// @desc    User Registration
// @route   POST http://localhost:3000/api/v1/users/register
// @access  Public
userRouter.post("/register", async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Validate required fields
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    // check if the user already exist or not
    const existUser = await User.findOne({ email: email });
    if (existUser) {
      return res
        .status(404)
        .json({ message: "user already register", success: false });
    }

    await User.create({
      username,
      email,
      password,
    });

    return res.status(201).json({
      message: `${username} are successfully registered`,
      success: true,
    });
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(500).json({ message: "Server error", success: false });
  }
});

// @desc    User Signin
// @route   POST http://localhost:3000/api/v1/users/signin
// @access  Public
userRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate if email and password are provided
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required", success: false });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found in database", success: false });
    }

    // Validate password
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "User not found in database", success: false });
    }

    // Generate JWT token for authenticated user
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    res
      .status(200)
      .json({ message: "User logged in successfully", token, success: true });
  } catch (error) {
    console.error("Error during signin:", error.message);
    res.status(500).json({ message: "Server error", success: false });
  }
});

// @desc    Get User Info by ID
// @route   POST http://localhost:3000/api/v1/users/get-user-info-by-id
// @access  Private (requires authentication)
userRouter.post("/get-user-info-by-id",authMiddleware, async (req, res) => {
  try {
    // Fetch user information by user ID (assuming `req.userId` is set by your authentication middleware)
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    res.status(200).json({ message: "User found", success: true, data: user });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error", success: false });
  }
});

// // @desc    Apply for doctor account
// // @route   POST http://localhost:3000/api/v1/users/apply-as-doctor
// // @access  Public

userRouter.route("/apply-as-doctor").post(async (req, res) => {
  try {
    console.log(req.body);
    const newDocter = new Docter({ ...req.body, status: "pending" });
    await newDocter.save();
    const admin = await User.findOne({ isAdmin: true });
    const notification = admin.notification;
    notification.push({
      type: "new docter request",
      message: `${newDocter.firstname} ${newDocter.lastname} has applied for docter account`,
      data: {
        docterId: newDocter._id,
        name: newDocter.firstname + " " + newDocter.lastname,
      },

      onClickPath: "admin/docters",
    });

    await User.findByIdAndUpdate(admin._id, { unseenNotifications });
  } catch (error) {
    res.status(400).json({ message: error.message, success: false });
  }
});

// userRouter.put("/mark-as-seen/:notificationId", async (req, res) => {
//   const { notificationId } = req.params;
//   const { userId } = req.body;

//   try {
//     const admin = await User.findById(userId);

//     if (!admin) {
//       return res
//         .status(404)
//         .json({ success: false, message: "User not found" });
//     }

//     const notification = admin.unseenNotifications.id(notificationId);

//     if (!notification) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Notification not found" });
//     }

//     // Remove from unseen and add to seen
//     admin.unseenNotifications.id(notificationId).remove();
//     admin.seenNotifications.push(notification);

//     await admin.save();

//     res
//       .status(200)
//       .json({
//         success: true,
//         message: "Notification marked as seen",
//         notification,
//       });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ success: false, message: "Internal server error", error });
//   }
// });

export default userRouter;
