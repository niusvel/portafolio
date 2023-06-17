//import React from 'react'

import Home from "../code/pages/Home";

export const routes = [
  {
    exact: true,
    path: "/",
    component: <Home />,
    redirectPath: "/login",
  },
];
