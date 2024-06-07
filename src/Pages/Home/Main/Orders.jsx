import React, { useEffect, useState } from "react";
import { getOrders } from "../../../Redux/order/order";
import { useDispatch } from "react-redux";
import { formatDate } from "./Profile";
import { BsChatFill } from "react-icons/bs";
import NoOrdersMessage from "../../Components/NoORDERS/NoOrdes";
import { useNavigate } from "react-router-dom";
import ShimmerLoader from "../../Components/Loader/ShimmerLoader";
import { capitalizeFirstLetter } from "../../../Admin/Orders/OrderDescription";

const OrderPage = () => {
  const [filter, setFilter] = useState("all");
  const [ordersFetched, setOrdersFetched] = useState([]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  useEffect(() => {
    handleFetchOrders();
  }, []);

  const handleFetchOrders = () => {
    dispatch(getOrders())
      .then((response) => {
        console.log("orders successful:", response);
        setOrdersFetched(response?.payload?.orders);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Profile fetch failed:", error);
        setLoading(false);
      });
  };

  const filteredOrders = () => {
    switch (filter) {
      case "pending":
        return ordersFetched?.filter((order) => order?.status === "pending");
      case "in Progress":
        return ordersFetched?.filter(
          (order) => order?.status === "in Progress"
        );
      case "completed":
        return ordersFetched?.filter((order) => order?.status === "completed");
      case "cancelled":
        return ordersFetched?.filter((order) => order?.status === "cancelled");
      default:
        return ordersFetched;
    }
  };

  const handleOrderClick = (order) => {
    navigate("/order-single", { state: { ordersFetched: order } });
  };

  const handleOrderClicks = (order) => {
    navigate("/chatpage", { state: { ordersFetched: order } });
  };

  return (
    <div
      style={{
        paddingTop: 120,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 200,
      }}
    >
      <h4>My Orders</h4>
      <div
        style={{
          backgroundColor: "#C19F6220",
          width: "fit-content",
          padding: 6,
          borderRadius: 35,
          marginBottom: 32,
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() => setFilter("all")}
          style={{
            padding: `10px 18px`,
            marginRight: 0,
            borderRadius: 32,
            fontSize: 12,
            fontFamily: "var(--fontFamily)",
            backgroundColor: filter === "all" ? "#C19F62" : "transparent",
            color: filter === "all" ? "#fff" : "#C19F62",
            border: filter === "all" ? "1.5px solid #fff" : "none",
          }}
        >
          All
        </button>{" "}
        <button
          onClick={() => setFilter("pending")}
          style={{
            padding: `10px 18px`,
            marginRight: 0,
            borderRadius: 32,
            fontSize: 12,
            fontFamily: "var(--fontFamily)",
            backgroundColor: filter === "pending" ? "#C19F62" : "transparent",
            color: filter === "pending" ? "#fff" : "#C19F62",
            border: filter === "pending" ? "1.5px solid #fff" : "none",
          }}
        >
          Pending
        </button>
        <button
          onClick={() => setFilter("inProgress")}
          style={{
            padding: `10px 18px`,
            marginRight: 0,
            borderRadius: 32,
            fontSize: 12,
            fontFamily: "var(--fontFamily)",
            backgroundColor:
              filter === "inProgress" ? "#C19F62" : "transparent",
            color: filter === "inProgress" ? "#fff" : "#C19F62",
            border: filter === "inProgress" ? "1.5px solid #fff" : "none",
          }}
        >
          InProgress
        </button>
        <button
          onClick={() => setFilter("completed")}
          style={{
            padding: `10px 18px`,
            marginRight: 0,
            borderRadius: 32,
            fontSize: 12,
            fontFamily: "var(--fontFamily)",
            backgroundColor: filter === "completed" ? "#C19F62" : "transparent",
            color: filter === "completed" ? "#fff" : "#C19F62",
            border: filter === "completed" ? "1.5px solid #fff" : "none",
          }}
        >
          Completed
        </button>
        <button
          onClick={() => setFilter("cancelled")}
          style={{
            padding: `10px 18px`,
            marginRight: 0,
            borderRadius: 32,
            fontSize: 12,
            fontFamily: "var(--fontFamily)",
            backgroundColor: filter === "cancelled" ? "#C19F62" : "transparent",
            color: filter === "cancelled" ? "#fff" : "#C19F62",
            border: filter === "cancelled" ? "1.5px solid #fff" : "none",
          }}
        >
          Cancelled
        </button>
      </div>

      {loading ? (
        <ShimmerLoader />
      ) : (
        <div>
          {filteredOrders()?.map((order) => (
            <div
              key={order?.id}
              style={{
                marginBottom: "10px",
                borderRadius: 24,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              onClick={() => handleOrderClick(order)}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <div style={{ width: 84 }}>
                  <div
                    className={`order-image-container ${
                      order.selectedImages.length > 1 ? "stack-images" : ""
                    }`}
                  >
                    {order?.selectedImages?.slice(0, 3).map((image, index) => (
                      <div key={index}>
                        <img
                          src={image}
                          alt={`Image ${index + 1}`}
                          className="order-image"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div>
                    {order?.status && (
                      <div>Order {capitalizeFirstLetter(order?.status)}</div>
                    )}
                  </div>
                  <p
                    style={{
                      color: "#808080",
                      fontSize: 12,
                      textAlign: "left",
                    }}
                  >
                    ID:{" "}
                    {order?._id?.charAt(0)?.toUpperCase() +
                      order?._id?.slice(1)?.toLowerCase()}{" "}
                    || {formatDate(order?.createdAt)}
                  </p>
                  <div style={{ display: "flex" }}></div>{" "}
                </div>
              </div>{" "}
              <p style={{}}>
                {order?.price ? (
                  "₦" + order?.price
                ) : (
                  <p
                    style={{
                      color: "#C19F62",
                      backgroundColor: "#C19F6212",
                      padding: 16,
                      borderRadius: 24,
                      cursor: "pointer",
                      fontSize: 12,
                      display: "flex",
                      gap: 12,
                    }}
                    onClick={() => handleOrderClicks(order)}
                  >
                    <span className="hide-bid"> Message Admin</span>{" "}
                    <span>
                      {" "}
                      <BsChatFill />
                    </span>
                  </p>
                )}
              </p>
            </div>
          ))}
        </div>
      )}

      {filteredOrders()?.length === 0 ? <NoOrdersMessage /> : null}
    </div>
  );
};

export default OrderPage;
