import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoutes = ({ children }) => {
  if (!JSON.parse(localStorage.getItem("token"))) {
    return <div>{children}</div>;
  } else {
    return <Navigate to="/"></Navigate>;
  }
};
export default PublicRoutes;
