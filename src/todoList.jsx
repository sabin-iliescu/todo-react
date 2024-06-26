import { TodoItem } from "./todoItem";
import { useFilteredTodos } from "./hooks/useFilteredTodos";

export function TodoList() {
  const { filteredTodos, setFilter } = useFilteredTodos();

  return (
    <div className="card">
      <div className="card-header">
        <h1>Todo List</h1>
        <div className="btn-group mt-3" role="group" aria-label="Basic example">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setFilter("active")}
          >
            Active
          </button>
        </div>
      </div>
      <ul className="list-group list-group-flush ps-2 pe-2 pt-2">
        {filteredTodos.length === 0 && (
          <h6 className="text-center m-3">No todos available</h6>
        )}
        {filteredTodos.map((todo) => {
          return <TodoItem key={todo.id} todo={todo} />;
        })}
      </ul>
    </div>
  );
}

export default TodoList;
