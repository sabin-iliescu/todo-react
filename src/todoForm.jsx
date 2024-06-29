import { useState } from "react";
import { useTodoContext } from "./store/todoContext.jsx";
import PrioritySelect from "./prioritySelect.jsx";

export function TodoForm({ onSubmit }) {
  const [newItem, setNewItem] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [completed, setCompleted] = useState(false);
  const { dispatch, ACTIONS } = useTodoContext();
  const [priority, setPriority] = useState("high");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newItem) return;

    dispatch({
      type: ACTIONS.NEW_TODO,
      payload: { name: newItem, completed, priority, dueDate },
    });

    setNewItem("");
    setCompleted(false);
    setPriority("high");
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
        </div>
        <div className="container">
          <div className="row">
            <div className="form-group col-sm-6 mt-3">
              <PrioritySelect priority={priority} setPriority={setPriority} />
              <small className="form-text text-muted">priority</small>
            </div>
            <div className="form-group col-sm-6 mt-3">
              <input
                type="date"
                className="form-control"
                value={dueDate}
                onChange={(e) => {
                  setDueDate(e.target.value);
                }}
              />
              <small className="form-text text-muted">due date</small>
            </div>
          </div>
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
