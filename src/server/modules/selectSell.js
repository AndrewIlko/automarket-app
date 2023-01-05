import { Schema, model } from "mongoose";

const selectSellSchema = new Schema({
  param: { type: String },
  options: [String],
});

export default model("selectSell", selectSellSchema);
