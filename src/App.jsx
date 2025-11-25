import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import { Card } from "antd";
import { useEffect, useState } from "react";
import { getStorage, saveToStorage } from "./utils/localStorage";
import Filters from "./components/Filters";
import Counter from "./components/Counter";
import styled from "styled-components";
import Header from "./components/Header";
import About from "./pages/About";
import HomePage from "./pages/HomePage.jsx";

const FilterCounter = styled.div`
  display: flex;
  justify-content: space-between;
`;

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

  const editTodo = (id, newText) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo,
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
      <HomePage />
      <About />
      <Header />
      <Card title="Moй Todo List">
        <FilterCounter>
          <Filters currentFilter={filter} filterChange={setFilter} />
          <Counter todos={todos} />
        </FilterCounter>
        <TodoInput onAddTodo={addTodo} />
        <TodoList
          todos={filteredTodos}
          onDeleteTodo={deleteTodo}
          onToggleTodo={toggleTodo}
          onEditTodo={editTodo}
        />
      </Card>
    </div>
  );
}
