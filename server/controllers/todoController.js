import Todo from "../model/todoModel.js";

export const todogetController = async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
};

export const todopostController = async (req, res) => {
  const newTodo = new Todo(req.body);
  await newTodo.save();
  res.json(newTodo);
};
