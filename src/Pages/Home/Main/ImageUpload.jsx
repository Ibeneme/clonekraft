import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import Modal from "../../Components/Modal/Modal";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { profile } from "../../../Redux/auth/auth";
import { createOrder } from "../../../Redux/order/order";
import useCustomToasts from "../../ToastNotifications/Toastify";

const ImageUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [error, setError] = useState("");
  const [description, setDescription] = useState("");
  const [label, setLabel] = useState(""); // State for selected label
  const [deliveryOption, setDeliveryOption] = useState(""); // State for selected delivery option
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [user, setUser] = useState([]);
  const { showSuccessToast, showErrorToast } = useCustomToasts();

  //const { showSuccessToast, showErrorToast } = useCustomToasts();
  const handleFetchUser = () => {
    dispatch(profile())
      .then((response) => {
        console.log("profile successful:", response);
        setUser(response?.payload);
      })
      .catch((error) => {
        console.log("Registration failed:", error);
      });
  };

  useEffect(() => {
    handleFetchUser();
  }, []);

  const formatUsername = (name) => {
    return name?.charAt(0)?.toUpperCase() + name?.slice(1)?.toLowerCase();
  };

  const formattedUsername = formatUsername(user?.username);

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

  const handleUploads = () => {
    setLoading(true);
    // Create a new FormData object
    const formData = new FormData();

    // Append selected images to the FormData object
    selectedFiles.forEach((file) => {
      formData.append("images", file);
    });

    // Append other order data to the FormData object
    formData.append("selectedLabel", label);
    formData.append("description", description);
    formData.append("deliveryOption", deliveryOption);

    // Dispatch the createOrder action with formData
    dispatch(createOrder(formData))
      .then((response) => {
        setLoading(false);
        // Handle success
        console.log("Request created successfully:", response);
        if (response?.payload?.order?.description) {
          showSuccessToast("Request Created Successfully");
          navigate("/order");
        } else {
          showErrorToast("Failed to Upload Request");
        }
      })
      .catch((error) => {
        setLoading(true);
        showErrorToast("Error Order Request");
        console.error("Error Order Request:", error);
      });

    setModalOpen(true);
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
            <span style={{ color: "#C19F62" }}>
              {formattedUsername ? `${formattedUsername}` : null},{" "}
            </span>{" "}
            Tell us about the image you're uploading
          </h2>
          <p className="auth-div-p">Learn about uploading your design</p>

          <h2
            className="vw-text"
            style={{
              fontSize: 18,
            }}
          >
            Choose your{" "}
            <span style={{ color: "#C19F62" }}> quality range? 👍</span>
          </h2>

          <div
            className="label-container"
            style={{ display: "flex", marginTop: 12 }}
          >
            <label
              className={label === "basic" ? "selected" : ""}
              onClick={() => handleLabelClick("basic")}
              style={{
                marginRight: "10px",
                cursor: "pointer",
                padding: `12px 18px`,
                borderRadius: 4,
                backgroundColor: label === "basic" ? "#C19F62" : "#80808019",
                color: label === "basic" ? "#fff" : "#000",
              }}
            >
              Basic
            </label>
            <label
              className={label === "standard" ? "selected" : ""}
              onClick={() => handleLabelClick("standard")}
              style={{
                marginRight: "10px",
                cursor: "pointer",
                padding: `12px 18px`,
                borderRadius: 4,
                color: label === "standard" ? "#fff" : "#000",
                backgroundColor: label === "standard" ? "#C19F62" : "#80808019",
              }}
            >
              Standard
            </label>
            <label
              className={label === "premium" ? "selected" : ""}
              onClick={() => handleLabelClick("premium")}
              style={{
                marginRight: "10px",
                cursor: "pointer",
                padding: `12px 18px`,
                borderRadius: 4,
                color: label === "premium" ? "#fff" : "#000",
                backgroundColor: label === "premium" ? "#C19F62" : "#80808019",
              }}
            >
              Premium
            </label>
            <label
              className={label === "elite" ? "selected" : ""}
              onClick={() => handleLabelClick("elite")}
              style={{
                marginRight: "10px",
                cursor: "pointer",
                padding: `12px 18px`,
                borderRadius: 4,
                color: label === "elite" ? "#fff" : "#000",
                backgroundColor: label === "elite" ? "#C19F62" : "#80808019",
              }}
            >
              Elite
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
              <span style={{ color: "#C19F62" }}> Delivery ⏰ </span>Option in
              days
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
                    deliveryOption === 14 ? "#C19F62" : "#80808019",
                  color: deliveryOption === 14 ? "#fff" : "#000",
                }}
                className={deliveryOption === 14 ? "selected" : ""}
                onClick={() => handleDeliveryOptionClick(14)}
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
                    deliveryOption === 28 ? "#C19F62" : "#80808019",
                  color: deliveryOption === 28 ? "#fff" : "#000",
                }}
                className={deliveryOption === 28 ? "selected" : ""}
                onClick={() => handleDeliveryOptionClick(28)}
              >
                28 Days
              </label>
              <label
                style={{
                  marginRight: "10px",
                  cursor: "pointer",
                  padding: `12px 18px`,
                  borderRadius: 4,
                  backgroundColor:
                    deliveryOption === 42 ? "#C19F62" : "#80808019",
                  color: deliveryOption === 42 ? "#fff" : "#000",
                }}
                className={deliveryOption === 42 ? "selected" : ""}
                onClick={() => handleDeliveryOptionClick(42)}
              >
                6 weeks
              </label>
              <label
                style={{
                  marginRight: "10px",
                  cursor: "pointer",
                  padding: `12px 18px`,
                  borderRadius: 4,
                  backgroundColor:
                    deliveryOption === 60 ? "#C19F62" : "#80808019",
                  color: deliveryOption === 60 ? "#fff" : "#000",
                }}
                className={deliveryOption === 60 ? "selected" : ""}
                onClick={() => handleDeliveryOptionClick(60)}
              >
                2 months
              </label>
            </div>
          </div>

          <div>
            <h2
              className="vw-text"
              style={{
                fontSize: 18,
              }}
            >
              Tell us, what's your{" "}
              <span style={{ color: "#C19F62" }}> design preference 😊</span>
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

          {deliveryOption && label && description ? (
            <div style={{ cursor: "pointer", marginTop: 40, marginBottom: 96 }}>
              <div className="div-btn-auth"></div>
              <button
                // onClick={() => navigate("/pricing")}
                onClick={handleUploads}
                className="btn-auth"
                type="button"
                disabled={loading}
              >
                {loading ? "Loading..." : "Estimate Price"}
              </button>
            </div>
          ) : null}
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
      <h2>
        {" "}
        <span style={{ color: "#C19F62" }}>
          {formattedUsername ? `Hi ${formattedUsername}` : null},{" "}
        </span>{" "}
        You can Upload your Design
      </h2>
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
      <br />
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

        {/* <div
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
        </div> */}
      </div>
      {selectedFiles?.length > 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "120px",
            gap: 12,
            alignItems: "center",
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
      ) : null}
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
