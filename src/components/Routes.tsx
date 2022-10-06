import React from "react";
import { useRoutes, Navigate } from "react-router-dom";
import Login from "../pages/Login/Login";
import Users from "../pages/Users/Users";
import { isLoggedIn } from "../services/auth-header";

export const Routes = () => {
  const isLogged = isLoggedIn();

  const routes = useRoutes([
    { path: "/", element: <Login /> },
    {
      path: "/login",
      element: <Login />,
    },
    { path: "/users", element: isLogged ? <Users /> : <Navigate to="/" /> },
  ]);
  return routes;
};
