import styled from "styled-components";
import {
  ExperimentTwoTone,
  HomeTwoTone,
  MoonOutlined,
  QuestionCircleTwoTone,
  SunOutlined,
} from "@ant-design/icons";
import { Button, Segmented } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 24px;
`;

const Spacer = styled.div`
  margin-left: auto;
`;

export default function Header({ currentTheme, onThemeChange }) {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <HeaderContainer>
      <ExperimentTwoTone style={{ fontSize: "32px" }} />
      <Spacer />
      <Segmented
        value={currentTheme}
        onChange={onThemeChange}
        shape="round"
        options={[
          { value: "light", icon: <SunOutlined /> },
          { value: "dark", icon: <MoonOutlined /> },
        ]}
      />
      <Button
        icon={<HomeTwoTone />}
        onClick={() => navigate("/")}
        type={location.pathname === "/" ? "primary" : "default"}
      />
      <Button
        icon={<QuestionCircleTwoTone />}
        onClick={() => navigate("/about")}
        type={location.pathname === "/about" ? "primary" : "default"}
      />
    </HeaderContainer>
  );
}
