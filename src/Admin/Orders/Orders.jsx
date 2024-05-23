import React, { useState, useEffect } from "react";
import { getOrdersAdmin, getUsers } from "../../Redux/admin/admin";
import { useDispatch } from "react-redux";
import "../Users/user.css";
import Navbar from "../Navbar/Navbar";
import { formatDate } from "../../Pages/Home/Main/Profile";
import { useNavigate } from "react-router-dom";
import { BsChatFill } from "react-icons/bs";
import ShimmerLoader from "../../Pages/Components/Loader/ShimmerLoader";
import NoOrdersMessage from "../../Pages/Components/NoORDERS/NoOrdes";

const AdminOrders = () => {
  const dispatch = useDispatch();

  const [filter, setFilter] = useState("all");
  const [ordersFetched, setOrdersFetched] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  useEffect(() => {
    handleFetchOrders();
  }, []);

  const handleFetchOrders = () => {
    dispatch(getOrdersAdmin())
      .then((response) => {
        console.log("orders successful:", response);
        setOrdersFetched(response?.payload);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Profile fetch failed:", error);
        setLoading(false);
      });
  };

  const filteredOrders = () => {
    switch (filter) {
      case "inProgress":
        return ordersFetched?.filter((order) => order?.status === "pending");
      case "completed":
        return ordersFetched?.filter((order) => order?.status === "completed");
      case "cancelled":
        return ordersFetched?.filter((order) => order?.status === "cancelled");
      default:
        return ordersFetched;
    }
  };
  const handleOrderClick = (order) => {
    navigate("/order-admin", { state: { order: order } });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f4f4f4",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
    >
      <div className="user-list-fixed">
        <div
          style={{
            paddingBottom: 200,
          }}
        >
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
                backgroundColor:
                  filter === "completed" ? "#C19F62" : "transparent",
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
                backgroundColor:
                  filter === "cancelled" ? "#C19F62" : "transparent",
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
                    backgroundColor: "#fff",
                    paddingLeft: 12,
                    paddingTop: 16,
                    paddingBottom: 12,
                    marginLeft: 0,
                  }}
                  className="user-card"
                  onClick={() => handleOrderClick(order)}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "row",
                    }}
                  >
                    <div style={{ width: "fit-content", marginRight: -18 }}>
                      <div
                        className={`order-image-container ${
                          order.selectedImages.length > 1 ? "stack-images" : ""
                        }`}
                      >
                        {order?.selectedImages
                          ?.slice(0, 1)
                          .map((image, index) => (
                            <div key={index} className="order-image-item">
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
                          <div>
                            {order?.status?.charAt(0)?.toUpperCase() +
                              order?.status?.slice(1)?.toLowerCase()}{" "}
                            Order
                          </div>
                        )}
                      </div>
                      <p
                        style={{
                          color: "#808080",
                          fontSize: 12,
                          textAlign: "left",
                          marginTop: 8
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
                          bprderRadius: 24,
                          cursor: "pointer",
                          borderRadius: 24,
                          fontSize: 12,
                          display: "flex",
                          gap: 12,
                        }}
                      >
                        <span className="hide-bid">
                          {" "}
                          Negotiate your Pricing
                        </span>{" "}
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
          <div className="user-list-fixed">
            {filteredOrders()?.length === 0 && !loading ? (
              <NoOrdersMessage />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
