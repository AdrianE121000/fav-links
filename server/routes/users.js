import { Router } from "express";
import { UserControllers } from "../controller/users.js";

export const createUserRouter = ({ UserModel }) => {
  const userRouter = Router();

  const userController = new UserControllers({ UserModel });

  userRouter.post("/:username", userController.getUser);

  userRouter.get("/verify/:token", userController.verify);

  userRouter.post("/", userController.createUser);

  userRouter.delete("/:id", userController.deleteUser);

  userRouter.patch("/:id", userController.updateUser);

  return userRouter;
};
