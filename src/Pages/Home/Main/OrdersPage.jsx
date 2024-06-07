import React from "react";
import { useParams } from "react-router-dom";
import {
  getOrders,
  getRatingsPerOrder,
  getSingleOrder,
} from "../../../Redux/order/order";
import { capitalizeFirstLetter } from "../../../Admin/Orders/OrderDescription";
import { useState } from "react";
import { useEffect } from "react";
import RatingCard from "../../LandingPage/Newsletter/RateCard";
import { formatDate } from "./Profile";
import { useDispatch } from "react-redux";
import ProgressBarComponent from "./Progress/Progress";
import { formatNumberWithCommas } from "./OrderDescription";
const OrdersPage = () => {
  const { orderId } = useParams(); // Extract orderId from URL params
  console.log(orderId, "orderId");
  const [order, setOrdersFetched] = useState([]);
  const [rating, setRatings] = useState([]);
  useEffect(() => {
    handleFetchOrders();
    //handleFetchRating();
  }, []);
  const [loading, setLoading] = useState(false);
  // Function to calculate the time remaining until the maximum price should be set
  function calculateTimeRemaining() {
    const SIX_HOURS_IN_MS = 6 * 60 * 60 * 1000;
    const createdAtTime = new Date(order?.createdAt).getTime();
    const currentTime = new Date().getTime();
    const deadline = createdAtTime + SIX_HOURS_IN_MS;
    return Math.max(deadline - currentTime, 0);
  }
  const [progress, setProgress] = useState(0);
  const dispatch = useDispatch();
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());
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

  // Func
  const traceOrder = orderId;
  //   const handleFetchRating = () => {
  //     dispatch(getRatingsPerOrder(orderId))
  //       .then((response) => {
  //         console.log("orders handleFetchRating:", response);
  //         setRatings(response?.payload);
  //         setLoading(false);
  //       })
  //       .catch((error) => {
  //         console.log("Profile fetch failed:", error);
  //         setLoading(false);
  //       });
  //   };

  const handleFetchOrders = () => {
    dispatch(getSingleOrder(orderId))
      .then((response) => {
        console.log("orders getSingleOrder:", response);
        setOrdersFetched(response?.payload);
        setProgress(response?.payload?.progress);
        setLoading(false);
        setBigDisplayImage(response?.payload?.selectedImages[0])
      })
      .catch((error) => {
        console.log("Profile fetch failed:", error);
        setLoading(false);
      });
  };
  const handleImageClick = (image, index) => {
    setBigDisplayImage(image);
    setSelectedImageIndex(index);
  };
  //   const [bigDisplayImage, setBigDisplayImage] = useState(
  //     order?.selectedImages && order?.selectedImages?.length > 0
  //       ? order?.selectedImages[0]
  //       : order?.selectedImages[0]
  //   );
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [bigDisplayImage, setBigDisplayImage] = useState(
    order?.selectedImages ? order?.selectedImages[0] : ""
  );

  return (
    <div>
      <div className="invoice-container">
        <div className="invoice-header">
          <div>
            <h2 className="invoice-header-h2">
              Order Details - {capitalizeFirstLetter(order?.status)}
            </h2>
            <p className="invoice-header-p-id">Order ID: {order?._id}</p>
            <br />
            {order?.progress > 0 ? (
              <>
                <h1 style={{ fontSize: 16 }}>Your Order Progress</h1>
                <ProgressBarComponent progress={progress} />
              </>
            ) : null}
          </div>
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
                    // onClick={handleUploads}
                    onClick={() => handleImageClick(image, index)}
                  />
                ))}
              </div>
              {/* {rating ? (
                <>
                  <h1
                    style={{ marginTop: 120, textAlign: "right", fontSize: 16 }}
                  >
                    Your Rating
                  </h1>
                  <RatingCard rating={rating} />
                </>
              ) : null} */}
            </div>
          </div>

          <div className="order-info">
            <h3>Order Information</h3>
            <p>Class: {capitalizeFirstLetter(order?.selectedLabel)}</p>
            <p>Status: {capitalizeFirstLetter(order?.status)}</p>
            <p>Order Created At: {formatDate(order?.createdAt)}</p>
            <p>
              Payment Status:{" "}
              {order?.paid === true
                ? "Paid"
                : order?.isInstallmentPaid === true
                ? "Paid in Installments"
                : order?.installments?.length > 0 === true &&
                  order?.paid === false
                ? "First Installment Paid"
                : "Not yet Paid"}
            </p>
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

            {order?.shape && (
              <p>Shape: {capitalizeFirstLetter(order?.shape)}</p>
            )}

            {order?.styleOfChair && (
              <p>
                Style of Furniture: {capitalizeFirstLetter(order?.styleOfChair)}
              </p>
            )}

            <h1 style={{ marginTop: 48, marginBottom: 64 }}>
              {order?.price ? (
                <>
                  Price: ₦{formatNumberWithCommas(order?.price)} <br />
                  <span style={{ fontSize: 14, marginTop: -64 }}>
                    {" "}
                    {/* +₦{formatNumberWithCommas((order?.price * 75) / 1000)} - VAT
                  Charges */}
                  </span>
                </>
              ) : timeRemaining > 0 ? (
                `You'll Get a Price in: ${formatCountdown(timeRemaining)}`
              ) : (
                " "
              )}
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
    </div>
  );
};

export default OrdersPage;
