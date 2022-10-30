import { Application } from 'express';
import userRouter from './api/user.route';
import todoRouter from './api/todo.route';


class AppRouter {
  constructor(private app: Application) {}

  init() {
    this.app.get('/', (_req, res) => {
      res.send('API Running');
    });
    this.app.use('/api/user', userRouter);
    this.app.use('/api/todos', todoRouter);
  }
}

export default AppRouter;
