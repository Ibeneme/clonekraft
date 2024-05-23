import React from "react";
import { useNavigate } from "react-router-dom";

const WelcomeSection = ({ username }) => {
  const navigate = useNavigate();

  // Function to format the username
  const formatUsername = (name) => {
    return name?.charAt(0)?.toUpperCase() + name?.slice(1)?.toLowerCase();
  };

  const formattedUsername = formatUsername(username);

  return (
    <section
      style={{
        minHeight: "100vh",
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
            fontSize: 48,
            color: "#000",
          }}
        >
          <span style={{ color: "#C19F62" }}>
            {formattedUsername ? `Hi ${formattedUsername}` : null},{" "}
          </span>
          Welcome to <span style={{ color: "#C19F62" }}> CloneKraft</span>
        </h1>
        <p
          style={{
            maxWidth: 600,
            textAlign: "center",
            color: "#808080",
            marginTop: -32,
          }}
        >
          At our workshop, we craft bespoke carpentry products tailored to your
          unique needs and preferences. Whether you're looking for rustic charm
          or sleek modern designs, we're here to bring your vision to life.
        </p>

        <div style={{ width: "100%", alignContent: "center" }}>
          <div
            style={{
              marginTop: 32,
              flexDirection: "column",
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}
          >
            <div
              className="div-btn-auth"
              style={{ backgroundColor: "#C19F62" }}
            ></div>
            <button
              onClick={() => navigate("/upload")}
              className="btn-auth"
              style={{ marginTop: -14, backgroundColor: "#121212" }}
              type="submit"
            >
              Upload a Design
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
