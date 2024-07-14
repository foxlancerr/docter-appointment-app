import React from "react";
import Footer from "./Footer";
import FaqsAccordian from "./faqs";
import FeatureSection from "./feature";
import Header from "./Header";
import HomeHero from "../HomeHero";
function HomePage() {
  return (
    <div>
      <Header></Header>
      <div className="p-10 mx-auto">
        <HomeHero></HomeHero>
      </div>
      <main>
        <FeatureSection></FeatureSection>
        <FaqsAccordian></FaqsAccordian>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default HomePage;
