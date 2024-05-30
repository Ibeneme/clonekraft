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
import NewHero from "./Hero/NewHero";
import NavbarNew from "./Hero/New/Navbar";
import Products from "./Hero/New/Products";
import Testimonials from "./Hero/Testimonials";
import TeamMembers from "./Hero/Team";

// import IndexNew from "./Hero/New/Index";

const Index = () => {
  return (
    <div style={{ section: "100vw" }}>
      {/* <NavbarNew /> */}
      {/* <IndexNew /> */}
      <TopLevel />
      <NewHero />
      <Products />
      <HeroPage />
      {/* <SectionI />
      <SectionII />
      <SectionIII /> 
      <SectionIV />*/}
      <Testimonials />
      <SectionVI />
      <TeamMembers />
      {/*     <ContactUs /> */}
      <Footer />
    </div>
  );
};

export default Index;
