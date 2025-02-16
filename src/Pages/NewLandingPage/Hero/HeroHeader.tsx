import React from "react";
import styles from "../Hero/HeroSection.module.css"; // Adjust if necessary
import { useNavigate } from "react-router-dom";
import { IoArrowForwardCircleSharp } from "react-icons/io5";

interface HeroHeaderProps {
  title: string;
  subtitle: string;
  hideButton?: boolean; // Optional prop to hide the button
}

const HeroHeader: React.FC<HeroHeaderProps> = ({ title, subtitle, hideButton }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("clone_kraft_user_token");

  const handleClick = () => {
    if (token) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  };

  return (
    <section className={styles.heroSection}>
      <h1 className={styles.newH1Hero}>{title}</h1>
      <p className={styles.newPHero}>{subtitle}</p>
      
      {/* Conditionally render the button */}
      {!hideButton && (
        <button onClick={handleClick} className={styles.ctaButtonNew}>
          {token ? "Upload a Design" : "Get Started "}
          <IoArrowForwardCircleSharp color="#fff" fontSize={32} />
        </button>
      )}
    </section>
  );
};

export default HeroHeader;