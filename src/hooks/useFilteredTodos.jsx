import { useState, useEffect } from "react";
import { useTodoContext } from "../store/todoContext.jsx";

export function useFilteredTodos() {
  const { todos } = useTodoContext();
  const [filter, setFilter] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    const priorityMap = {
      high: 1,
      medium: 2,
      low: 3,
    };

    let sortedTodos = [...todos].sort((a, b) => {
      console.log(a.priority, b.priority);
      return priorityMap[a.priority] - priorityMap[b.priority];
    });

    switch (filter) {
      case "completed":
        setFilteredTodos(sortedTodos.filter((todo) => todo.completed));
        break;
      case "active":
        setFilteredTodos(sortedTodos.filter((todo) => !todo.completed));
        break;
      default:
        setFilteredTodos(sortedTodos);
    }
  }, [todos, filter]);

  return { filteredTodos, setFilter };
}

export default useFilteredTodos;
