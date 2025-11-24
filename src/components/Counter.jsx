import React from "react";
import { Col, Row, Statistic } from "antd";
import styled from "styled-components";

const CounterContainer = styled.div`
  margin-bottom: 10px;
  margin-left: 6px;
`;

export default function Counter({ todos }) {
  const total = todos.length;
  const completed = todos.filter((todo) => todo.completed).length;

  return (
    <CounterContainer>
      <Row gutter={100}>
        <Col span={2}>
          <Statistic title="Всего" value={total} />
        </Col>
        <Col span={2}>
          <Statistic title="Осталось" value={total - completed} />
        </Col>
        <Col span={2}>
          <Statistic title="Выполнено" value={completed} />
        </Col>
      </Row>
    </CounterContainer>
  );
}
