import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import Modal from "react-modal"; // Use any modal library you prefer
import "./ImageUpload.css"; // Ensure you have appropriate styles
import { updateOrderPhotos } from "../../Redux/order/order";
import { useDispatch } from "react-redux";
import useCustomToasts from "../../Pages/ToastNotifications/Toastify";

const ImageUpload = ({ order }) => {
  //
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { showSuccessToast, showErrorToast } = useCustomToasts();

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const allowedFormats = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    const maxSize = 10 * 1024 * 1024;

    const validFiles = files.filter(
      (file) => allowedFormats.includes(file.type) && file.size <= maxSize
    );

    if (validFiles.length > 0) {
      setSelectedFiles((prevFiles) => [...prevFiles, ...validFiles]);
    } else {
      alert(
        "Invalid file(s). Please select JPEG, PNG, GIF, or WEBP files under 10MB."
      );
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    setSelectedFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToRemove)
    );
  };

  // const handleSubmit = () => {
  //   setModalOpen(true);
  // };

  const handleSubmit = () => {
    setLoading(true); // Set loading to true when submitting

    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append("images", file));

    dispatch(updateOrderPhotos({ orderID: order._id, credentials: formData }))
      .then((response) => {
        console.log("Upload successful:", response);

        if (
          response?.payload?.message === "Progress images updated successfully"
        ) {
          showSuccessToast("Upload successful");
          setModalOpen(false);
          setSelectedFiles([]);
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error("Upload failed:", error);
        showErrorToast("Upload failed. Please try again.");
        // Handle error appropriately, e.g., display an error message
      })
      .finally(() => {
        setLoading(false); // Set loading back to false after completion
      });
  };

  return (
    <div className="image-upload-container">
      <h2 style={{ textAlign: "left" }}>
        Upload Photos of progress for your client to see
      </h2>
      <p style={{ fontSize: 12 }}></p>
      <br /> <br />
      <input
        type="file"
        onChange={handleFileChange}
        style={{ display: "none" }}
        id="fileInput"
        multiple
      />
      <label htmlFor="fileInput" className="upload-button">
        Choose File(s)
      </label>
      <div className="image-preview-grid">
        {selectedFiles.map((file, index) => (
          <div key={index} className="image-preview">
            <img src={URL.createObjectURL(file)} alt={`Selected ${index}`} />
            <button
              //className="remove-button"
              onClick={() => handleRemoveImage(index)}
              style={{ color: "red", backgroundColor: "#ffffff45" }}
            >
              <FaTimes color="#ff0000" />
            </button>
          </div>
        ))}
      </div>
      {selectedFiles.length > 0 && (
        <button
          className="submit-button"
          onClick={handleSubmit}
          disabled={loading} // Disable button when loading
        >
          {loading ? "Uploading..." : "Submit"}
        </button>
      )}
      {/* <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2>Preview Selected Images</h2>
        <div className="modal-image-grid">
          {selectedFiles.map((file, index) => (
            <img
              key={index}
              src={URL.createObjectURL(file)}
              alt={`Selected ${index}`}
            />
          ))}
        </div>
        <button className="upload-button" onClick={handleUpload}>
          Upload
        </button>
      </Modal> */}
    </div>
  );
};

export default ImageUpload;
