import React from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { useState, useEffect, useRef } from "react";
import axios from "axios"

const Update = () => {
    const { id } = useParams();
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState({
        text: "",
        desc: "",
        status: "pending",
        priority: "medium"
    });

    const navigate = useNavigate();
    const [newTodoTitle, setNewTodoTitle] = useState("");
    const [newTodoDesc, setNewTodoDesc] = useState("");
    const [newTodoStatus, setNewTodoStatus] = useState("low");
    const [newTodoPriority, setNewTodoPriority] = useState("pending");
    const status = ["pending", "inprogress", "completed"];
    const priority = ["low", "medium", "high"];
    const [isEditing, setIsEditing] = useState(false);
    const [updateTodo, setUpdateTodo] = useState({
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
        const fetchtodo = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/todo/fetchtodo/${id}`, {
                    withCredentials: true,
                })
                if (response) {
                    console.log(response.data);
                    setNewTodo(response.data.todo);
                }
            } catch (error) {
                console.log("error")
            }
        }
        fetchtodo();
    }, [id])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewTodo((prevTodo) => ({
            ...prevTodo,
            [name]: value,
        }))
    }
    const handleUpdate = async () => {
        // if (!newTodoTitle, !newTodoDesc) {
        //     return;
        // }
        try {
            const response = await axios.put(
                `http://localhost:4000/todo/update/${id}`, newTodo,
                {
                    withCredentials: true,
                }
            );

            //
            // setNewTodo({
            //     text: "",
            //     desc: "",
            //     status: "pending",
            //     priority: "low"
            // })
            if (response.status == 200) {
                console.log(response.data.newTodo);
                navigate('/');
            }
            else {
                console.error("error occured", response.status)
            }

        } catch (error) {
            console.error("failed to create todo");
        }
    };

    const handleCancel = () => {
        navigate('/')
    }
    return (
        <>
            <div className="my-10 bg-gray-100 max-w-lg lg:max-w-xl rounded-lg shadow-lg mx-8 sm:mx-auto p-6">
                <h1>Update form</h1>
                <div className="flex flex-col space-y-2">
                    <div className="flex flex-col space-y-2">
                        <input
                            type="text"
                            placeholder="Update a new todo title"
                            value={newTodo.text}
                            //ref={textRef}
                            //onChange={(e) => { setNewTodoTitle(e.target.value), handleChange }}
                            onChange={(e) => { setNewTodoTitle(e.target.value), setNewTodo({ ...newTodo, text: e.target.value }) }}
                            //onKeyPress={(e) => e.key === "Enter" && todoCreate}
                            className="flex-grow p-2 border rounded-l-md focus:outline-none"
                        ></input>
                        <input
                            type="text"
                            placeholder="Update a new todo description"
                            value={newTodo.desc}
                            //ref={descRef}
                            //onChange={handleChange}
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
                                        checked={newTodo.status === s}
                                        //ref={statusRef}
                                        //onChange={handleChange}
                                        onChange={(e) => {
                                            console.log(e)
                                            setNewTodoStatus(e.target.value), setNewTodo({ ...newTodo, status: e.target.value })
                                        }}
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
                                        checked={newTodo.priority === p}
                                        //ref={priorityRef}
                                        //onChange={handleChange}
                                        onChange={(e) => { setNewTodoPriority(e.target.value), setNewTodo({ ...newTodo, priority: e.target.value }) }}
                                        className="mr-2"
                                    />
                                    <label htmlFor={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</label>
                                </div>
                            ))}
                        </div>

                    </div>
                    <button
                        onClick={handleUpdate}
                        className="bg-blue-600 border rounded-r-md text-white px-4 py-2 hover:bg-blue-900 duration-300"
                    >
                        Save
                    </button>
                    <button
                        onClick={handleCancel}
                        className="bg-blue-600 border rounded-r-md text-white px-4 py-2 hover:bg-blue-900 duration-300"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </>
    )
}

export default Update;