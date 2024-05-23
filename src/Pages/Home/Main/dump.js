import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import Modal from "../../Components/Modal/Modal";
import { useNavigate } from "react-router-dom";

const ImageUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [error, setError] = useState("");
  const [description, setDescription] = useState("");
  const [label, setLabel] = useState(""); // State for selected label
  const [deliveryOption, setDeliveryOption] = useState(""); // State for selected delivery option

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const allowedFormats = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    const maxSize = 10 * 1024 * 1024;

    const invalidFiles = files.filter(
      (file) => !allowedFormats.includes(file.type) || file.size > maxSize
    );

    if (invalidFiles.length === 0) {
      setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
      setError("");
    } else {
      setError(
        "Invalid file(s). Please select JPEG, PNG, GIF, or WEBP files under 10MB."
      );
    }
  };

  const handleDeliveryOptionClick = (option) => {
    setDeliveryOption(option);
    console.log("Selected Delivery Option:", option);
  };

  const handleCancel = (indexToRemove) => {
    setSelectedFiles((prevFiles) =>
      prevFiles.filter((file, index) => index !== indexToRemove)
    );
    setError("");
  };

  const handleAddMore = () => {
    document.getElementById("fileInput").click();
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

  const handleRemoveImage = (indexToRemove) => {
    setSelectedFiles((prevFiles) =>
      prevFiles.filter((file, index) => index !== indexToRemove)
    );
  };

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
              <span style={{ color: "#C19F62" }}> Perfectly 😊</span>
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
            <span style={{ color: "#C19F62" }}> choice of class? 👍</span>
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
                backgroundColor: label === "luxury" ? "#C19F62" : "#80808019",
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
                backgroundColor: label === "mid" ? "#C19F62" : "#80808019",
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
                backgroundColor: label === "top" ? "#C19F62" : "#80808019",
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
                backgroundColor: label === "average" ? "#C19F62" : "#80808019",
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
              <span style={{ color: "#C19F62" }}> Delivery ⏰ </span>Option
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
                    deliveryOption === "7days" ? "#C19F62" : "#80808019",
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
                    deliveryOption === "14days" ? "#C19F62" : "#80808019",
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
                    deliveryOption === "28days" ? "#C19F62" : "#80808019",
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
                    deliveryOption === "56days" ? "#C19F62" : "#80808019",
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

  const handleSubmit = () => {
    setModalOpen(true);
  };

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
          style={{ color: "#C19F62" }}
          // onClick={() => navigate("/createaccount")}
        >
          {" "}
          How it works
        </span>
      </p>
      {selectedFiles.length > 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "120px",
            gap: 12,
          }}
        >
          <button
            style={{ width: "fit-content" }}
            onClick={handleSubmit}
            className="btn-auth"
            type="button"
          >
            Submit
          </button>
        </div>
      ) : (
        <div
          style={{ backgroundColor: "#C19F6225", padding: 24, borderRadius: 4 }}
        >
          {/* Hidden file input */}
          <input
            type="file"
            onChange={handleFileChange}
            style={{ display: "none" }}
            id="fileInput" // added id to link button
            multiple // Allow multiple file selection
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
                Choose File(s)
              </button>
            </div>
          </label>
        </div>
      )}

      {error && <div style={{ color: "#C19F62" }}>{error}</div>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "16px",
        }}
      >
        {selectedFiles.map((file, index) => (
          <div key={index} style={{ position: "relative" }}>
            <img
              src={URL.createObjectURL(file)}
              alt={`Selected ${index}`}
              style={{ width: "100%", height: "100%", borderRadius: "8px" }}
            />
            <button
              onClick={() => handleRemoveImage(index)}
              style={{
                position: "absolute",
                top: "8px",
                right: "8px",
                background: "rgba(255, 255, 255, 0.7)",
                border: "none",
                borderRadius: "50%",
                width: "32px",
                height: "32px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <FaTimes style={{ color: "#ff0000" }} />
            </button>
          </div>
        ))}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "16px",
          }}
        >
          <button onClick={handleAddMore} className="btn-auth" type="button">
            Add More
          </button>
          <button onClick={handleSubmit} className="btn-auth" type="button">
            Submit
          </button>
        </div> 
      </div>

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
