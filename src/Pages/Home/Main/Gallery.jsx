import React from "react";
import GallerySectionI from "./DeliverySectionI";
import GallerySection from "./DeliverySection";
import GallerySectionIi from "./DeliverySectionII";
import GallerSectionIV from "./DeliverySectionIV";
import WelcomeSectionII from "./WelcomeScreenII";

const Gallery = () => {
  return (
    <div style={{ backgroundColor: "#fff" }}>
      <section style={{}}>
        <section>
          <GallerySection />
          <div className="hide-this">
            <GallerySectionIi />
            <WelcomeSectionII />
            <GallerSectionIV />
          </div>
          <WelcomeSectionII />
          <GallerySectionI />
        </section>
      </section>
    </div>
  );
};

export default Gallery;
