import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const app = express();
app.use(cors());
app.use(express.json());
mongoose.set("strictQuery", false);
const PORT = 5000;

const DB_URL =
  "mongodb+srv://admin:admin@cluster0.x9dzgnt.mongodb.net/auto-market?retryWrites=true&w=majority";

import userSchema from "./modules/userSchema.js";

app.post("/registration", async (req, res) => {
  const { email, password, personalInfo } = req.body;
  const isUser = await userSchema.findOne({ email });
  if (isUser) {
    return res.json({
      isError: true,
      message: "User with this email already exist",
    });
  }
  let securedPassword = bcrypt.hashSync(password, 5);
  const user = new userSchema({
    email: email.toLowerCase(),
    password: securedPassword,
    personalInfo,
  });

  await user.save();
  res.json({ isError: false, message: "User registered successfuly" });
});

const start = async () => {
  await mongoose.connect(DB_URL, () => {
    app.listen(PORT, () => console.log("Server is live."));
  });
};
start();
