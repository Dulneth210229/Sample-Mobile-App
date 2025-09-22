import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/authRoutes.js";
import booksRoutes from "./routes/booksRoutes.js";
const app = express();
const PORT = process.env.PORT || 5005;

app.use(express.json()); //passing incoming data in json format

//user Rotes
app.use("/", authRoutes);
app.use("/", booksRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
