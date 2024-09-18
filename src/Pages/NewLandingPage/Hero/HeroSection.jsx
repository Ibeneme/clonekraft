import React from "react";
import styles from "./HeroSection.module.css";
//import heroImage from "../../../assets/hero-image.png"; // Replace with your image path
import heroImage from "../../../assets/hero.png"; // Assuming you have a logo.png image in the same directory
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
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
    <section className={styles.heroSection}>
      <div className={styles.heroContent}>
        <h1>
          Welcome to Lukas Design Lab: Where Tech and Carpentry Redefine
          Innovation
        </h1>
        <p>
          Prepare to be amazed at Lukas Design Lab, where tech, AI, and
          carpentry collide in a realm of unrivaled innovation. Here, we fuse
          advanced technology and AI with expert carpentry to push the
          boundaries of design and redefine what’s possible.
        </p>
        <button onClick={handleClick} className={styles.ctaButton}>
          Clonekraft
        </button>
      </div>
      <div className={styles.heroImage}>
        <img src={heroImage} alt="Lukas Design Lab" />
      </div>
    </section>
  );
};

export default HeroSection;
