import React from "react";
import { FaInstagram, FaFacebook, FaTwitter, FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#021548",
        color: "#fff",
        padding: "90px 0px",
        borderBottom: "43px solid #007bff",
        minHeight: "20vh",
      }}
    >
      {/* <div
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
      </div> */}
      <div style={{ display: "flex", justifyContent: "center", gap: 48 }}>
        <a href="https://www.instagram.com/" style={{ color: "#fff" }}>
          <FaInstagram size={24} />
        </a>
        <a href="https://www.facebook.com/" style={{ color: "#fff" }}>
          <FaFacebook size={24} />
        </a>
        <a href="https://www.twitter.com/" style={{ color: "#fff" }}>
          <FaTwitter size={24} />
        </a>
        <a href="https://www.tiktok.com/" style={{ color: "#fff" }}>
          <FaTiktok size={24} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
