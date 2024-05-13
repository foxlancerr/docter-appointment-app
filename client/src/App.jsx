import React, { useContext } from "react";
import { Signin, Signup, Home } from "./pages";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { GlobalContext } from "./context/GlobalContext";
import { ProtectedRoutes, PublicRoutes } from "./routes";
import { Loader } from "./components";
import ApplyDocters from "./pages/ApplyDocters";
import Notification from "./pages/Notification";
import Appointment from "./pages/Appointment";
import Patient from "./pages/Patient";

const App = () => {
  const { load } = useContext(GlobalContext);
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      {load && <Loader></Loader>}

      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <Home></Home>
            </ProtectedRoutes>
          }
        ></Route>
        <Route
          path="/appointment"
          element={
            <ProtectedRoutes>
              <Appointment></Appointment>
            </ProtectedRoutes>
          }
        ></Route>
        <Route
          path="/notifications"
          element={
            <ProtectedRoutes>
              <Notification></Notification>
            </ProtectedRoutes>
          }
        ></Route>
        <Route
          path="/apply-docter"
          element={
            <ProtectedRoutes>
              <ApplyDocters></ApplyDocters>
            </ProtectedRoutes>
          }
        ></Route>
        <Route
          path="/patient"
          element={
            <ProtectedRoutes>
              <Patient></Patient>
            </ProtectedRoutes>
          }
        ></Route>
        <Route
          path="/signin"
          element={
            <PublicRoutes>
              <Signin></Signin>
            </PublicRoutes>
          }
        ></Route>
        <Route
          path="/signup"
          element={
            <PublicRoutes>
              <Signup></Signup>
            </PublicRoutes>
          }
        ></Route>
      </Routes>
    </>
  );
};

export default App;
