import { Schema, model } from "mongoose";

const carSchema = new Schema({
  make: String,
  model: String,
  year: Number,
  images: { mainImage: String, otherImages: [String] },
});

export default model("cars", carSchema);
