import React from "react";
import "./Hero.css";
import { useNavigate } from "react-router-dom";

const SectionIII = () => {
  const navigate = useNavigate();
  return (
    <div className="hero" style={{ minHeight: "100vh" }}>
      <div className="hero-flexx">
        <div
          style={{ width: "100%", marginTop: 120, marginLeft: 16 }}
          data-aos="zoom-in"
        >
          <img
            src="https://res.cloudinary.com/daiiiiupy/image/upload/v1715427077/kam-idris-_HqHX3LBN18-unsplash_kosckn.jpg"
            alt="Sample Image 2"
            style={{
              marginBottom: "1rem",
              borderRadius: 32,
              width: "100%",
              height: "auto",
            }}
          />
        </div>

        <div
          data-aos="zoom-in"
          style={{
            alignItems: "flex-start",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",

            width: "100%",
          }}
        >
          <h1
            style={{
              color: "#000",
              marginBottom: 0,
              fontSize: "3rem",
              marginLeft: 16,
            }}
          >
            We are Designs
          </h1>
          <p
            style={{
              color: "#808080",
              fontSize: "1.1rem",
              marginBottom: "2rem",
              marginLeft: 16,
              //maxWidth: 500,
            }}
          >
            From sleek minimalist designs to bold statement pieces, each
            creation is meticulously crafted with an emphasis on quality
            materials and attention to detail. Step into our world of endless
            possibilities, where every curve, every texture, and every hue tells
            a story waiting to be discovered.
          </p>
          <div
            data-aos="zoom-in"
            style={{ alignContent: "flex-start", margin: `48px 16px` }}
          >
            <div
              style={{
                //marginTop: 32,
                flexDirection: "column",
              }}
              onClick={() => navigate("/")}
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
           onClick={() => navigate("/home")}
                className="btn-auth"
                style={{
                  marginTop: -14,
                  height: 55,
                  //border: `6px solid #ffffff45`,
                  backgroundColor: "#C19F62",
                }}
                type="submit"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionIII;
