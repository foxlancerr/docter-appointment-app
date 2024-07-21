import React, { useContext } from "react";
// import { Signin, Signup, Home } from "./pages";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { GlobalContext } from "./context/GlobalContext";
// import { ProtectedRoutes, PublicRoutes } from "./routes";
import { Loader } from "./components";
import HomePage from "./components/landing-page";
import ContactUs from "./components/shared/ContactUs";
import ServicesList from "./pages/Services/ServicesList";
import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";
import { ProtectedRoutes, PublicRoutes } from "./routes";
import { Home } from "./pages/auth";
import ApplyDocters from "./pages/ApplyDocters";
import DoctorDetail from "./components/shared/DoctorDetail";
import Appointment from "./pages/Appointment";
// import DoctorNotification from "./pages/DocterNotification";
// import UserNotification from "./pages/DocterNotification";
// import Appointment from "./pages/Appointment";
// import Patient from "./pages/Patient";
// import PatientNotification from "./pages/patientNotification";
// import AdminNotification from "./pages/AdminNotification";
// import HomePage from "./components/landing-page";
// import ContactUs from "./components/shared/ContactUs";

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
            // <PublicRoutes>
            <HomePage></HomePage>
            // </PublicRoutes>
          }
        ></Route>
        <Route path="/contact-us" element={<ContactUs></ContactUs>}></Route>
        <Route path="/services" element={<ServicesList></ServicesList>}></Route>
        <Route path="/doctors/:id" element={<DoctorDetail />}></Route>
        <Route path="/patient/appointment/:doctorId" element={<Appointment />}></Route>
        <Route
          path="/signin"
          element={
            // <PublicRoutes>
            <Signin></Signin>
            // </PublicRoutes>
          }
        ></Route>
        <Route
          path="/signup"
          element={
            // <PublicRoutes>
            <Signup></Signup>
            // </PublicRoutes>
          }
        ></Route>

        <Route
          path="/dashboard"
          element={
            // <ProtectedRoutes>
            <Home></Home>
            // </ProtectedRoutes>
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

        {/*<Route
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
          path="/patients"
          element={
            <ProtectedRoutes>
              <Patient></Patient>
            </ProtectedRoutes>
          }
        ></Route>
       */}
      </Routes>
    </>
  );
};

export default App;
