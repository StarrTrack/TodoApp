import { Radio } from "antd";
import styled from "styled-components";

const FilterContainer = styled.div`
  margin: 10px 0;
`;

export default function Filters({ currentFilter, filterChange }) {
  return (
    <FilterContainer>
      <Radio.Group
        value={currentFilter}
        onChange={(e) => filterChange(e.target.value)}
      >
        <Radio.Button value="all">Все</Radio.Button>
        <Radio.Button value="active">Активные</Radio.Button>
        <Radio.Button value="completed">Завершенные</Radio.Button>
      </Radio.Group>
    </FilterContainer>
  );
}
