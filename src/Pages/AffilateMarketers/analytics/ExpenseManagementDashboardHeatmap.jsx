import React from "react";
import Chart from "react-apexcharts";

const ExpenseManagementDashboardHeatmap = () => {
  const generateData = (count, categories, options) => {
    const seriesData = [];
    const startDate = new Date(); // Use your preferred start date

    for (let i = 0; i < categories.length; i++) {
      for (let j = 0; j < count; j++) {
        const date = new Date(startDate);
        date.setDate(date.getDate() + j);
        
        seriesData.push({
          x: categories[i], // Category label
          y: date.getTime(), // Timestamp for y-axis
          value: Math.floor(Math.random() * (options.max - options.min + 1)) + options.min,
        });
      }
    }
    return seriesData;
  };

  const categories = ["Pending", "Approved", "Rejected"]; // Categories for x-axis

  const options = {
    series: [
      { name: "Pending", data: generateData(10, categories, { min: -10, max: 30 }) },
      { name: "Approved", data: generateData(10, categories, { min: -10, max: 30 }) },
      { name: "Rejected", data: generateData(10, categories, { min: -10, max: 30 }) },
    ],
    chart: {
      height: 350,
      type: "heatmap",
    },
    plotOptions: {
      heatmap: {
        shadeIntensity: 0.5,
        radius: 0,
        useFillColorAsStroke: true,
        colorScale: {
          ranges: [
            { from: -10, to: 0, name: "Type 1", color: "#00A100" },
            { from: 0, to: 10, name: "Type 2", color: "#128FD9" },
            { from: 10, to: 20, name: "Type 3", color: "#FFB200" },
            { from: 20, to: 30, name: "Type 4", color: "#FF0000" },
          ],
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 1,
    },
    title: {
      text: "Expense Status Heatmap",
    },
    xaxis: {
      categories: categories,
    },
    yaxis: {
      type: "datetime", // Set y-axis type to datetime
    },
  };

  return (
    <div id="chart">
      <Chart
        options={options}
        series={options.series}
        type="heatmap"
        height={options.chart.height}
      />
    </div>
  );
};

export default ExpenseManagementDashboardHeatmap;
