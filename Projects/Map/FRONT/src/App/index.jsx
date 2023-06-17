import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import NotFound from "../pages/NotFound";
import Home from "../pages/Home";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
