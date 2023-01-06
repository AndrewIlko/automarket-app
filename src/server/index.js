import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";
import { MongoClient } from "mongodb";

const SECRET_KEY = "andrewilko";

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
mongoose.set("strictQuery", false);
const PORT = 5000;

const DB_URL =
  "mongodb+srv://admin:admin@cluster0.x9dzgnt.mongodb.net/auto-market?retryWrites=true&w=majority";

const dbConnect = async (client) => {
  const db = await client.db();
  return db;
};

const client = new MongoClient(DB_URL);
let db;

import userSchema from "./modules/userSchema.js";
import FilterDetails from "./modules/FilterDetailsSchema.js";
import ModelSchema from "./modules/modelSchema.js";
import Cars from "./modules/carSchema.js";
import authToken from "./authToken.js";

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

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userSchema.findOne({ email });
  if (!user) {
    return res.json({
      isError: true,
      message: "Incorrect username or password. ",
    });
  }
  const validPassword = bcrypt.compareSync(password, user.password);
  if (!validPassword) {
    return res.json({
      isError: true,
      message: "Incorrect username or password. ",
    });
  }
  const { _id } = user;
  const token = jwt.sign({ id: _id, email }, SECRET_KEY, { expiresIn: "24h" });
  res.json({ isError: false, token });
});

app.get("/filter/:type/:model?", async (req, res) => {
  const { type } = req.params;

  if (type == "make" || type == "year" || type == "city") {
    const data = await FilterDetails.findOne({ type });
    return res.json(data.options);
  }
  if (type == "model") {
    const { model } = req.params;
    const data = await ModelSchema.findOne({ make: model });
    if (!data) {
      return res.json();
    }
    return res.json(data.options);
  }
});

// app.get("/cars", async (req, res) => {
//   const { limit, page, skip, category, ...data } = req.query;
//   const carsToDisplay = await Cars.find({ ...data })
//     .limit(limit)
//     .skip(skip);

//   if (carsToDisplay.length == 0) return res.json(null);
//   if (carsToDisplay.length < limit)
//     return res.json({ skip: skip, data: carsToDisplay });

//   const skipNext =
//     (await Cars.find({
//       _id: { $lte: carsToDisplay[limit - 1]._id },
//     }).count()) || 0;

//   res.json({ skip: skipNext, data: carsToDisplay });
// });

// app.get("/cars-length", async (req, res) => {
//   const { category, ...data } = req.query;
//   const carsLength = await Cars.find({ ...data });
//   res.json(carsLength.length);
// });

const cars = { data: [] };
app.get("/cars", async (req, res) => {
  const { limit, page, category, ...data } = req.query;
  cars.data = [];
  cars.data = await Cars.find({ ...data });
  res.json({ length: cars.data.length });
});

app.get("/cars-list", async (req, res) => {
  const { page, limit } = req.query;
  const num = page * limit;
  const result = [...cars.data].slice(num - limit, num);
  res.json(result);
});

app.get("/profile/cars", authToken, async (req, res) => {
  const { user } = req.body;
  const carsId = user.cars;
  const result = [];
  for (let carId of carsId) {
    const car = await Cars.findById(carId);
    result.push(car);
  }
  res.json(result);
});

app.get("/select-sell/:data/:optional?", async (req, res) => {
  const { data } = req.params;
  const db = await dbConnect(client);
  let result;
  if (data == "model") {
    const { optional } = req.params;
    result = await db.collection("DB_Cars").findOne({ make: optional });
    return res.json(result?.models);
  } else result = await db.collection("Info_DB").findOne({ param: data });
  res.json(result?.options);
});

const addFilterOption = async (type, value) => {
  const filter = await FilterDetails.findOne({ type });
  if (filter.options.indexOf(value) == -1) {
    filter.options.push(value);
  }
  await filter.save();
};

app.post("/add-car", authToken, async (req, res) => {
  const { _id } = req.body.user;
  const data = req.body.data;

  const db = await dbConnect(client);
  const result = await db.collection("cars").insertOne(data);

  const user = await userSchema.findById(_id);

  user.cars.push(result.insertedId);

  await user.save();

  res.json({ message: "Fine." });

  await addFilterOption("year", data.year);

  await addFilterOption("make", data.make);

  await addFilterOption("city", data.city);

  const filterModel = await ModelSchema.findOne({ make: data.make });

  if (filterModel.options.indexOf(data.model) == -1) {
    filterModel.options.push(data.model);
  }
  await filterModel.save();
});

const start = async () => {
  await mongoose.connect(DB_URL, () => {
    app.listen(PORT, () => console.log("Server is live."));
  });
};
start();
