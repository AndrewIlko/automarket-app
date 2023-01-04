import jwt from "jsonwebtoken";
import userSchema from "./modules/userSchema.js";

const authToken = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.json({ message: "No token" });
  const { id } = jwt.verify(token, "andrewilko");
  const user = await userSchema.findById(id);
  req.body.user = user;
  next();
};

export default authToken;
