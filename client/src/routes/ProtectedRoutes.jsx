import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const token = localStorage.getItem("token");
  
  if (token) {
    return <>{children}</>; // Render children if token is present
  } else {
    return <Navigate to="/signin" />; // Redirect to sign-in page
  }
};

export default ProtectedRoutes;
