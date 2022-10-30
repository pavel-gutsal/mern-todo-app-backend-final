import { Todo } from '../models/Todo.model';
import { ITodo } from '../types/todo.type';
import { IPost } from '../types/post.todo';

export default class TodoService {
  async checkForOwnership(id: string, userID: string) {
    const todos = await Todo.findById(id);
    if (todos && todos.userID.toString() === userID) {
      console.log(todos.userID.toString(), userID);
      return;
    }
    throw new Error('unathorized, no ownership over this object');
  }

  async findAll(userID: string) {
    const todos = await Todo.find({ userID });
    return todos;
  }

  findOne = async (id: string, userID: string) => {
    await this.checkForOwnership(id, userID);
    const todo = await Todo.findById(id);
    return todo;
  };

  async postTodo(post: IPost, userID: string) {
    const todo = await Todo.create({ ...post, completed: false, userID });
    return todo;
  }

  deleteTodo = async (id: string, userID: string) => {
    await this.checkForOwnership(id, userID);
    const todo = await Todo.findByIdAndRemove(id);
    return todo;
  };

  editTodo = async (id: string, updates: IPost, userID: string) => {
    await this.checkForOwnership(id, userID);
    const updated = await Todo.findByIdAndUpdate(id, updates, { new: true });
    return updated;
  };
}
