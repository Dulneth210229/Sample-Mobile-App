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
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(15);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

module.exports = mongoose.model("User", useSchema);
