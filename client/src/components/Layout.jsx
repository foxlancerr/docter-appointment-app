import React, { useEffect } from "react";
import Aside from "./Aside";
import Navbar from "./Navbar";
import { useDispatch } from "react-redux";
import { logInUser } from "../store/features/userInfo/userInfoSlice";
import { getItemFromLocalStorage } from "../utils/webLocalStorage";

function Layout({ children }) {
  const dispatch = useDispatch();
  // this useEffect authenticate the user based on the token, is the user is authentic or not
  useEffect(() => {
    fetch("http://localhost:3000/api/v1/users/get-user-info-by-id", {
      method: "POST",
      headers: {
        Authorization: "bearer " + getItemFromLocalStorage("token"),
      },
    })
      .then((response) => response.json())
      .then((result) => {
        dispatch(logInUser(result.data));
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return (
    <main className="relative">
      <Navbar></Navbar>
      <div className="flex">
        <Aside></Aside>
        <section className="flex min-h-screen flex-1 flex-col px-5 pb-9 pt-28 max-md:pb-14 sm:px-8  ">
          <div className="w-full mt-4 mb-[2%]"> {children}</div>
        </section>
      </div>
    </main>
  );
}

export default Layout;
