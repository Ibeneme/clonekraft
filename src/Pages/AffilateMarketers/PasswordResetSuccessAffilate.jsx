import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import "../Auth/Auth.css"; // Adjust the path according to your project structure

const PasswordResetSuccess = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate("/login-influencer");
  };

  return (
    <div
      className="auth-div"
      style={{ height: "100vh", paddingTop: 120, width: "96vw" }}
    >
      <div
        className="auth-div-div"
        style={{ height: "100%", overflowY: "scroll" }}
      >
        <div className="success-icon">
          <FaCheckCircle />
        </div>
        <h2 style={{ margin: 0 }}>Password Reset Successful</h2>
        <p style={{ marginTop: 20 }}>
          Your password has been reset successfully. You can now log in with
          your new password.
        </p>
        <div style={{ marginTop: 64 }}>
          <button className="btn-auth" onClick={handleLoginRedirect}>
            Go to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetSuccess;
