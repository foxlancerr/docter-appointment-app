import React, { useContext } from "react";
import { Signin, Signup, Home } from "./pages";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { GlobalContext } from "./context/GlobalContext";
import { ProtectedRoutes, PublicRoutes } from "./routes";
import { Loader } from "./components";
import ApplyDocters from "./pages/ApplyDocters";
import DoctorNotification from "./pages/DocterNotification";
import UserNotification from "./pages/DocterNotification";
import Appointment from "./pages/Appointment";
import Patient from "./pages/Patient";
import PatientNotification from "./pages/patientNotification";
import AdminNotification from "./pages/AdminNotification";

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
          path="/appointments"
          element={
            <ProtectedRoutes>
              <Appointment></Appointment>
            </ProtectedRoutes>
          }
        ></Route>
        <Route
          path="/doctor-notifications"
          element={
            <ProtectedRoutes>
              <DoctorNotification></DoctorNotification>
            </ProtectedRoutes>
          }
        ></Route>
        <Route
          path="/patient-notifications"
          element={
            <ProtectedRoutes>
              <PatientNotification></PatientNotification>
            </ProtectedRoutes>
          }
        ></Route>
        <Route
          path="/admin-notifications"
          element={
            <ProtectedRoutes>
              <AdminNotification></AdminNotification>
            </ProtectedRoutes>
          }
        ></Route>
        <Route
          path="/apply-doctor"
          element={
            <ProtectedRoutes>
              <ApplyDocters></ApplyDocters>
            </ProtectedRoutes>
          }
        ></Route>
        <Route
          path="/patients"
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
