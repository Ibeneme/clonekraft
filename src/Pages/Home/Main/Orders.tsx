import React, { useState } from "react";

const OrderPage = () => {
  const [filter, setFilter] = useState("all");

  // Sample orders data
  const orders = [
    {
      id: 1,
      image: "https://f005.backblazeb2.com/file/Webimages-used/Pexelss.png",
      title: "Cabinet Cascade",
      orderNumber: "ORD123456",
      status: "In Progress",
      price: "$29.99",
      scheduledDelivery: "2024-04-25",
      paymentStatus: "Paid",
    },
    {
      id: 2,
      image: "https://f005.backblazeb2.com/file/Webimages-used/Pexelss.png",
      title: "Armchair Aurora",
      orderNumber: "ORD789012",
      status: "Completed",
      price: "$39.99",
      scheduledDelivery: "2024-04-22",
      paymentStatus: "Pending",
    },
    {
      id: 3,
      image: "https://f005.backblazeb2.com/file/Webimages-used/Pexelss.png",
      title: "Bookshelf Blossom",
      orderNumber: "ORD345678",
      status: "Cancelled",
      price: "$19.99",
      scheduledDelivery: "2024-04-28",
      paymentStatus: "Paid",
    },
    {
      id: 4,
      image: "https://f005.backblazeb2.com/file/Webimages-used/Pexelss.png",
      title: "Sofa Serenade",
      orderNumber: "ORD123456",
      status: "In Progress",
      price: "$29.99",
      scheduledDelivery: "2024-04-25",
      paymentStatus: "Paid",
    },
    {
      id: 5,
      image: "https://f005.backblazeb2.com/file/Webimages-used/Pexelss.png",
      title: "Dining Table Dazzle",
      orderNumber: "ORD789012",
      status: "Completed",
      price: "$39.99",
      scheduledDelivery: "2024-04-22",
      paymentStatus: "Pending",
    },
    {
      id: 6,
      image: "https://f005.backblazeb2.com/file/Webimages-used/Pexelss.png",
      title: "Wardrobe Wonder",
      orderNumber: "ORD345678",
      status: "Cancelled",
      price: "$19.99",
      scheduledDelivery: "2024-04-28",
      paymentStatus: "Paid",
    },
  ];

  const filteredOrders = () => {
    switch (filter) {
      case "inProgress":
        return orders.filter((order) => order.status === "In Progress");
      case "completed":
        return orders.filter((order) => order.status === "Completed");
      case "cancelled":
        return orders.filter((order) => order.status === "Cancelled");
      default:
        return orders;
    }
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
          backgroundColor: "#021548",
          width: 337,
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
            backgroundColor: filter === "all" ? "#007bff" : "transparent",
            color: filter === "all" ? "#fff" : "#fff",
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
              filter === "inProgress" ? "#007bff" : "transparent",
            color: filter === "inProgress" ? "#fff" : "#fff",
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
            backgroundColor: filter === "completed" ? "#007bff" : "transparent",
            color: filter === "completed" ? "#fff" : "#fff",
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
            backgroundColor: filter === "cancelled" ? "#007bff" : "transparent",
            color: filter === "cancelled" ? "#fff" : "#fff",
            border: filter === "cancelled" ? "1.5px solid #fff" : "none",
          }}
        >
          Cancelled
        </button>
      </div>
      <div>
        {filteredOrders().map((order) => (
          <div
            key={order.id}
            style={{
              marginBottom: "10px",
              borderRadius: 24,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <img
                src={order.image}
                alt="Product"
                style={{
                  width: "84px",
                  borderRadius: 12,
                  height: "84px",
                  marginRight: "12px",
                }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <h4 style={{ margin: 0 }}>{order.title}</h4>
                <p
                  style={{
                    color: "#808080",
                    fontSize: 12,
                    textAlign: "left",
                  }}
                >
                  {order.orderNumber}
                </p>
                <div style={{ display: "flex" }}>
                  {/* <p
                    style={{
                      margin: 0,
                      padding: "6px 12px",
                      backgroundColor: "#007bff15",
                      color: "#007bff",
                      fontSize: 14,
                      borderRadius: 24,
                      marginRight: 12,
                    }}
                  >
                    {order.status}
                  </p> */}

                  {/* <p
                    style={{
                      margin: 0,
                      padding: "6px 12px",
                      backgroundColor: "#007bff15",
                      color: "#007bff",
                      fontSize: 14,
                      borderRadius: 24,
                      marginRight: 12,
                    }}
                  >
                    {order.scheduledDelivery}
                  </p> */}
                  {/* <p
                    style={{
                      margin: 0,
                      padding: "6px 12px",
                      backgroundColor: "#007bff15",
                      color: "#007bff",
                      fontSize: 14,
                      borderRadius: 24,
                      marginRight: 12,
                    }}
                  >
                    {order.paymentStatus}
                  </p> */}
                </div>{" "}
              </div>
            </div>{" "}
            <p style={{}}>{order.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderPage;
