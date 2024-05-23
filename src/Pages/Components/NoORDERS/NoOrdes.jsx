import React from "react";
import { FaExclamationCircle } from "react-icons/fa";

const NoOrdersMessage = () => {
  return (
    <div style={{ textAlign: "center", marginTop: 48 }}>
      <FaExclamationCircle size={120} color="#C19F6285" />
      <p style={{ fontSize: 14, marginTop: 10 }}>
        You do not have any orders.
      </p>
    </div>
  );
};

export default NoOrdersMessage;
