// UserProfile.js
import React from "react";
import { useNavigate } from "react-router-dom";

const UserProfile = ({ user }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/login-marketer");
  };

  const containerStyle = {
    padding: "20px",
    borderRadius: "8px",
    maxWidth: "400px",
    margin: "20px auto",

    backgroundColor: "#fff",
  };

  const headerStyle = {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  };

  const fieldStyle = {
    marginBottom: "10px",
    color: "#555",
  };

  const labelStyle = {
    fontWeight: "bold",
    color: "#333",
  };

  const buttonStyle = {
    display: "block",
    width: "100%",
    padding: "16px",
    backgroundColor: `var(--darkOrange)`,
    color: "white",
    border: "none",
    borderRadius: "24px",
    cursor: "pointer",
    marginTop: "20px",
    textAlign: "center",
    textDecoration: "none",
    transition: "background-color 0.3s",
  };

  const buttonHoverStyle = {
    backgroundColor: "#0056b3",
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>User Profile</h2>
      <p style={fieldStyle}>
        <span style={labelStyle}>ID:</span> {user._id}
      </p>
      <p style={fieldStyle}>
        <span style={labelStyle}>Referral ID:</span> {user.referralId}
      </p>
      <p style={fieldStyle}>
        <span style={labelStyle}>Email:</span> {user.email}
      </p>
      <p style={fieldStyle}>
        <span style={labelStyle}>Balance:</span> {user.balance}
      </p>
      <p style={fieldStyle}>
        <span style={labelStyle}>Monthly Earnings:</span> {user.monthlyEarnings}
      </p>
      <p style={fieldStyle}>
        <span style={labelStyle}>Total Earnings:</span> {user.totalEarnings}
      </p>
      <p style={fieldStyle}>
        <span style={labelStyle}>Created At:</span>{" "}
        {new Date(user.createdAt).toLocaleString()}
      </p>
      <p style={fieldStyle}>
        <span style={labelStyle}>Updated At:</span>{" "}
        {new Date(user.updatedAt).toLocaleString()}
      </p>
      <button
        onClick={handleNavigate}
        style={buttonStyle}
        onMouseOver={(e) =>
          (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)
        }
        onMouseOut={(e) =>
          (e.target.style.backgroundColor = buttonStyle.backgroundColor)
        }
      >
        Logout
      </button>
    </div>
  );
};

export default UserProfile;
