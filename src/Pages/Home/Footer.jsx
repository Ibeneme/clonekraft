import React from "react";
import { FaInstagram } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer
      style={{
        backgroundColor: "#172534",
        color: "#fff",
        padding: "200px 0px",
        borderBottom: "43px solid #C19F62",
        minHeight: "20vh",
   
      }}
    >
      <div className="footer-container">
        <span> </span>
        <span>Lukas Design Lab || All rights reserved.</span>
      </div>
      <br /> <br />
      <div style={{ display: "flex", justifyContent: "center", gap: 48 }}>
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
      <br />
      <br />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "-42px",
          flexDirection: "column",
          gap: 0,
          width: "100%",
        }}
      >
        <p
          style={{
            color: "#fff",
            marginRight: "20px",
            textAlign: "center",
            fontFamily: "DM Sans",
            fontWeight: 500,
            fontSize: 12,
            cursor: "pointer",
          }}
          onClick={() => navigate("/policy")}
        >
          Refund Policy
        </p>
        <p
          style={{
            color: "#fff",
            marginRight: "20px",
            textAlign: "center",
            fontFamily: "DM Sans",
            fontWeight: 500,
            fontSize: 12,
            cursor: "pointer",
          }}
          onClick={() => navigate("/about")}
        >
          About Us
        </p>
      </div>
    </footer>
  );
};

export default Footer;
