import React from "react";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import heroImage from "../../../../src/assets/Sofa/Frame8.png";

const HeroPage = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  const navigate = useNavigate();

  const handleClick = () => {
    const token = localStorage.getItem("clone_kraft_user_token");

    if (token) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  };

  return (
    <div
      className="hero"
      style={{
        backgroundImage: `url(${heroImage})`,
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
        <p
          style={{
            fontSize: 24,
            color: "#fff",
            textDecorationLine: "overline",
            margin: 0,
            padding: 0,
          }}
        >
          We are
        </p>
        <h1
          style={{
            color: "#fff",
            maxWidth: 800,
            fontSize: 48,
            marginBottom: "-0.5rem",
          }}
        >
          Lukas Design Lab
        </h1>
        <p
          style={{
            color: "#fff",
            maxWidth: 800,
            fontSize: "0.9rem",
            marginBottom: "2rem",
            textAlign: "center",
            marginTop: 12,
          }}
        >
          Step into our design lab, where we turn ideas into beautiful
          furniture! Our space is all about creativity and fun. We mix cool
          designs with top-notch craftsmanship to make furniture that stands
          out. From sleek and modern to comfy and cozy, we've got something for
          everyone. Come see what we're all about{" "}
        </p>
        <div style={{ width: "100%", alignContent: "center" }}>
          <div
            style={{
              marginTop: 32,
              flexDirection: "column",
              display: "flex",
              alignItems: "center",
              width: "100%",
              height: 120,
            }}
            onClick={handleClick}
          >
            <div
              className="div-btn-auth"
              style={{ backgroundColor: "#fff", height: 70 }}
            ></div>
            <button
              onClick={handleClick}
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
