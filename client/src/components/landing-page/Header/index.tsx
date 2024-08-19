import React from "react";
import { Link } from "react-router-dom";
import MarqueeNav from "./MarqueeNav/index";

function Header() {

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
          <div className="flex gap-2">
            <Link to="/signin" className="">
              Sign In
            </Link>
            |
            <Link to="/signup" className="">
              Sign Up
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
