import React, { useRef } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import TodoForm from "./TodoForm";
import { Diameter } from "lucide-react";
import { Link } from "react-router-dom";
import Update from "./Update";
const Home = () => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newTodo, setNewTodo] = useState({
    text: "",
    desc: "",
    status: "pending",
    priority: "medium"
  });

  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [newTodoDesc, setNewTodoDesc] = useState("");
  const [newTodoStatus, setNewTodoStatus] = useState("low");
  const [newTodoPriority, setNewTodoPriority] = useState("pending");
  const status = ["pending", "inprogress", "completed"];
  const priority = ["low", "medium", "high"];
  const [isEditing, setIsEditing] = useState(false);
  const [currTodo, setCurrTodo] = useState({
    text: "",
    desc: "",
    status: "pending",
    priority: "low",
  });

  const textRef = useRef();
  const descRef = useRef();
  const statusRef = useRef();
  const priorityRef = useRef();

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
    if (!newTodoTitle, !newTodoDesc) {
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:4000/todo/create",
        {
          text: newTodo.text,
          desc: newTodo.desc,
          status: newTodo.status,
          priority: newTodo.priority
          //completed: false,
        },
        {
          withCredentials: true,
        }
      );

      console.log(response.data.newTodo);
      setTodos([...todos, response.data.newTodo]);
      setNewTodo({
        text: "",
        desc: "",
        status: "pending",
        priority: "low"
      })
    } catch (error) {
      setError("failed to create todo");
    }
  };

  const newTodoChange = (e) => {
    const { name, value } = e.target;
    setNewTodo((prevtodo) => ({ ...prevtodo, [name]: value }))
  }
  const handlecurrTodoChange = (e) => {
    const { name, value } = e.target;
    setNewTodo((prevtodo) => ({ ...prevtodo, [name]: value }));
  }

  const todoUpdate = async (id) => {
    const todo = todos.find((t) => t._id === id);
    // setNewTodoTitle(todo.text);
    // setNewTodoDesc(todo.desc);
    // setNewTodoPriority(todo.priority);
    // setNewTodoStatus(todo.status);
    try {
      const response = await axios.put(
        `http://localhost:4000/todo/update/${id}`,
        {
          text: currTodo.title,
          desc: currTodo.desc,
          status: currTodo.status,
          priority: currTodo.priority,
        },
        {
          withCredentials: true,
        }
      );
      const updatedTodo = response.data.updatedTodo;
      console.log(updatedTodo);

      setTodos(todos.map((t) => (t._id === id ? updatedTodo : t)));
      setIsEditing(false);
      setCurrTodo({

        title: "",
        desc: "",
        status: "pending",
        priority: "low"
      })
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
      <div className="flex flex-col space-y-2">
        <div className="flex flex-col space-y-2">
          <input
            type="text"
            placeholder="Add a new todo title"
            value={newTodo.text}
            onChange={(e) => { setNewTodoTitle(e.target.value), setNewTodo({ ...newTodo, text: e.target.value }) }}
            //onKeyPress={(e) => e.key === "Enter" && todoCreate}
            className="flex-grow p-2 border rounded-l-md focus:outline-none"
          ></input>
          <input
            type="text"
            placeholder="Add a new todo description"
            value={newTodo.desc}
            onChange={(e) => { setNewTodoDesc(e.target.value), setNewTodo({ ...newTodo, desc: e.target.value }) }}
            //onKeyPress={(e) => e.key === "Enter" && todoCreate}
            className="flex-grow p-2 border rounded-l-md focus:outline-none"
          ></input>

          <label className="font-semibold">Status:</label>
          <div className="flex gap-4">
            {status.map((s) => (
              <div key={s} className="flex items-center">
                <input
                  type="radio"
                  id={s}
                  name="status"
                  value={s}
                  checked={newTodoStatus === s}
                  onChange={(e) => { setNewTodoStatus(e.target.value), setNewTodo({ ...newTodo, status: e.target.value }) }}
                  className="mr-2"
                />
                <label htmlFor={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</label>
              </div>
            ))}
          </div>

          <label className="font-semibold">Priority:</label>
          <div className="flex gap-4">
            {priority.map((p) => (
              <div key={p} className="flex items-center">
                <input
                  type="radio"
                  id={p}
                  name="prioriy"
                  value={p}
                  checked={newTodoPriority === p}
                  onChange={(e) => { setNewTodoPriority(e.target.value), setNewTodo({ ...newTodo, priority: e.target.value }) }}
                  className="mr-2"
                />
                <label htmlFor={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</label>
              </div>
            ))}
          </div>

        </div>
        <button
          onClick={todoCreate}
          className="bg-blue-600 border rounded-r-md text-white px-4 py-2 hover:bg-blue-900 duration-300"
        >
          Add
        </button>
      </div>
      <h2 className="text-xl font-semibold mt-6"> Todo List</h2>
      <ul className="mt-2">
        {todos.map((todo) => (
          <li key={todo._id} className="p-3 bg-white rounded-md shadow-md mt-2">
            <div>
              <h3 className="text-lg font-semibold">{todo.text}</h3>
              <p className="text-gray-700">{todo.desc}</p>
              <span>Status:{todo.status}</span>
              <span>Priority:{todo.priority}</span>
            </div>


            <button onClick={() => todoDelete(todo._id)} className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-800">Delete</button>
            <Link to={`/update/${todo._id}`} className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-800">Update</Link>
            {/* <button onClick={() => {
              setIsEditing(true);
              setCurrTodo({

                text: todo.text,
                desc: todo.desc,
                status: todo.status,
                priority: todo.priority,
              })

            }} className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-800">Update</button> */}
          </li>
        ))}
        {isEditing && (
          <div className="my-4 py-4 border rounded-md bg-gray-200">
            <h2 className="text-x font-semibold mb-2">Edit todo</h2>
            <input
              type="text"
              placeholder="Edit todo title"
              value={currTodo.text}
              onChange={handlecurrTodoChange}
              className="w-ullp-2 mb-2 border rounded-md"
            />
            <input
              type="text"
              placeholder="Edit todo description"
              value={currTodo.desc}
              onChange={handlecurrTodoChange}
              className="w-ullp-2 mb-2 border rounded-md"
            />

            <label className="font-semibold">Status:</label>
            <div className="flex gap-4 mb-2">
              {status.map((s) => {
                <div key={s} className="flex items-center">
                  <input
                    type="radio"
                    id={`edit-status-${s}`}
                    name="edit-status"
                    value={s}
                    checked={currTodo.status === s}
                    onChange={handlecurrTodoChange}
                    className="mr-2"
                  />
                  <label htmlFor={`edit-status-${s}`}>{s.charAt(0).toUpperCase() + s.slice(1)}</label>
                </div>
              })
              }
            </div>

            <label className="font-semibold">Priority:</label>
            <div className="flex gap-4 mb-2">
              {priority.map((p) => {
                <div key={p} className="flex items-center">
                  <input
                    type="radio"
                    id={`edit-priorioty-${currTodo._id}`}
                    name="edit-priority"
                    value={p}
                    checked={currTodo.priority === p}
                    onChange={handlecurrTodoChange}
                    className="mr-2"
                  />
                  <label htmlFor={`edit-priority-${p}`}>{p.charAt(0).toUpperCase() + p.slice(1)}</label>
                </div>
              })
              }
            </div>
            <button onClick={() => todoUpdate(currTodo._id)}
              className="bg-green-500 text-white px-4 py-2 rounded-md mr-2">
              Save</button>
            <button onClick={() => setIsEditing(false)}
              className="bg-red-500 text-white px-4 py-2 rounded-md mr-2">
              Cancel</button>
          </div>
        )}
      </ul>
      <p className="mt-4 text-center text-sm text-gray-700">
        {remainingtodos} todo remaining
      </p>
      <button
        onClick={() => logout()}
        className="mt-6 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-800 duration-500 mx-auto block"
      >
        Logout
      </button>
    </div >
  );
};

export default Home;
