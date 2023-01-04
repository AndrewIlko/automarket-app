import { Schema, model } from "mongoose";

const userSchema = new Schema({
  email: { type: String, require: true, unique: true },
  password: { type: String },
  personalInfo: { name: String, surname: String, country: String },
  cars: [String],
});

export default model("user", userSchema);
