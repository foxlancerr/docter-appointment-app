// import Logo from "../../assets/slogan_logo.jpg"
import React, { useContext, useState } from "react";

import { HiMenuAlt3 } from "react-icons/hi";
import { FiSearch } from "react-icons/fi";
import { profile_docter } from "../../assets";
import { IoClose } from "react-icons/io5";
import { GlobalContext } from "../context/GlobalContext";

function Header() {
  const { loguserInfo } = useContext(GlobalContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserProfileHide, setIsUserProfileHide] = useState(false);
  console.log(loguserInfo);
  return (
    // for mobile design
    <>
      <nav
        id="top_nav"
        className="items-center justify-between gap-3 py-3 bg-slate-50 px-4 md:px-10 relative z-10 flex md:hidden"
      >
        <div className="" id="top_nav_right_side">
          <h1 className="font-extrabold text-3xl gradiant-blue-l text-gradiant">
            Docterz
          </h1>
        </div>

        {isSearchOpen && (
          <div className="flex items-center py-2 px-2 bg-slate-50 shadow text-black  rounded-md gap-3 w-100% absolute top-[12vh] right-[25%]">
            <label htmlFor="" className="text-2xl ">
              <FiSearch></FiSearch>
            </label>
            <input type="search" className=" bg-transparent outline-none" />
          </div>
        )}

        {isMenuOpen && (
          <div
            id="top_nav_left_side"
            className="flex gap-2 flex-col md:flex-row absolute top-0 right-0 bg-slate-50 py-5 px-4 -z-2 w-[60%] h-screen"
          >
            <IoClose
              className="absolute right-3 top-3 text-3xl md:text-3xl cursor-pointer "
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
                setIsSearchOpen(false);
              }}
            ></IoClose>
            <div className="flex flex-col gap-3 items-center mt-10">
              <div className="w-20 h-20 flex items-center justify-center rounded-full overflow-hidden">
                <img
                  src={profile_docter}
                  alt="profile_image"
                  className="object-cover h-full w-full rounded-full"
                  // style={{ maxWidth: "100%", maxHeight: "100%" }}
                />
              </div>
              <div className="flex-1 items-center flex flex-col mt-2">
                <h2 className="font-bold text-2xl text-blue-800/90">
                  {loguserInfo?.username}
                </h2>
                <p>{loguserInfo?.email}</p>
                <p>
                  <span className="font-bold">Specalist: </span>
                  <span className="underline">Cardiology</span>
                </p>
              </div>
            </div>
            <hr
              className="border-blue-700/90 "
              style={{
                borderWidth: "2px",
                borderRadius: "5px",
                width: "80%",
                marginInline: "auto",
              }}
            />
            <ul className="mt-3 flex flex-col gap-1 md:order-1">
              <li>Home</li>
              <li>About</li>
              <li>Contact us</li>
              <li>Blog</li>
            </ul>

            <button
              className="w-[120px] py-2 gradiant-blue-l mt-2 rounded-lg font-bold text-xl text-white"
              onClick={() => {}}
            >
              Logout
            </button>
          </div>
        )}
        <div className="flex gap-4 items-center">
          <FiSearch
            className="text-2xl md:text-3xl cursor-pointer "
            onClick={() => {
              setIsSearchOpen(!isSearchOpen);
              setIsMenuOpen(false);
            }}
          ></FiSearch>

          <HiMenuAlt3
            className="text-3xl md:text-3xl cursor-pointer "
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
              setIsSearchOpen(false);
            }}
          ></HiMenuAlt3>
        </div>
      </nav>

      {/* for PC screen */}
      <nav
        id="top_nav"
        className=" items-center justify-between gap-3 py-3 bg-slate-50 px-4 md:px-10 relative z-10 md:flex hidden"
      >
        <div className="flex items-center" id="top_nav_right_side">
          <h1 className="font-extrabold text-3xl gradiant-blue-l text-gradiant mr-20">
            Docterz
          </h1>

          <ul className=" flex items-center gap-10 md:order-1 ">
            <li>Home</li>
            <li>About</li>
            <li>Contact us</li>
            <li>Blog</li>
          </ul>
        </div>

        <div id="top_nav_left_side" className="flex bg-slate-50">
          <div className="flex items-center py-1 px-4 bg-slate-50 shadow text-black  rounded-md gap-3 mr-20">
            <label htmlFor="" className="text-[20px] ">
              <FiSearch></FiSearch>
            </label>
            <input type="search" className=" bg-transparent outline-none" />
          </div>
          <div className="flex relative">
            <div
              className="w-12 h-12 flex items-center justify-center rounded-full overflow-hidden mr-3 cursor-pointer"
              onClick={() => {
                setIsUserProfileHide(!isUserProfileHide);
              }}
            >
              <img
                src={profile_docter}
                alt="profile_image"
                className="object-cover h-full w-full rounded-full"
              />
            </div>

            {isUserProfileHide && (
              <div className="absolute top-16 bg-blue-400  text-white p-3 rounded-lg">
                <h2 className="font-bold text-2xl">{loguserInfo?.username}</h2>
                <p>{loguserInfo?.email}</p>
                <p>
                  <span className="font-bold">Specalist: </span>
                  <span className="underline">Cardiology</span>
                </p>
              </div>
            )}
          </div>

          <button
            className="w-[120px] gradiant-blue-l rounded-full font-bold text-xl text-white"
            onClick={() => {}}
          >
            Logout
          </button>
        </div>
      </nav>
    </>
  );
}

export default Header;
