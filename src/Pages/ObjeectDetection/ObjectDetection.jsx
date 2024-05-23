// src/components/ObjectDetection.js
import React, { useState, useRef, useEffect } from "react";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs";
import { useDropzone } from "react-dropzone";
import Modal from "../Components/Modal/Modal";
import { useDispatch } from "react-redux";
import { profile } from "../../Redux/auth/auth";

const ObjectDetection = () => {
  const [imageData, setImageData] = useState(null);
  const imageRef = useRef();
  const dispatch = useDispatch();
  // Convert pixels to centimeters
  const convertPixelsToCm = (pixels) => {
    const PPI = 96; // Assumed pixels per inch
    const inches = pixels / PPI;
    const cm = inches * 2.54; // 1 inch = 2.54 cm
    return cm.toFixed(2); // Rounded to 2 decimal places
  };

  // Classify the seating based on width and height
  const classifySeating = (widthCm, heightCm, objectClass) => {
    const ratio = heightCm / widthCm;

    // Dining Chair classification
    if (ratio >= 1.8 && ratio <= 2.5) return "Dining Chair";

    // Upholstered or Chair classification
    let seatingType = objectClass === "couch" ? "Upholstered" : "Chair";
    if (ratio > 1) {
      return seatingType;
    }

    // Check if object is a bench or cabinet based on class name
    if (objectClass === "bench") {
      return "Cabinet";
    }

    // Specific classifications based on width-to-height ratio
    if (widthCm / heightCm >= 0.7 && widthCm / heightCm <= 1.7)
      return `${seatingType} - Single Seater`;
    if (widthCm / heightCm >= 1.8 && widthCm / heightCm <= 3.3)
      return `${seatingType} - Double Seater`;

    return "Unknown";
  };

  // Handle file drop event
  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    const imageUrl = URL.createObjectURL(file);
    const image = new Image();
    image.src = imageUrl;
    setImageData({ url: imageUrl, image, objects: [] });

    image.onload = () => detectObjects(image);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
  });

  // Detect objects in the given image
  const detectObjects = async (image) => {
    const model = await cocoSsd.load();
    const predictions = await model.detect(image);
    setImageData((prevImageData) => ({
      ...prevImageData,
      objects: predictions,
    }));
  };

  const [error, setError] = useState("");
  const [description, setDescription] = useState("");
  const [label, setLabel] = useState(""); // State for selected label
  const [deliveryOption, setDeliveryOption] = useState(""); // State for selected delivery option
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);
  const [choice, setChoice] = useState("");
  const [shape, setShape] = useState("");
  const [seaters, setSeaters] = useState("");

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

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    handleFetchUser();
  }, []);

  const formatUsername = (name) => {
    return name?.charAt(0)?.toUpperCase() + name?.slice(1)?.toLowerCase();
  };

  const formattedUsername = formatUsername(user?.username);

  const [modalOpen, setModalOpen] = useState(false);
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

          <div style={{ marginBottom: 48 }}>
            <br /> <br />
            <h2
              className="vw-text"
              style={{
                fontSize: 18,
              }}
            >
              Which
              <span style={{ color: "#C19F62" }}> Furniture </span>
              do you want{" "}
            </h2>
            <div
              className="delivery-options"
              style={{ display: "flex", marginTop: 12 }}
            >
              <label
                style={{
                  marginRight: "10px",
                  cursor: "pointer",
                  padding: `12px 18px`,
                  borderRadius: 4,
                  backgroundColor:
                    deliveryOption === "Upholstery" ? "#C19F62" : "#80808019",
                  color: deliveryOption === "Upholstery" ? "#fff" : "#000",
                }}
                className={deliveryOption === "Upholstery" ? "selected" : ""}
                onClick={() => handleChoice("Upholstery")}
              >
                Upholstery
              </label>
              <label
                style={{
                  marginRight: "10px",
                  cursor: "pointer",
                  padding: `12px 18px`,
                  borderRadius: 4,
                  backgroundColor:
                    deliveryOption === "Cabinet" ? "#C19F62" : "#80808019",
                  color: deliveryOption === "Cabinet" ? "#fff" : "#000",
                }}
                className={deliveryOption === "Cabinet" ? "selected" : ""}
                onClick={() => handleChoice("Cabinet")}
              >
                Cabinet
              </label>
            </div>
          </div>

          <div style={{ marginBottom: 48 }}>
            <br /> <br />
            <h2
              className="vw-text"
              style={{
                fontSize: 18,
              }}
            >
              How do you want it shaped
              <span style={{ color: "#C19F62" }}> shaped ?</span>
            </h2>
            <div
              className="delivery-options"
              style={{ display: "flex", marginTop: 12 }}
            >
              <label
                style={{
                  marginRight: "10px",
                  cursor: "pointer",
                  padding: `12px 18px`,
                  borderRadius: 4,
                  backgroundColor:
                    deliveryOption === "l-shaped" ? "#C19F62" : "#80808019",
                  color: deliveryOption === "l-shaped" ? "#fff" : "#000",
                }}
                className={deliveryOption === "l-shaped" ? "selected" : ""}
                onClick={() => handleShape("l-shaped")}
              >
                L - Shaped
              </label>
              <label
                style={{
                  marginRight: "10px",
                  cursor: "pointer",
                  padding: `12px 18px`,
                  borderRadius: 4,
                  backgroundColor:
                    deliveryOption === "straight" ? "#C19F62" : "#80808019",
                  color: deliveryOption === "straight" ? "#fff" : "#000",
                }}
                className={deliveryOption === "straight" ? "selected" : ""}
                onClick={() => handleShape("straight")}
              >
                Straight
              </label>
            </div>
          </div>

          <div style={{ marginBottom: 48 }}>
            <br /> <br />
            <h2
              className="vw-text"
              style={{
                fontSize: 18,
              }}
            >
              How many seaters
              <span style={{ color: "#C19F62" }}>seaters </span>
              do you need?
            </h2>
            <div
              className="delivery-options"
              style={{ display: "flex", marginTop: 12 }}
            >
              <label
                style={{
                  marginRight: "10px",
                  cursor: "pointer",
                  padding: `12px 18px`,
                  borderRadius: 4,
                  backgroundColor:
                    deliveryOption === "single-seater"
                      ? "#C19F62"
                      : "#80808019",
                  color: deliveryOption === "single-seater" ? "#fff" : "#000",
                }}
                className={deliveryOption === "single-seater" ? "selected" : ""}
                onClick={() => handleSeaters("single-seater")}
              >
                Single Seater
              </label>
              <label
                style={{
                  marginRight: "10px",
                  cursor: "pointer",
                  padding: `12px 18px`,
                  borderRadius: 4,
                  backgroundColor:
                    deliveryOption === "double-seater"
                      ? "#C19F62"
                      : "#80808019",
                  color: deliveryOption === "double-seater" ? "#fff" : "#000",
                }}
                className={deliveryOption === "double-seater" ? "selected" : ""}
                onClick={() => handleSeaters("double-seater")}
              >
                Double Seater
              </label>
            </div>
            <div
              className="delivery-options"
              style={{ display: "flex", marginTop: 12 }}
            >
              <label
                style={{
                  marginRight: "10px",
                  cursor: "pointer",
                  padding: `12px 18px`,
                  borderRadius: 4,
                  backgroundColor:
                    deliveryOption === "double-and-single"
                      ? "#C19F62"
                      : "#80808019",
                  color:
                    deliveryOption === "double-and-single" ? "#fff" : "#000",
                }}
                className={
                  deliveryOption === "double-and-single" ? "selected" : ""
                }
                onClick={() => handleSeaters("double-and-single")}
              >
                Double Seater and A Single Seater
              </label>

              <label
                style={{
                  marginRight: "10px",
                  cursor: "pointer",
                  padding: `12px 18px`,
                  borderRadius: 4,
                  backgroundColor:
                    deliveryOption === "three-single" ? "#C19F62" : "#80808019",
                  color: deliveryOption === "three-single" ? "#fff" : "#000",
                }}
                className={deliveryOption === "three-single" ? "selected" : ""}
                onClick={() => handleSeaters("three-single")}
              >
                Three Seater and A Single Seater
              </label>
              <label
                style={{
                  marginRight: "10px",
                  cursor: "pointer",
                  padding: `12px 18px`,
                  borderRadius: 4,
                  backgroundColor:
                    deliveryOption === "three-double-single"
                      ? "#C19F62"
                      : "#80808019",
                  color:
                    deliveryOption === "three-double-single" ? "#fff" : "#000",
                }}
                className={
                  deliveryOption === "three-double-single" ? "selected" : ""
                }
                onClick={() => handleSeaters("three-double-single")}
              >
                Three Seater and A double seater, A Single Seater
              </label>
            </div>
          </div>

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

  const handleDeliveryOptionClick = (option) => {
    setDeliveryOption(option);
    console.log("Selected Delivery Option:", option);
  };

  const handleChoice = (option) => {
    setChoice(option);
    console.log("Selected Delivery Option:", option);
  };

  const handleShape = (option) => {
    setShape(option);
    console.log("Selected Delivery Option:", option);
  };

  const handleSeaters = (option) => {
    setSeaters(option);
    console.log("Selected Delivery Option:", option);
  };

  const handleLabelClick = (selectedLabel) => {
    setLabel(selectedLabel);
    console.log("Selected Label:", selectedLabel);
  };

  return (
    <div style={styles.container}>
      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        ifClose={true}
        formContent={Content}
      />

      <h1>Upload an Image</h1>
      <div style={styles.uploadBox} {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag & drop a file here, or click to select a file</p>
      </div>
      {imageData && (
        <div style={styles.imageWrapper} className="imagewrapper">
          <img
            src={imageData.url}
            alt="Uploaded"
            ref={imageRef}
            style={styles.image}
            className="imageimage"
          />
          {imageData.objects.length > 0 && (
            <div>
              <h2>Detected Objects:</h2>
              <ul>
                {imageData.objects.map((object, index) => (
                  <>
                    {" "}
                    <li key={index}>
                      {/* {object.class} - Width: {object.bbox[2].toFixed(2)} px,
                  Height: {object.bbox[3].toFixed(2)} px - 
                   */}
                      Classification:{" "}
                      {classifySeating(
                        convertPixelsToCm(object.bbox[2]),
                        convertPixelsToCm(object.bbox[3]),
                        object.class
                      )}
                    </li>
                  </>
                ))}
              </ul>
              <button
                style={{
                  backgroundColor: `var(--darkOrange)`,
                  border: "none",
                  padding: `16px 24px`,
                  borderRadius: 24,
                  color: "#Fff",
                }}
                onClick={() => setModalOpen(true)}
              >
                Estimate Price for all
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 120,
  },
  uploadBox: {
    backgroundColor: "#C19F6225",
    padding: 48,
    borderRadius: 24,
    textAlign: "center",
  },
  imageWrapper: {
    marginTop: 24,
  },
  image: {
    // width: 400,
    // height: 300,
    borderRadius: 24,
  },
};

export default ObjectDetection;
