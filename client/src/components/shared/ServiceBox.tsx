import React from "react";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const ServiceBox = ({
  href,
  bgColor,
  image_url,
  heading,
  description,
  buttonLabel,
  buttonColor,
}) => {
  return (
    <div className="col-span-1 mt-">
      <Link to={href} className="line-height-0  ">
        <div
          className={`flex flex-col items-start justify-start p-5 rounded-md relative h-[150px] ${bgColor} overflow-hidden`}
        >
          <h1 className="text-black font-semibold text-xl">{heading}</h1>
          <p className="text-black">{description}</p>
          <button
            className={`btn border-none px-4 py-2 mt-3 text-white text-sm rounded-md font-semibold flex justify-center ${buttonColor}`}
          >
            {buttonLabel}
          </button>
          <div className="text-right h-full">
            <img
              src={image_url}
              className="absolute pt-2 pl-4 -right-2 bottom-0"
              style={{ width: "50%" }}
              alt="Service"
            />
          </div>
        </div>
      </Link>
    </div>
  );
};

const services = [
  {
    href: "",
    bgColor: "bg-orange-100",
    image_url: "https://static-media.dawaai.pk/img/desktop-rx.png",
    heading: "Have a prescription?",
    description: "Upload prescription and we will create your order!",
    buttonLabel: "Order Now",
    buttonColor: "bg-orange-500",
  },
  {
    href: "",
    bgColor: "bg-green-100",
    image_url: "https://static-media.dawaai.pk/img/consultation2.png",
    heading: "Doctor Consultation",
    description: "Speak to Specialists",
    buttonLabel: "Book Now",
    buttonColor: "bg-green-500",
  },
  {
    href: "",
    bgColor: "bg-blue-100",
    image_url: "https://static-media.dawaai.pk/img/homeservice2.png",
    heading: "Home Services",
    description: "At home Services",
    buttonLabel: "Book Now",
    buttonColor: "bg-blue-500",
  },
  {
    href: "",
    bgColor: "bg-purple-100",
    image_url: "https://static-media.dawaai.pk/img/home-labtest.png",
    heading: "Lab Tests & Checkups",
    description: "Lab at home",
    buttonLabel: "Book Now",
    buttonColor: "bg-purple-500",
  },
];

const ServicesGrid = () => {
  return (
    <div className="container mx-auto p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {services.reverse().map((service, index) => (
        <ServiceBox key={index} {...service} />
      ))}
    </div>
  );
};

export default ServicesGrid;
