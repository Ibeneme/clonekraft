import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../Pages/Home/Main/Orders.css";
import { BsChatFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import {
  getOrdersAdmin,
  updateOrder,
  updateProgress,
} from "../../Redux/admin/admin";
import Modal from "../../Pages/Components/Modal/Modal";
import useCustomToasts from "../../Pages/ToastNotifications/Toastify";
import ProgressBarAdmin from "../Progress/Progress";
import "../Progress/ProgressBar.css";
import ProgressBarComponent from "../../Pages/Home/Main/Progress/Progress";

const AdminOrderDescriptionPage = () => {
  const location = useLocation();
  const { order } = location.state;
  console.log(order, "orderorder");
  const [filter, setFilter] = useState("all");
  const [ordersFetched, setOrdersFetched] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [inputValueErr, setInputValueErr] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setInputValueErr("");
  };

  const handleUpdateClick = () => {
    setInputValueErr("");
    const newProgress = parseInt(inputValue, 10);
    if (validateProgress(newProgress)) {
      setProgress(newProgress);
      //setInputValue("");
      handleProgressbar(newProgress);
    } else {
      setInputValueErr(
        "Progress value It must be higher than the current progress and not exceed 100."
      );
    }
  };

  const validateProgress = (newProgress) => {
    return newProgress > progress && newProgress <= 100;
  };

  useEffect(() => {
    handleFetchOrders();
  }, []);

  const traceOrder = order;
  const handleFetchOrders = () => {
    dispatch(getOrdersAdmin())
      .then((response) => {
        console.log("orders successful:", response);
        const matchedOrder = response?.payload.find(
          (order) => order?._id === traceOrder?._id
        );
        console.log(matchedOrder, "matchedOrder");
        if (matchedOrder) {
          setOrdersFetched(matchedOrder);
          setProgress(matchedOrder?.progress);
        } else {
          setOrdersFetched([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log("Profile fetch failed:", error);
        setLoading(false);
      });
  };

  // State to track the URL of the currently selected big display image
  const [bigDisplayImage, setBigDisplayImage] = useState(
    order.selectedImages[0]
  );

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Function to handle clicking on an image to set it as the big display
  const handleImageClick = (image, index) => {
    setBigDisplayImage(image);
    setSelectedImageIndex(index);
  };

  const formatDate = (date) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(date)?.toLocaleDateString(undefined, options);
  };

  // Function to calculate the delivery date based on order creation date and delivery option
  const calculateDeliveryDate = (createdAt, deliveryOption) => {
    const deliveryDate = new Date(createdAt);
    deliveryDate?.setDate(deliveryDate?.getDate() + deliveryOption);

    // Get today's date
    const today = new Date();

    // Check if the delivery date is past today
    if (deliveryDate < today) {
      return "Order already delivered";
    } else {
      // Format the delivery date using the formatDate function
      return formatDate(deliveryDate);
    }
  };

  // Function to capitalize the first letter and make the rest lowercase
  const capitalizeFirstLetter = (string) => {
    return (
      string?.charAt(0)?.toUpperCase() + string?.slice(1)?.toLowerCase() || " "
    );
  };

  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
  };

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [error, setError] = useState("");
  const [description, setDescription] = useState("");
  const [label, setLabel] = useState(""); // State for selected label
  const [deliveryOption, setDeliveryOption] = useState(""); // State for selected delivery option
  const [user, setUser] = useState([]);
  const { showSuccessToast, showErrorToast } = useCustomToasts();

  const formatUsername = (name) => {
    return (
      name?.charAt(0)?.toUpperCase() + name?.slice(1)?.toLowerCase() || " "
    );
  };

  const handleLabelClick = (selectedLabel) => {
    setLabel(selectedLabel);
    console.log("Selected Label:", selectedLabel);
  };

  const handleUploads = () => {
    setLoading(true);
    console.log(order?.price);
    const payload = {
      status: label,
      price: description ? description : ordersFetched?.price,
      order_id: ordersFetched?._id,
    };
    const order_id = order?._id;
    dispatch(updateOrder({ order_id: order_id, payload: payload }))
      .then((response) => {
        setLoading(false);
        // Handle success
        console.log("Request created successfully:", response);
        if (response?.payload?.message === "Order updated successfully") {
          showSuccessToast("Order Updated Successfully");
          handleFetchOrders();
          // navigate("/order");
          setModalOpen(false);
        } else {
          showErrorToast("Failed to update order");
        }
      })
      .catch((error) => {
        setLoading(true);
        showErrorToast("Errorupdating Order");
        console.error("Error Order Request:", error);
      });

    setModalOpen(false);
  };

  const handleProgressbar = (newProgress) => {
    const order_id = order?._id;
    //const newProgress = parseInt(inputValue, 10);
    console.log(newProgress, "handleProgressbar");
    dispatch(updateProgress({ order_id: order_id, progress: newProgress }))
      .then((response) => {
        setLoading(false);
        // Handle success
        console.log("progress created successfully:", response);
        if (
          response?.payload?.message === "Order progress updated successfully"
        ) {
          showSuccessToast("Order progress updated successfully");
          handleFetchOrders();
          // navigate("/order");
          setModalOpen(false);
        } else {
          showErrorToast("Failed to update order progress");
        }
      })
      .catch((error) => {
        setLoading(true);
        showErrorToast("Errorupdating Order");
        console.error("Error Order Request:", error);
      });

    setModalOpen(false);
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
            Update this Customer's Order
          </h2>
          <p className="auth-div-p">Learn about updating status</p>
          <h2
            className="vw-text"
            style={{
              fontSize: 18,
            }}
          >
            Choose a Status{" "}
            {/* <span style={{ color: "#C19F62" }}> quality range? 👍</span> */}
          </h2>
          <div
            className="label-container"
            style={{ display: "flex", marginTop: 12 }}
          >
            <label
              className={label === "pending" ? "selected" : ""}
              onClick={() => handleLabelClick("pending")}
              style={{
                marginRight: "10px",
                cursor: "pointer",
                padding: `12px 18px`,
                borderRadius: 4,
                backgroundColor: label === "pending" ? "#C19F62" : "#80808019",
                color: label === "pending" ? "#fff" : "#000",
              }}
            >
              Pending
            </label>
            <label
              className={label === "completed" ? "selected" : ""}
              onClick={() => handleLabelClick("completed")}
              style={{
                marginRight: "10px",
                cursor: "pointer",
                padding: `12px 18px`,
                borderRadius: 4,
                backgroundColor:
                  label === "completed" ? "#C19F62" : "#80808019",
                color: label === "completed" ? "#fff" : "#000",
              }}
            >
              Completed
            </label>
            <label
              className={label === "cancelled" ? "selected" : ""}
              onClick={() => handleLabelClick("cancelled")}
              style={{
                marginRight: "10px",
                cursor: "pointer",
                padding: `12px 18px`,
                borderRadius: 4,
                color: label === "cancelled" ? "#fff" : "#000",
                backgroundColor:
                  label === "cancelled" ? "#C19F62" : "#80808019",
              }}
            >
              Cancelled
            </label>
          </div>
          <br /> <br />
          {!ordersFetched?.price ? (
            <div>
              <h2
                className="vw-text"
                style={{
                  fontSize: 18,
                }}
              >
                Set a Price
                {/* <span style={{ color: "#C19F62" }}> design preference 😊</span> */}
              </h2>
              <input
                placeholder="Set a Price"
                value={description}
                className="input-field"
                onChange={(e) => setDescription(e.target.value)}
                //style={{ height: 120 }}
              />
            </div>
          ) : (
            <div>
              <h2
                className="vw-text"
                style={{
                  fontSize: 18,
                }}
              >
                Update Price
                {/* <span style={{ color: "#C19F62" }}> design preference 😊</span> */}
              </h2>
              <input
                placeholder="Set a Price"
                value={description}
                className="input-field"
                onChange={(e) => setDescription(e.target.value)}
                //style={{ height: 120 }}
              />
            </div>
          )}
          {/* {ordersFetched?.price && label ? (
            <div style={{ cursor: "pointer", marginTop: 40, marginBottom: 96 }}>
              <div className="div-btn-auth"></div>
              <button
                // onClick={() => navigate("/pricing")}
                onClick={handleUploads}
                className="btn-auth"
                type="button"
                disabled={loading}
              >
                {loading ? "Loading..." : "Update Status"}
              </button>
            </div>
          ) : null} */}
          <br />
          <div style={{ cursor: "pointer", marginTop: 40, marginBottom: 96 }}>
            <div className="div-btn-auth"></div>
            <button
              // onClick={() => navigate("/pricing")}
              onClick={handleUploads}
              className="btn-auth"
              type="button"
              disabled={loading}
            >
              {loading ? "Loading..." : "Update Status"}
            </button>
          </div>{" "}
        </div>
      </div>
    </div>
  );

  const handleOrderClicks = (ordersFetched) => {
    console.log("kksks");
    navigate("/chat-user", { state: { order: ordersFetched } });
    // Navigate to another page and pass the selected order as a parameter
    // history.push(`/order-description/${order._id}`, { order });
  };

  return (
    <div className="invoice-container">
      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        ifClose={true}
        formContent={Content}
      />
      <div className="invoice-header">
        <div>
          <h2 className="invoice-header-h2">
            Order Details - {capitalizeFirstLetter(ordersFetched?.status)}
          </h2>
          <p className="invoice-header-p-id">Order ID: {order?._id}</p>

          <br />
          <button
            style={{ marginBottom: -64 }}
            className="upload-btn"
            onClick={() => setModalOpen(true)}
          >
            Update this Status
          </button>

          <br />
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
        <p
          style={{
            color: "#fff",
            backgroundColor: "#C19F62",
            padding: 16,
            borderRadius: 24,
            cursor: "pointer",
            fontSize: 12,
            display: "flex",
            gap: 12,
            height: "fit-content",
          }}
          onClick={() => handleOrderClicks(ordersFetched)}
        >
          <span className="hide-bid"> Message</span>{" "}
          <span>
            {" "}
            <BsChatFill />
          </span>
        </p>
      </div>

      <div className="flex-orders">
        <div className="flex-orders-div">
          <div className="big-display-container">
            <img
              src={bigDisplayImage}
              alt="Big Display"
              className="big-display-image"
            />
          </div>
          <div className="invoice-images">
            <div className="image-grid">
              {ordersFetched?.selectedImages?.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Image ${index + 1}`}
                  className={
                    index === selectedImageIndex
                      ? "selected-image-item"
                      : "image-item"
                  }
                  onClick={() => handleImageClick(image, index)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="order-info">
          <h3>Order Information</h3>
          <p>Status: {capitalizeFirstLetter(ordersFetched?.status)}</p>
          {/* <p>Status: {capitalizeFirstLetter(ordersFetched?.status)}</p>
          <p>Seaters: {capitalizeFirstLetter(ordersFetched?.seaters)}</p>
          <p>Choice: {capitalizeFirstLetter(ordersFetched?.choice)}</p>
          <p>
            Style of Furniture:{" "}
            {capitalizeFirstLetter(ordersFetched?.styleOfChair)}
          </p>
          <p>Shape: {capitalizeFirstLetter(ordersFetched?.shape)}</p> */}

          <p>Order Created At: {formatDate(ordersFetched?.createdAt)}</p>
          <p>
            To be Delivered:{" "}
            {calculateDeliveryDate(
              ordersFetched?.createdAt,
              ordersFetched?.deliveryOption
            )}
          </p>
          <h1>
            {ordersFetched?.price
              ? `₦${ordersFetched.price.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })} `
              : "Pls set a Price"}
          </h1>

          <div>
            <br />
            <p
              style={{
                fontSize: 14,
              }}
            >
              Description:
            </p>
            <p
              style={{
                backgroundColor: "#C19F6220",
                color: "#C19F62",
                padding: 16,
                borderRadius: 12,
                marginTop: -8,
              }}
            >
              {ordersFetched.description}
            </p>
          </div>
          <br />
          <div className="customer-details">
            <h3>Customer Information</h3>
            <p>Customer's Email: {ordersFetched?.email}</p>
            <p>Customer's Phone Number: {ordersFetched?.phoneNumber}</p>
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDescriptionPage;
