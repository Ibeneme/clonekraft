import React from "react";
import HeroPage from "./Hero/Hero";
import SectionI from "./Hero/SectionI";
import SectionII from "./Hero/SectionII";
import SectionIII from "./Hero/SectionIII";
import SectionIV from "./Hero/SectionIV";
import SectionVI from "./Hero/SectionVI";
// import ContactUs from "./Hero/Contact";
import Footer from "./Hero/Footer";
import TopLevel from "./Navbar/Navbar";

const Index = () => {
  return (
    <div style={{ section: "100vw" }}>
      <TopLevel />
      <HeroPage />
      <SectionI />
      <SectionII />
      <SectionIII />
      <SectionIV />
      <SectionVI />
      {/* <ContactUs /> */}
      <Footer />
    </div>
  );
};

export default Index;
