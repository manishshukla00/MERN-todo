import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/todos")
      .then((response) => setTodos(response.data))
      .catch((error) => console.error("Error fetching todos:", error));
  }, [todos]);

  const addTodo = () => {
    axios
      .post("http://localhost:5000/api/todos", {
        text: newTodo,
        completed: false,
      })
      .then((response) => {
        setTodos([...todos, response.data]);
        setNewTodo("");
      })
      .catch((error) => console.error("Error adding todo:", error));
  };

  const deleteTodo = (id) => {
    axios
      .delete(`http://localhost:5000/api/todos/${id}`)
      .then((response) => {
        if (response.data.success) {
          // If deletion is successful, fetch updated todos
          setTodos();
        } else {
          console.error("Error deleting todo:", response.data.message);
        }
      })
      .catch((error) => console.error("Error deleting todo:", error));
  };

  return (
    <div className="w-3/4 h-screen m-auto flex flex-col justify-center items-center">
      <h1 className="text-2xl my-4">Todo App</h1>
      <div className="flex flex-col">
        <input
          className="w-full my-4 border-2 p-2 border-black"
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button
          className="w-full bg-blue-800 text-white border-2 border-blue-400 p-2 rounded-2xl hover:bg-blue-400 hover:border-blue-800"
          onClick={addTodo}
        >
          Add Todo
        </button>
      </div>
      <ul className="w-full h-full flex flex-col items-center my-4">
        {todos?.map((todo) => (
          <>
            <li key={todo._id}>{todo.text}</li>
            <button key={todo._id} onClick={() => deleteTodo(todo._id)}>
              Delete
            </button>
          </>
        ))}
      </ul>
    </div>
  );
}

export default App;
