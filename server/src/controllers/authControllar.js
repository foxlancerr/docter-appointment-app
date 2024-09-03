import Auth from "../model/auth.model.js";
import jwt from "jsonwebtoken";
import { generateVerificationToken } from "../utils/generateToken.js";
import { verifyEmailTemplate } from "../view/EmailTemplate.js";
import { sendEmailToVerifyUser } from "../utils/email.js";
import { verificationSuccessTemplate } from "../view/VerificationTemplate.js";
import uploadToCloudinary from "../utils/cloudnaryConfig.js";
import Admin from "../model/admin.model.js";
import Patient from "../model/patient.model.js";
import Doctor from "../model/docter.model.js";
import Notification from "../model/notification.model.js";

// @desc    User Registration
// @route   POST http://localhost:3000/api/v1/auth/register
// @access  Public
export const userRegister = async (req, res) => {
  try {
    console.log(req.body);
    const { username, password, email, userType } = req.body;
    let profileImageUrl = null;
    if (req.file) {
      // Upload image to Cloudinary
      profileImageUrl = await uploadToCloudinary(req.file.path);
    }
    console.log("cloudnary Image uploaded >>>>>>>>>>>", profileImageUrl);

    // Validate required fields
    if (!username || !email || !password || !userType) {
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
    // const verificationUrl = `${req.protocol}://${req.get(
    //   "host"
    // )}/api/v1/auth/verify-email/${verificationToken}`;

    // Initialize variables for the references
    let adminId = null;
    let patientId = null;
    let doctorId = null;

    // Create a new document in the respective model based on userType
    if (userType === "admin") {
      console.log('called admin >>>>>>>>>>>')

      const newAdmin = await Admin.create({phone:'342-232311'});
      console.log(newAdmin)
      adminId = newAdmin._id;
    } else if (userType === "patient") {
      const newPatient = await Patient.create({
        /* any initial patient-specific fields */
      });
      patientId = newPatient._id;
    } else {
      const newDoctor = await Doctor.create({
        /* any initial patient-specific fields */
      });
      doctorId = newDoctor._id;
    }

    console.log(adminId, patientId, doctorId);
    // Create new Auth user with appropriate references
    const newUser = await Auth.create({
      username,
      email,
      password,
      userType,
      isEmailVerified: false,
      profileImage: profileImageUrl,
      emailVerificationToken: verificationToken,
      adminId,
      patientId,
      doctorId,
    });

    // Send notification to the admin
    const admins = await Auth.find({ userType: "admin" });
    const adminNotifications = admins.map((admin) => ({
      message: `New user registered with email: ${newUser.email}`,
      user: admin._id, // The admin receiving the notification
      userType: "admin",
    }));

    // Create a notification for the user confirming their registration
    const userNotification = new Notification({
      message: `Successfully created account. Please wait for admin approval.`,
      user: newUser._id,
      userType: newUser.userType,
    });

    // Save all notifications
    await Notification.insertMany(adminNotifications);
    await userNotification.save();

    // // Send verification email
    // const message = verifyEmailTemplate(username, verificationUrl);
    // const emailSended = await sendEmailToVerifyUser({
    //   email: newUser.email,
    //   subject: "Verify Your Email",
    //   message,
    // });

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

// // @desc    Get User Info by ID
// // @route   POST http://localhost:3000/api/v1/auth/get-user-info-by-id
// // @access  Private (requires authentication)
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

// @desc    Complete admin/patient profile
// @route   POST http://localhost:3000/api/v1/auth/basic-info/:id
// @access  Public
export const afterSiginBasicInfoForm = async (req, res) => {
  // const { id } = req.params;
  const id = req.userId
  console.log(id)
  const {
    lastname,
    firstname,
    phone,
    address,
    description,
    dateOfBirth,
    permissionLevel,
    gender,
    hiredate,
    verified,
    reviews,
    specialty,
    yearsExperience,
    about,
    services,
    education,
    specializations,
    languages,
    experience,
    otherLocations,
    fees,
    daysAvailable,
  } = req.body;

  try {
    // Find the auth document and check if the email is verified
    const auth = await Auth.findById(id);
    if (!auth || !auth.isEmailVerified) {
      return res
        .status(400)
        .json({ message: "Invalid user or user not verified", success: false });
    }

    // Define update data object
    let updateData = {
      lastname,
      firstname,
      phone,
      address,
      gender,
    };
    if (dateOfBirth) updateData.dateOfBirth = dateOfBirth;
    if (permissionLevel) updateData.permissionLevel = permissionLevel;
    if (hiredate) updateData.hireDate = hiredate;

    if (auth.userType === "admin") {
      // Update or create admin profile
      const admin = auth.adminId
        ? await Admin.findByIdAndUpdate(auth.adminId, updateData, {
            new: true,
            runValidators: true,
          })
        : await new Admin(updateData).save();

      // Update auth to mark profile as complete
      auth.isProfileComplete = true;
      await auth.save();

      return res.status(201).json({
        message: "Admin profile completed successfully!",
        admin,
        success: true,
      });
    } else if (auth.userType === "patient") {
      // Update or create patient profile
      const patient = auth.patientId
      ? await Patient.findByIdAndUpdate(auth.patientId, {...updateData, auth:req.userId}, {
        new: true,
        runValidators: true,
      })
      : await new Patient({...updateData, auth:req.userId}).save();
      console.log("patient updated data", auth.patientId,updateData,"------", patient)

      // Update auth to mark profile as complete
      auth.isProfileComplete = true;
      await auth.save();

      return res.status(201).json({
        message: "Patient profile completed successfully!",
        patient,
        success: true,
      });
    } else {
      // Update or create Doctor profile
      if (yearsExperience) updateData.yearsExperience = yearsExperience;
      if (specialty) updateData.specialty = specialty;
      if (reviews) updateData.reviews = reviews;
      if (verified) updateData.verified = verified;
      if (about) updateData.about = about;
      if (services) updateData.services = services;
      if (education) updateData.education = education;
      if (specializations) updateData.specializations = specializations;
      if (languages) updateData.languages = languages;
      if (experience) updateData.experience = experience;
      if (otherLocations) updateData.otherLocations = otherLocations;
      if (fees) updateData.fees = fees;
      if (daysAvailable) updateData.daysAvailable = daysAvailable;
      console.log(auth.doctorId)
      const doctor = auth.doctorId
        ? await Doctor.findByIdAndUpdate(auth.doctorId, {...updateData, auth:req.userId}, {
            new: true,
            runValidators: true,
          })
        : await new Doctor({...updateData, auth:req.userId}).save();

        console.log("updated data >>>>>>>>>>>>>>>",updateData)
      // Update auth to mark profile as complete
      auth.isProfileComplete = true;
      await auth.save();

      return res.status(201).json({
        message: "Doctor profile completed successfully!",
        data: doctor,
        success: true,
      });
    }
  } catch (error) {
    console.error("Error during profile completion:", error);
    res.status(500).json({
      error: "An error occurred while completing the profile",
      success: false,
    });
  }
};



// @desc    Complete admin/patient profile
// @route   PATCH http://localhost:3000/api/v1/auth/approve/:id
// @access  Public
export const isAdminVerifiedUser = async (req, res) => {
  const { id } = req.params; // This is the patient ID

  try {
    // Find the auth document by patientId
    const auth = await Auth.findOne({ _id: id });

    if (!auth) {
      return res.status(400).json({
        message: "Invalid user or user not found",
        success: false,
      });
    }

    // Toggle the verification status
    auth.isAdminVerifyTheUser = !auth.isAdminVerifyTheUser;
    await auth.save();

    // Return success response
    return res.status(200).json({
      message: `User KYC is ${
        auth.isAdminVerifyTheUser ? "approved" : "disapproved"
      }`,
      success: true,
      data :auth
    });
  } catch (error) {
    console.error("Error during update auth verification:", error);
    return res.status(500).json({
      error: "An error occurred during the profile verification update",
      success: false,
    });
  }
};


// @desc    Get All Auth Users
// @route   POST http://localhost:3000/api/v1/users
// @access  Public
export const getAllRegisterUser = async (req, res) => {
  try {
    const users = await Auth.find().select('username createdAt _id profileImage isProfileComplete');
    res.status(200).json({
      data: users,
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error", success: false, error: error });
  }
};

// @desc    Get Doctor based on id
// @route   GET http://localhost:3000/api/v1/auth/user:id
// @access  Public
export const getUserById = async (req, res) => {
  try {
    const auth = await Auth.findById(req.params.id).select('-password');
    if (!auth) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      data: auth,

      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error", success: false, error: error });
  }
};



// @desc    Update Doctors based on ID
// @route   POST http://localhost:3000/api/v1/auth/user:id
// @access  Public
export const updateUserById = async (req, res) => {
  try {
    const updatedAuth = await Auth.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedAuth) {
      return res
        .status(404)
        .json({ message: "Auth User is not found", success: false });
    }
    res
      .status(200)
      .json({ message: "Doctor updated", success: true, data: updatedAuth });
  } catch (error) {
    res.status(400).json({ message: "Error updating doctor", error });
  }
};

// @desc   Delete Doctors based on ID
// @route   POST http://localhost:3000/api/v1/auth/user/:id
// @access  Public
export const deleteUserById = async (req, res) => {
  try {
    const deletedAuth = await Auth.findByIdAndDelete(req.params.id);
    if (!deletedAuth) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    res.status(200).json({
      message: "User deleted successfully",
      data: deletedAuth,
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error", success: false, error: error });
  }
};
