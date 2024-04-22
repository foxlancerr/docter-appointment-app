import React from "react";
import { Link } from "react-router-dom";


function HomeCard({ ClassName, title, tagline, Icon, route }) {
  return (
    <Link
      href={route}
      className={`cursor-pointer flex flex-col min-h-[240px] rounded-[14px] w-full p-6 items-start justify-between ${ClassName}`}
    >
      <span className="p-2 text-3xl rounded bg-white/70">
        <Icon></Icon>
      </span>

      <div className="flex flex-col gap-2 ">
        <h1 className="text-2xl font-extrabold max-sm:text-3xl">{title}</h1>
        <h2 className="text-xl font-normal max-sm:text-1xl">{tagline}</h2>
      </div>
    </Link>
  );
}

export default HomeCard;