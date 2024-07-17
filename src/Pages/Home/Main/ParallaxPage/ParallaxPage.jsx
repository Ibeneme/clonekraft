import React, { useRef, useEffect, useState } from "react";
import heroImage from "../../../../assets/Sofa/Frameb.png"; // Import heroImage
import "./ParallaxPage.css"; // Import your CSS file for styling
import { useDispatch } from "react-redux";
import { profile } from "../../../../Redux/auth/auth";
import { useNavigate } from "react-router-dom";

const ParallaxPage = () => {
  // Ref to the parallax container
  const parallaxRef = useRef(null);

  // Function to handle scroll event
  const handleScroll = () => {
    if (parallaxRef.current) {
      const scrollTop = window.scrollY;
      const parallaxOffset = parallaxRef.current.offsetTop;
      const parallaxEffect = scrollTop - parallaxOffset;

      // Apply parallax effect to the image
      parallaxRef.current.style.backgroundPositionY = `${
        parallaxEffect * 0.5
      }px`;
    }
  };

  // Add scroll event listener on mount
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navigate = useNavigate();

  const stories = [
    {
      type: "image",
      url: "https://res.cloudinary.com/daiiiiupy/image/upload/v1715427077/kam-idris-_HqHX3LBN18-unsplash_kosckn.jpg",
      duration: 5000,
    },
    {
      type: "image",
      url: "https://res.cloudinary.com/daiiiiupy/image/upload/v1715626430/IMG_8271_ef0uof.jpg",
      duration: 6000,
    },
    {
      type: "image",
      url: "https://res.cloudinary.com/daiiiiupy/image/upload/v1715626430/IMG_8273_qtouui.jpg",
      duration: 7000,
    },
  ];

  const dispatch = useDispatch();
  const [user, setUser] = useState([]);
  //const { showSuccessToast, showErrorToast } = useCustomToasts();
  const handleFetchUser = () => {
    dispatch(profile())
      .then((response) => {
        console.log("profile successful:", response);
        setUser(response?.payload);
      })
      .catch((error) => {
        const returnErr = error.data;
        console.log("Registration failed:", error);
      });
  };

  useEffect(() => {
    handleFetchUser();
  }, []);

  const formatUsername = (name) => {
    return name?.charAt(0)?.toUpperCase() + name?.slice(1)?.toLowerCase();
  };

  const formattedUsername = formatUsername(user?.username);

  return (
    <div className="parallax-page">
      <section
        ref={parallaxRef}
        className="parallax-section"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <section
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 20px",
          }}
        >
          <div
            style={{
              textAlign: "center",
              color: "#fff",
              backgroundColor: "#00000075",
              padding: 16,
              borderRadius: 12,
              paddingBottom: 48,
            }}
          >
            <h1
              style={{
                maxWidth: 600,
                textAlign: "center",
                fontSize: 48,
                color: "#fff",
              }}
            >
              <span style={{ color: "#C19F62" }}>
                {formattedUsername ? `Hi ${formattedUsername},` : null}{" "}
              </span>{" "}
              Welcome to Clonekraft
            </h1>
            <p style={{ maxWidth: 600, textAlign: "center" }}>
              We bring your furniture designs to life for less than the original
              price. Make changes to suit your preferences and style. Set your
              quality expectations and choose your delivery date
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
                  style={{ backgroundColor: "#161616" }}
                ></div>
                <button
                  onClick={() => navigate("/upload")}
                  className="btn-auth"
                  style={{ marginTop: -14 }}
                  type="submit"
                >
                  Upload a Design
                </button>
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};

export default ParallaxPage;
