import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoutes = ({ children }) => {
  const token = localStorage.getItem("token");
  
  if (!token) {
    return <>{children}</>; // Render children if no token is present
  } else {
    return <Navigate to="/" />; // Redirect to home or another protected route
  }
};

export default PublicRoutes;
