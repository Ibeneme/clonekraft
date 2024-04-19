import React, { useState } from "react";
import "./Navbar.css";
import logo from "../../assets/auth/right.png";
import profilePic from "../../assets/auth/left.png";
import { FaBars } from "react-icons/fa"; // Assuming you're using react-icons for the burger icon
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h4>CloneKraft</h4>
      </div>
      <div className="navbar-right">
        <ul className="nav-items">
          <li className="nav-item" onClick={() => navigate("/home")}>
            Home
          </li>
          <li className="nav-item" onClick={() => navigate("/gallery")}>
            Gallery
          </li>
          <li className="nav-item">Design Lab</li>
          <li className="nav-item" onClick={() => navigate("/order")}>
            My Orders
          </li>
          <li className="nav-item">Production Timeline</li>
          <li className="nav-item" onClick={() => navigate("/upload")}>
            <button className="upload-btn">Upload Design</button>
          </li>
          <div className="profile-container">
            <img
              src={profilePic}
              alt="Profile"
              onClick={() => navigate("/profile")}
              className="profile-pic"
            />
          </div>
        </ul>

        <div className="menu-toggle" onClick={toggleMobileMenu}>
          <FaBars />
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <ul className="mobile-nav-items">
            <li className="nav-item" onClick={() => navigate("/home")}>
              Home
            </li>
            <li className="nav-item" onClick={() => navigate("/gallery")}>
              Gallery
            </li>
            <li className="nav-item">Design Lab</li>
            <li className="nav-item" onClick={() => navigate("/order")}>
              My Orders
            </li>
            <li className="nav-item">Production Timeline</li>
            <li className="nav-item">
              <button
                className="upload-btn"
                onClick={() => navigate("/upload")}
              >
                Upload Design
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
