import React from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

const NavbarNew = () => {
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
    <nav className="navbar">
      <h1>LDL</h1>
      <ul>
        <li style={{ marginRight: 24 }}>
          <button
            data-aos="zoom-in"
            onClick={handleClick}
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
        </li>
      </ul>
    </nav>
  );
};

export default NavbarNew;
