import React, { useState } from "react";
import { PaystackButton } from "react-paystack";
import { useNavigate } from "react-router-dom";
import useCustomToasts from "../ToastNotifications/Toastify";

const PayButton = ({ totalAmount, userEmail, reference }) => {
  const publicKey = "pk_live_1314935c92fe40573d7c8105b93a7201c9cc72e3"; // Use your public key here
  const amount = totalAmount * 100; // Paystack expects the amount in kobo
  const { showErrorToast , showSuccessToast} = useCustomToasts();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const componentProps = {
    email: userEmail,
    amount,
    publicKey,
    text: loading ? "Processing..." : "Pay with Paystack",
    onSuccess: () => {
      setLoading(false);
      console.log("Payment Successful!");
      navigate("/sucess");
      // Handle post-success actions here
    },
    onClose: () => {
      setLoading(false);
      console.log("Payment closed");
      showErrorToast("Payment Failed");
      // Handle post-close actions here
    },
    reference,
  };

  const handleClick = () => {
    setLoading(true);
  };

  return (
    <PaystackButton
      {...componentProps}
      className="paystack-button"
      onClick={handleClick}
    />
  );
};

export default PayButton;
