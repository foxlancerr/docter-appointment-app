import { useState } from "react";
import { useSelector } from "react-redux";
import { Avator1 } from "../assets";
function Navbar() {
  const user = useSelector((state) => state?.userInfo?.user);
  const [profileShow, setProfileShow] = useState(false);
  return (
    <nav className="flex justify-between fixed z-50 w-full items-center bg-white-300 px-6 py-4 lg:px-10">
      <div className="" id="top_nav_right_side">
        <h1 className="font-extrabold text-3xl gradiant-blue-l text-gradiant">
          Docterz
        </h1>
      </div>
      <div className="flex justify-between gap-2 relative">
        <img
          src={Avator1}
          alt="avotor1"
          width={60}
          height={60}
          className="rounded-full cursor-pointer"
          onClick={() => setProfileShow(!profileShow)}
        />
        {profileShow && (
          <div className="absolute -left-20 -bottom-[80px] bg-white w-max flex fle-col gap-2 py-2 px-3">
            <h1 className="text-3xl">{user?.username}</h1>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
