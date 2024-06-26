import { useState, useEffect } from "react";
import { useTodoContext } from "../store/todoContext.jsx";

export function useFilteredTodos() {
  const { todos } = useTodoContext();
  const [filter, setFilter] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    switch (filter) {
      case "completed":
        setFilteredTodos(todos.filter((todo) => todo.completed));
        break;
      case "active":
        setFilteredTodos(todos.filter((todo) => !todo.completed));
        break;
      default:
        setFilteredTodos(todos);
    }
  }, [todos, filter]);

  return { filteredTodos, setFilter };
}

export default useFilteredTodos;
