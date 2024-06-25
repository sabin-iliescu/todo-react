import {
  createContext,
  useContext,
  useState,
  useEffect,
  useReducer,
} from "react";

const ACTIONS = {
  NEW_TODO: "newTodo",
  TOGGLE_TODO: "toggleTodo",
  DELETE_TODO: "deleteTodo",
  EDIT_TODO: "editTodo",
};

export const TodoContext = createContext({
  todos: [],
  addTodo: () => {},
  toggleTodo: () => {},
  deleteTodo: () => {},
  editTodo: () => {},
  dispatch: () => {},
  ACTIONS: {},
});

function todoReducer(todos, action) {
  switch (action.type) {
    case ACTIONS.NEW_TODO:
      return [...todos, addTodo(action.payload.name, action.payload.completed)];
    case ACTIONS.TOGGLE_TODO:
      return todos.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    case ACTIONS.DELETE_TODO:
      return todos.filter((todo) => todo.id !== action.payload.id);
    case ACTIONS.EDIT_TODO:
      return todos.map((todo) =>
        todo.id === action.payload.id
          ? {
              ...todo,
              name: action.payload.name,
            }
          : todo
      );
    default:
      return todos;
  }
}

function addTodo(name, completed) {
  return { id: Date.now(), name, completed };
}

export function useTodoContext() {
  return useContext(TodoContext);
}

function useTodos(initialTodos) {
  const [todos, dispatch] = useReducer(todoReducer, initialTodos);

  return { todos, dispatch, ACTIONS };
}

// function useTodos() {
//   const [todos, setTodos] = useState(
//     () => JSON.parse(localStorage.getItem("TODOS")) || []
//   );

//   function addTodo(name, completed) {
//     setTodos((currentTodos) => {
//       return [...currentTodos, { id: Date.now(), name, completed }];
//     });
//   }

//   function editTodo(id, name) {
//     setTodos((currentTodos) => {
//       return currentTodos.map((todo) => {
//         if (todo.id === id) {
//           return { ...todo, name };
//         }
//         return todo;
//       });
//     });
//   }

//   const toggleTodo = (id, completed) => {
//     setTodos((currentTodos) => {
//       return currentTodos.map((todo) => {
//         if (todo.id === id) {
//           return { ...todo, completed };
//         }
//         return todo;
//       });
//     });
//   };

//   const deleteTodo = (id) => {
//     setTodos((currentTodos) => {
//       return currentTodos.filter((todo) => todo.id !== id);
//     });
//   };

//   return { todos, deleteTodo, toggleTodo, addTodo, editTodo };
// }

export function TodoProvider({ children }) {
  const { todos, dispatch } = useTodos(
    JSON.parse(localStorage.getItem("TODOS")) || []
  );

  useEffect(() => {
    localStorage.setItem("TODOS", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoContext.Provider value={{ todos, dispatch, ACTIONS }}>
      {children}
    </TodoContext.Provider>
  );
}
