import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import todoRoute from "../backend/routes/todo.route.js";
import userRoute from "../backend/routes/user.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

dotenv.config();

const PORT = process.env.PORT || 4000;
const URL = process.env.MONGO_URL;

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"], // Add other headers you want to allow here.
  })
);

//database connection
try {
  await mongoose.connect(URL);
  console.log("Database connected successfully");
} catch (error) {
  console.log(error);
}

//routes
app.use("/todo", todoRoute);
app.use("/user", userRoute);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(4000, () => {
  console.log(`app is running on port ${PORT}`);
});
