import React from "react";
import "./Hero.css";
import { useNavigate } from "react-router-dom";

const SectionIII = () => {
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
    <div className="hero" style={{ minHeight: "100vh" }}>
      <div className="hero-flexx">
        <div
          style={{ width: "100%", marginTop: 120, marginLeft: 16 }}
          data-aos="zoom-in"
        >
          <img
            src="https://res.cloudinary.com/daiiiiupy/image/upload/v1715427077/kam-idris-_HqHX3LBN18-unsplash_kosckn.jpg"
            alt="Sample Image 2"
            style={{
              marginBottom: "1rem",
              borderRadius: 32,
              width: "100%",
              height: "auto",
            }}
          />
        </div>

        <div
          data-aos="zoom-in"
          style={{
            alignItems: "flex-start",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",

            width: "100%",
          }}
        >
          <h1
            style={{
              color: "#000",
              marginBottom: 0,
              fontSize: "3rem",
              marginLeft: 16,
            }}
          >
            Ready to Get Started?
          </h1>
          <p
            style={{
              color: "#808080",
              fontSize: "1.1rem",
              marginBottom: "2rem",
              marginLeft: 16,
              //maxWidth: 500,
            }}
          >
            Transform your furniture inspiration into a tangible piece that fits
            perfectly in your space. Upload your image now and let us take care
            of the rest.
            <br />
            We’re here to help! Whether you need more information about our
            process or have specific requirements for your furniture piece, feel
            free to reach out.
          </p>
          <div
            data-aos="zoom-in"
            style={{ alignContent: "flex-start", margin: `48px 16px` }}
          >
            <div
              style={{
                //marginTop: 32,
                flexDirection: "column",
              }}
              onClick={handleClick}
            >
              <div
                className="div-btn-auth"
                style={{
                  backgroundColor: "#C19F6265",
                  height: 50,
                  marginLeft: 12,
                }}
              ></div>
              <button
                onClick={handleClick}
                className="btn-auth"
                style={{
                  marginTop: -14,
                  height: 55,
                  //border: `6px solid #ffffff45`,
                  backgroundColor: "#C19F62",
                }}
                type="submit"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionIII;
