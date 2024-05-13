import React from "react";
import { FaUserLarge } from "react-icons/fa6";

function IconCard({ title, sub_title, Icon }) {
  return (
    <div className="flex flex-col gap-2 items-center">
      <span className=" flex justify-center items-center p-4  bg-blue-500 text-white rounded-full shrink-0">
        <Icon className="text-[20px]"></Icon>
      </span>
      <div className="flex flex-col w-full items-center">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="text-[16px]">{sub_title}</p>
      </div>
    </div>
  );
}

export default IconCard;
