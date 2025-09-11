import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../model/User";

const userController = {
  register: async (req, res) => {
    try {
      const { email, username, password } = req.body;
      if (!email || !password || !username) {
        return res.status(400).json({ message: "All fields are required" });
      }

      if (password.length < 6) {
        return res
          .status(400)
          .json({ message: "Password should be at least 6 character long" });
      }
      if (username.length < 3) {
        return res
          .status(400)
          .json({ message: "User name should be at least 3 character long" });
      }

      //?Check if user already exist

      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({ message: "This email already inuse" });
      }

      const existingUsername = await User.findOne({ username });
      if (username) {
        return res
          .status(400)
          .json({ message: `${username} username already exist` });
      }

      // get random avatar
      const profileImage = `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`;
      const user = new User({ email, username, password, profileImage });
      await user.save(); //save the created user
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
