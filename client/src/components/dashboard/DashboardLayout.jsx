import React, { useEffect } from "react";

import { useDispatch } from "react-redux";
import { logInUser } from "../../store/features/userInfo/userInfoSlice";
import { getItemFromLocalStorage } from "@/utils/webLocalStorage";
import Navbar from "./Navbar";
import Aside from "./Aside";

function Layout({ children }) {
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
