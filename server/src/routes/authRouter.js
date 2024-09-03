import express from "express";
import {authMiddleware} from "../middleware/authMiddleware.js";
import {
  afterSiginBasicInfoForm,
  deleteUserById,
  getAllRegisterUser,
  getUserById,
  isAdminVerifiedUser,
  updateUserById,
  userAuthenticateBasedOnAccessToken,
  userRegister,
  userSignIn,
  verifyEmail,
} from "../controllers/authControllar.js";
import UploadFile from "../middleware/multerFileUpload.js";
const authRouter = express.Router();

// @desc    User Registration
// @route   POST http://localhost:3000/api/v1/auth/register
// @access  Public
authRouter.post("/register", UploadFile.single("file"), userRegister);

// @desc    Email verification
// @route   GET http://localhost:3000/api/v1/auth/verify-email/:token
// @access  Public
authRouter.get("/verify-email/:token", verifyEmail);

// @desc    User Signin
// @route   POST http://localhost:3000/api/v1/auth/signin
// @access  Public
authRouter.post("/signin", userSignIn);

// @desc    Get User Info by ID
// @route   POST http://localhost:3000/api/v1/auth/get-user-info-by-id
// @access  Private (requires authentication)
authRouter.post(
  "/get-user-info-by-id",
  authMiddleware,
  userAuthenticateBasedOnAccessToken
);
// @desc    Get User Info by ID
// @route   POST http://localhost:3000/api/v1/auth/basic-info/:id
// @access  Private (requires authentication)
authRouter.post("/basic-info/:id",authMiddleware,afterSiginBasicInfoForm);

// @desc    Get User Info by ID
// @route   POST http://localhost:3000/api/v1/auth/approve/:id
// @access  Private (requires authentication)
authRouter.patch("/approve/:id", isAdminVerifiedUser);
authRouter.get("/users", getAllRegisterUser);
authRouter.get("/users/:id", getUserById);
authRouter.delete("/users/:id", deleteUserById);
authRouter.patch("/users/:id", updateUserById);

export default authRouter;
