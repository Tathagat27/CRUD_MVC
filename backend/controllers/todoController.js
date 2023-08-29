const Todo = require("../models/todoModel");

const getTodos = async (req, res) => {
  const todos = await Todo.find();

  res.json(todos);
};

const createTodo = (req, res) => {
  const todo = new Todo({
    title: req.body.title,
  });

  todo.save();

  res.json(todo);
};

const deleteTodo = async (req, res) => {
  const deleteTodo = await Todo.findByIdAndDelete(req.params.id)
  res.json(deleteTodo)
}

const toggleTodoStatus = async (req,res) => {
  const todo = await Todo.findById(req.params.id)
  todo.complete = !todo.complete
  todo.save()
  res.json(todo)
}

exports.getTodos = getTodos;
exports.createTodo = createTodo;
exports.deleteTodo = deleteTodo;
exports.toggleTodoStatus = toggleTodoStatus;

