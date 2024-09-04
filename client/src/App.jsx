import React, { useContext, useEffect } from "react";
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
import DashboardDoctorDetail from "./components/dashboard/DashboardDoctorDetail";
import DashboardDoctorList from "./components/dashboard/DashboardDoctorList";
import About from "./pages/about/About";
import PatientDetail from "./components/shared/patientDetail";
import Patient from "./pages/Patient";
import DoctorProfilePage from "./components/dashboard/Profile/doctorProfile";
import AfterSignInForm from "./pages/auth/AfterSignin";
import { useDispatch } from "react-redux";
import { getItemFromLocalStorage } from "./utils/webLocalStorage";
import { logInUser } from "./store/features/userInfo/userInfoSlice";
import axios from "axios";
import { BACKEND_API_URL } from "./constants";
import NotificationPage from "./components/landing-page/Header/Notification";
import UserDetail from "./components/dashboard/patient/UserDetailPage";
import AppointmentTable from "./components/shared/AppointmentTable";
import ProfilePage from "./components/dashboard/Profile/ProfilePage";
import DoctorTableAdmin from "./components/dashboard/admin/DoctorTable";
// import DoctorNotification from "./pages/DocterNotification";
// import UserNotification from "./pages/DocterNotification";
// import Appointment from "./pages/Appointment";
// import Patient from "./pages/Patient";
// import PatientNotification from "./pages/patientNotification";
// import AdminNotification from "./pages/AdminNotification";
// import HomePage from "./components/landing-page";
// import ContactUs from "./components/shared/ContactUs";



const App = () => {
  const dispatch = useDispatch();
  const { load } = useContext(GlobalContext);

// this useEffect authenticate the user based on the token, is the user is authentic or not
useEffect(() => {
  const fetchUserInfo = async () => {
  
      const response = await axios.post(
        `${BACKEND_API_URL}/api/v1/auth/get-user-info-by-id`,
        {},
        {
          headers: {
            Authorization: `Bearer ${getItemFromLocalStorage("token")}`,
          },
        }
      );

      // Check if the response is successful
      if (response?.data?.success) {
        dispatch(logInUser(response.data.data));
      }
      
  }

  fetchUserInfo();
}, [dispatch]);
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      {load && <Loader></Loader>}

      <Routes>
        {/* public routes */}
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/contact-us" element={<ContactUs></ContactUs>}></Route>
        <Route path="/services" element={<ServicesList></ServicesList>}></Route>
        <Route path="/about-us" element={<About></About>}></Route>
        <Route path="/doctors/:id" element={<DoctorDetail />}></Route>

        {/* private page */}
        <Route
          path="/dashboard/doctors/:doctorId"
          element={
            <ProtectedRoutes>
              <DashboardDoctorDetail />
            </ProtectedRoutes>
          }
        ></Route>
        <Route
          path="/dashboard/patient/appointment/:doctorId"
          element={
            <ProtectedRoutes>
              <DashboardDoctorDetail />
            </ProtectedRoutes>
          }
        ></Route>
        <Route
          path="/dashboard/patients"
          element={
            <ProtectedRoutes>
              <Patient />
            </ProtectedRoutes>
          }
        ></Route>
        <Route
          path="/dashboard/appointments"
          element={
            <ProtectedRoutes>
              <AppointmentTable />
            </ProtectedRoutes>
          }
        ></Route>
        <Route
          path="/dashboard/doctors"
          element={
            <ProtectedRoutes>
              <DoctorTableAdmin />
            </ProtectedRoutes>
          }
        ></Route>
        <Route
          path="/dashboard/user-details/:id"
          element={
            <ProtectedRoutes>
              <UserDetail />
            </ProtectedRoutes>
          }
        ></Route>
        <Route
          path="/dashboard/profile/:id"
          element={
            <ProtectedRoutes>
              <ProfilePage />
            </ProtectedRoutes>
          }
        ></Route>
        <Route
          path="/dashboard/patient/appointment/"
          element={
            <ProtectedRoutes>
              <DashboardDoctorList />
            </ProtectedRoutes>
          }
        ></Route>
        <Route
          path="/patient/appointment/:doctorId"
          element={
            <ProtectedRoutes>
              <Appointment />
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

        <Route
          path="/dashboard"
          element={
            <ProtectedRoutes>
              <Home></Home>
            </ProtectedRoutes>
          }
        ></Route>
        <Route
          path="/after-sign-test"
          element={
            <ProtectedRoutes>
              <AfterSignInForm></AfterSignInForm>
            </ProtectedRoutes>
          }
        ></Route>
        <Route
          path="/patient-detail/:id"
          element={
            <ProtectedRoutes>
              <PatientDetail></PatientDetail>
            </ProtectedRoutes>
          }
        ></Route>
        <Route
          path="/dashboard/doctor-profile/:id"
          element={
            <ProtectedRoutes>
              <DoctorProfilePage></DoctorProfilePage>
            </ProtectedRoutes>
          }
        ></Route>
        <Route
          path="/dashboard/basic-info"
          element={
            <AfterSignInForm>
              <DoctorProfilePage></DoctorProfilePage>
            </AfterSignInForm>
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
          path="/notifications"
          element={
            <ProtectedRoutes>
              <NotificationPage></NotificationPage>
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
