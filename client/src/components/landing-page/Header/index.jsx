"use client";

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import MarqueeNav from "./MarqueeNav/index";
import { useSelector } from "react-redux";
import profileDummyImage from "./../../../../assets/images/avatar-1.jpeg";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

function Header() {
  const navigate = useNavigate();
  const isUserLogin = useSelector((state) => state?.userInfo?.user);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/signin");
  };

  return (
    <>
      <MarqueeNav></MarqueeNav>
      <nav className="bg-[#023e7d] text-white px-10 py-3 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold">
            <Link to="/">Doctorz</Link>
          </div>
          <ul className="hidden md:flex space-x-6">
            <li>
              <Link to="/" className="hover:text-gray-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about-us" className="hover:text-gray-300">
                About
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-gray-300">
                Services
              </Link>
            </li>
            <li>
              <Link to="/contact-us" className="hover:text-gray-300">
                Contact
              </Link>
            </li>
          </ul>
          {isUserLogin ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="w-[40px] h-[40px] rounded-full p-0 border-none shadow-none focus:outline-none">
                  <img
                    src={isUserLogin?.profileImage || profileDummyImage} 
                    alt="profile-image"
                    className="w-full h-full object-cover rounded-full bg-white"
                  />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="bg-white shadow-lg mt-3 px-3 py-2">
                <DropdownMenuItem>
                  {isUserLogin?.username || "Username"}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  {isUserLogin?.email || "Email"}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer bg-red-500 text-white px-3 py-2 rounded"
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex gap-2">
              <Link to="/signin" className="">
                Sign In
              </Link>
              |
              <Link to="/signup" className="">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

export default Header;
