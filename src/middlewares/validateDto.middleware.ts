/* eslint-disable prettier/prettier */
import { AnySchema } from 'yup';
import { Request, Response, NextFunction } from 'express';

export const validateDto = (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(req.body);
      next();
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
