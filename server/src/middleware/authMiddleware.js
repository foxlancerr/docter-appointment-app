import jwt from "jsonwebtoken";

// this middleware authenticate the user based on the token which is come from frontend localstorage
export const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    const authenticUser = jwt.verify(token, process.env.SECRET_KEY);

    // console.log("authentic user >>>>>>>>>>>>>>>>",authenticUser)
    req.userId = authenticUser?.id;
    next();
  } catch (err) {
    console.log(err.message);
    return res
      .status(401)
      .json({ message: "authentication failed", success: false });
  }
};

// Middleware to check if user is a doctor
export const isDoctor = (req, res, next) => {
  if (req.authUser.userType === "doctor") {
    next();
  } else {
    return res.status(403).json({ message: "Access denied: Doctor only" });
  }
};

// Middleware to check if user is an admin
export const isAdmin = (req, res, next) => {
  if (req.AuthUser.userType === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Access denied: Admin only" });
  }
};

// Middleware to check if user is a patient
export const isPatient = (req, res, next) => {
  if (req.AuthUser.userType === "patient") {
    next();
  } else {
    return res.status(403).json({ message: "Access denied: Patient only" });
  }
};



