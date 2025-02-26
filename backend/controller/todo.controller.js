//actual business logic

import Todo from "../models/todo.model.js";

export const createTodo = async (req, res) => {

  const { text, desc, status, priority } = req.body;

  // if (!text, !desc, !["pending", "inprogress", "completed"].includes(status), !["low", "medium", "high"].includes(priority)) {
  //   return res.status(400).json({ message: "invalid input data" });
  // }
  const todo = new Todo({
    text: req.body.text,
    desc: req.body.desc,
    status: req.body.status || "pending",
    priority: req.body.priority || "low",
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

export const getTodoId = async (req, res) => {
  try {
    const id = req.params.id;
    const todo = await Todo.findById(id) //fetch todos only for logged in user
    if (todo)
      res.status(201).json({ message: "Todo fetched successfully", todo });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error in fetching todos" });
  }
};
// export const updateTodo = async (req, res) => {
//   try {
//     const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     res.status(200).json({ message: "Todo updated successfully", todo });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "error in updating todo" });
//   }
// };

export const updateTodo = async (req, res) => {
  const { id } = req.params.id;
  const { text, desc, status, priority } = req.body;

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body,
      //{ new: true }
    );
    if (!updatedTodo) {
      return res.status(404).json({ errors: "to do not found" });
    }
    res.status(200).json({ message: "to do updated successfully", updatedTodo })
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error in updating todo" })
  }
}

export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error in deleting todo" });
  }
};
