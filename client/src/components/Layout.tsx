import React from "react";
import { Header } from ".";
import Aside from "./Aside";
import Navbar from "./Navbar";
import MobileNavbar from "./MobileNavbar";

function Layout({ children }) {
  return (
    <main className="relative">
      <Navbar></Navbar>
      <div className="flex">
        <Aside></Aside>
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-9 pt-28 max-md:pb-14 sm:px-14  ">
          <div className="w-full mt-4 mb-[2%]"> {children}</div>
        </section>
      </div>
    </main>
  );
}

export default Layout;
