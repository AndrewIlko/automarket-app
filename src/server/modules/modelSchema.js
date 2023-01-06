import { Schema, model } from "mongoose";

const modelSchema = new Schema({
  make: String | undefined,
  options: [String],
});

export default model("modelDetails", modelSchema);
