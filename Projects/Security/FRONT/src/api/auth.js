import { isEmpty, isNil } from "ramda";
import { AUTH_API_ENDPOINT } from "../config/configmap";

const saveAuthenticationVariables = (token, expirationTime, refreshToken) => {
  localStorage.setItem("token", token);
  localStorage.setItem("expirationTime", expirationTime);
  localStorage.setItem("refreshToken", refreshToken);
};

const getTokenExpirationTime = (minutes) => {
  const currentTime = Date.now();
  const futureTime = new Date(currentTime);
  return futureTime.setTime(currentTime + minutes * 60 * 1000);
};

export const setAuthToken = (API, token) => {
  if (!isNil(API?.defaults?.headers?.common)) {
    if (!isNil(token)) {
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete API.defaults.headers.common["Authorization"];
    }
  }
};

export const authFunction = async (API, type, body) => {
  let endpoint = type;
  let what;
  switch (type) {
    case "login":
      what = "Login";
      break;
    case "register":
      what = "Register";
      break;
    case "refreshToken":
      what = "Token refresh";
      break;
    default:
      endpoint = null;
      break;
  }
  try {
    if (!isNil(endpoint)) {
      const response = await API.post(`${AUTH_API_ENDPOINT}/${endpoint}`, body);
      const { accessToken, expirationTime, refreshToken } = response.data.data;
      const computedExpirationTime = getTokenExpirationTime(expirationTime);
      saveAuthenticationVariables(accessToken, computedExpirationTime, refreshToken);
      setAuthToken(API, accessToken);

      return true;
    }
  } catch (error) {
    console.error(`${what} failed:`, error);
  }
  return false;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("expirationTime");
};

export const isTokenExpired = () => {
  const expirationTime = getTokenExpirationTime();
  if (!isNil(expirationTime)) {
    return Date.now() > expirationTime;
  }
  return false;
};

export const getToken = () => {
  const value = localStorage.getItem("token");
  if (isNil(value) || isEmpty(value)) {
    logout();
  }
  return value;
};

export const getRefreshToken = () => {
  const value = localStorage.getItem("refreshToken");
  if (isNil(value) || isEmpty(value)) {
    logout();
  }
  return value;
};

export const getExpirationTime = () => {
  const value = localStorage.getItem("expirationTime");
  if (isNil(value) || isEmpty(value)) {
    logout();
  }
  return value;
};

export const isAuthenticated = async (API) => {
  const token = getToken();
  if (!isNil(token)) {
    if (!isTokenExpired()) {
      setAuthToken(API, token);
      return true;
    }
    const rfToken = getRefreshToken();
    const refreshSuccess = await authFunction(API, 2, { refreshToken: rfToken });
    return refreshSuccess;
  }
  return false;
};
