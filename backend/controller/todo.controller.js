//actual business logic

import Todo from "../models/todo.model.js";

export const createTodo = async (req, res) => {
  const todo = new Todo({
    text: req.body.text,
    completed: req.body.completed,
    user: req.user._id, //associated todo with logged in user
  });

  try {
    const newTodo = await todo.save();
    res.status(201).json({ message: "Todo created successfully", newTodo });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "error in todo creation" });
  }
};

export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id }); //fetch todos only for logged in user
    res.status(201).json({ message: "Todo fetched successfully", todos });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error in fetching todos" });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ message: "Todo updated successfully", todo });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error in updating todo" });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch {
    console.log(error);
    res.status(500).json({ message: "error in deleting todo" });
  }
};
