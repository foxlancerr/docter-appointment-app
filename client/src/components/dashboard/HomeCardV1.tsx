import React from "react";
import { MdBookmarkAdded } from "react-icons/md";
import { HiOutlineUserGroup } from "react-icons/hi";
import { TbReportMoney } from "react-icons/tb";
function HomeCardV1() {
  return (
    <div className="grid grid-cols-3 gap-10 my-10 ">
      <div className="flex items-center  w-full bg-[#015A78] rounded-[40px] hover:shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out">
        <div className="flex gap-5 ml-10 py-16 items-center">
          <span className="text-4xl p-5 bg-white rounded-full">
            <MdBookmarkAdded className="text-[#A6207D]"></MdBookmarkAdded>
          </span>
          <div className="flex flex-col gap-1">
            <h2 className="text-xl text-white">Total Appointments</h2>
            <h1 className="text-4xl font-bold text-white">230</h1>
          </div>
        </div>
      </div>
      <div className="flex items-center  w-full bg-[#015A78] rounded-[40px] hover:shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out">
        <div className="flex gap-5 ml-10 py-16 items-center">
          <span className="text-4xl p-5 bg-white rounded-full text-[#A6207D]">
            <HiOutlineUserGroup></HiOutlineUserGroup>
          </span>
          <div className="flex flex-col gap-1">
            <h2 className="text-xl text-white">Total Patient</h2>
            <h1 className="text-4xl font-bold text-white">4000+</h1>
          </div>
        </div>
      </div>
      <div className="flex items-center  w-full bg-[#015A78] rounded-[40px] hover:shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out">
        <div className="flex gap-5 ml-10 py-16 items-center">
          <span className="text-4xl p-5 bg-white rounded-full text-[#A6207D]">
            <TbReportMoney></TbReportMoney>
          </span>
          <div className="flex flex-col gap-1">
            <h2 className="text-xl text-white">Total Income</h2>
            <h1 className="text-4xl font-bold text-white">500$</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeCardV1;
