import React from "react";
import { useNavigate } from "react-router-dom";

import { login, register } from "../../../api";

import { Content } from "./styled";

const Login = () => {
  const navigate = useNavigate();

  const loginUser = async () => {
    const response = await login("niusvel", "pass");
    if (response) {
      navigate("/");
    }
  };

  const registerUser = async () => {
    const response = await register("niusvel", "pass");
    if (response) {
      navigate("/");
    }
  };

  return (
    <Content>
      <button onClick={loginUser}>Login</button>
      <button onClick={registerUser}>Register</button>
    </Content>
  );
};

export default Login;
