import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const useSchema = new mongoose.Schema({
  //   firstName: {
  //     type: String,
  //     required: true,
  //   },
  //   lastName: {
  //     type: String,
  //     required: true,
  //   },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
    minlength: 6,
  },
  profileImage: {
    type: String,
    default: "",
  },
});

//Hash the password before saving user to db
useSchema.pre("save", async function (next) {
  //"save" --> Before we save the user or create the user run this function
  if (!this.isModified("password")) return next(); //isModified check whether the password has been already changed or modified
  const salt = await bcrypt.genSalt(15);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

module.exports = mongoose.model("User", useSchema);
