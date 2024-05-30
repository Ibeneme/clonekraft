import React from "react";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import heroImage from "../../../../src/assets/Sofa/Frame8.png";

const AboutUsHeaderRefund = () => {
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
          Our Refund Policy
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
          Lukas Design Lab (LDL) is committed to customer satisfaction and
          strives to provide high-quality products and services. However, we
          understand that there may be circumstances where a refund is
          necessary. This refund policy outlines the terms and conditions for
          requesting and processing refunds for products and services purchased
          from LDL.
        </p>
        <div style={{ width: "100%", alignContent: "center" }}></div>
      </div>
    </div>
  );
};

export default AboutUsHeaderRefund;
