import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useRoot } from "../RootContext";

export const PrivateRoute = () => {
  const { data } = useRoot(); // determine if authorized, from context or however you're doing it

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return data.isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};
