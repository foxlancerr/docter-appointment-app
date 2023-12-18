import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";

const PublicRoutes = ({ children }) => {
  const { auth } = useContext(GlobalContext);
  if (!auth) {
    return <div>{children}</div>;
  } else {
    return <Navigate to="/"></Navigate>;
  }
};
export default PublicRoutes;
