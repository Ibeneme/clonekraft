import React from "react";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
const HeroPage = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  const navigate = useNavigate();
  return (
    <div
      className="hero"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/daiiiiupy/image/upload/v1715424195/new_fjtip4.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <div
        className="overlay"
        style={{
          backgroundColor: "#12121245",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      ></div>
      <div
        className="content"
        style={{
          textAlign: "center",
          padding: 16,
          zIndex: 1,
          alignItems: "center",
        }}
      >
        <h1
          data-aos="zoom-in"
          style={{
            color: "#fff",
            maxWidth: 800,
            fontSize: "4.5rem",
            marginBottom: "-0.5rem",
          }}
        >
          Lukas Design Lab
        </h1>
        <p
          data-aos="zoom-in"
          style={{
            color: "#fff",
            maxWidth: 800,
            fontSize: "0.9rem",
            marginBottom: "2rem",
            textAlign: "center",
          }}
        >
          Step into our design lab, where we turn ideas into beautiful
          furniture! Our space is all about creativity and fun. We mix cool
          designs with top-notch craftsmanship to make furniture that stands
          out. From sleek and modern to comfy and cozy, we've got something for
          everyone. Come see what we're all about{" "}
        </p>
        <div
          data-aos="zoom-in"
          style={{ width: "100%", alignContent: "center" }}
        >
          <div
            style={{
              marginTop: 32,
              flexDirection: "column",
              display: "flex",
              alignItems: "center",
              width: "100%",
              height: 120,
            }}
            onClick={() => navigate("/")}
          >
            <div
              className="div-btn-auth"
              style={{ backgroundColor: "#fff", height: 70 }}
            ></div>
            <button
              onClick={() => navigate("/home")}
              className="btn-auth"
              style={{
                marginTop: -14,
                height: 65,
                border: `6px solid #ffffff45`,
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
  );
};

export default HeroPage;
