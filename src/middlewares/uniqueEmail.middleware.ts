import { Model } from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import { IUser } from '../types/user.type';

export const uniqueEmailMiddleWare =
  (schemaModel: Model<any>) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email }: IUser = req.body;

      const isExist = await schemaModel.findOne({ email });

      if (isExist) {
        throw new Error('email already in use');
      }

      next();
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  };
