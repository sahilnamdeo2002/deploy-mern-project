import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute({ isAdmin, element: Component, ...rest }) {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  // Check if user data exists in localStorage
  const storedIsAuthenticated = localStorage.getItem("isAuthenticated");
  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (!isAuthenticated && !storedIsAuthenticated) {
    return <Navigate to="/login" />;
  }

  const role = user?.role || storedUser?.role;

  if (isAdmin && role !== "admin") {
    return <Navigate to="/login" />;
  }

  // If authenticated, allow access to the route
  return <Component {...rest} />;
}

export default ProtectedRoute;
