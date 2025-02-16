import React from "react";
import ImageGridHero from "./ImageGridHero";

const CollectionsIndex = () => {
  return (
    <div>
      <div className="collections-container">
        <h2 className="collections-title">What's Clonekraft?</h2>
        <p className="collections-description">
          Have a design that you’ve been dreaming of or a unique piece that
          you’ve sketched yourself? At Clonekraft, we bring your ideas to life
          with unparalleled precision and craftsmanship. Our platform allows you
          to upload your design, and our team of skilled artisans will replicate
          it with flawless accuracy, maintaining the highest standards of
          quality and affordability. From custom furniture to intricate home
          decor, Clonekraft ensures that your vision is realized exactly as you
          imagined it, combining state-of-the-art technology with expert
          craftsmanship to deliver products that are not only beautiful but also
          built to last.
        </p>
      </div>
      <ImageGridHero />
    </div>
  );
};

export default CollectionsIndex;
