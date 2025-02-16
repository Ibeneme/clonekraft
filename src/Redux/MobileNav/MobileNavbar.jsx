import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaClipboardList,
  FaUser,
  FaComments,
  FaChair,
} from "react-icons/fa"; // Added FaChair
import "./MobileNavbar.css";

const MobileNavbar = () => {
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
    if (pathname.startsWith("/home")) {
      return "home";
    } else if (pathname.startsWith("/order")) {
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

  if (!isMobileView) {
    return null;
  }

  return (
    <nav className="mobile-navbar" style={{ backgroundColor: "#172534" }}>
      <ul>
        <li className={activeItem === "home" ? "active" : ""}>
          <NavLink exact to="/" activeClassName="active-link">
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
        <li className={activeItem === "upload" ? "active" : ""}>
          {" "}
          {/* Added li for /upload */}
          <NavLink exact to="/upload" activeClassName="active-link">
            <FaChair
              size={15}
              color={activeItem === "upload" ? "#c19f62" : "white"}
            />{" "}
            {/* Changed icon to FaChair */}
            <span
              style={{ color: activeItem === "upload" ? "#c19f62" : "white" }}
            >
              Clone
            </span>{" "}
            {/* Changed text to Clone */}
          </NavLink>
        </li>
        <li className={activeItem === "order" ? "active" : ""}>
          <NavLink exact to="/order" activeClassName="active-link">
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
          <NavLink exact to="/profile" activeClassName="active-link">
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

        <li>
          <a href="https://wa.me/+2349134270313?text=Hello%20CloneKraft">
            <FaComments size={15} />
            <span>Chat</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default MobileNavbar;
