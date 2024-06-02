// src/ProgressBarAdmin.js
import React, { useState, useEffect } from "react";
import ProgressBarComponent from "../../Pages/Home/Main/Progress/Progress";
import "./ProgressBar.css";

function ProgressBarAdmin() {
  const [progress, setProgress] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [inputValueErr, setInputValueErr] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setInputValueErr('')
  };

  const handleUpdateClick = () => {
    setInputValueErr('')
    const newProgress = parseInt(inputValue, 10);
    if (validateProgress(newProgress)) {
      setProgress(newProgress);
      setInputValue("");
    } else {
      setInputValueErr(
        "Progress value It must be higher than the current progress and not exceed 100."
      );
    }
  };

  const validateProgress = (newProgress) => {
    return newProgress > progress && newProgress <= 100;
  };

  return (
    <div className="App">
      <h1 style={{ fontSize: 16, marginTop: 100 }}>
        Update the Progress level
      </h1>
      <ProgressBarComponent progress={progress} />
      <div className="input-container">
        <input
          type="number"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter new progress"
        />
        <button onClick={handleUpdateClick}>Update Progress</button>
      </div>
      <p style={{ color: "red", fontSize: 16 }}>{inputValueErr}</p>
    </div>
  );
}

export default ProgressBarAdmin;
