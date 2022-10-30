import { Router } from 'express';
import todoController from '../../controllers/todo.controller';
import { Todo } from '../../models/Todo.model';
import {
  tryCatchMiddleWare,
  auth,
  validateDto,
  isExistMiddleWare
} from '../../middlewares';
import { postValidation, editValidation } from '../../dto/validate.schema';

const todoRouter: Router = Router();

// @route   GET api/todos
// @desc    get all todos from specific registered user
// @access  Protected
todoRouter.get(
  '',
  auth,
  tryCatchMiddleWare(todoController.getAllTodos.bind(todoController)),
);

// @route   GET api/todos
// @desc    get todo by id from specific registered user
// @access  Protected
todoRouter.get(
  '/:id',
  auth,
  isExistMiddleWare(Todo),
  tryCatchMiddleWare(todoController.getTodo.bind(todoController)),
);

// @route   POST api/todos
// @desc    post todo from specific registered user
// @access  Protected
todoRouter.post(
  '',
  auth,
  validateDto(postValidation),
  tryCatchMiddleWare(todoController.postTodo.bind(todoController)),
);

// @route   DELETE api/todos
// @desc    delete todo by id from specific registered user
// @access  Protected
todoRouter.delete(
  '/:id',
  auth,
  isExistMiddleWare(Todo),
  tryCatchMiddleWare(todoController.deleteTodo.bind(todoController)),
);

// @route   PUT api/todos
// @desc    update todo by id from specific registered user
// @access  Protected
todoRouter.put(
  '/:id',
  auth,
  isExistMiddleWare(Todo),
  validateDto(editValidation),
  tryCatchMiddleWare(todoController.updateTodo.bind(todoController)),
);

export default todoRouter;