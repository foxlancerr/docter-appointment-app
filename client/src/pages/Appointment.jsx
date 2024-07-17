import React from "react";
import Layout from "../components/dashboard/DashboardLayout";
import { FaUserLarge } from "react-icons/fa6";
import { MdVerifiedUser } from "react-icons/md";
import { FaHeartbeat } from "react-icons/fa";
import { IoStarOutline } from "react-icons/io5";
import { BiSolidMessageSquareDots } from "react-icons/bi";
import { FaBookMedical } from "react-icons/fa";

import { IoStar } from "react-icons/io5";

import { PiStarHalfBold } from "react-icons/pi";
import { IoLocationSharp } from "react-icons/io5";
import { Avator2 } from "@/../assets/index.js";


function Appointment() {
  const workingHours = [
    {
      key: 2,
      day: "Monday",
      time: "9:00AM - 5:00PM",
      openOffice: true,
    },
    {
      key: 3,
      day: "Tuesday",
      time: "9:00AM - 5:00PM",
      openOffice: true,
    },
    {
      key: 4,
      day: "Wednesday",
      time: "9:00AM - 5:00PM",
      openOffice: true,
    },
    {
      key: 5,
      day: "Thursday",
      time: "9:00AM - 5:00PM",
      openOffice: true,
    },
    {
      key: 6,
      day: "Friday",
      time: "9:00AM - 12:30PM",
      openOffice: true,
    },
    {
      key: 7,
      day: "Saturday",
      time: "9:00AM - 2:00PM",
      openOffice: false,
    },
    {
      key: 1,
      day: "Sunday",
      time: "3:00PM - 6:00PM",
      openOffice: false,
    },
  ];
  return (
    <Layout>
      <h1 className="text-3xl font-semibold pb-2 border-b-2 mb-10">
        Book Appointment
      </h1>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-10">
        <div className="flex items-start mt-3 flex-col gap-3 w-full">
          <div className="flex justify-start items-center gap-5 border-b-2 pb-5 w-full">
            <div className="relative">
              <div className="w-[100px] h-[100px] rounded-full bg-slate-400 overflow-hidden">
                <img
                  src={Avator2}
                  className="object-cover object-top"
                  alt="avotor1"
                />
              </div>
              <span className="absolute bottom-0 right-0 text-3xl  rounded-full text-green-500">
                <MdVerifiedUser></MdVerifiedUser>
              </span>
            </div>

            <div className="flex flex-col">
              <h1 className="text-2xl font-extrabold">Dr. Johny Wilson</h1>
              <h3>Dentist</h3>
              <p className="flex items-center mt-2 text-black-100 gap-1">
                <span className="text-xl">
                  <IoLocationSharp></IoLocationSharp>
                </span>{" "}
                NewYork, United States
              </p>
            </div>
          </div>

          <div>
            <h1 className="text-xl underline italic font-semibold">About</h1>
            <p className="text-[15px] leading-5 text-black-200">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Reprehenderit odio magnam cum adipisci corporis? Sapiente a
              excepturi commodi,
            </p>
          </div>
          <div className="grid grid-cols-4 w-full">
            <IconCard
              title="7500+"
              sub_title="Patient"
              Icon={FaUserLarge}
              classNames="bg-blue-600 text-white"
            ></IconCard>
            <IconCard
              title="10+"
              sub_title="Experience"
              Icon={FaBookMedical}
              classNames="bg-slate-600 text-white"
            ></IconCard>
            <IconCard
              title="3.7"
              sub_title="rating"
              Icon={IoStar}
              classNames="bg-orange-600 text-white"
            ></IconCard>
            <IconCard
              title="1k+"
              sub_title="review"
              Icon={BiSolidMessageSquareDots}
              classNames="bg-green-600 text-white"
            ></IconCard>
          </div>
        </div>

        <div className="bg-blue-">
          <div className="p-5 rounded-[10px] bg-white-200">
            <h1 className="text-xl underline mb-2 italic font-semibold">
              Working Hours
            </h1>
            {workingHours.map((work) => (
              <div
                key={work.key}
                className="flex mb-1 justify-between items-center"
              >
                <p className="text-black-100 text-[1.2rem] w-[50%] relative">
                  {work.day}
                  {!work.openOffice && (
                    <span className="absolute text-[12px] left-16 -top-1 text-red-600 font-bold">
                      Half Day
                    </span>
                  )}
                </p>
                <p className="text-[1.2rem] text-black-300 font-bold">
                  {work.time}
                </p>
              </div>
            ))}
          </div>
          <button
            className="bg-blue-800 rounded-full text-center text-2xl mt-7 w-full py-3 px-6 text-white mr-[2%]"
            type="submit"
          >
            Book Appointment
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default Appointment;

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
