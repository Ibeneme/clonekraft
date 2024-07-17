import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
import { baseApiUrl } from "../../../../Redux/Baseurl/Baseurl";

const RadialBar = ({ marketer }) => {
  const [userInfo, setUserInfo] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalPaidOrders, setTotalPaidOrders] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseApiUrl}/marketer/users/${marketer?._id}`
        );
        console.log("Fetched data:", response.data);
        setUserInfo(response.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setUserInfo([]); // Set to empty array in case of error
      }
    };

    fetchData();
  }, [baseApiUrl, marketer?._id]);

  useEffect(() => {
    // Calculate total counts
    let usersCount = 0;
    let ordersCount = 0;
    let paidOrdersCount = 0;

    userInfo.forEach((user) => {
      usersCount++;
      ordersCount += user.totalOrders || 0;
      paidOrdersCount += user.paidOrders || 0;
    });

    // Update state with calculated counts
    setTotalUsers(usersCount);
    setTotalOrders(ordersCount);
    setTotalPaidOrders(paidOrdersCount);
  }, [userInfo]);

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
            formatter: function (w) {
              return userInfo.length; // Total count of all items
            },
          },
        },
      },
    },
    labels: ["Users", "Orders", "Paid Orders"], // Labels for the radial bars
  };

  // Series array based on total counts
  const series = [totalUsers, totalOrders, totalPaidOrders];

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

export default RadialBar;
