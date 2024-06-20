import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import TodoForm from "./todoForm.jsx";
import TodoList from "./todoList.jsx";

function App() {
  const [todos, setTodos] = useState(
    () => JSON.parse(localStorage.getItem("TODOS")) || []
  );

  useEffect(() => {
    localStorage.setItem("TODOS", JSON.stringify(todos));
  }, [todos]);

  function addTodo(name, completed) {
    setTodos((currentTodos) => {
      return [...currentTodos, { id: Date.now(), name, completed }];
    });
  }

  const toggleTodo = (id, completed) => {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed };
        }
        return todo;
      });
    });
  };

  const deleteTodo = (id) => {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col col-lg-6">
            <TodoForm onSubmit={addTodo} />
          </div>
          <div className="col col-lg-6">
            <TodoList
              todos={todos}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
