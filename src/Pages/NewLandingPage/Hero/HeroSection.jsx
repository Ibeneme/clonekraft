import React from "react";
import styles from "./HeroSection.module.css";
//import heroImage from "../../../assets/hero-image.png"; // Replace with your image path
//import heroImage from "../../../assets/hero.png"; // Assuming you have a logo.png image in the same directory
import { useNavigate } from "react-router-dom";
import { IoArrowForwardCircleSharp } from "react-icons/io5";
import gir from "../../../assets/trustedby/girlmask.png";
import girb from "../../../assets/trustedby/girlhair.png";
import wb from "../../../assets/trustedby/whiteboy.png";
import { FaStar } from "react-icons/fa";
import InfiniteCarousel from "./InfiniteCarousel";
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
      <h1 className={styles.newH1Hero}>
        Welcome to Lukas Design Lab:
        {/* <br /> */}
        Where{" "}
        <span
          style={{
            // backgroundColor: "#2c3e50",
            color: "#C19F62",
            padding: `-12px 4px`,
          }}
        >
          Tech and Carpentry
        </span>{" "}
        Redefine Innovation
      </h1>
      <p className={styles.newPHero}>
        Where Innovation, Tech, AI, and carpentry unite.
      </p>
      <button onClick={handleClick} className={styles.ctaButtonNew}>
        Get Started <IoArrowForwardCircleSharp color="#fff" fontSize={32} />
      </button>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          textAlign: "center",
          gap: 24,
          marginTop: 48,
        }}
      >
        {/* Stacked Images */}
        <div>
          <img
            src={wb}
            alt="Image 2"
            style={{ width: "64px", marginRight: -16 }}
          />
          <img
            src={gir}
            alt="Image 1"
            style={{ width: "64px", marginRight: -16 }}
          />
          <img
            src={girb}
            alt="Image 3"
            style={{ width: "64px", marginRight: -16 }}
          />
        </div>
        {/* Stars and Text */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            borderLeft: "2px solid #2c3e50",
            paddingLeft: 16,
          }}
        >
          <span
            style={{ color: "#2c3e50", fontSize: "24px", borderRadius: 24 }}
          >
            <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
          </span>
          <p style={{ fontSize: "16px", color: "#2c3e50", margin: 0 }}>
            Trusted by 100+ users
          </p>
        </div>
      </div>

      <InfiniteCarousel />

      <div style={{ width: "100%" }}></div>
      {/* <div className={styles.heroContent}>
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
      </div> */}
    </section>
  );
};

export default HeroSection;
