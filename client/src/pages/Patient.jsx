import React from "react";
import Layout from "../components/dashboard/DashboardLayout";
import Table from "../components/Table";
import MeetingCard from "../components/dashboard/MeetingCard";
import HomeCard from "../components/dashboard/HomeCard";
import { patientHero } from "../constants";
import BasicTable from "@/components/shared/BasicTable";

function Patient() {
  return (
    <Layout>
      <section className="grid xl:grid-cols-3 gap-10 max-sm:grid-cols-1 md:grid-cols-2 mb-10">
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
      <BasicTable></BasicTable>
    </Layout>
  );
}

export default Patient;
