import React, { useRef, useEffect } from "react";
import sampleImageOne from "../../../assets/landingpage/sampletwo.jpg";
import "./Hero.css";
import { useNavigate } from "react-router-dom";

const SectionI = () => {
  const imageContainerRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      if (imageContainerRef.current) {
        imageContainerRef.current.scrollTop += 2;
        if (
          imageContainerRef.current.scrollTop >=
          imageContainerRef.current.scrollHeight -
            imageContainerRef.current.clientHeight
        ) {
          imageContainerRef.current.scrollTop = 0;
        }
      }
    }, 20);
    return () => clearInterval(interval);
  }, []);


  const handleClick = () => {
    // Check if the token exists in localStorage
    const token = localStorage.getItem("clone_kraft_user_token");

    if (token) {
      // If the token exists, redirect to the /home page
      navigate("/home");
    } else {
      // If the token does not exist, redirect to the /login page
      navigate("/login");
    }
  };


  return (
    <div style={{ minHeight: "80vh", margin: 0 }}>
      <div className="hero-flexx">
        <div data-aos="zoom-in" style={{ padding: 16, width: "50%" }}>
          <h1
            style={{
              color: "#000",
              marginBottom: 0,
              fontSize: "3rem",
            }}
          >
            We are CloneKraft
          </h1>
          <p
            style={{
              color: "#808080",
              fontSize: "1.1rem",
              marginBottom: "2rem",
            }}
          >
            From refined elegance to striking originality, each creation is
            meticulously crafted with a focus on high-quality materials and an
            unwavering attention to detail. Step into our world of endless
            possibilities, where every curve, texture, and hue tells a unique
            story waiting to be discovered.
          </p>
          <div data-aos="zoom-in" style={{ alignContent: "flex-start" }}>
            <div
              style={{
                flexDirection: "column",
              }}
              onClick={handleClick}
            >
              <div
                className="div-btn-auth"
                style={{
                  backgroundColor: "#C19F6265",
                  height: 50,
                  marginLeft: 12,
                }}
              ></div>
              <button
                onClick={handleClick}
                className="btn-auth"
                style={{
                  marginTop: -14,
                  height: 55,
                  backgroundColor: "#C19F62",
                }}
                type="submit"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 120, width: "50%" }} data-aos="zoom-in">
          <div
            className="scrollingImages"
            ref={imageContainerRef}
            style={{ overflowY: "hidden", height: "500px", padding: 16 }}
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

export default SectionI;
