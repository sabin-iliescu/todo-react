import { TodoItem } from "./todoItem";
import { useTodoContext } from "./store/todoContext.jsx";

export function TodoList() {
  const { todos } = useTodoContext();
  return (
    <div className="card">
      <div className="card-header">Todo List</div>
      <ul className="list-group list-group-flush ps-2 pe-2 pt-2">
        {todos.length === 0 && (
          <h6 className="text-center m-3">No todos available</h6>
        )}
        {todos.map((todo) => {
          return <TodoItem key={todo.id} todo={todo} />;
        })}
      </ul>
    </div>
  );
}

export default TodoList;
