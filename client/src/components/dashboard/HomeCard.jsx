import React from "react";
import { Link } from "react-router-dom";

function HomeCard({ className, title, tagline, Icon, route }) {
  return (
    <Link
      to={route} // Changed href to 'to' for React Router's Link
      className={`cursor-pointer flex flex-col min-h-[220px] rounded-[14px] w-full p-6 items-start justify-between bg-gradient-to-r from-[#347B93]  to-[#0a546d] text-white hover:shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out ${className}`}
    >
      <span className="p-2 text-3xl rounded">
        <Icon />
      </span>

      <div className="flex flex-col mt-4">
        <h1 className="text-2xl font-extrabold max-sm:text-3xl">
          {title}
        </h1>
        <h2 className="text-xl font-normal max-sm:text-lg text-blue-200 mt-2">
          {tagline}
        </h2>
      </div>
    </Link>
  );
}

export default HomeCard;
