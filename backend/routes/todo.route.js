import express from "express";
import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
  getTodoId
} from "../controller/todo.controller.js";
import { authenticate } from "../middleware/authorize.js";

const router = express.Router();

router.post("/create", authenticate, createTodo);

router.get("/fetch", authenticate, getTodos);

router.put("/update/:id", authenticate, updateTodo);

router.get("/fetchtodo/:id", authenticate, getTodoId);

router.delete("/delete/:id", authenticate, deleteTodo);
export default router;
