import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.model';
import { IUser } from '../types/user.type';

export default class UserService {
  generateToken(id: mongoose.Types.ObjectId) {
    return {
      success: true,
      token: `Bearer ${jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn: '2d' })}`
    };
  }

  async postUser(body: IUser) {
    // is exist -- check
    const user = await User.create({ ...body });

    if (user) {
      return this.generateToken(user._id);
    }

    throw new Error('invalid signup attempt');
  }

  async getUser(email: string, password: string) {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('user not found');
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      return this.generateToken(user._id);
    }

    throw new Error('wrong password or email');
  }

}
