import React from "react";
import "./ImageGridHero.css";
import step1Image from "../../../assets/Sofa/Framea.png"; // Replace with your actual image path
import step2Image from "../../../assets/Sofa/Framee.png"; // Replace with your actual image path
import step3Image from "../../../assets/Sofa/Framed.png";

import step3Images from "../../../assets/landingpage/samople3.jpg";
import step4Images from "../../../assets/landingpage/sampletwo.jpg";
import step5Images from "../../../assets/Sofa/Slides.png";
import step9Images from "../../../assets/Sofa/usec.png";

import step6Images from "../../../assets/Sofa/Slides02.png";

import step7Images from "../../../assets/Sofa/Sof.png";

import step8Images from "../../../assets/Sofa/Sofa08.png";
import step10Images from "../../../assets/Sofa/used.png";
import step11Images from "../../../assets/Sofa/usee.png";
const images = [
  step1Image,
  step6Images,
  step2Image,

  step7Images,
  step3Images,
  step4Images,

  step10Images,
  step3Image,
  step9Images,
  step11Images,
];

const ImageGridHero: React.FC = () => {
  return (
    <div className="image-grid-container-hero">
      {images.map((src, index) => (
        <div key={index} className="image-item-hero">
          <img src={src} alt={`grid-img-hero${index}`} />
        </div>
      ))}
    </div>
  );
};

export default ImageGridHero;
