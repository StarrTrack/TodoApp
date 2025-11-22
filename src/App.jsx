import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import { Card } from "antd";
import { useEffect, useState } from "react";
import { getStorage, saveToStorage } from "./utils/localStorage";
import Filters from "./components/Filters.jsx";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [filter, setFilter] = useState("all");

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

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <div>
      <Card title="Moй Todo List">
        <Filters currentFilter={filter} filterChange={setFilter} />
        <TodoInput onAddTodo={addTodo} />
        <TodoList
          todos={filteredTodos}
          onDeleteTodo={deleteTodo}
          onToggleTodo={toggleTodo}
        />
      </Card>
    </div>
  );
}
