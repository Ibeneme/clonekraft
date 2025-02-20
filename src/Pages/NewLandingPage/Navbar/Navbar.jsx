import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import logo from "../../../assets/logo.png"; // Assuming you have a logo.png image in the same directory

const NewNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigation = (path) => {
    navigate(path); // Use navigate to route to different paths
    setIsOpen(false); // Close the menu after navigation
  };
  const token = localStorage.getItem("clone_kraft_user_token");

  const handleClick = () => {
    const token = localStorage.getItem("clone_kraft_user_token");

    if (token) {
      navigate("/upload");
    } else {
      navigate("/login");
    }
  };

  return (
    <nav className={styles.navbar}>
      {/* Logo as an Image */}
      <div className={styles.logo}>
        <a onClick={() => handleNavigation("/")}>
          <img src={logo} alt="SafeGad Logo" />
        </a>
      </div>

      <ul className={`${styles.navLinks} ${isOpen ? styles.active : ""}`}>
        <br />
        {/* <li>
          <a onClick={() => handleNavigation("/")}>
            Home
          </a>
        </li> */}
        <li>
          <a onClick={() => handleNavigation("/about")}>About Us</a>
        </li>
        <li>
          <a onClick={() => handleNavigation("/our-team")}>Our Team</a>
        </li>
        {token && (
          <>
            <li>
              <a onClick={() => handleNavigation("/profile")}>Your Profile</a>
            </li>
            <li>
              <a onClick={() => handleNavigation("/order")}>Your Orders</a>
            </li>
          </>
        )}
        {/* <li>
          <a onClick={() => handleNavigation("/about")}>
            Our Services
          </a>
        </li>
        <li>
          <a onClick={() => handleNavigation("/")}>
            Our Products
          </a>
        </li>
        <li>
          <a onClick={() => handleNavigation("/")}>
            Site Inspections
          </a>
        </li> */}
        <li>
          <button onClick={handleClick} className={styles.signInButton}>
            {token ? "Upload a Design" : "Get Started "}
          </button>
        </li>
      </ul>

      {/* Burger Icon */}
      <div className={styles.burger} onClick={toggleMenu}>
        <div className={isOpen ? styles.line1Close : styles.line1}></div>
        <div className={isOpen ? styles.line2Close : styles.line2}></div>
        <div className={isOpen ? styles.line3Close : styles.line3}></div>
      </div>
    </nav>
  );
};

export default NewNavbar;
