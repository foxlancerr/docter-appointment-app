import HomeLayout from "@/components/HomeLayout";
import React from "react";
import { MdSelfImprovement } from "react-icons/md";
import { RiCustomerService2Fill } from "react-icons/ri";
import { FcCustomerSupport } from "react-icons/fc";

function About() {
  return (
    <HomeLayout>
      <div className="py-10 container mx-auto">
        <div>
          <h2 className="text-center text-4xl font-bold text-[#023e7d]">
            About us
          </h2>
          <p className="mb-16 font-light text-center text-gray-500">
            Doctorz Quantitative Overview
          </p>

          <p className="mb-4 text-center text-gray-500">
            Founded in 2024, with a footprint spanning across Pakistan, Specaily
            for Peshawarss.
          </p>
        </div>
        <div className="flex justify-center items-center w-full gap-5">
          <div className="flex flex-col justify-center p-5 gap-1 bg-slate-100 rounded-lg items-center w-[280px] h-[200px]">
            <h2 className="text-4xl font-bold text-[#023e7d]">3000+</h2>
            <p className="text-2xl text-gray-500">Doctors and growing !</p>
          </div>
          <div className="flex flex-col justify-center p-5 gap-1 bg-[#023e7d] text-white rounded-lg items-center w-[280px] h-[200px] ">
            <h2 className="text-4xl font-bold">300+</h2>
            <p className=" text-2xl">Client</p>
          </div>
          <div className="flex flex-col justify-center p-5 gap-1 bg-slate-100 rounded-lg items-center w-[280px] h-[200px] ">
            <h2 className="text-4xl font-bold text-[#023e7d]">200+</h2>
            <p className=" text-2xl text-gray-500">Positive Reviews</p>
          </div>
        </div>
        <div className="flex gap-10 items-center mt-24">
          <div className="flex-1 bg-slate-100/60 p-10 border-l-8 border-l-[#023e7d]">
            <h2 className="font-bold text-2xl text-[#023e7d]">Our Vision</h2>
            <p className=" text-gray-500 mt-3 text-sm">
              Empower healthcare enterprises to deliver exceptional healthcare
              services and enhance patient care worldwide through the
              utilization of advanced technology.
            </p>
          </div>
          <div className="flex-1 bg-slate-100/60 p-10 border-l-8 border-l-[#023e7d]">
            <h2 className="font-bold text-2xl text-[#023e7d]">Our Mission</h2>
            <p className="text-gray-500 mt-3 text-sm">
              Provide an affordable and secure healthcare platform for doctors,
              clinics, and hospitals, delivering exceptional value at a
              competitive price for optimized healthcare solutions.
            </p>
          </div>
        </div>
        <div className="flex flex-col my-24">
          <div className="flex flex-col gap-5">
            <h2 className="text-center text-4xl font-bold text-[#023e7d]">
              Values
            </h2>
            <p className="mb-16 font-light text-center text-gray-500 w-[60%] mx-auto">
              Our core values shape our identity and serve as a stabilizing
              force during challenging times. Our organizational culture
              prioritizes customer focus, ongoing enhancement, and dedicated
              customer service.
            </p>
          </div>

          <div className="grid grid-cols-2 grid-rows-2 gap-10 rounded-lg">
            <div className="row-span-2 flex flex-col justify-center items-center rounded-lg text-white bg-[#023e7d]">
              <span className="text-8xl">
                <FcCustomerSupport />
              </span>
              <h2 className="font-bold text-2xl">Customer Focus</h2>
              <p className=" mt-3 text-sm text-center w-[90%]">
                Doctorz in both meeting customer expectations and leading the
                market in product features by actively listening to customer
                feedback and rapidly evolving our offerings.
              </p>
            </div>
            <div className="flex flex-col justify-center items-center bg-slate-100/60 p-10">
              <span className="text-8xl">
                <MdSelfImprovement />
              </span>
              <h2 className="font-bold text-2xl text-[#023e7d]">
                Continuous Improvement
              </h2>
              <p className=" text-gray-500 mt-3 text-sm text-center w-[90%]">
                Our commitment to quality is an ongoing journey, as we
                persistently strive to provide features that effortlessly meet
                the requirements of our customers.
              </p>
            </div>
            <div className=" flex flex-col justify-center items-center bg-slate-100/60 p-10">
              <span className="text-8xl">
                <RiCustomerService2Fill />
              </span>
              <h2 className="font-bold text-2xl text-[#023e7d]">
                Customer service
              </h2>
              <p className=" text-gray-500 mt-3 text-sm text-center w-[90%]">
                Our dedicated commitment to customer service not only delights
                our customers but also fuels their eagerness to refer our
                services to others with enthusiasm.
              </p>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default About;
