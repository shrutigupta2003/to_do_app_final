import React from "react";
import { useState } from "react"

const TodoForm = ({ newTodo, setNewTodo }) => {
    const [todos, setTodos] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    // const [newTodo, setNewTodo] = useState({
    //     text: "",
    //     desc: "",
    //     status: "pending",
    //     priority: "medium"
    // });

    const [newTodoTitle, setNewTodoTitle] = useState("");
    const [newTodoDesc, setNewTodoDesc] = useState("");
    const [newTodoStatus, setNewTodoStatus] = useState("low");
    const [newTodoPriority, setNewTodoPriority] = useState("pending");
    const status = ["pending", "inprogress", "completed"];
    const priority = ["low", "medium", "high"];
    return (
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

    )
}

export default TodoForm;