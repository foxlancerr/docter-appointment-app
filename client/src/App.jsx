import React, { useContext } from "react";
import { Signin, Signup, Home } from "./pages";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { GlobalContext } from "./context/GlobalContext";
import { ProtectedRoutes, PublicRoutes } from "./routes";

const App = () => {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        <Route
          path="/"
          element={
              <Home></Home>
          }
        ></Route>
        {/* <Route
          path="/"
          element={
            <ProtectedRoutes>
              <Home></Home>
            </ProtectedRoutes>
          }
        ></Route> */}
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
