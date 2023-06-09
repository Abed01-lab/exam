import { Router } from "express";
import { UserController } from "../controllers/user.controller";

export const userRouter: Router = Router();
const userController = new UserController();
userRouter.get("/", userController.getAllUsers);
userRouter.get("/profile", userController.getUser);
