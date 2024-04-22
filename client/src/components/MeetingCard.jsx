import React from "react";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { IoCopyOutline } from "react-icons/io5";
import { avatorImages } from "../constants";

function MeetingCard() {
  return (
    <section className="bg-black/80 text-white min-h-[258px] w-full rounded-[10px] p-6 flex flex-col justify-between">
      <article className="flex flex-col justify-start gap-2">
        <IoCalendarNumberOutline className="text-4xl"></IoCalendarNumberOutline>
        <h1 className="text-2xl font-bold">
          Team Sync: Sprint Planning & Updates
        </h1>
        <h3 className="text-xl">
          March 15, 2024 - <span>10.00AM</span>{" "}
        </h3>
      </article>
      <article className="relative">
        <div className="relative flex">
          {avatorImages.slice(0, 3).map((img, index) => (
            <img
              src={img}
              alt="img"
              key={index}
              width={35}
              height={35}
              className="object-cover absolute rounded-full"
              style={{
                top: 2,
                left: index * 28,
              }}
            ></img>
          ))}
          <div
            className="absolute w-[40px] h-[40px] bg-black flex justify-center items-center rounded-full"
            style={{
              top: 0,
              left: 3 * 28,
            }}
          >
            +{avatorImages.length - 3}
          </div>
        </div>
        <div className="flex gap-3 items-center justify-end">
          <button className="bg-blue-1 px-4 py-2 bg-blue-500 rounded text-white">Start</button>
          <button className="bg-white/15 flex items-center px-4 py-2 rounded text-black bg-gray-200">
            <span className="mr-2 ">
              <IoCopyOutline></IoCopyOutline>
            </span>
            Copy Invitation
          </button>
        </div>
      </article>
    </section>
  );
}

export default MeetingCard;
