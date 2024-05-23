import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaUsers,
  FaShoppingCart,
  FaMoneyBill,
  FaComments,
} from "react-icons/fa";

const NavbarAdmin = () => {
  return (
    <nav
      style={{
        backgroundColor: "#fff",
        color: "white",
        position: "fixed",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderBottom: `1px solid #80808045`,
      }}
    >
      <ul
        style={{
          listStyleType: "none",
          display: "flex",
          justifyContent: "space-between",
          gap: 24,
          textDecorationLine: "none",
          textDecorationStyle: "none",
        }}
      >
        <li>
          <NavLink
            to="/users"
            activeClassName="active-link"
            style={{
              textDecoration: "none",
              color: "#808080",
              display: "flex",
              flexDirection: "column",

              justifyContent: "center",
              alignItems: "center",
              gap: 4,
              fontSize: 12,
            }}
          >
            <FaUsers style={{ fontSize: 20, color: "#808080" }} />
            Users
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/orders"
            activeClassName="active-link"
            style={{
              textDecoration: "none",
              color: "#808080",
              display: "flex",
              flexDirection: "column",

              justifyContent: "center",
              alignItems: "center",
              gap: 4,
              fontSize: 12,
            }}
          >
            <FaShoppingCart style={{ fontSize: 20, color: "#808080" }} />
            Orders
          </NavLink>
        </li>
        {/* <li>
          <NavLink
            to="/payments"
            activeClassName="active-link"
            style={{
              textDecoration: "none",
              color: "#808080",
              display: "flex",
              flexDirection: "column",

              justifyContent: "center",
              alignItems: "center",
              gap: 4,
              fontSize: 12,
            }}
          >
            <FaMoneyBill style={{ fontSize: 20, color: "#808080" }} />
            Payments
          </NavLink>
        </li> */}
        {/* <li>
          <NavLink
            to="/chats"
            activeClassName="active-link"
            style={{
              textDecoration: "none",
              color: "#808080",
              display: "flex",
              flexDirection: "column",

              justifyContent: "center",
              alignItems: "center",
              gap: 4,
              fontSize: 12,
            }}
          >
            <FaComments style={{ fontSize: 20, color: "#808080" }} />
            Chats
          </NavLink>
        </li> */}
      </ul>
    </nav>
  );
};

export default NavbarAdmin;
