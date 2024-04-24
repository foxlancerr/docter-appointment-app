import React, { useState } from "react";
import { generalSideBarLinks, sideBarLinks } from "../constants";
import { Link, useLocation } from "react-router-dom";
import { IoClose } from "react-icons/io5";

function MobileNavbar({ isMenuOpen, setIsMenuOpen }) {
  const { pathname } = useLocation();

  return (
    <nav className="relative">
      <div
        className={`absolute duration-300 z-50 w-full flex flex-col justify-end  h-screen bg-black-300 p-10 ${
          isMenuOpen ? "top-0" : "-top-[100vh]"
        }`}
      >
        <div className="absolute top-[3%] right-[3%] text-white">
          {isMenuOpen && (
            <IoClose
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
              }}
              className="text-4xl"
            ></IoClose>
          )}
        </div>
        <div className="flex flex-col gap-2 bg-black-100 text-white-200 p-10 h-fit rounded-[10px]">
          {sideBarLinks.map((item) => {
            return (
              <Link
                key={item.label}
                to={item.route}
                className={`flex gap-3 items-center justify-start rounded p-4 hover:bg-blue-700 hover:text-white-200 ${
                  pathname == item.route && "bg-blue-700 text-white-100"
                }`}
              >
                <span className="text-2xl ">
                  <item.icon />
                </span>
                <p className="text-lg font-semibold">{item.label}</p>
              </Link>
            );
          })}

          {generalSideBarLinks.map((item) => {
            return (
              <Link
                key={item.label}
                to={item.route}
                onClick={() => {
                  item.label == "Logout" && localStorage.clear();
                }}
                className={`flex gap-3 items-center justify-start rounded p-4 hover:bg-blue-700 hover:text-white-200 ${
                  pathname == item.route && "bg-blue-700 text-white-100"
                }`}
              >
                <span className="text-3xl">
                  <item.icon />
                </span>
                <p className="text-lg font-semibold">{item.label}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

export default MobileNavbar;
