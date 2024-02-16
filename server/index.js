import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./router/todo-router.js";

const app = express();
const port = 5000;

app.use(cors());

mongoose
  .connect("mongodb+srv://todo:todo@cluster0.xfdqoeb.mongodb.net/todo")
  .then(() => {
    console.log("MongoDb is connected");
  })
  .catch((error) => {
    console.log(error.message);
  });

// const todoSchema = new mongoose.Schema({
//   text: String,
//   completed: Boolean,
// });

// const Todo = mongoose.model("Todo", todoSchema);

app.use(express.json());

// app.get("/api/", async (req, res) => {
//   const todos = await Todo.find();
//   res.json(todos);
// });

// app.post("/api/", async (req, res) => {
//   const newTodo = new Todo(req.body);
//   await newTodo.save();
//   res.json(newTodo);
// });
app.use("/api/", router);

app.delete("/api/todos/:id", async (req, res) => {
  const todoId = req.params.id;

  try {
    await Todo.findOneAndDelete(todoId);
    res.json({ success: true, message: "Todo deleted successfully" });
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.listen(5000, () => {
  console.log(`Server is running on port 5000`);
});
