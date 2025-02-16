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
          backgroundColor: "#12121285",
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
            fontFamily: `var( --font-lalezar)`

          }}
        >
          About Us
        </h1>
        <p
          style={{
            color: "#fff",
            maxWidth: 800,
            fontSize: "1.2rem",
            marginBottom: "2rem",
            textAlign: "center",
            marginTop: 12,
            backgroundColor: "#ffffff22",
            padding: 16,
            borderRadius: 24,
          }}
        >
          At Lukas Design Lab, we believe that furniture is more than just
          functional—it’s an expression of art, innovation, and craftsmanship.
          Our passion is in creating exceptional pieces that resonate with your
          soul and elevate your living spaces. We seamlessly blend form and
          function, using high-quality materials and cutting-edge technology.
          Every design is a unique reflection of your vision, crafted with
          meticulous attention to detail. We aim to transform environments and
          inspire those who experience our work. At Lukas Design Lab, furniture
          becomes a statement, not just an object.{" "}
        </p>
        <div style={{ width: "100%", alignContent: "center" }}></div>
      </div>
    </div>
  );
};

export default AboutUsHeader;
