import React from "react";
import Footer from "./landing-page/Footer";
import Header from "./landing-page/Header/index";

function HomeLayout({ children }) {
  return (
    <div>
      <Header></Header>
      <main className="py-10">{children}</main>
      <Footer></Footer>
    </div>
  );
}

export default HomeLayout;
