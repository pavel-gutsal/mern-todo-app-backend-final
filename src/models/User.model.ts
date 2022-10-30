import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    minlength: 8,
    required: true
  },
  changePassword: {
    type: String,
    minlength: 8
  }
},{ timestamps: true });

export const User = mongoose.model('User', userSchema);