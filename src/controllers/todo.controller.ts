import { Request } from 'express';
import { CustomRequest } from '../types/customRequest.type';
import TodoService from '../services/todo.service'
import { IPost } from '../types/post.todo';

export class TodoController {
  constructor(private todoService: TodoService) {}

  async getAllTodos(req: CustomRequest) {
    const userID: string = req.user!.userID;
    const todos = await this.todoService.findAll(userID);
    return todos;
  }

  async getTodo(req: CustomRequest) {
    const userID: string = req.user!.userID;
    const id: string = req.params.id;
    const todos = await this.todoService.findOne(id, userID);
    return todos;
  }

  async postTodo (req: CustomRequest) {
    const userID: string = req.user!.userID;
    const post: IPost = req.body;
    const todo = await this.todoService.postTodo(post, userID);
    return todo;
  }

  async deleteTodo (req: CustomRequest) {
    const userID: string = req.user!.userID;
    const id: string = req.params.id;
    const todo = await this.todoService.deleteTodo(id, userID);
    return todo;
  }

  async updateTodo (req: CustomRequest) {
    const userID: string = req.user!.userID;
    const updates: IPost = req.body;
    const id: string = req.params.id;
    const todo = await this.todoService.editTodo(id, updates, userID);
    return todo;
  }
}

const todoController = new TodoController(new TodoService());
export default todoController;
