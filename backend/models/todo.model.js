import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "inprogress", "completed"],
    default: "pending",
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "low"
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const todo = mongoose.model("todo", todoSchema);
export default todo;
