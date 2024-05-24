import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Orders.css"; // Import CSS file for styling
import { BsChatFill } from "react-icons/bs";
//import { formatDate } from "./Profile";

const OrderDescriptionPage = () => {
  const location = useLocation();
  const { order } = location.state;

  // State to track the URL of the currently selected big display image
  const [bigDisplayImage, setBigDisplayImage] = useState(
    order.selectedImages[0]
  );
  // State to track the index of the currently selected image
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Function to handle clicking on an image to set it as the big display
  const handleImageClick = (image, index) => {
    setBigDisplayImage(image);
    setSelectedImageIndex(index);
  };

  const formatDate = (date) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  // Function to calculate the delivery date based on order creation date and delivery option
  const calculateDeliveryDate = (createdAt, deliveryOption) => {
    const deliveryDate = new Date(createdAt);
    deliveryDate.setDate(deliveryDate.getDate() + deliveryOption);

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
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const navigate = useNavigate();
  const handleOrderClicks = (order) => {
    console.log("kksks");
    navigate("/chatpage", { state: { order: order } });
    // Navigate to another page and pass the selected order as a parameter
    // history.push(`/order-description/${order._id}`, { order });
  };
  return (
    <div className="invoice-container">
      <div className="invoice-header">
        <div>
          <h2 className="invoice-header-h2">
            Order Details - {capitalizeFirstLetter(order.status)}
          </h2>
          <p className="invoice-header-p-id">Order ID: {order?._id}</p>
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
          onClick={() => handleOrderClicks(order)}
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
              {order?.selectedImages?.map((image, index) => (
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
          <p>Class: {capitalizeFirstLetter(order.selectedLabel)}</p>
          <p>Status: {capitalizeFirstLetter(order.status)}</p>
          <p>Order Created At: {formatDate(order?.createdAt)}</p>
          <p>
            To be Delivered:{" "}
            {calculateDeliveryDate(order?.createdAt, order?.deliveryOption)}
          </p>

          <h1>
            {order?.price
              ? `₦${order?.price.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })} `
              : "₦235,000"}
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
              {order.description}
            </p>
          </div>
          <br />
          <div className="customer-details">
            <h3>Customer Information</h3>
            <p>Customer's Email: {order?.email}</p>
            <p>Customer's Phone Number: {order?.phoneNumber}</p>
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

export default OrderDescriptionPage;
