import React from "react";
import ServicesCard from "./ServicesCard";
import HomeLayout from "@/components/HomeLayout";

const services = [
  {
    name: "Cancer Care",
    desc: "World-class care for everyone. Our health System offers unmatched, expert health care. From the lab to the clinic.",
    bgColor: "rgba(254, 182, 13, .2)",
    textColor: "#FEB60D",
  },
  {
    name: "Labor & Delivery",
    desc: "World-class care for everyone. Our health System offers unmatched, expert health care. From the lab to the clinic.",
    bgColor: "rgba(151, 113, 255, .2)",
    textColor: "#9771FF",
  },
  {
    name: "Heart & Vascular",
    desc: "World-class care for everyone. Our health System offers unmatched, expert health care. From the lab to the clinic.",
    bgColor: "rgba(1, 181, 197, .2)",
    textColor: "#01B5C5",
  },
  {
    name: "Mental Health",
    desc: "World-class care for everyone. Our health System offers unmatched, expert health care. From the lab to the clinic.",
    bgColor: "rgba(1, 181, 197, .2)",
    textColor: "#01B5C5",
  },
  {
    name: "Neurology",
    desc: "World-class care for everyone. Our health System offers unmatched, expert health care. From the lab to the clinic.",
    bgColor: "rgba(254, 182, 13, .2)",
    textColor: "#FEB60D",
  },
  {
    name: "Burn Treatment",
    desc: "World-class care for everyone. Our health System offers unmatched, expert health care. From the lab to the clinic.",
    bgColor: "rgba(151, 113, 255, .2)",
    textColor: "#9771FF",
  },
];

const ServicesList = () => {
  return (
    <HomeLayout>
      <div>
        <h2 className="text-center text-4xl font-bold text-gray-900">
          Our Services
        </h2>
        <p className="mb-10 lg:mb-12 font-light text-center text-gray-500">
          Just Pick up the affordable service you like.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-8 mt-8 lg:mt-14 px-10">
        {services.map((item, index) => (
          <ServicesCard item={item} index={index} key={index} />
        ))}
      </div>
    </HomeLayout>
  );
};

export default ServicesList;
