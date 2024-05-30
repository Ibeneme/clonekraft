import React, { useState } from "react";
import "./Navbar.css";
import profilePic from "../../assets/auth/left.png";
import { FaBars } from "react-icons/fa"; // Assuming you're using react-icons for the burger icon
import { useNavigate } from "react-router-dom";
import { profile } from "../../Redux/auth/auth";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { RiGalleryView } from "react-icons/ri";
import { TbShoppingCartFilled } from "react-icons/tb";
import { BiSolidHome } from "react-icons/bi";
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState([]);

  useEffect(() => {
    handleFetchUser();
  }, []);

  const handleFetchUser = () => {
    dispatch(profile())
      .then((response) => {
        console.log("profile successful:", response);
        setUser(response?.payload);
        //setImageUrl(response?.payload?.imageUrl);
      })
      .catch((error) => {
        console.log("Profile fetch failed:", error);
      });
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h4 onClick={() => navigate("/")}> CloneKraft</h4>
      </div>
      <div className="navbar-right">
        <ul className="nav-items">
          <li
            className="nav-item"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: "#808080",
              marginRight: 12,
            }}
            onClick={() => navigate("/home")}
          >
            <BiSolidHome size={18} color="#808080" /> Home
          </li>
          <li
            className="nav-item"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: "#808080",
              marginRight: 12,
            }}
            onClick={() => navigate("/gallery")}
          >
            <RiGalleryView size={18} color="#808080" />
            Gallery
          </li>
          {/* <li className="nav-item">Design Lab</li> */}
          <li
            className="nav-item"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: "#808080",
              marginRight: 12,
            }}
            onClick={() => navigate("/order")}
          >
            <TbShoppingCartFilled size={18} color="#808080" /> My Orders
          </li>
          {/* <li className="nav-item">Production Timeline</li> */}
          <li
            className="nav-item"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: "#808080",
              marginRight: 12,
            }}
            onClick={() => navigate("/upload")}
          >
            <button className="upload-btn">Upload Design</button>
          </li>
          <div className="profile-container">
            {user?.imageUrl ? (
              <img
                src={user?.imageUrl}
                onClick={() => navigate("/profile")} // Changed from user?.avatar to user?.imageUrl
                alt="User Avatar"
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 200,
                  //marginBottom: "20px",
                }}
              />
            ) : (
              <img
                onClick={() => navigate("/profile")}
                src={profilePic} // Changed from user?.avatar to user?.imageUrl
                alt="User Avatar"
                style={{
                  width: 48,
                  height: 44,
                  borderRadius: 200,
                  //marginBottom: "20px",
                }}
              />
            )}
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
            {/* <li className="nav-item">Design Lab</li> */}
            <li className="nav-item" onClick={() => navigate("/order")}>
              My Orders
            </li>
            <li onClick={() => navigate("/profile")} className="nav-item">
              Profile
            </li>
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
