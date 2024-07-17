import React from "react";
import Layout from "../components/dashboard/DashboardLayout";
import Table from "../components/Table";
import MeetingCard from "../components/dashboard/MeetingCard";
import HomeCard from "../components/dashboard/HomeCard";
import { patientHero } from "../constants";

function Patient() {
  return (
    <Layout>
      <section className="grid xl:grid-cols-3 gap-5 max-sm:grid-cols-1 md:grid-cols-2 mb-10">
        {patientHero.map((item) => (
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
      <Table></Table>
    </Layout>
  );
}

export default Patient;
