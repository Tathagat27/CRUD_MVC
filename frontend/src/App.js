import "./App.modules.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";

const BASE_URL = process.env.REACT_APP_API_URL;

function App() {
  const [todos, setTodos] = useState(null);
  const [todo, setTodo] = useState("");
  const [error, setError] = useState('');
  

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = () => {
    axios
      .get(`${BASE_URL}/todos`)
      .then((res) => setTodos(res.data))
      .catch((err) => console.error(err));
  };

  const handleAddTodo = (e) => {
    e.preventDefault();

    if (!todo.trim()) {
      // Show an error message to the user or handle it in your preferred way
      setError('Title cannot be empty');
      return;
    }

    axios
      .post(`${BASE_URL}/todo/new`,{
        title: todo,
      })
      .then((res) => {
        setTodos([...todos, res.data]);
        setTodo("");
        setError('');
      })
      .catch((err) => {
        console.log(err);
        setError('An error occurred. Please try again.'); 
      });
  };

  const handleDeleteTodo = (id) => {
    axios
    .delete(`${BASE_URL}/todo/delete/${id}`)
    .then((res) =>
      setTodos(todos.filter((todo) => todo._id !== res.data._id))
    )
    .catch((err) =>
        console.error(err)
      );
  };

  const handleTodoClick = (id) => {
    axios
      .get(`${BASE_URL}/todo/toggleStatus/${id}`)
      .then((res) => getTodos())
      .catch((err) => console.error(err));
  };

  return (
    <div className="App">
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleAddTodo}>
      <div className="todo-input-wrapper">
        <input
          className="todo-input-bar"
          name="title"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          placeholder="Add a New Todo"
          autoFocus
        />
        <button type="submit" className="add-button" >
          +
        </button>
        </div>
      </form>        
      
      <div className="todos-list">
        {!todos || !todos.length ? (
          <h2 style={{ textAlign: "center", color: "white", textShadow: "2px 2px 3px #FF0000" }}>No Todo Data </h2>
        ) : (
          todos.map((todo) => (
            <div className="todo" key={todo._id}>
              <div
                onClick={() => handleTodoClick(todo._id)}
                className={todo.complete ? "complete" : ""}
                id="todo-title"
              >
                {todo.title}
              </div>
              <div
                className="delete"
                onClick={() => handleDeleteTodo(todo._id)}
              >
                <Trash2 color="#dd2727" strokeWidth={1.75} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
