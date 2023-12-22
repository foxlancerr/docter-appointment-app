import jwt from "jsonwebtoken";

// this middleware authenticate the user based on the token which is come from frontend localstorage
const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    const authenticUser = jwt.verify(token, process.env.SECRET_KEY);

    req.userId = authenticUser?.id;
    next();
  } catch (err) {
    console.log(err.message);
    return res
      .status(401)
      .json({ message: "authentication failed", success: false });
  }
};

export default authMiddleware;
