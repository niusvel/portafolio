import { isNil } from "ramda";
import axios from "axios";

import { BASE_API_URL } from "../config/configmap";
import { authFunction, getToken, isTokenExpired, setAuthToken } from "./auth";

axios.defaults.baseURL = BASE_API_URL;

export const login = async (username, password) => {
  if (!isNil(username) && !isNil(password)) {
    const result = await authFunction(axios, "login", { username, password });
    return result;
  }
  return false;
};

export const register = async (username, password) => {
  if (!isNil(username) && !isNil(password)) {
    const result = await authFunction(axios, "register", { username, password });
    return result;
  }
  return false;
};

export const refreshToken = async (username, password) => {
  if (!isNil(username) && !isNil(password)) {
    const result = await authFunction(axios, "refreshToken", { username, password });
    return result;
  }
  return false;
};

export const getDummyData = async () => {
  if (preRequest()) {
    const result = await axios.get("/dummy/data");
    return result;
  }
  throw Error("Unauthorized user");
};

const preRequest = async () => {
  if (isTokenExpired()) {
    const refreshSuccess = await refreshToken();
    if (!refreshSuccess) {
      return false;
    }
  }
  setAuthToken(axios, getToken());
  return true;
};
