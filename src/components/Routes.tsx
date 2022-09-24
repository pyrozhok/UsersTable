import React from "react";
import { useRoutes } from "react-router-dom";
import Login from "../pages/Login/Login";
import Users from "../pages/Users/Users";

export const Routes = () => {
  let routes = useRoutes([
    { path: "/", element: <Login /> },
    { path: "/login", element: <Login /> },
    { path: "/users", element: <Users /> },
  ]);
  return routes;
};
