import { Schema, model } from "mongoose";

const detailsSchema = new Schema({
  type: String,
  options: [String],
});

export default model("filterDetails", detailsSchema);
