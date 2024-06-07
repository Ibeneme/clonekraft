import React from "react";
import { Link } from "react-router-dom";
import { FaCopy } from "react-icons/fa";
import { useState } from "react";

const OrderLink = ({ orderId }) => {
  const [copied, setCopied] = useState(false);
  const orderLink = `${window.location.origin}/order-details/${orderId}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(orderLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset the copied state after 2 seconds
    });
  };

  return (
    <div
      style={{ display: "flex", gap: 12, cursor: "pointer" }}
      onClick={copyToClipboard}
    >
      <Link to={`/order/${orderId}`}>{/* Share This Order <FaCopy /> */}</Link>
      <h1 style={{ fontSize: 16 }}>Share</h1>
      <button onClick={copyToClipboard}>
        {copied ? "Copied!" : <FaCopy />}
      </button>
    </div>
  );
};

export default OrderLink;
