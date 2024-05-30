import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Orders.css"; // Import CSS file for styling
import { BsChatFill } from "react-icons/bs";
//import { formatDate } from "./Profile";
import { PaystackButton } from "react-paystack";
import axios from "axios";
import { baseApiUrl } from "../../../Redux/Baseurl/Baseurl";
import { useDispatch } from "react-redux";
import { getOrders } from "../../../Redux/order/order";

const OrderDescriptionPage = () => {
  const location = useLocation();
  const { ordersFetched } = location.state;
  const [order, setOrdersFetched] = useState([]);
  const PAYSTACK_SECRET_KEY =
    "pk_live_1314935c92fe40573d7c8105b93a7201c9cc72e3";
  const dispatch = useDispatch();
  useEffect(() => {
    handleFetchOrders();
  }, []);
  const traceOrder = ordersFetched;

  console.log(ordersFetched, "ordersFetched");
  const handleFetchOrders = () => {
    dispatch(getOrders())
      .then((response) => {
        console.log("orders successful:", response);
        const matchedOrder = response?.payload?.orders?.find(
          (order) => order?._id === traceOrder?._id
        );
        console.log(matchedOrder, "matchedOrder");
        if (matchedOrder) {
          setOrdersFetched(matchedOrder);
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
    ordersFetched?.selectedImages && ordersFetched?.selectedImages.length > 0
      ? ordersFetched?.selectedImages[0]
      : ordersFetched?.selectedImages[0]
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
    return new Date(date)?.toLocaleDateString(undefined, options);
  };

  // Function to calculate the delivery date based on order creation date and delivery option
  const calculateDeliveryDate = (createdAt, deliveryOption) => {
    const deliveryDate = new Date(createdAt);
    deliveryDate?.setDate(deliveryDate?.getDate() + deliveryOption);
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
    return string?.charAt(0)?.toUpperCase() + string?.slice(1)?.toLowerCase();
  };

  const navigate = useNavigate();
  const handleOrderClicks = (order) => {
    console.log("kksks");
    navigate("/chatpage", { state: { order: order } });
    // Navigate to another page and pass the selected order as a parameter
    // history.push(`/order-description/${order._id}`, { order });
  };

  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  // Function to calculate the time remaining until the maximum price should be set
  function calculateTimeRemaining() {
    const SIX_HOURS_IN_MS = 6 * 60 * 60 * 1000;
    const createdAtTime = new Date(order.createdAt).getTime();
    const currentTime = new Date().getTime();
    const deadline = createdAtTime + SIX_HOURS_IN_MS;
    return Math.max(deadline - currentTime, 0);
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Function to handle clicking on the "Proceed to Payment" button
  const handleProceedToPayment = () => {
    // Check if the current time exceeds the deadline for setting the maximum price
    if (timeRemaining === 0) {
      alert("The deadline for setting the maximum price has passed.");
      return;
    }
    // Proceed to payment logic here
  };
  const formatCountdown = (time) => {
    const hours = Math?.floor(time / (1000 * 60 * 60));
    const minutes = Math?.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math?.floor((time % (1000 * 60)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const amount = order?.price * 100; // Paystack expects the amount in kobo

  //const amount = order?.price;
  const generateUniqueReference = (email, amount) => {
    // Other  const generateUniqueReference = (email, amount) => {
    const timestamp = Date?.now();
    const obfuscatedEmail =
      email?.split("@")[0] + Math?.random()?.toString(36)?.substring(2, 7);
    return `${obfuscatedEmail}${timestamp}${amount}`;
  };

  const [loading, setLoading] = useState(false);
  //const sampleTotalAmount = 100; // amount in your local currency units
  const sampleUserEmail = order?.email;
  const sampleReference = generateUniqueReference(order?.email, amount);
  const publicKey = PAYSTACK_SECRET_KEY; // Use your public key here
  const componentProps = {
    email: order?.email,
    amount: amount,
    publicKey,
    text: loading ? "Pay with Paystack" : "Pay with Paystack",
    onSuccess: () => {
      setLoading(false);
      console.log("Payment Successful!");
      setModalOpenLoading(true);
      handleUploader();
      // navigate("/sucess");
      // Handle post-success actions here
    },
    onClose: () => {
      setLoading(false);
      console.log("Payment closed");
      showErrorToast("Payment Failed");
      // Handle post-close actions here
    },
    reference: sampleReference,
  };

  const handleClick = () => {
    setLoading(true);
  };

  //const [orderId, setOrderId] = useState(""); // State to hold the orderId

  const handleCross = async () => {
    try {
      // Make the PUT request to mark the order as paid
      const response = await axios.put(
        `${baseApiUrl}/order/cross/${order?._id}`
      );
      console.log(response.data); // Log the response from the server
      // You can handle success or display a message here
    } catch (error) {
      console.error("Error marking order as paid:", error);
      // Handle error or display an error message
    }
  };

  return (
    <div className="invoice-container">
      <div className="invoice-header">
        <div>
          <h2 className="invoice-header-h2">
            Order Details - {capitalizeFirstLetter(order?.status)}
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
          <p>Class: {capitalizeFirstLetter(order?.selectedLabel)}</p>
          <p>Status: {capitalizeFirstLetter(order?.status)}</p>
          <p>Order Created At: {formatDate(order?.createdAt)}</p>
          <p>
            To be Delivered:{" "}
            {calculateDeliveryDate(order?.createdAt, order?.deliveryOption)}
          </p>

          {order?.seaters && (
            <p>Seaters: {capitalizeFirstLetter(order?.seaters)}</p>
          )}

          {order?.choice && (
            <p>Choice: {capitalizeFirstLetter(order?.choice)}</p>
          )}

          {order?.shape && <p>Shape: {capitalizeFirstLetter(order?.shape)}</p>}

          {order?.styleOfChair && (
            <p>
              Style of Furniture: {capitalizeFirstLetter(order?.styleOfChair)}
            </p>
          )}

          <h1>
            {order?.price
              ? `₦${order?.price?.toLocaleString("en-NG")}`
              : timeRemaining > 0
              ? `Get Price: ${formatCountdown(timeRemaining)}`
              : " "}
          </h1>
          {order?.paid === false &&
          order?.price !== null &&
          timeRemaining > 0 ? (
            // Render the "Proceed to Payment" button only if time remaining
            <div style={{ cursor: "pointer", marginTop: 40, marginBottom: 24 }}>
              <div className="div-btn-auth"></div>
              <PaystackButton
                {...componentProps}
                className="btn-auth"
                onClick={handleClick}
              />
            </div>
          ) : null}

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
              {order?.description}
            </p>
          </div>
          <br />
          <div className="customer-details">
            <h3>Customer Information</h3>
            <p>Customer's Email: {order?.email}</p>
            <p>Customer's Phone Number: {order?.phoneNumber}</p>
            <p>Customer's Address: {order?.address}</p>
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
