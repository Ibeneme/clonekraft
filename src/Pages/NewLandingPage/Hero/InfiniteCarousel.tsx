import React from "react";
import wood from "../../../assets/Sofa/Framea.png";
import a from "../../../assets/Sofa/Frameb.png";
import c from "../../../assets/Sofa/Framed.png";
import d from "../../../assets/Sofa/Framee.png";
import "./InfiniteCarousel.css";

const images = [
  {
    src: wood,
    title: "Design Innovation",
    text: "Pushing creative boundaries. Combining art and science to redefine design. Every piece is a masterpiece.",
  },
  {
    src: a,
    title: "AI & Tech",
    text: "Blending AI with carpentry. Harnessing technology to craft perfection. Bringing smart solutions to your home.",
  },
  {
    src: c,
    title: "Handcrafted Precision",
    text: "Expert carpentry meets automation. Precision and quality at every step. Artisanship elevated by cutting-edge tech.",
  },
  {
    src: d,
    title: "Future of Design",
    text: "Revolutionizing the industry. Sustainable, innovative, and built to last. The future of design starts today.",
  },
];

const InfiniteCarousel: React.FC = () => {
  return (
    <div className="carousel-container">
      <div className="carousel-track">
        {[...images, ...images].map((item, index) => (
          <div key={index} className="carousel-card">
            <div className="carousel-image-container">
              <img
                src={item.src}
                alt={`carousel-img-${index}`}
                className="carousel-image"
              />
              <div className="carousel-info">
                <h3 className="carousel-title">{item.title}</h3>
                <p className="carousel-text">{item.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfiniteCarousel;
