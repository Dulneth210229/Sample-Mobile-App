import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
const app = express();
const PORT = process.env.PORT || 5005;
const mongoURI = process.env.MONGO_URI;
app.use(express.json()); //passing incoming data in json format

mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to mongo db successfully ✅"))
  .catch((err) => console.log("Error connecting to mongo DB  ❌", err));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
