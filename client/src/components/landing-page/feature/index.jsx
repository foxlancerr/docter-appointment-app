import React from "react";
import { MdVerifiedUser } from "react-icons/md";

const FeatureFooter = [
  {
    id: 1,
    title: "PMC Verified Doctors",
    description: "Authentic & updated information",
  },
  {
    id: 2,
    title: "Money back guarantee",
    description: "We return money within 48 hours",
  },
  {
    id: 3,
    title: "15/7 customer support",
    description: "Well-trained & Supportive team",
  },
  {
    id: 4,
    title: "Secure online payment",
    description: "We possess SSL / Secure сertificate",
  },
];

function FeatureSection() {
  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-6 text-black">
        Why Doctorz?
      </h1>
      <footer className="bottom-footer py-10 px-5 bg-black">
        <div className="flex justify-center items-center flex-wrap gap-10">
          {FeatureFooter.map((feature) => (
            <div className="flex gap-4 items-center" key={feature.id}>
              <span className="text-white text-4xl ">
                <MdVerifiedUser className=""></MdVerifiedUser>
              </span>
              <div>
                <h2 className="text-xl font-semibold mb-1 text-white">
                  {feature.title}
                </h2>
                <p className="text-[16px] text-white">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </footer>
    </>
  );
}

export default FeatureSection;
