import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../model/User.js";

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "15d" });
};
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
      if (existingUsername) {
        return res
          .status(400)
          .json({ message: `${username} username already exist` });
      }

      // get random avatar
      const profileImage = `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`;
      const user = new User({ email, username, password, profileImage });
      await user.save(); //save the created user

      const token = generateToken(user._id);

      res.status(201).json({
        token,
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          profileImage: user.profileImage,
        },
      });
    } catch (error) {
      console.info("Error register user", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password)
        return res.status(400).json({ message: "All fields must be required" });

      //check the user exist
      const user = await User.findOne({ email });

      if (!user)
        return res
          .status(400)
          .json({ message: `No user exist with the mail ${email}` });

      //!Check if the password is correct
      const isPasswordCorrect = await user.comparePassword(password);
      if (!isPasswordCorrect)
        return res
          .status(400)
          .json({ message: "The password you entered is incorrect" });

      //generate the token
      const token = generateToken(user._id);

      res.status(200).json({
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          profileImage: user.profileImage,
          createdAt: user.createdAt,
        },
      });
    } catch (error) {
      console.warn("Error in login controller");
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

export default userController;
