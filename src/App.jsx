import { ConfigProvider, theme } from "antd";
import { useEffect, useState } from "react";
import { getStorage, saveToStorage } from "./utils/localStorage";
import Header from "./components/Header";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [filter, setFilter] = useState("all");
  const [currentTheme, setCurrentTheme] = useState("light");

  useEffect(() => {
    const savedTodos = getStorage("todos", []);
    const savedTheme = getStorage("theme", "light");
    setTodos(savedTodos);
    setCurrentTheme(savedTheme);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      saveToStorage("todos", todos);
    }
  }, [todos, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      saveToStorage("theme", currentTheme);
    }
  }, [currentTheme, isLoaded]);

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

  const toggleTheme = (newTheme) => {
    setCurrentTheme(newTheme);
  };

  return (
    <ConfigProvider
      theme={{
        algorithm:
          currentTheme === "dark"
            ? theme.darkAlgorithm
            : theme.defaultAlgorithm,
      }}
    >
      <div>
        <Header currentTheme={currentTheme} onThemeChange={toggleTheme} />
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                todos={todos}
                addTodo={addTodo}
                deleteTodo={deleteTodo}
                toggleTodo={toggleTodo}
                editTodo={editTodo}
                filter={filter}
                setFilter={setFilter}
              />
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </ConfigProvider>
  );
}
