import React, { useEffect, useState } from "react";
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

  const [timeRemaining, setTimeRemaining] = useState("");

  useEffect(() => {
    const countdown = setInterval(() => {
      const now = new Date();
      const targetTime = new Date();
      targetTime.setHours(15, 0, 0, 0); // Set target time to 12:00 PM

      if (now > targetTime) {
        targetTime.setDate(targetTime.getDate() + 1); // Set target to next day if current time is past 12:00 PM
      }

      const diff = targetTime - now;
      const hours = Math.floor(diff / 1000 / 60 / 60);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeRemaining(
        `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
      );
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  return (
    <div className="hero">
      {/* <div className="countdown-timer">
        <p>
          <span style={{ color: "var(--darkOrange)" }}></span>{" "}
          launches in{" "}
          <span style={{ color: "var(--darkOrange)" }}>{timeRemaining}</span>{" "}
          🎉🥂
        </p>
      </div> */}
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id} className="slide">
            <img src={slide.image} alt={`Slide ${slide.id}`} />
            <h3 className="slide-text">{slide.text}</h3>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default NewHero;
