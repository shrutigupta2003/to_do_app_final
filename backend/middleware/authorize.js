import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
export const authenticate = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).json({ message: "unauthorize" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.userId);
  } catch (error) {
    return res.status(401).json({ message: "" + error.message });
  }
  next();
};
