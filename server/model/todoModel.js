import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  text: String,
  completed: Boolean,
});

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
