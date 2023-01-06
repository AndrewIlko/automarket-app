import { Schema, model } from "mongoose";

const carSchema = new Schema({
  category: String,
  make: String,
  model: String,
  year: Number,
  city: String,
  VIN: String,
  price: Number,
  images: [Object],
});

export default model("cars", carSchema);
