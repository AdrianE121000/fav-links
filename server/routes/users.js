import { Router } from 'express';
import { UserControllers } from '../controller/users.js';

export const createUserRouter = ({ UserModel }) => {
  const userRouter = Router();

  const userController = new UserControllers({ UserModel });

  userRouter.get('/:username', userController.getUser);

  userRouter.post('/', userController.createUser);

  return userRouter;
};
