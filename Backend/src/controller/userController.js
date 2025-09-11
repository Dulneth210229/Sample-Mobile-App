import asyncHandler from "express-async-handler";
import User from "../model/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userController = {
  //!User register
  register: asyncHandler(async, (req, res) => {
    //get the user details
    const { firstName, lastName, username, email, password } = req.body;

    if (!firstName || !lastName || !username || !email || !password) {
      throw new Error("All fields must be field");
    } //To be able to render this error msg we have to create a middleware
  }),
};
