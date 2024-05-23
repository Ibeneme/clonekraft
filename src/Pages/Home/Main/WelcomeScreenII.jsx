import React from "react";
//import { useNavigate } from "react-router-dom";

const WelcomeSectionII = () => {
  // const navigate = useNavigate();

  return (
    <section
      style={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 20px",
      }}
    >
      <div style={{ textAlign: "center", color: "#fff" }}>
        <h1
          style={{
            maxWidth: 600,
            textAlign: "center",
            fontSize: 64,
            color: "#000",
   
          }}
        >
          <span style={{ color: "#C19F62" }}> CloneKraft</span> Gallery
        </h1>
      
      </div>
    </section>
  );
};

export default WelcomeSectionII;
