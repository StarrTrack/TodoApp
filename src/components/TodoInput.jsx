import { Button, Input } from "antd";
import styled from "styled-components";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";

const TodoInputContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export default function TodoInput(onAddTodo) {
  const [initialValue, setInitialValue] = useState("");

  const handleAdd = () => {
    if (initialValue.trim() === "") return;

    const newTodo = {
      id: Date.now(),
      text: initialValue,
      completed: false,
      createAt: Date.now().toString(),
    };
    onAddTodo(newTodo);
    setInitialValue("");
  };

  return (
    <TodoInputContainer>
      <Input
        type="text"
        placeholder="Введите новую задачу"
        value={initialValue}
        onChange={(e) => setInitialValue(e.target.value)}
      />
      <Button icon={<PlusOutlined />} type="primary" onClick={handleAdd}>
        Добавить
      </Button>
    </TodoInputContainer>
  );
}
