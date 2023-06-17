import React, { useEffect, useState } from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { isAuthenticated } from "../api/auth";
import Login from "../code/pages/Login";
import NotFound from "../code/pages/NotFound";
import { routes } from "./routes";
import { isNil } from "ramda";

const App = () => {
  const [authChecked, setAuthChecked] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const authStatus = await isAuthenticated();

    setAuthenticated(authStatus);
    setAuthChecked(true);
  };

  if (!authChecked) {
    // Optionally, render a loading state while the authentication check is in progress
    return (
      <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>Loading...</div>
    );
  }

  return (
    <Router>
      <Routes>
        {!isNil(routes) &&
          routes.map((route) => (
            <Route
              //exact={route.exact}
              path={route.path}
              key={route.path}
              element={authenticated ? route.component : <Navigate to={route.redirectPath} replace />}
            />
          ))}
        <Route exact path={"/login"} element={!authenticated ? <Login /> : <Navigate to={"/"} replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
