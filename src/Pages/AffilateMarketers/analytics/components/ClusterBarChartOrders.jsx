import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import { baseApiUrl } from "../../../../Redux/Baseurl/Baseurl";

const ClusterBarChartOrders = ({ text, marketer }) => {
  const [orderMetrics, setOrderMetrics] = useState([]);

  // Fetch data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseApiUrl}/marketer/orders/${marketer?._id}`
        );
        console.log("Fetched order metrics:", response?.data);
        setOrderMetrics(response?.data || []);
      } catch (error) {
        console.error("Error fetching order metrics:", error);
        setOrderMetrics([]); // Set to empty array in case of error
      }
    };

    fetchData(); // Invoke fetchData function
  }, [baseApiUrl, marketer?._id]); // Dependency array to watch for changes in baseApiUrl or marketer._id

  // Function to count orders by status
  const countOrdersByStatus = (status) => {
    return orderMetrics.filter((order) => order.status === status).length;
  };

  // Calculate total paid orders
  const totalPaidOrders = orderMetrics.filter((order) => order.paid).length;

  // Calculate total not paid orders
  const totalNotPaidOrders = orderMetrics.filter((order) => !order.paid).length;

  // Calculate total order earnings with 40% deduction
  const totalOrderEarnings = orderMetrics.reduce(
    (total, order) => total + (order.price ? order.price * 0.4 * 0.4 : 0),
    0
  );

  // Calculate total orders withdrawn
  const totalOrdersWithdrawn = orderMetrics.filter((order) => order.withdrawn).length;

  // Define series and options for the chart
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

  const options = {
    chart: {
      type: "bar",
      height: 600,
      stacked: false,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        dataLabels: {
          position: "top",
        },
      },
    },
    xaxis: {
      categories: ["Summary"], // Adjust categories as per your requirement
    },
    legend: {
      position: "top",
    },
    fill: {
      opacity: 1,
    },
    title: {
      text: text,
      align: "left",
    },
  };

  return (
    <div>
      <Chart options={options} series={series} type="bar" height={600} />
    </div>
  );
};

export default ClusterBarChartOrders;
