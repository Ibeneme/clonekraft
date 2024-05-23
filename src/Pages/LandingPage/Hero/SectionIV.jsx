import React from "react";
import "./Hero.css";
import { useNavigate } from "react-router-dom";

const SectionIV = () => {
  const navigate = useNavigate();
  return (
    <div
      className="hero"
      style={{ minHeight: "100vh", backgroundColor: "#161616" }}
    >
      <div className="hero-flexx">
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
              color: "#fff",
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
            }}
          >
            From sleek minimalist designs to bold statement pieces, each
            creation is meticulously crafted with an emphasis on quality
            materials and attention to detail. Step into our world of endless
            possibilities, where every curve, every texture, and every hue tells
            a story waiting to be discovered.
          </p>
          <br /> <br />
          <div
            data-aos="zoom-in"
            style={{  alignContent: "flex-start" }}
          >
            <div
              style={{
                marginLeft: 16,
                //marginTop: 32,
                flexDirection: "column",
              }}
              onClick={() => navigate("/")}
            >
              <div
                className="div-btn-auth"
                style={{
                  backgroundColor: "#ffffff45",
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
                  color: "#C19F62",
                  backgroundColor: "#fff",
                }}
                type="submit"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: 120,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
          data-aos="zoom-in"
        >
          <div
            data-aos="zoom-in"
            // className="scrollingImages"
            // ref={imageContainerRef}
            style={{ overflowY: "hidden", height: "600px", width: "100%" , marginLeft: 16}}
          >
            <img
              src="https://res.cloudinary.com/daiiiiupy/image/upload/v1715427079/jean-philippe-delberghe-F7b0y4JbEpc-unsplash_amqdxc.jpg"
              alt="Sample Image 2"
              style={{
                marginBottom: "1rem",
                borderRadius: 32,
                width: "100%",
                height: 600,
                alignContent:'center'

              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionIV;
