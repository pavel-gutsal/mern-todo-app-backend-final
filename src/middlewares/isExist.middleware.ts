import { Model } from 'mongoose';
import { Response, NextFunction } from 'express';
import { CustomRequest } from '../types/customRequest.type';

export const isExistMiddleWare =
  (schemaModel: Model<any>) => async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const isExist = await schemaModel.findById(id);

      if (!isExist) {
        throw new Error('no document with such id');
      }

      next();
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  };
