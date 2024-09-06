import { useEffect, useState } from "react";
import { DashboardHeroImage } from "../../../assets/index";

function HomeHero() {
  const [dateAndTime, setDateAndTime] = useState({
    time: "12:00:00",
    date: "05-01-2024",
  });
  const updateDateAndTime = () => {
    const now = new Date();
    const time = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const date = new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(
      now
    );
    setDateAndTime({ date, time });
  };

  useEffect(() => {
    setTimeout(() => {
      updateDateAndTime();
    }, 1000);
  });
  return (
    <section

      className="h-[320px] max-sm:h-[250px] rounded-[20px] bg-red-300 max-sm:rounded p-8 max-sm:p-5 flex items-end justify-start  bg-cover bg-center shadow shadow-[#023e7d]/30 relative overflow-hidden"
      style={{ backgroundImage: `url(${DashboardHeroImage})` }}
    >
      <div>
        <div className=" absolute top-0 left-0 h-full bg-[#023e7d]/30 z-1"></div>
        <h1 className="text-white text-2xl md:text-3xl z-20">
          <span className="font-bold text-6xl text-[#023E7D]"> Consult</span>{" "}
          Top Doctors Online <br></br> For Any Health Concern
        </h1>
        <div className=" z-20 flex flex-col justify-between h-full">
          <h2 className="py-2 px-2 bg-[#023E7D]/35 w-max text-center rounded max-sm:text-[16px] my-2 text-white font-bold text-base  bg-blue-700">
            Upcoming Meeting at: 12:30 PM
          </h2>
          <div className="flex flex-col flex-end text-white z-20">
            <h1 className="text-2xl font-bold md:text-5xl">
              {dateAndTime.time}
            </h1>
            <p className="text-base mt-2 md:text-xl max-sm:mt-0">
              {dateAndTime.date}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeHero;
