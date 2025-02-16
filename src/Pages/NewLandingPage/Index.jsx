import React from "react";
import NewNavbar from "./Navbar/Navbar";
import HeroSection from "./Hero/HeroSection";
import OurService from "./OurService/OurService";
import RoomGrid from "./OurService/RoomGrid";
import CloneKraftSection from "./OurService/CloneKraftSection";
import exampleImage from "../../assets/clonekraft.png";
import musk from "../../assets/musk.png";
import aliens from "../../assets/aliens.png";
import StepsToGetStarted from "./Hero/StepsToGetStarted";
import CollectionsIndex from "./Hero/CollectionsIndex";
import FAQPage from "./Hero/FAQPage";

const IndexNewLandingPage = () => {
  return (
    <div>
      <NewNavbar />
      <HeroSection />
      <StepsToGetStarted />
      <CollectionsIndex />
      <FAQPage />
    </div>
  );
};

export default IndexNewLandingPage;
