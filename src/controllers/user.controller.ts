import { Request } from 'express';
import bcrypt from 'bcryptjs';
import UserService from '../services/user.service';
import { IUser } from '../types/user.type';

export class UserController {
  constructor(private userService: UserService) {}

  async signup(req: Request) {
    const { email, password }: IUser = req.body

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const token = await this.userService.postUser({ email, password: hashedPassword });
    return token;
  }

  async login(req: Request) {
    const { email, password }: IUser = req.body;

    const token = await this.userService.getUser(email, password);
    return token;
  }
}

const userController = new UserController(new UserService());
export default userController;
