import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import { baseApiUrl } from "../../../../Redux/Baseurl/Baseurl";

const ClusterBarChart = ({ text, marketer }) => {
  const [userInfo, setUserInfo] = useState([]);

  // Fetch data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseApiUrl}/marketer/users/${marketer?._id}`
        );
        console.log("response?.data?.generalTable:", response?.data);
        setUserInfo(response?.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setUserInfo([]); // Set to empty array in case of error
      }
    };

    fetchData(); // Invoke fetchData function
  }, [baseApiUrl, marketer?._id]); // Dependency array to watch for changes in baseApiUrl or marketer._id

  // Function to count data by status
  const getDataByTypeAndStatus = (status) => {
    switch (status) {
      case "Users":
        return userInfo.length; // Count total users
      case "Orders":
        return userInfo.reduce((total, user) => total + user.totalOrders, 0); // Sum of totalOrders
      case "Paid Orders":
        return userInfo.reduce((total, user) => total + user.paidOrders, 0); // Sum of paidOrders
      default:
        return 0;
    }
  };

  // Define series and options for the chart
  const series = [
    {
      name: "Users",
      data: [
        getDataByTypeAndStatus("Users"),
      ],
    },
    {
      name: "Orders",
      data: [
        getDataByTypeAndStatus("Orders"),
      ],
    },
    {
      name: "Paid Orders",
      data: [
        getDataByTypeAndStatus("Paid Orders"),
      ],
    },
  ];

  const options = {
    chart: {
      type: "bar",
      height: 350,
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
      <Chart options={options} series={series} type="bar" height={350} />
    </div>
  );
};

export default ClusterBarChart;
