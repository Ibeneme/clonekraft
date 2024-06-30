import React from "react";
import Chart from "react-apexcharts";

// ---------------------- Create an Expense Management Dashboard Column Chart Component --------------------------------

//#################
// This component renders a column chart for an expense management dashboard using the ApexCharts library.
// It demonstrates the use of React to create a reusable chart component
// with multiple series and categorical x-axis categories.
//#################

const ExpenseManagementDashboardChartColumn = () => {
  // #################
  // Define chart options including type, height, series data, and plot options.
  //#################
  const options = {
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
  };

  // #################
  // Render the chart component with the defined options.
  // The Chart component from react-apexcharts is used to render the column chart.
  //#################
  return (
    <div id="chart">
      <Chart
        options={options}
        series={options.series}
        type="bar"
        height={options.chart.height}
      />
    </div>
  );
};

export default ExpenseManagementDashboardChartColumn;
