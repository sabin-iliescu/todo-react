import { useState, useRef, useEffect, useCallback } from "react";
import { useTodoContext } from "./store/todoContext.jsx";

export function TodoItem({ todo }) {
  const { dispatch, ACTIONS } = useTodoContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(todo.name);
  const [editedPriority, setEditedProirity] = useState(todo.priority);
  const editInputRef = useRef(null);

  const toggleEdit = useCallback(() => {
    setIsEditing(!isEditing);
    setEditedName(todo.name);
    setEditedProirity(todo.priority);
  }, [isEditing, todo.name, todo.priority]);

  useEffect(() => {
    if (isEditing) {
      editInputRef.current.focus();
    }
  }, [isEditing]);

  const handleNameChange = (e) => {
    setEditedName(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setEditedProirity(e.target.value);
  };

  const todoPriorityClass = useCallback(() => {
    if (todo.priority === "high") {
      return "badge rounded-pill bg-danger p-2";
    } else if (todo.priority === "medium") {
      return "badge rounded-pill bg-warning p-2";
    } else {
      return "badge rounded-pill bg-info p-2";
    }
  });

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!editedName) return;

      dispatch({
        type: ACTIONS.EDIT_TODO,
        payload: { id: todo.id, name: editedName, priority: editedPriority },
      });
      toggleEdit();
      setEditedName("");
      setEditedProirity(todo.priority);
    },
    [
      dispatch,
      ACTIONS.EDIT_TODO,
      editedName,
      todo.id,
      toggleEdit,
      editedPriority,
    ]
  );

  return (
    <>
      <li
        className={
          "list-group-item d-flex justify-content-between align-items-center " +
          (todo.completed
            ? "p-3 mb-2 bg-secondary text-white"
            : "p-3 mb-2 bg-success text-white")
        }
      >
        {isEditing ? (
          <form
            className="d-flex justify-content-end w-50"
            onSubmit={handleSubmit}
          >
            <input
              ref={editInputRef}
              className="form-control me-2"
              type="text"
              value={editedName}
              onChange={handleNameChange}
            />
            <select
              className="form-select w-50 me-3"
              value={editedPriority}
              onChange={handlePriorityChange}
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <button className="btn btn-info ms-3" type="submit">
              Save
            </button>
          </form>
        ) : (
          <>
            <div className="d-flex justify-content-start">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={todo.completed}
                  onChange={(e) => {
                    dispatch({
                      type: ACTIONS.TOGGLE_TODO,
                      payload: { id: todo.id },
                    });
                  }}
                />
              </div>
              <span className={todoPriorityClass()}>{todo.priority}</span>
            </div>
            <span
              style={{ textDecoration: todo.completed ? "line-through" : "" }}
            >
              {todo.name}
            </span>
          </>
        )}
        <span className="d-flex justify-content-end">
          <button className="btn btn-info me-1" onClick={toggleEdit}>
            {isEditing ? "Cancel" : "Edit"}
          </button>
          <button
            className="btn btn-danger ms-1"
            onClick={(e) => {
              dispatch({
                type: ACTIONS.DELETE_TODO,
                payload: { id: todo.id },
              });
            }}
          >
            Delete
          </button>
        </span>
      </li>
    </>
  );
}
