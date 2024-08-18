import React from "react";
import "./style.css";
const MarqueeNav = () => {
  return (
    <nav className="px-5 py-1  text-sm bg-red-600 flex justify-center items-center text-white font-semibold">
      <div className="marquee-container w-full">
        <div className="marquee-content">
          🗓️ Book your appointment now and get personalized care! 💙 Schedule
          your visit today and take the first step towards better health. 🌟
          Don't miss out on our special offers!
        </div>
      </div>
    </nav>
  );
};

export default MarqueeNav;
