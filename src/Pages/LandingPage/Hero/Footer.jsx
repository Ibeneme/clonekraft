import React from "react";
import "./Hero.css";
import { FaInstagram } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <span> </span>
        <span>Lukas Design Lab || All rights reserved.</span>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 48,
          cursor: "pointer",
        }}
      >
        <a
          href="https://www.instagram.com/lukasdesignlab/?utm_source=qr&igsh=MTJjbDFjNHQxazhrNg%3D%3D"
          style={{ color: "#fff" }}
        >
          <FaInstagram size={24} />
        </a>
        <a
          href="https://twitter.com/lukasdesignlab?s=09"
          style={{ color: "#fff" }}
        >
          <BsTwitterX size={24} />
        </a>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "32px",
          gap: 65,
        }}
      >
        <p style={{ color: "#fff", marginRight: "20px" }}>Privacy Policy</p>
        <p style={{ color: "#fff", marginRight: "20px" }}>
          Terms and Conditions
        </p>
      </div>
    </footer>
  );
};

export default Footer;
