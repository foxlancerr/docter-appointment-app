import React from "react";
import Header from "./Header";
import HomeHero from "../dashboard/HomeHero";
import FeatureSection from "./feature";
import Footer from "./Footer";
import ServicesGrid from "../shared/ServiceBox";
import FaqAccordion from "./faqs";
import HomeLayout from "../HomeLayout";
function HomePage() {
  return (
    <HomeLayout>
      <div className="p-10 mx-auto">
        <HomeHero></HomeHero>
      </div>
      <ServicesGrid></ServicesGrid>
      <FeatureSection></FeatureSection>
      <FaqAccordion></FaqAccordion>
    </HomeLayout>
  );
}

export default HomePage;
