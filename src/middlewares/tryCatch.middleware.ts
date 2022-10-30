import { Response, NextFunction } from 'express';
import { CustomRequest } from '../types/customRequest.type';
import { IUser } from '../types/user.type';

type ControllerMethod = (req: CustomRequest, res: Response, next: NextFunction) => Promise<any>;

export const tryCatchMiddleWare =
  (controllerMethod: ControllerMethod) =>
  async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const response = await controllerMethod(req, res, next);
      res.send(response);
    } catch (err) {
      res.status(err.status || 500).json({ error: err.message || 'Something went wrong' });
    }
  };
