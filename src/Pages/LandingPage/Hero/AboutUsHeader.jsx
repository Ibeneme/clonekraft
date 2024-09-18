import React from "react";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import heroImage from "../../../../src/assets/team.png";

const AboutUsHeader = () => {
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
        height: "80vh",
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
          style={{
            color: "#fff",
            maxWidth: 800,
            fontSize: 48,
            marginBottom: "-0.5rem",
          }}
        >
          About Us
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
          At Lukas Design Lab, we believe that furniture isn’t just about
          functionality; it’s an expression of art, innovation, and
          craftsmanship. Our passion lies in creating exceptional pieces that
          resonate with your soul and elevate your living spaces
        </p>
        <div style={{ width: "100%", alignContent: "center" }}></div>
      </div>
    </div>
  );
};

export default AboutUsHeader;
