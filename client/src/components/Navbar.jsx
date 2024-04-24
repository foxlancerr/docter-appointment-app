import { useState } from "react";
import { useSelector } from "react-redux";
import { Avator1 } from "../assets";
import { IoClose, IoNotifications } from "react-icons/io5";
import MobileNavbar from "./MobileNavbar";
import { HiMenuAlt3 } from "react-icons/hi";
function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useSelector((state) => state?.userInfo?.user);
  const [profileShow, setProfileShow] = useState(false);

  return (
    <>
      <MobileNavbar
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      ></MobileNavbar>
      <nav className="flex justify-between fixed z-30 w-full items-center bg-white-300 px-6 py-4 lg:px-10">
        <div className="" id="top_nav_right_side">
          <h1 className="font-extrabold text-3xl gradiant-blue-l text-gradiant">
            Docterz
          </h1>
        </div>
        <div className="flex justify-between items-center gap-7 relative">
          <div className="relative">
            <IoNotifications className="text-[2.4rem]"></IoNotifications>
            <div className="absolute w-[10px] h-[10px] rounded-full bg-red-500 -top-0 right-1"></div>
          </div>
          <img
            src={Avator1}
            alt="avotor1"
            width={60}
            height={60}
            className="rounded-full cursor-pointer"
            onClick={() => setProfileShow(!profileShow)}
          />
          <div className=" text-black">
           
              <HiMenuAlt3
                onClick={() => {
                  setIsMenuOpen(!isMenuOpen);
                }}
                className="text-4xl sm:hidden"
              ></HiMenuAlt3>
            
          </div>
          {profileShow && (
            <div className="absolute right-0 -bottom-[130px] bg-white-100  h-auto flex flex-col gap-2 p-6 rounded-[10px]">
              <h1 className="text-xl">{user?.username}</h1>
              <h1 className="text-xl">{user?.email}</h1>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
