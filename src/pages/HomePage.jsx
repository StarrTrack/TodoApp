import { Card } from "antd";
import Filters from "../components/Filters";
import Counter from "../components/Counter";
import TodoInput from "../components/TodoInput";
import TodoList from "../components/TodoList";
import styled from "styled-components";

const FilterCounter = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default function HomePage({
  todos = [],
  addTodo,
  deleteTodo,
  toggleTodo,
  editTodo,
  filter,
  setFilter,
}) {
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <Card title="Мой Todo List">
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
  );
}
