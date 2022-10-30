import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { CustomRequest } from '../types/customRequest.type';
import { User } from '../models/User.model';

declare module 'jsonwebtoken' {
  export interface UserIDJwtPayload extends jwt.JwtPayload {
      id: string
  }
}

export const auth = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;

    let token;

    if (authorization && authorization.startsWith('Bearer')) {
      // eslint-disable-next-line prefer-destructuring
      token = authorization.split(' ')[1];

      const decoded = <jwt.UserIDJwtPayload>jwt.verify(token, process.env.JWT_SECRET!)

      // Get user from the token
      const user = await User.findById(decoded.id).select('-password'); // to get rid of password . only id

      if (!user) {
        throw new Error('user not found');
      }

      req.user = { userID: user._id.toString() };

      next();
    } else {
      throw new Error('not authorized');
    }

    if (!token) {
      throw new Error('not authorized, no token');
    }
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};
