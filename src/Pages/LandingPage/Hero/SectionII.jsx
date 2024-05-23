import React, { useState, useEffect } from "react";

const Typewriter = ({ text }) => {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const typeText = async () => {
      while (true) {
        for (let i = 0; i <= text.length; i++) {
          setDisplayText(text.substring(0, i));
          await new Promise((resolve) => setTimeout(resolve, 150)); // Adjust typing speed here
        }
        setIsTyping(false);
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Pause before rolling back
        for (let i = text.length; i >= 0; i--) {
          setDisplayText(text.substring(0, i));
          await new Promise((resolve) => setTimeout(resolve, 75)); // Adjust typing speed here
        }
        setIsTyping(true);
      }
    };

    typeText();
  }, [text]);

  return (
    <div>
      <h1
        style={{
          fontSize: 64,
          color: "#fff",
          textAlign: "center",
          padding: 24,
        }}
      >
        {displayText}
      </h1>
    </div>
  );
};

const SectionII = () => {
  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#C19F62",
      }}
    >
      <Typewriter text="What I ordered versus what I got!" />
    </div>
  );
};

export default SectionII;
