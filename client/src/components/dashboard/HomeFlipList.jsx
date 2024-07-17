import { homeCardLinks } from "../../constants";
import React from "react";
import HomeCard from "./HomeCard";
import MeetingCard from "./MeetingCard";


function HomeFlipList() {
  return (
    <>
      <section className="grid xl:grid-cols-4 gap-5 max-sm:grid-cols-1 md:grid-cols-2 mt-10">
        {homeCardLinks.map((item) => (
          <HomeCard
            key={item.title}
            ClassName={item.ClassName}
            tagline={item.tagline}
            title={item.title}
            route={item.route}
            Icon={item.Icon}
          ></HomeCard>
        ))}
      </section>
      <div className="flex justify-between items-center mt-10">
        <h1 className="text-4xl font-bold">Popular</h1>
        <p>See All</p>
      </div>
        <hr className="mt-3"/>
      <section className="grid xl:grid-cols-3 gap-x-6 gap-y-10 max-sm:grid-cols-1 md:grid-cols-2 mt-10">
        <MeetingCard></MeetingCard>
        <MeetingCard></MeetingCard>
        <MeetingCard></MeetingCard>
        <MeetingCard></MeetingCard>
        <MeetingCard></MeetingCard>
        <MeetingCard></MeetingCard>
        <MeetingCard></MeetingCard>
        <MeetingCard></MeetingCard>
        <MeetingCard></MeetingCard>
      </section>
    </>
  );
}

export default HomeFlipList;
