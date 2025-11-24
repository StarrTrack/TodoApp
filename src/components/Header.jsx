import styled from "styled-components";
import {
  ExperimentTwoTone,
  HomeTwoTone,
  MoonOutlined,
  QuestionCircleTwoTone,
  SunOutlined,
} from "@ant-design/icons";
import { Button, Segmented } from "antd";

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 24px;
`;

const Spacer = styled.div`
  margin-left: auto;
`;

export default function Header() {
  return (
    <HeaderContainer>
      <ExperimentTwoTone style={{ fontSize: "32px" }} />
      <Spacer />
      <Segmented
        shape="round"
        options={[
          { value: "light", icon: <SunOutlined /> },
          { value: "dark", icon: <MoonOutlined /> },
        ]}
      />
      <Button icon={<HomeTwoTone />} />
      <Button icon={<QuestionCircleTwoTone />} />
    </HeaderContainer>
  );
}
