import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaClipboardList,
  FaUser,
  FaComments,
  FaChair,
} from "react-icons/fa"; // Added FaChair
import "./MobileNavbarMarketers.css";

const MobileNavbarMarketers = () => {
  const [isMobileView, setIsMobileView] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Function to get current pathname from window location
  const getCurrentPathname = () => {
    return window.location.pathname;
  };

  // Determine active item based on current pathname
  const getActiveItem = () => {
    const pathname = getCurrentPathname();
    if (pathname.startsWith("/index-dashboard")) {
      return "home";
    } else if (pathname.startsWith("/marketers-dashboard-orders")) {
      return "order";
    } else if (pathname.startsWith("/profile")) {
      return "profile";
    } else if (pathname.startsWith("/upload")) {
      // Added condition for /upload
      return "upload";
    } else {
      return "";
    }
  };

  // State to track active item
  const [activeItem, setActiveItem] = React.useState(getActiveItem());

  // Update active item when pathname changes
  React.useEffect(() => {
    setActiveItem(getActiveItem());
  }, [getCurrentPathname()]);

  return (
    <nav className={`mobile-navbar ${!isMobileView ? 'navbar-top' : ''}`}>
      <ul className={!isMobileView ? 'content-right' : ''}>
        <li className={activeItem === "home" ? "active" : ""}>
          <NavLink exact to="/index-dashboard" activeClassName="active-link">
            <FaHome
              size={15}
              color={activeItem === "home" ? "#c19f62" : "white"}
            />
            <span
              style={{ color: activeItem === "home" ? "#c19f62" : "white" }}
            >
              Home
            </span>
          </NavLink>
        </li>
        <li className={activeItem === "order" ? "active" : ""}>
          <NavLink exact to="/marketers-dashboard-orders" activeClassName="active-link">
            <FaClipboardList
              size={15}
              color={activeItem === "order" ? "#c19f62" : "white"}
            />
            <span
              style={{ color: activeItem === "order" ? "#c19f62" : "white" }}
            >
              Orders
            </span>
          </NavLink>
        </li>
        <li className={activeItem === "profile" ? "active" : ""}>
          <NavLink exact to="/profile-marketer" activeClassName="active-link">
            <FaUser
              size={15}
              color={activeItem === "profile" ? "#c19f62" : "white"}
            />
            <span
              style={{ color: activeItem === "profile" ? "#c19f62" : "white" }}
            >
              Profile
            </span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default MobileNavbarMarketers;
