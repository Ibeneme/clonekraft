import React from "react";
import NewNavbar from "./Navbar/Navbar";
import HeroSection from "./Hero/HeroSection";
import OurService from "./OurService/OurService";
import RoomGrid from "./OurService/RoomGrid";
import CloneKraftSection from "./OurService/CloneKraftSection";
import exampleImage from "../../assets/clonekraft.png";
import musk from "../../assets/musk.png";
import aliens from "../../assets/aliens.png";

const IndexNewLandingPage = () => {
  return (
    <div>
      <NewNavbar />
      <HeroSection />
      <OurService />
      <RoomGrid />
      <CloneKraftSection
        direction="row" // Can be row, row-reverse, column, column-reverse
        headerText="CLONEKRAFT"
        paragraphText="Have a design? Upload it to Clonekraft, and we’ll clone it for less—flawless quality, tailored to your style, and done without limits."
        buttonText="Learn More"
        imageSrc={exampleImage}
      />
      <CloneKraftSection
        direction="row-reverse" // Can be row, row-reverse, column, column-reverse
        headerText="Legacy of Legend"
        paragraphText="Where design transcends time. Every piece in this collection immortalizes icons and champions, merging art and history into unparalleled masterpieces. Embrace the legacy; own a legend"
        buttonText="Learn More"
        imageSrc={musk}
      />
      <CloneKraftSection
        direction="row" // Can be row, row-reverse, column, column-reverse
        headerText="Sign up and Enjoy using CloneKraft now!"
        paragraphText="Sign up and Enjoy using CloneKraft now!"
        buttonText="Sign Up"
        imageSrc={aliens}
      />
    </div>
  );
};

export default IndexNewLandingPage;
