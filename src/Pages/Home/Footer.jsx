import React from "react";
import { FaInstagram} from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#C19F62",
        color: "#fff",
        padding: "90px 0px",
        borderBottom: "43px solid #121212",
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
        <a href="https://www.instagram.com/lukasdesignlab/?utm_source=qr&igsh=MTJjbDFjNHQxazhrNg%3D%3D" style={{ color: "#fff" }}>
          <FaInstagram size={24} />
        </a>
        <a href="https://twitter.com/lukasdesignlab?s=09" style={{ color: "#fff" }}>
          <BsTwitterX size={24} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
