import express from "express";
import userController from "../controller/userController.js";

const userRouter = express.Router();

// router.post("/api/v1/user/register");
// router.post("/api/v1/user/login");

userRouter.post("/api/v1/user/register", userController.register);
userRouter.post("/api/v1/user/login", userController.login);
export default userRouter;
