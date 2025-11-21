import { Button, Checkbox } from "antd";
import styled from "styled-components";
import { DeleteOutlined } from "@ant-design/icons";

const TodoItemContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
`;

const TodoContent = styled.div`
  flex: 1;
  margin-left: 10px;
`;

const CreateDate = styled.small`
  color: #999;
`;

export default function TodoItem(todo, onDelete, onToggle) {
  return (
    <TodoItemContainer>
      <Checkbox checked={todo.completed} onChange={() => onToggle(todo.id)} />
      <TodoContent>
        <div>{todo.text}</div>
        <CreateDate>Создано: {todo.createAt}</CreateDate>
      </TodoContent>
      <Button
        type="primary"
        icon={<DeleteOutlined />}
        onClick={() => onDelete(todo.id)}
        danger
      />
    </TodoItemContainer>
  );
}
