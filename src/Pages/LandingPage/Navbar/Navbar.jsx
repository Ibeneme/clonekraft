import React from "react";
import "./Navbar.css"; // Import CSS file for styling
import { useNavigate } from "react-router-dom";

const TopLevel = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Check if the token exists in localStorage
    const token = localStorage.getItem("clone_kraft_user_token");

    if (token) {
      // If the token exists, redirect to the /home page
      navigate("/home");
    } else {
      // If the token does not exist, redirect to the /login page
      navigate("/login");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="navbars">
        <div className="brands" style={{ fontWeight: "bold" }}>
          LDL
        </div>
        <button
          data-aos="zoom-in"
          onClick={handleClick}
          //className="btn-auth"
          style={{
            marginTop: -0,
            height: 55,
            borderRadius: 777,
            backgroundColor: "#C19F62",
            marginBottom: 0,
            border: `1.4px solid #fff`,
            color:'#Fff',
            padding: 16,
            marginLeft: 24
   
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
