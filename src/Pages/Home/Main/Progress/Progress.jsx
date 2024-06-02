// src/ProgressBar.js
import React from "react";
import "./ProgressBar.css"; // We'll define some styles in this file

const ProgressBarComponent = ({ progress }) => {
  return (
    <>
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>
      <h1 style={{ fontSize: 16, textAlign: "right" }}> {progress}%</h1>
    </>
  );
};

export default ProgressBarComponent;
