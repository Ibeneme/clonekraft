import React, { useRef, useEffect } from "react";
import "../../LandingPage/Hero/Hero.css";
//import { useNavigate } from "react-router-dom";

const GallerSectionIV = () => {
  const imageContainerRef = useRef(null);
  const imageContainerRef2 = useRef(null);
  // const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      if (imageContainerRef.current) {
        imageContainerRef.current.scrollTop -= 1; // Change += to -= to scroll in the opposite direction
        if (
          imageContainerRef.current.scrollTop <= 0 // Update the condition for scrolling to top
        ) {
          imageContainerRef.current.scrollTop =
            imageContainerRef.current.scrollHeight -
            imageContainerRef.current.clientHeight; // Scroll to the bottom
        }
      }
    }, 1);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (imageContainerRef2.current) {
        imageContainerRef2.current.scrollTop += 3;
        if (
          imageContainerRef2.current.scrollTop >=
          imageContainerRef2.current.scrollHeight -
            imageContainerRef2.current.clientHeight
        ) {
          imageContainerRef2.current.scrollTop = 0;
        }
      }
    }, 10);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ minHeight: "120vh", margin: 0 }}>
      <div className="hero-flexx" style={{ gap: 0 }}>
        <div style={{ width: "50%" }} data-aos="zoom-in">
          <div
            className="scrollingImages"
            ref={imageContainerRef}
            style={{ overflowY: "hidden", height: "800px", padding: 16 }}
          >
            <img
              src="https://f005.backblazeb2.com/file/Webimages-used/Pexelss.png"
              alt="Sample Image 1"
              style={{
                marginBottom: "1rem",
                borderRaadius: 32,
                width: "100%",
                height: "auto",
              }}
            />
            <img
              src="https://res.cloudinary.com/daiiiiupy/image/upload/v1715427078/michael-oxendine-GHCVUtBECuY-unsplash_wuxwja.jpg"
              alt="Sample Image 2"
              style={{
                marginBottom: "1rem",
                borderRaadius: 32,
                width: "100%",
                height: "auto",
              }}
            />
            <img
              src="https://res.cloudinary.com/daiiiiupy/image/upload/v1715626430/IMG_8266_y1buyw.jpg"
              alt="Sample Image 3"
              style={{
                marginBottom: "1rem",
                borderRaadius: 32,
                width: "100%",
                height: "auto",
              }}
            />
            <img
              src="https://res.cloudinary.com/daiiiiupy/image/upload/v1715626430/IMG_8264_scfefo.jpg"
              alt="Sample Image 1"
              style={{
                marginBottom: "1rem",
                borderRaadius: 32,
                width: "100%",
                height: "auto",
              }}
            />
            <img
              src="https://res.cloudinary.com/daiiiiupy/image/upload/v1715627032/5919f0d917510a632268b369b6e61be4_-_Copy_mvoiyw.webp"
              alt="Sample Image 2"
              style={{
                marginBottom: "1rem",
                borderRaadius: 32,
                width: "100%",
                height: "auto",
              }}
            />
            <img
              src="https://res.cloudinary.com/daiiiiupy/image/upload/v1715427076/francesca-tosolini-Gh_UjjYoVwk-unsplash_vb28gq.jpg"
              alt="Sample Image 2"
              style={{
                marginBottom: "1rem",
                borderRaadius: 32,
                width: "100%",
                height: "auto",
              }}
            />
            <img
              src="https://res.cloudinary.com/daiiiiupy/image/upload/v1715427077/kam-idris-_HqHX3LBN18-unsplash_kosckn.jpg"
              alt="Sample Image 2"
              style={{
                marginBottom: "1rem",
                borderRaadius: 32,
                width: "100%",
                height: "auto",
              }}
            />
          </div>
        </div>
        <div style={{ width: "50%" }} data-aos="zoom-in">
          <div
            className="scrollingImages"
            ref={imageContainerRef2}
            style={{ overflowY: "hidden", height: "800px", padding: 16 }}
          >
            <img
              src="https://res.cloudinary.com/daiiiiupy/image/upload/v1715427077/kam-idris-_HqHX3LBN18-unsplash_kosckn.jpg"
              alt="Sample Image 1"
              style={{
                marginBottom: "1rem",
                borderRaadius: 32,
                width: "100%",
                height: "auto",
              }}
            />
            <img
              src="https://res.cloudinary.com/daiiiiupy/image/upload/v1715427078/kam-idris-nylcMEgK8EQ-unsplash_kn9ybd.jpg"
              alt="Sample Image 2"
              style={{
                marginBottom: "1rem",
                borderRaadius: 32,
                width: "100%",
                height: "auto",
              }}
            />
            <img
              src="https://res.cloudinary.com/daiiiiupy/image/upload/v1715427090/mitch-moondae-zXFtsdi9dIc-unsplash_htvl2q.jpg"
              alt="Sample Image 3"
              style={{
                marginBottom: "1rem",
                borderRaadius: 32,
                width: "100%",
                height: "auto",
              }}
            />
            <img
              src="https://res.cloudinary.com/daiiiiupy/image/upload/v1715427078/kam-idris-nylcMEgK8EQ-unsplash_kn9ybd.jpg"
              alt="Sample Image 1"
              style={{
                marginBottom: "1rem",
                borderRaadius: 32,
                width: "100%",
                height: "auto",
              }}
            />
            <img
              src="https://res.cloudinary.com/daiiiiupy/image/upload/v1715427079/jean-philippe-delberghe-F7b0y4JbEpc-unsplash_amqdxc.jpg"
              alt="Sample Image 2"
              style={{
                marginBottom: "1rem",
                borderRaadius: 32,
                width: "100%",
                height: "auto",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GallerSectionIV;
