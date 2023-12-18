import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const { auth } = useContext(GlobalContext);
  if (auth) {
    return <div>{children}</div>;
  } else {
    return <Navigate to="/signin"></Navigate>;
  }
};

export default ProtectedRoutes;
