import { useState } from "react";
import { useTodoContext } from "./store/todoContext.jsx";

export function TodoForm({ onSubmit }) {
  const [newItem, setNewItem] = useState("");
  const [completed, setCompleted] = useState(false);
  const { dispatch, ACTIONS } = useTodoContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newItem) return;

    dispatch({
      type: ACTIONS.NEW_TODO,
      payload: { name: newItem, completed },
    });

    setNewItem("");
    setCompleted(false);
  };

  return (
    <div className="card p-2">
      <div className="card-header">
        <h1>Todo App</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="teest"
            className="form-control mt-3"
            value={newItem}
            onChange={(e) => {
              setNewItem(e.target.value);
            }}
            id="todo"
            aria-describedby="todoHelp"
            placeholder="Enter todo name"
          />
          <small id="todoHelp" className="form-text text-muted">
            please create a todo using the input field
          </small>
        </div>
        <div className="form-check mt-3">
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => {
              setCompleted(e.target.checked);
            }}
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Todo completed
          </label>
        </div>
        <button type="submit" className="btn btn-primary mt-3 w-100">
          Create Todo
        </button>
      </form>
    </div>
  );
}

export default TodoForm;
