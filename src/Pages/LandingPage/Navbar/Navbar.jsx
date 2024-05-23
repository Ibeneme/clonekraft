import React from "react";
import "./Navbar.css"; // Import CSS file for styling
import { useNavigate } from "react-router-dom";

const TopLevel = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="navbars">
        <div className="brands">LDL</div>
        <button
          data-aos="zoom-in"
          onClick={() => navigate("/login")}
          className="btn-auth"
          style={{
            marginTop: -0,
            height: 55,
            borderRadius: 777,
            backgroundColor: "#C19F62",
            marginBottom: 0,
            border: `1.4px solid #fff`,
          }}
          type="submit"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default TopLevel;
