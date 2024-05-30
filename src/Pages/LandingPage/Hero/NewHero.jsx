// src/components/NewHero.js

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./NewHero.css";
import imagea from "../../../assets/Sofa/Framea.png";
import imageb from "../../../assets/Sofa/Frameb.png";
import imaged from "../../../assets/Sofa/Framed.png";
import imagee from "../../../assets/Sofa/Framee.png";
const NewHero = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
  };

  const slides = [
    { id: 1, image: imagea, text: "Furniture Replicas" },
    { id: 2, image: imageb, text: "Couch Replicas" },
    { id: 2, image: imagee, text: "Cabinet Replicas" },
    { id: 3, image: imaged, text: "Sofa Replicas" },
  ];

  return (
    <div
      className="hero"
      style={
        {
          // paddingTop: 120,
          // paddingBottom: 120,
          // width: "100vw",
        }
      }
    >
      <Slider {...settings}>
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="slide"
            //style={{ paddingLeft: 32, paddingRight: 32, }}
          >
            <img src={slide.image} alt={`Slide ${slide.id}`} />
            <h3 className="slide-text">{slide.text}</h3>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default NewHero;
