import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa"; // Import the icon from react-icons
import "./PaymentSuccess.css";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  const goToOrders = () => {
    //navigate("/order");
  };

  return (
    <div className="container">
      <FaCheckCircle className="icon" />
      <h1 className="header">Payment Successful</h1>
      <p className="message">Thank you for your payment!</p>
      <button className="button" onClick={goToOrders}>
        Proceed to Orders
      </button>
    </div>
  );
};

export default PaymentSuccess;
