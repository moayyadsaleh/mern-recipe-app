import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./src/routes/users.js";
import { UserModel } from "./src/models/User.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/auth", userRouter);

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("App is up and running");
});

//Establish data base connction
const uri = process.env.MONGODBLocal_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.listen(process.env.PORT, () => {
  console.log(`Server started on http://localhost:${process.env.PORT || 5555}`);
});
