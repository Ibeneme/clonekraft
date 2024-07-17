import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { initialData } from "./ExpenseData"; // Assuming initialData is correctly structured
import axios from "axios";
import { FaExclamationCircle } from "react-icons/fa";
import "./Index.css"; // Import CSS file for styling
import { baseApiUrl } from "../../../Redux/Baseurl/Baseurl";
import ReferralLink from "./RefLink";
import ExpenseManagementCards from "./ExpenseManagementCards";
import { useNavigate } from "react-router-dom";
import UserProfile from "./UserProfile";
import useCustomToasts from "../../ToastNotifications/Toastify";
import { FaUser } from "react-icons/fa";
import ClusterBarChart from "./components/ClusterBarChart";
import RadialBar from "./components/RadialBar";

const DashboardProfile = () => {
  const [scatterSeries, setScatterSeries] = useState([]);
  const [fetchedMetrics, setFetchedMetrics] = useState([]);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/login-marketers");
  };

  const formatNumberWithCommas = (number) => {
    return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const getBackgroundColor = (typethreeexpenseonleave) => {
    if (typethreeexpenseonleave > 10000) {
      return "#ff000012"; // Type 1 expense background color
    } else if (
      typethreeexpenseonleave === 0 ||
      typethreeexpenseonleave === null
    ) {
      return "#008FFB12"; // Type 2 expense background color
    } else {
      return "#FA0C7E12"; // Type 3 expense background color
    }
  };

  const getTextColor = (typethreeexpenseonleave) => {
    if (typethreeexpenseonleave > 10000) {
      return "#ff0000"; // Type 1 expense text color
    } else if (
      typethreeexpenseonleave === 0 ||
      typethreeexpenseonleave === null
    ) {
      return "#008FFB"; // Type 2 expense text color
    } else {
      return "#FA0C7E"; // Type 3 expense text color
    }
  };

  const getBackgroundColorDeduction = (deduction) => {
    if (deduction > 0) {
      return "#ff000012"; // Type 1 expense background color
    } else if (deduction === 0 || deduction === null) {
      return "#ff000012"; // Type 2 expense background color
    } else {
      return "#FA0C7E12"; // Type 3 expense background color
    }
  };

  const getTextColorDeduction = (deduction) => {
    if (deduction > 0) {
      return "#ff0000"; // Type 1 expense text color
    } else if (deduction === 0 || deduction === null) {
      return "#ff0000"; // Type 2 expense text color
    } else {
      return "#FA0C7E"; // Type 3 expense text color
    }
  };

  const getBackgroundColorpayCount = (payCount) => {
    if (payCount > 0) {
      return "#FA0C7E12"; // Type 1 expense background color
    } else {
      return "#830CFA12"; // Type 3 expense background color
    }
  };

  const getTextColorpayCount = (payCount) => {
    if (payCount > 0) {
      return "#FA0C7E"; // Type 1 expense background color
    } else {
      return "#830CFA"; // Type 3 expense background color
    }
  };

  const [columnOptions] = useState({
    series: [
      {
        name: "Pending",
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
      },
      {
        name: "Approved",
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
      },
      {
        name: "Rejected",
        data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
      },
    ],
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: [
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
      ],
    },
    yaxis: {
      title: {
        text: "Count",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "Count";
        },
      },
    },
  });

  const [areaOptions] = useState({
    chart: {
      height: 350,
      type: "area",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "datetime",
      categories: [
        "2018-09-19T00:00:00.000Z",
        "2018-09-20T00:00:00.000Z",
        "2018-09-21T00:00:00.000Z",
        "2018-09-22T00:00:00.000Z",
        "2018-09-23T00:00:00.000Z",
        "2018-09-24T00:00:00.000Z",
        "2018-09-25T00:00:00.000Z",
        "2018-09-26T00:00:00.000Z",
        "2018-09-27T00:00:00.000Z",
        "2018-09-28T00:00:00.000Z",
        "2018-09-29T00:00:00.000Z",
        "2018-09-30T00:00:00.000Z",
      ],
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return value.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
        },
      },
    },
    tooltip: {
      x: {
        format: "dd/MM/yy",
      },
      y: {
        formatter: function (value) {
          return value.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
        },
      },
    },
  });

  const [scatterOptions] = useState({
    chart: {
      height: 350,
      type: "scatter",
      zoom: {
        type: "xy",
      },
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      max: 70,
    },
  });

  useEffect(() => {
    const generateScatterData = () => {
      const type1Data = initialData
        .filter((item) => item.type === 1)
        .map((item) => ({
          x: new Date(item.date).getTime(),
          y: Math.floor(Math.random() * 50) + 10,
        }));

      const type2Data = initialData
        .filter((item) => item.type === 2)
        .map((item) => ({
          x: new Date(item.date).getTime(),
          y: Math.floor(Math.random() * 50) + 10,
        }));

      const type3Data = initialData
        .filter((item) => item.type === 3)
        .map((item) => ({
          x: new Date(item.date).getTime(),
          y: Math.floor(Math.random() * 50) + 10,
        }));

      setScatterSeries([
        { name: "Type 1 Expenses", data: type1Data },
        { name: "Type 2 Expenses", data: type2Data },
        { name: "Type 3 Expenses", data: type3Data },
      ]);
    };

    generateScatterData();
  }, []);

  const columnSeries = columnOptions.series;

  const areaSeries = [
    {
      name: "Type 1",
      data: [
        310000.0, 400000.0, 280000.0, 510000.0, 420000.0, 1090000.0, 1000000.0,
        850000.0, 950000.0, 750000.0, 650000.0, 900000.0,
      ],
    },
    {
      name: "Type 2",
      data: [
        110000.0, 320000.0, 450000.0, 320000.0, 340000.0, 520000.0, 410000.0,
        670000.0, 580000.0, 430000.0, 390000.0, 540000.0,
      ],
    },
    {
      name: "Type 3",
      data: [
        230000.0, 290000.0, 370000.0, 550000.0, 290000.0, 630000.0, 900000.0,
        800000.0, 700000.0, 600000.0, 500000.0, 400000.0,
      ],
    },
  ];

  function cleanToken(token) {
    if (token.startsWith('"') && token.endsWith('"')) {
      return token.slice(1, -1);
    } else {
      return token;
    }
  }
  const marketer = JSON.parse(localStorage.getItem("marketer"));
  console.log(marketer?._id, "marketer?._id");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseApiUrl}/marketer/users/${marketer?._id}`
        );
        console.log("response?.data?.generalTable:", response?.data);
        setUserInfo(response?.data);
        //setFetchedMetrics(response?.data);
        setData(response?.data || []); // Ensure to handle empty response or non-array data
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]); // Set data to empty array in case of error
      }
    };
    const fetchDataOrders = async () => {
      try {
        const response = await axios.get(
          `${baseApiUrl}/marketer/orders/${marketer?._id}`
        );
        console.log("response?.data?.metris:", response?.data);
        setFetchedMetrics(response?.data);
        //setData(response?.data || []); // Ensure to handle empty response or non-array data
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]); // Set data to empty array in case of error
      }
    };
    fetchDataOrders();
    fetchData();
  }, []);

  const formatMoney = (value) => {
    if (typeof value !== "number") {
      return value; // Return as is if not a number
    }

    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Pagination logic
  const [activeTab, setActiveTab] = useState("users");
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Array.isArray(data)
    ? data?.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const [userInfo, setUserInfo] = useState([]);

  const totalUsers = userInfo?.length;

  const totalPaidOrders = userInfo?.reduce(
    (acc, userInfo) => acc + userInfo?.paidOrders,
    0
  );

  const totalOrders = userInfo?.reduce(
    (acc, userInfo) => acc + userInfo?.totalOrders,
    0
  );

  const newData = {
    Users: totalUsers,
    Orders: totalOrders,
    Paid: totalOrders,
  };

  // Filter data based on search term
  const filteredData = currentItems?.filter((item) =>
    Object.values(item)?.some(
      (value) =>
        typeof value === "string" &&
        value?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    )
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset pagination to first page when search term changes
  };
  console.log(filteredData, data, "filteredData");
  const { showSuccessToast, showErrorToast } = useCustomToasts();

  return (
    <div
      style={{
        backgroundColor: "#f4f4f4",
        minHeight: "140vh",
        //paddingBottom: 120,
      }}
    >
      <div
        style={{
          backgroundColor: "#f4f4f4",
          padding: 16,
          marginTop: -24,
        }}
      >
        <div
          className="expense-cards-container"
          style={{ backgroundColor: "#fff", borderRadius: 16 }}
        >
          <div
            //className="container-dashboard-ib"
            style={{
              backgroundColor: "#f4f4f4",
              marginTop: 12,

              alignItems: "center",
              display: "flex",
              minHeight: "100vh",
            }}
          >
            <UserProfile user={marketer} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardProfile;
