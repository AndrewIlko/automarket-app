import { Schema, model } from "mongoose";

const modelSchema = new Schema({
  name: String | undefined,
  options: [String],
});

export default model("modelDetails", modelSchema);
