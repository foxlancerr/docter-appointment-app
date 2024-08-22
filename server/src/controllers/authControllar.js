import Auth from "../model/auth.model.js";
import jwt from "jsonwebtoken";
import { generateVerificationToken } from "../utils/generateToken.js";
import { verifyEmailTemplate } from "../view/EmailTemplate.js";
import { sendEmailToVerifyUser } from "../utils/email.js";
import { verificationSuccessTemplate } from "../view/VerificationTemplate.js";
import uploadToCloudinary from "../utils/cloudnaryConfig.js";

// @desc    User Registration
// @route   POST http://localhost:3000/api/v1/auth/register
// @access  Public
export const userRegister = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    let profileImageUrl = null;
    if (req.file) {
      // Upload image to Cloudinary
      profileImageUrl = await uploadToCloudinary(req.file.path);
    }

    // Validate required fields
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    // Check if the user already exists
    const existUser = await Auth.findOne({ email });
    if (existUser) {
      return res
        .status(409)
        .json({ message: "User already registered", success: false });
    }

    // Generate verification token
    const verificationToken = generateVerificationToken();

    // Generate verification URL
    const verificationUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/auth/verify-email/${verificationToken}`;

    // Create new user with unverified status
    const newUser = await Auth.create({
      username,
      email,
      password,
      isEmailVerified: false,
      profileImage: profileImageUrl,
      emailVerificationToken: verificationToken,
    });

    // Send verification email
    const message = verifyEmailTemplate(username, verificationUrl);
    const emailSended = await sendEmailToVerifyUser({
      email: newUser.email,
      subject: "Verify Your Email",
      message,
    });

    return res.status(201).json({
      message: `${username}, you have successfully registered. Please check your email to verify your account.`,
      success: true,
    });
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(500).json({ message: "Server error", success: false });
  }
};

// @desc    User Signin
// @route   POST http://localhost:3000/api/v1/auth/verify-email/:token
// @access  Public
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    // Find the user by verification token
    const user = await Auth.findOne({ emailVerificationToken: token });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid or expired token", success: false });
    }

    // Mark the user as verified and remove the token
    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    await user.save();

    const baseUrl = `${req.protocol}://${req.get("host")}`;
    return res
      .status(201)
      .send(
        verificationSuccessTemplate(
          user.username,
          `${baseUrl}/signin`,
          `${baseUrl}/signup`
        )
      );
  } catch (error) {
    console.error("Error verifying email:", error.message);
    res.status(500).json({ message: "Server error", success: false });
  }
};

// @desc    User Signin
// @route   POST http://localhost:3000/api/v1/auth/signin
// @access  Public
export const userSignIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate if email and password are provided
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required", success: false });
    }

    // Find user by email
    const user = await Auth.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found in database", success: false });
    }

    // Check if the user's email is verified
    if (!user.isEmailVerified) {
      return res.status(403).json({
        message: "Please verify your email before logging in",
        success: false,
      });
    }

    // Validate password
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Invalid credentials", success: false });
    }

    // Generate JWT token for authenticated user
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    res.status(200).json({
      message: "User logged in successfully",
      token,
      success: true,
    });
  } catch (error) {
    console.error("Error during signin:", error.message);
    res.status(500).json({ message: "Server error", success: false });
  }
};

// @desc    Get User Info by ID
// @route   POST http://localhost:3000/api/v1/auth/get-user-info-by-id
// @access  Private (requires authentication)
export const userAuthenticateBasedOnAccessToken = async (req, res) => {
  try {
    // Fetch user information by user ID (assuming `req.userId` is set by your authentication middleware)
    const user = await Auth.findById(req.userId).select("-password");

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
};
