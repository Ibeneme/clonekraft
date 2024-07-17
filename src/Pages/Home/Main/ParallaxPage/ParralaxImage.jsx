import React, { useRef, useEffect } from "react";
import imagea from "../../../../assets/Sofa/Framea.png";
import imageb from "../../../../assets/Sofa/Frameb.png";
import imaged from "../../../../assets/Sofa/Framed.png";
import imagee from "../../../../assets/Sofa/Framee.png";
import "./ParallaxImages.css"; // Ensure correct path to your CSS file
import heroImage from "../../../../assets/Sofa/Sofa08.png";

const ParallaxImages = () => {
  // Ref to the parallax container
  const parallaxRef = useRef(null);

  // Function to handle scroll event
  const handleScroll = () => {
    if (parallaxRef.current) {
      const scrollTop = window.scrollY;
      const parallaxOffset = parallaxRef.current.offsetTop;
      const parallaxEffect = scrollTop - parallaxOffset;

      // Apply parallax effect to the images
      const parallaxElements =
        parallaxRef.current.querySelectorAll(".parallax-image");
      parallaxElements.forEach((element) => {
        element.style.transform = `translateY(${parallaxEffect * 0.4}px)`;
      });
    }
  };

  // Add scroll event listener on mount
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="parallax-images">
      <section ref={parallaxRef} className="parallax-section">
        <div className="image-grid">
          <div
            className="parallax-image"
            style={{ backgroundImage: `url(${imagea})` }}
          ></div>
          <div
            className="parallax-image"
            style={{ backgroundImage: `url(${imageb})` }}
          ></div>
          <div
            className="parallax-image"
            style={{ backgroundImage: `url(${imaged})` }}
          ></div>
          <div
            className="parallax-image"
            style={{ backgroundImage: `url(${imagee})` }}
          ></div>
        </div>
      </section>
    </div>
  );
};

export default ParallaxImages;
