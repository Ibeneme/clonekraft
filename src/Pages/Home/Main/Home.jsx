import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Stories from "stories-react";
import "stories-react/dist/index.css";
import GallerySection from "./DeliverySection";
import WelcomeSection from "./WelcomeSection";
import GallerySectionIi from "./DeliverySectionII";
import { useDispatch } from "react-redux";
import { profile } from "../../../Redux/auth/auth";
import useCustomToasts from "../../ToastNotifications/Toastify";
import heroImage from "../../../../src/assets/Sofa/Sofa08.png";

const Home = () => {
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
    <div style={{ backgroundColor: "#fff" }}>
      <section
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
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
      <section>
        <WelcomeSection username={user?.username} />
      </section>

      {/* <section
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 12,
          backgroundColor: "#C19F62",
          width: "100%",
          paddingBottom: 120,
        }}
        className="flex-xx "
      >
        <h3 style={{ textAlign: "center", fontSize: 64 }}>
          Slides of Our Replicas
        </h3>
        <div
          style={{
            border: "24px solid #ffffff25",
            animation: "blinkBorder 0.7s infinite alternate",
          }}
        >
          <Stories
            width="400px"
            height="600px"
            border="12px solid #000"
            stories={stories}
          />
        </div>
      </section>
      <section>
        <GallerySectionIi />
      </section>

      <section>
        <WelcomeSection username={user?.username} />
      </section> */}
    </div>
  );
};

export default Home;
