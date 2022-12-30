import { Schema, model } from "mongoose";

const modelSchema = new Schema({
  model: String,
  options: [String],
});

export default model("modelDetails", modelSchema);
