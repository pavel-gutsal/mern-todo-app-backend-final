import mongoose from "mongoose";

const Schema = mongoose.Schema;

const todoSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    required: true
  }
},{ timestamps: true });

export const Todo = mongoose.model('Todo', todoSchema);