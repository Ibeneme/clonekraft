import React from "react";
import { RiWhatsappFill } from "react-icons/ri";
const WhatsAppRedirect = () => {
  const handleIconClick = () => {
    window.location.href =
      "https://wa.me/+2349134270313?text=Hello%20CloneKraft";
  };

  return (
    <div
      style={{
        cursor: "pointer",
        display: "inline-block",
        fontSize: 48,
        position: "fixed",
        bottom: 24,
        right: 24,
        alignItems: "flex-end",
        justifyContent: "flex-end",
        display: "flex",
        flexDirection: "column",
      }}
      onClick={handleIconClick}
    >
      <RiWhatsappFill color="#04D43C" />
      <h1
        style={{
          fontSize: 12,
          border: "1.2px solid #04D43C",
          padding: 16,
          backgroundColor: "#000",
          color:'#fff',
          borderRadius: 24,
          // marginTop: -12,
        }}
      >
        Chat with us
      </h1>
    </div>
  );
};

export default WhatsAppRedirect;
