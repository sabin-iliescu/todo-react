export function TodoItem({ todo, toggleTodo, deleteTodo }) {
  return (
    <li
      key={todo.id}
      className="list-group-item d-flex justify-content-between align-items-center"
    >
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
