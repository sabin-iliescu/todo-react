import { createContext, useContext, useState, useEffect } from "react";

export const TodoContext = createContext({
  todos: [],
  addTodo: () => {},
  toggleTodo: () => {},
  deleteTodo: () => {},
});

export function useTodoContext() {
  return useContext(TodoContext);
}

function useTodos() {
  const [todos, setTodos] = useState(
    () => JSON.parse(localStorage.getItem("TODOS")) || []
  );

  useEffect(() => {
    localStorage.setItem("TODOS", JSON.stringify(todos));
  }, [todos]);

  function addTodo(name, completed) {
    setTodos((currentTodos) => {
      return [...currentTodos, { id: Date.now(), name, completed }];
    });
  }

  const toggleTodo = (id, completed) => {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed };
        }
        return todo;
      });
    });
  };

  const deleteTodo = (id) => {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });
  };

  return { todos, deleteTodo, toggleTodo, addTodo };
}

export function TodoProvider({ children }) {
  const { todos, deleteTodo, toggleTodo, addTodo } = useTodos();
  return (
    <TodoContext.Provider value={{ todos, deleteTodo, toggleTodo, addTodo }}>
      {children}
    </TodoContext.Provider>
  );
}
