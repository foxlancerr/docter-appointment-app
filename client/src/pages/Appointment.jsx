import React from "react";
import Layout from "../components/Layout";
import { FaUserLarge } from "react-icons/fa6";
import { MdVerifiedUser } from "react-icons/md";
import { FaHeartbeat } from "react-icons/fa";
import { IoStarOutline } from "react-icons/io5";
import { BiSolidMessageSquareDots } from "react-icons/bi";
import { FaBookMedical } from "react-icons/fa";

import { IoStar } from "react-icons/io5";

import { PiStarHalfBold } from "react-icons/pi";
import { IoLocationSharp } from "react-icons/io5";
import IconCard from "../components/appaintment-com/IconCard";
import { Avator2 } from "../../assets/index";

function Appointment() {
  return (
    <Layout>
      <h1 className="text-3xl font-semibold">Book Appointment</h1>
      <div className="grid md:grid-cols-2 grid-cols-1">
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
          <div className="flex gap-5 justify-center w-full my-5">
            <IconCard
              title="7500+"
              sub_title="Patient"
              Icon={FaUserLarge}
            ></IconCard>
            <IconCard
              title="10+"
              sub_title="Experience"
              Icon={FaBookMedical}
            ></IconCard>
            <IconCard title="3.7" sub_title="rating" Icon={IoStar}></IconCard>
            <IconCard
              title="1k+"
              sub_title="review"
              Icon={BiSolidMessageSquareDots}
            ></IconCard>
          </div>
        </div>

        <div>
          <input type="date" name="date" id="date" />
        </div>
      </div>
    </Layout>
  );
}

export default Appointment;
