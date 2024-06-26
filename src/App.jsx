import { useState, useEffect } from "react";
import "./App.css";
import TodoForm from "./todoForm.jsx";
import TodoList from "./todoList.jsx";

function App() {
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col col-lg-5">
            <TodoForm />
          </div>
          <div className="col col-lg-7">
            <TodoList />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
