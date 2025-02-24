import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
const Home = () => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newTodo, setNewToDo] = useState("");

  useEffect(() => {
    const fetchtodos = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:4000/todo/fetch", {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response.data.todos);
        setTodos(response.data.todos);
        setError(null);
      } catch (error) {
        setError("failed to fetch todos");
      } finally {
        setLoading(false);
      }
    };
    fetchtodos();
  }, []);

  const todoCreate = async () => {
    if (!newTodo) {
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:4000/todo/create",
        {
          text: newTodo,
          completed: false,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response.data.newTodo);
      setTodos([...todos, response.data.newTodo]);
      setNewToDo("");
    } catch (error) {
      setError("failed to create todo");
    }
  };

  const todoStatus = async (id) => {
    const todo = todos.find((t) => t._id === id);
    try {
      const response = await axios.put(
        `http://localhost:4000/todo/update/${id}`,
        {
          ...todos,
          completed: !todo.completed,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response.data.todo);
      setTodos(todos.map((t) => (t._id === id ? response.data.todo : t)));
    } catch (error) {
      setError("failed to find todo");
    }
  };

  const navigateTo = useNavigate();
  const logout = async () => {
    try {
      await axios.get("http://localhost:4000/user/logout", {
        withCredentials: true,
      });
      alert("user logged out successfully ");
      navigateTo("/login");
      localStorage.removeItem("jwt");
    } catch (error) {
      alert("error logging out");
    }
  };
  const remainingtodos = todos.filter((t) => !t.completed).length;
  const todoDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/todo/delete/${id}`, {
        withCredentials: true,
      });
      setTodos(todos.filter((t) => t._id !== id));
    } catch (error) {
      setError("failed to delete todo");
    }
  };

  return (
    <div className="my-10 bg-gray-100 max-w-lg lg:max-w-xl rounded-lg shadow-lg mx-8 sm:mx-auto p-6">
      <h1 className="text-2xl font-semibold text-center">TO DO APP</h1>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Add a new todo"
          value={newTodo}
          onChange={(e) => setNewToDo(e.target.value)}
          //onKeyPress={(e) => e.key === "Enter" && todoCreate}
          className="flex-grow p-2 border rounded-l-md focus:outline-none"
        ></input>
        <button
          onClick={todoCreate}
          className="bg-blue-600 border rounded-r-md text-white px-4 py-2 hover:bg-blue-900 duration-300"
        >
          Add
        </button>
      </div>
      {loading ? (
        <div className="text-center justify-center">
          <span className="text-gray-500">Loading...</span>
        </div>
      ) : error ? (
        <div className="text-center text-red-600 font-semibold">{error}</div>
      ) : (
        <ul className="space-y-2">
          {todos.map((todo, index) => (
            <li
              key={todo._id || index}
              className="flex item-center justify-between p-3 bg-gray-100 rounded-md"
            >
              <div className="flex item-center">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => {
                    todoStatus(todo._id);
                  }}
                  className="mr-2"
                ></input>
                <span
                  className={`${
                    todo.completed
                      ? "line-through text-gray-800 font-semibold"
                      : ""
                  }`}
                >
                  {todo.text}
                </span>
              </div>
              <button
                onClick={() => todoDelete(todo._id)}
                className="text-red-500 hover:text-red-800"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      <p className="mt-4 text-center text-sm text-gray-700">
        {remainingtodos} todo remaining
      </p>
      <button
        onClick={() => logout()}
        className="mt-6 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-800 duration-500 mx-auto block"
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
