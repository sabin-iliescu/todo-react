import { useState, useRef, useEffect, useCallback } from "react";
import { useTodoContext } from "./store/todoContext.jsx";

export function TodoItem({ todo }) {
  const { dispatch, ACTIONS } = useTodoContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(todo.name);
  const editInputRef = useRef(null);

  const toggleEdit = useCallback(() => {
    setIsEditing(!isEditing);
    setEditedName(todo.name);
  }, [isEditing, todo.name]);

  useEffect(() => {
    if (isEditing) {
      editInputRef.current.focus();
    }
  }, [isEditing]);

  const handleNameChange = (e) => {
    setEditedName(e.target.value);
  };

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!editedName) return;

      dispatch({
        type: ACTIONS.EDIT_TODO,
        payload: { id: todo.id, name: editedName },
      });
      toggleEdit();
      setEditedName("");
    },
    [dispatch, ACTIONS.EDIT_TODO, editedName, todo.id, toggleEdit]
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
              className="form-control"
              type="text"
              value={editedName}
              onChange={handleNameChange}
            />
            <button className="btn btn-info ms-3" type="submit">
              Save
            </button>
          </form>
        ) : (
          <>
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
