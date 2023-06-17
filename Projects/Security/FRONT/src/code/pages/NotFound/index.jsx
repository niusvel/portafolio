import React from "react";
import { useNavigate } from "react-router-dom";
import { Content } from "./styled";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Content>
      <span>NotFound page</span>
      <button onClick={() => navigate("/")}>Go home</button>
    </Content>
  );
};

export default NotFound;
