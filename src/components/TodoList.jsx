import TodoItem from "./TodoItem";
import styled from "styled-components";

const EmptyState = styled.div`
  text-align: center;
  color: #999;
  padding: 20px;
`;

export default function TodoList({ todos, onDeleteTodo, onToggleTodo }) {
  const sortedTodos = [...todos].sort((a, b) => {
    if (!a.completed && b.completed) return -1;
    if (a.completed && !b.completed) return 1;
    return 0;
  });

  return (
    <div>
      {sortedTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={onDeleteTodo}
          onToggle={onToggleTodo}
        />
      ))}

      {todos.length === 0 && <EmptyState>Нет задач</EmptyState>}
    </div>
  );
}
