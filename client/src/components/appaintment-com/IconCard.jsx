import React from "react";
import { FaUserLarge } from "react-icons/fa6";

function IconCard({ title, sub_title, Icon, classNames }) {
  return (
    <div className={`flex flex-col items-center mt-5`}>
      <span
        className={` flex justify-center items-center p-4 rounded-full shrink-0 ${classNames} mb-3`}
      >
        <Icon className="text-[1.5rem]"></Icon>
      </span>
      <div className="flex flex-col w-full items-center">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="text-[16px]">{sub_title}</p>
      </div>
    </div>
  );
}

export default IconCard;
