import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useRoot } from "../RootContext";

//ensure that user can access route, if not, redirect to login
export const PrivateRoute = () => {
  const { data } = useRoot();

  return data.isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};
