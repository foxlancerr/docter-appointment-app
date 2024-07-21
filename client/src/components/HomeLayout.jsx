import React from "react";
import Header from "./landing-page/Header";
import Footer from "./landing-page/Footer";

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
