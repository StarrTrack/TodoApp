import { Button, Checkbox, Input } from "antd";
import styled from "styled-components";
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import { useState } from "react";

const TodoItemContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  padding: 10px;
  text-decoration: ${(props) => (props.completed ? "line-through" : "none")};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition:
    background 0.2s,
    box-shadow 0.2s;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
  }
`;

const TodoContent = styled.div`
  flex: 1;
  margin-left: 10px;
`;

const CreateDate = styled.small`
  color: #999;
`;

const EditInput = styled(Input)`
  margin-right: 8px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 8px;
`;

export default function TodoItem({ todo, onDelete, onToggle, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(todo.id, editText.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  return (
    <TodoItemContainer
      completed={todo.completed}
      layout
      layoutId={`todo-${todo.id}`}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{
        opacity: 0,
        x: todo.completed ? 50 : -50,
        scale: 0.9,
        transition: { duration: 0.3, ease: "easeInOut" },
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 25,
        opacity: { duration: 0.2 },
      }}
    >
      <Checkbox
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        disabled={isEditing}
      />
      <TodoContent>
        {isEditing ? (
          <EditInput
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            autoFocus
          />
        ) : (
          <>
            <div>{todo.text}</div>
            <CreateDate>Создано: {todo.createAt}</CreateDate>
          </>
        )}
      </TodoContent>

      <ButtonContainer>
        {isEditing ? (
          <>
            <Button type="text" icon={<CheckOutlined />} onClick={handleSave} />
            <Button
              type="text"
              icon={<CloseOutlined />}
              onClick={handleCancel}
            />
          </>
        ) : (
          <>
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => setIsEditing(true)}
              disabled={todo.completed}
            />

            <Button
              type="primary"
              icon={<DeleteOutlined />}
              onClick={() => onDelete(todo.id)}
              danger
            />
          </>
        )}
      </ButtonContainer>
    </TodoItemContainer>
  );
}
