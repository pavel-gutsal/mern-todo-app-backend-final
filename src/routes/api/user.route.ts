import { Router } from 'express';
import userController from '../../controllers/user.controller';
import { tryCatchMiddleWare, validateDto, uniqueEmailMiddleWare } from '../../middlewares';
import { userValidation } from '../../dto/validate.schema';
import { User } from '../../models/User.model';

const userRouter: Router = Router();

// @route   POST api/user/signup
// @desc    Register user given their email and password, returns the token upon successful registration
// @access  Public
userRouter.post(
  '/signup',
  uniqueEmailMiddleWare(User),
  validateDto(userValidation),
  tryCatchMiddleWare(userController.signup.bind(userController)),
);

// @route   POST api/user/login
// @desc    Login user given their email and password, returns the token upon successful registration
// @access  Public
userRouter.post(
  '/login',
  validateDto(userValidation),
  tryCatchMiddleWare(userController.login.bind(userController))
);

export default userRouter;