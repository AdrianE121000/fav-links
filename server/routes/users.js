import { Router } from 'express';
import { UserControllers } from '../controller/users.js';

export const createUserRouter = ({ UserModel }) => {
  const userRouter = Router();

  const userController = new UserControllers({ UserModel });

  userRouter.post('/:username', userController.getUser);

  userRouter.post('/', userController.createUser);

  userRouter.delete('/:id', userController.deleteUser);

  return userRouter;
};
