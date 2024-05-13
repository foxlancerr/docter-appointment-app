import React from "react";
import { BgHeroImage } from "../../assets/index";

function HomeHero() {
  const now = new Date();

  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const date = new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(
    now
  );
  return (
    <section
      className="w-full h-[290px] max-sm:h-[250px] rounded-[20px] max-sm:rounded p-8 max-sm:p-5 flex flex-col justify-between items-end  bg-cover bg-left shadow shadow-black/60 relative overflow-hidden"
      style={{ backgroundImage: `url(${BgHeroImage})` }}
    >
        <div className=" absolute top-0 left-0 w-full h-full bg-black/70 z-2"></div>
      <h2 className="py-2 px-3 bg-white/15 rounded text-xl max-sm:text-[16px] z-20 text-white font-bold  bg-blue-700">
        Upcoming Meeting at: 12:30 PM
      </h2>
      <div className="flex flex-col flex-end text-white z-20">
        <h1 className="text-5xl font-extrabold max-sm:text-4xl">{time}</h1>
        <p className="text-[21px] mt-2 max-sm:text-[15px] max-sm:mt-0">
          {date}
        </p>
      </div>
    </section>
  );
}

export default HomeHero;
