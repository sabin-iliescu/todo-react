import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import TodoForm from "./todoForm.jsx";
import TodoList from "./todoList.jsx";

function App() {
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col col-lg-6">
            <TodoForm />
          </div>
          <div className="col col-lg-6">
            <TodoList />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
