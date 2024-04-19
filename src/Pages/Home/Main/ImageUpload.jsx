import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import Modal from "../../Components/Modal/Modal";
import { useNavigate } from "react-router-dom";

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");
  const [description, setDescription] = useState("");
  const [label, setLabel] = useState(""); // State for selected label
  const [deliveryOption, setDeliveryOption] = useState(""); // State for selected delivery option

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const allowedFormats = ["image/jpeg", "image/png", "image/gif"];
    const maxSize = 10 * 1024 * 1024;

    if (file && allowedFormats.includes(file.type) && file.size <= maxSize) {
      setSelectedFile(file);
      setError("");
    } else {
      setSelectedFile(null);
      setError(
        "Invalid file. Please select a JPEG, PNG, or GIF file under 10MB."
      );
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setError("");
  };

  const handleDeliveryOptionClick = (option) => {
    setDeliveryOption(option);
    console.log("Selected Delivery Option:", option);
  };

  const handleUpload = () => {
    setModalOpen(true);
    console.log("Upload functionality will be implemented here");
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleLabelClick = (selectedLabel) => {
    setLabel(selectedLabel);
    console.log("Selected Label:", selectedLabel);
  };

  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const Content = (
    <div>
      <div>
        <div className="vw">
          <h2
            className="vw-text"
            style={{
              fontSize: 48,
            }}
          >
            Tell us about the image you're uploading
          </h2>
          <p className="auth-div-p">Learn about uploading your design</p>

          <div>
            <h2
              className="vw-text"
              style={{
                fontSize: 18,
              }}
            >
              Explain your designs{" "}
              <span style={{ color: "#007bff" }}> Perfectly 😊</span>
            </h2>
            <textarea
              placeholder="Description"
              value={description}
              className="input-field"
              onChange={(e) => setDescription(e.target.value)}
              style={{ height: 120 }}
            />
          </div>

          <br />
          <h2
            className="vw-text"
            style={{
              fontSize: 18,
            }}
          >
            What's your
            <span style={{ color: "#007bff" }}> choice of class? 👍</span>
          </h2>

          <div
            className="label-container"
            style={{ display: "flex", marginTop: 12 }}
          >
            <label
              className={label === "luxury" ? "selected" : ""}
              onClick={() => handleLabelClick("luxury")}
              style={{
                marginRight: "10px",
                cursor: "pointer",
                padding: `12px 18px`,
                borderRadius: 4,
                backgroundColor: label === "luxury" ? "#007bff" : "#80808019",
                color: label === "luxury" ? "#fff" : "#000",
              }}
            >
              Luxury
            </label>
            <label
              className={label === "mid" ? "selected" : ""}
              onClick={() => handleLabelClick("mid")}
              style={{
                marginRight: "10px",
                cursor: "pointer",
                padding: `12px 18px`,
                borderRadius: 4,
                color: label === "mid" ? "#fff" : "#000",
                backgroundColor: label === "mid" ? "#007bff" : "#80808019",
              }}
            >
              Mid
            </label>
            <label
              className={label === "top" ? "selected" : ""}
              onClick={() => handleLabelClick("top")}
              style={{
                marginRight: "10px",
                cursor: "pointer",
                padding: `12px 18px`,
                borderRadius: 4,
                color: label === "top" ? "#fff" : "#000",
                backgroundColor: label === "top" ? "#007bff" : "#80808019",
              }}
            >
              Top
            </label>
            <label
              className={label === "average" ? "selected" : ""}
              onClick={() => handleLabelClick("average")}
              style={{
                marginRight: "10px",
                cursor: "pointer",
                padding: `12px 18px`,
                borderRadius: 4,
                color: label === "average" ? "#fff" : "#000",
                backgroundColor: label === "average" ? "#007bff" : "#80808019",
              }}
            >
              Average
            </label>
          </div>

          <div style={{ marginBottom: 48 }}>
            <br /> <br />
            <h2
              className="vw-text"
              style={{
                fontSize: 18,
              }}
            >
              Select
              <span style={{ color: "#007bff" }}> Delivery ⏰ </span>Option
            </h2>
            <div
              className="delivery-options"
              style={{ display: "flex", marginTop: 12 }}
            >
              {/* <label
              className={deliveryOption === "3days" ? "selected" : ""}
              onClick={() => handleDeliveryOptionClick("3days")}
            >
              3 Days
            </label> */}
              <label
                style={{
                  marginRight: "10px",
                  cursor: "pointer",
                  padding: `12px 18px`,
                  borderRadius: 4,
                  backgroundColor:
                    deliveryOption === "7days" ? "#007bff" : "#80808019",
                  color: deliveryOption === "7days" ? "#fff" : "#000",
                }}
                className={deliveryOption === "7days" ? "selected" : ""}
                onClick={() => handleDeliveryOptionClick("7days")}
              >
                7 Days
              </label>
              <label
                style={{
                  marginRight: "10px",
                  cursor: "pointer",
                  padding: `12px 18px`,
                  borderRadius: 4,
                  backgroundColor:
                    deliveryOption === "14days" ? "#007bff" : "#80808019",
                  color: deliveryOption === "14days" ? "#fff" : "#000",
                }}
                className={deliveryOption === "14days" ? "selected" : ""}
                onClick={() => handleDeliveryOptionClick("14days")}
              >
                14 Days
              </label>
              <label
                style={{
                  marginRight: "10px",
                  cursor: "pointer",
                  padding: `12px 18px`,
                  borderRadius: 4,
                  backgroundColor:
                    deliveryOption === "28days" ? "#007bff" : "#80808019",
                  color: deliveryOption === "28days" ? "#fff" : "#000",
                }}
                className={deliveryOption === "28days" ? "selected" : ""}
                onClick={() => handleDeliveryOptionClick("28days")}
              >
                4 weeks
              </label>
              <label
                style={{
                  marginRight: "10px",
                  cursor: "pointer",
                  padding: `12px 18px`,
                  borderRadius: 4,
                  backgroundColor:
                    deliveryOption === "56days" ? "#007bff" : "#80808019",
                  color: deliveryOption === "56days" ? "#fff" : "#000",
                }}
                className={deliveryOption === "56days" ? "selected" : ""}
                onClick={() => handleDeliveryOptionClick("56days")}
              >
                2 months
              </label>
            </div>
          </div>

          <div style={{ cursor: "pointer", marginTop: 40, marginBottom: 96 }}>
            <div className="div-btn-auth"></div>
            {deliveryOption && label ? (
              <button
                onClick={() => navigate("/pricing")}
                className="btn-auth"
                type="button"
              >
                Estimate Price
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <div
      style={{
        padding: "222px 16px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h2>Upload your Design</h2>
      <p className="auth-div-p">
        Learn about uploading your design
        <span
          style={{ color: "#007bff" }}
          // onClick={() => navigate("/createaccount")}
        >
          {" "}
          How it works
        </span>
      </p>
      <div
        style={{ backgroundColor: "#007bff25", padding: 24, borderRadius: 4 }}
      >
        {/* Hidden file input */}
        <input
          type="file"
          onChange={handleFileChange}
          style={{ display: "none" }}
          id="fileInput" // added id to link button
        />
        {/* Custom styled button */}
        <label htmlFor="fileInput" style={{ cursor: "pointer" }}>
          <div style={{ cursor: "pointer" }}>
            <div className="div-btn-auth"></div>
            <button
              onClick={() => document.getElementById("fileInput").click()}
              className="btn-auth"
              type="button"
            >
              Choose a File
            </button>
          </div>
        </label>
      </div>
      {error && <div style={{ color: "#007bff" }}>{error}</div>}
      {selectedFile && (
        <div
          style={{
            paddingTop: 24,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: 400,
          }}
        >
          <span
            style={{
              display: "flex",
              marginTop: 36,
              backgroundColor: "#ff0000",
              padding: 12,
              marginBottom: 4,
              borderRadius: 122,
              color: "#fff",
            }}
          >
            <FaTimes onClick={handleCancel} />
          </span>
          <img
            src={URL.createObjectURL(selectedFile)}
            alt="Selected"
            style={{ width: "100%", height: "100%" }}
          />
          <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
            <div style={{ cursor: "pointer" }}>
              <div className="div-btn-auth"></div>
              <button onClick={handleUpload} className="btn-auth" type="button">
                Upload
              </button>
            </div>
          </div>
        </div>
      )}

      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        ifClose={true}
        formContent={Content}
      />
    </div>
  );
};

export default ImageUpload;
