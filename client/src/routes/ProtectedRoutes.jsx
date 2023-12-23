import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  if (JSON.parse(localStorage.getItem("token"))) {
    return <div>{children}</div>;
  } else {
    return <Navigate to="/signin"></Navigate>;
  }
};

export default ProtectedRoutes;


