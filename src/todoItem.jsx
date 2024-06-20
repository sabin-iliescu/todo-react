import { useTodoContext } from "./store/todoContext.jsx";

export function TodoItem({ todo }) {
  const { toggleTodo, deleteTodo } = useTodoContext();

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div className="form-check">
        <input
          type="checkbox"
          className="form-check-input"
          checked={todo.completed}
          onChange={(e) => {
            toggleTodo(todo.id, e.target.checked);
          }}
        />
      </div>
      {todo.name}
      <button
        className="btn btn-danger"
        onClick={(e) => {
          deleteTodo(todo.id);
        }}
      >
        Delete
      </button>
    </li>
  );
}
