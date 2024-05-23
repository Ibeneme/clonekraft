import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

const TimerPricing = () => {
  const priceInNaira = "200,000.00"; // Assuming the price is ₦20,000, you can replace it with your actual pricing logic
  const navigate = useNavigate();
  return (
    <div style={{ padding: "120px 20px " }}>
      <h2
        className="vw-text"
        style={{
          fontSize: 48,
        }}
      >
        Here's your price estimate to get the Job done 💳
      </h2>
      <p className="auth-div-p">Learn about uploading your design</p>

      <h3 style={{ color: "#007bff", fontSize: 32 }}> ₦{priceInNaira}</h3>
      <div>
        {/* <button onClick={() => console.log("Send us a message")}>
          Send us a message
        </button>
        <button onClick={() => console.log("Proceed to Payments")}>
          Proceed to Payments
        </button> */}

        <br />
        <p
          onClick={() => navigate("/chatpage")}
          className="auth-div-p"
          style={{ fontSize: 18 }}
        >
          Negotiate or Pricing?{" "}
          <span
            style={{
              color: "#007bff",
              backgroundColor: "#007bff25",
              padding: "12px 24px",
              borderRadius: 24,
            }}
          >
            Start a Chat 💬
          </span>
        </p>
        <div style={{ cursor: "pointer", marginTop: 40, marginBottom: 96 }}>
          <div className="div-btn-auth"></div>

          <button
            onClick={() => console.log("Proceed to Payments")}
            //onClick={() => navigate("/pricing")}
            className="btn-auth"
            type="button"
          >
            Proceed to Payments
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimerPricing;
