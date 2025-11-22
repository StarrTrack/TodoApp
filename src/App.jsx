import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import { Card } from "antd";
import { useEffect, useState } from "react";
import { getStorage, saveToStorage } from "./utils/localStorage.jsx";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedTodos = getStorage("todos", []);
    setTodos(savedTodos);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      saveToStorage("todos", todos);
    }
  }, [todos, isLoaded]);

  const addTodo = (newTodo) => {
    setTodos([newTodo, ...todos]);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  return (
    <div>
      <Card title="Moй Todo List">
        <TodoInput onAddTodo={addTodo} />
        <TodoList
          todos={todos}
          onDeleteTodo={deleteTodo}
          onToggleTodo={toggleTodo}
        />
      </Card>
    </div>
  );
}
