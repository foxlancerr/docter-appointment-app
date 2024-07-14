import React from "react";
import { Link } from "react-router-dom";
import { MdDescription, MdVerifiedUser } from "react-icons/md";
import { FaFacebookF } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import AppStoreBadge from "../../../../assets/icons/app-store-apple.svg";
import GooglePlayBadge from "../../../../assets/icons/google-play-badge.svg";
const Footer = () => {
  // Example data for footer sections
  const footerSections = [
    {
      title: "About Us",
      items: ["Mission", "Vision", "Team", "Careers"],
    },
    {
      title: "Services",
      items: ["Book Appointment", "Medical Records", "Healthcare Services"],
    },
  ];

  const rulesRegulation = [
    {
        id: 7,
        url: "/faqs",
        content: "FAQs",
      },
  
      {
        id: 13,
        url: "/help",
        content: "Help",
      },
   
   
    {
      id: 1,
      url: "/privacy-policy",
      content: "Privacy Policy",
    },
    {
      id: 3,
      url: "/refund-policy",
      content: "Refund Policy",
    },

    {
      id: 6,
      url: "/terms-of-use",
      content: "Terms of Use",
    },
    {
        id: 4,
        url: "/payment-terms",
        content: "Payment Terms",
      },
    {
        id: 5,
        url: "/cancellations-policy",
        content: "Cancellations Policy",
      },
   
  ];

  const topSpecialities = [
    {
      id: 1,
      url: "/dermatologist",
      content: "Dermatologist",
    },
    {
      id: 2,
      url: "/neurologist",
      content: "Neurologist",
    },
    {
      id: 3,
      url: "/gynecologist",
      content: "Gynecologist",
    },
    {
      id: 4,
      url: "/urologist",
      content: "Urologist",
    },
    {
      id: 5,
      url: "/gastroenterologist",
      content: "Gastroenterologist",
    },
    {
      id: 6,
      url: "/pulmonologist",
      content: "Pulmonologist / Lung Specialist",
    },
    {
      id: 7,
      url: "/orthopedic-surgeon",
      content: "Orthopedic Surgeon",
    },
    {
      id: 8,
      url: "/pediatrician",
      content: "Pediatrician",
    },
    {
      id: 9,
      url: "/general-physician",
      content: "General Physician",
    },
  ];
  

  return (
    <>
      <footer className="top-footer bg-black/80 text-white p-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          <div className="col-start-1 col-end-3">
            <div className="mb-2 gap-4">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold">Doctors</h1>
              </div>
              <h1 className="text-sm mt-3 max-w-[90%]">
                Doctorz is Pakistan’s leading digital healthcare platform that
                brings you complete health facilities right to your doorstep.
                Order consultant top doctors online in Pakistan from our App
                right from the comfort of your home.
              </h1>
            </div>

            

            <div className="relative">
              <h1 className="absolute top-4 font-bold">Download the App</h1>
              <div className="flex gap-3">
                <img
                  src={GooglePlayBadge}
                  alt="googleplay-badge"
                  className="w-[160px] "
                />
                <img
                  src={AppStoreBadge}
                  alt="appstore-badge"
                  className="w-[160px] "
                />
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold mb-3">Rules & Regulation</h1>

            {rulesRegulation.map((item) => {
              return (
                <div className="flex flex-col gap-1" key={item.id}>
                  <Link to={item.url}>{item.content}</Link>
                </div>
              );
            })}
          </div>
          <div>
            <h1 className="text-xl font-bold mb-3">Top Specialities</h1>

            {topSpecialities.map((item) => {
              return (
                <div className="flex flex-col gap-1" key={item.id}>
                  <Link to={item.url}>{item.content}</Link>
                </div>
              );
            })}
          </div>
          
          <div>
            <h1 className="text-xl font-bold mb-3">CONTACT US</h1>
            <div className="flex flex-col">
              <Link to="">Tel: (021) 111-329-224</Link>
              <Link to="">Email: pharmacy@doctorz.pk</Link>
              <Link to="">AUP, Peshawar, Pakistan</Link>

              <div className="mt-6">
              <h1 className="font-bold mb-3 text-xl">Follow Us </h1>
              <div className="mt-2 flex gap-4">
                <Link
                  to=""
                  className="text-black p-2 bg-white rounded-md text-sm h-max"
                >
                  <FaFacebookF></FaFacebookF>
                </Link>
                <Link
                  to=""
                  className="text-black p-2 bg-white rounded-md text-sm h-max"
                >
                  <FaDiscord></FaDiscord>
                </Link>
                <Link
                  to=""
                  className="text-black p-2 bg-white rounded-md text-sm h-max"
                >
                  <FaLinkedinIn></FaLinkedinIn>
                </Link>
                <Link
                  to=""
                  className="text-black p-2 bg-white rounded-md text-sm h-max"
                >
                  <FaTwitter></FaTwitter>
                </Link>
                <Link
                  to=""
                  className="text-black p-2 bg-white rounded-md text-sm h-max"
                >
                  <FaYoutube></FaYoutube>
                </Link>
              </div>
            </div>
            </div>
          </div>
        </div>
      </footer>

      <footer className="bottom-footer p-5 bg-black/80 border-t-2 border-white-500">
        <div className="flex justify-center items-center flex-wrap gap-10">
          <p className="text-white text-sm">
            © 2024 Doctors, All Rights Reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
