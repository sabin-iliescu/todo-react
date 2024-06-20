import { TodoItem } from "./todoItem";

export function TodoList({ todos, toggleTodo, deleteTodo }) {
  return (
    <div className="card">
      <div className="card-header">Todo List</div>
      <ul className="list-group list-group-flush">
        {todos.length === 0 && (
          <h6 className="text-center m-3">No todos available</h6>
        )}
        {todos.map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              todo={todo}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default TodoList;
