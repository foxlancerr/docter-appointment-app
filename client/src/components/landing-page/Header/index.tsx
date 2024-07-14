import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <nav className="px-5 py-1 text-sm bg-red-600 flex justify-center items-center text-white font-semibold">
        <p>
          Buy medicines for Rs. 2000 or more and get flat Rs. 200 off on your
          first order by using promo "Welcome200"
        </p>
      </nav>
      <nav className="bg-gray-800 text-white px-5 py-3">
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
              <Link to="/about" className="hover:text-gray-300">
                About
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-gray-300">
                Services
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-gray-300">
                Contact
              </Link>
            </li>
          </ul>
          <div className="flex gap-2">
            <button className="">Sign In</button>|
            <button className="">Sign Up</button>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
