import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
import { baseApiUrl } from "../../../../Redux/Baseurl/Baseurl";

const RadialBarOrders = ({ marketer }) => {
  const [userInfo, setUserInfo] = useState([]);
  const [orderMetrics, setOrderMetrics] = useState([]);

  // Fetch user data when component mounts

  // Fetch order metrics data when component mounts
  useEffect(() => {
    const fetchOrderMetrics = async () => {
      try {
        const response = await axios.get(
          `${baseApiUrl}/marketer/orders/${marketer?._id}`
        );
        console.log("Fetched order metrics:", response.data);
        setOrderMetrics(response.data || []);
      } catch (error) {
        console.error("Error fetching order metrics:", error);
        setOrderMetrics([]); // Set to empty array in case of error
      }
    };

    fetchOrderMetrics();
  }, [baseApiUrl, marketer?._id]);

  // Function to count orders by status
  const countOrdersByStatus = (status) => {
    return orderMetrics.filter((order) => order.status === status).length;
  };

  // Calculate total paid orders
  const totalPaidOrders = orderMetrics.filter((order) => order.paid).length;

  // Calculate total not paid orders
  const totalNotPaidOrders = orderMetrics.filter((order) => !order.paid).length;

  // Calculate total order earnings
  const totalOrderEarnings = orderMetrics.reduce(
    (total, order) => total + (order.price || 0),
    0
  );

  // Calculate total orders withdrawn
  const totalOrdersWithdrawn = orderMetrics.filter((order) => order.withdrawn).length;

  // Series array for the radial bar chart
  const series = [
    {
      name: "Pending",
      data: [countOrdersByStatus("pending")],
    },
    {
      name: "Cancelled",
      data: [countOrdersByStatus("cancelled")],
    },
    {
      name: "In Progress",
      data: [countOrdersByStatus("in Progress")],
    },
    {
      name: "Completed",
      data: [countOrdersByStatus("completed")],
    },
    {
      name: "Paid Orders",
      data: [totalPaidOrders],
    },
    {
      name: "Not Paid Orders",
      data: [totalNotPaidOrders],
    },
    {
      name: "Total Order Earnings",
      data: [totalOrderEarnings],
    },
    {
      name: "Orders Withdrawn",
      data: [totalOrdersWithdrawn],
    },
  ];

  // Options for the radial bar chart
  const options = {
    chart: {
      height: 400,
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: "22px",
          },
          value: {
            fontSize: "16px",
          },
          total: {
            show: true,
            label: "Total",
            formatter: function () {
              return orderMetrics.length; // Total count of all orders
            },
          },
        },
      },
    },
    labels: [
      "Pending",
      "Cancelled",
      "In Progress",
      "Completed",
      "Paid Orders",
      "Not Paid Orders",
      "Total Order Earnings",
      "Orders Withdrawn",
    ], // Labels for the radial bars
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="radialBar"
        height={380}
      />
    </div>
  );
};

export default RadialBarOrders;
