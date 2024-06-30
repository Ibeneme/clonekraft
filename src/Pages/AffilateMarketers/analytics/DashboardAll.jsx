import React from "react";
import Chart from "react-apexcharts";

// ---------------------- Create a Dashboard Area Chart Component --------------------------------

//#################
// This component renders an area chart using the ApexCharts library.
// It demonstrates the use of React to create a reusable chart component
// with multiple series and date-based x-axis categories.
//#################

const DashboardAreaChart = () => {
  // #################
  // Define chart options including height, type, and data labels configuration.
  // Stroke configuration is also included to make the line smooth.
  //#################
  const options = {
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
      // #################
      // Define the x-axis type as datetime and provide the categories for the x-axis.
      // These categories represent different dates on the x-axis.
      //#################
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
      // #################
      // Format the y-axis labels to display the numbers with commas and two decimal places.
      //#################
      labels: {
        formatter: function (value) {
          return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }
      }
    },
    tooltip: {
      // #################
      // Format the tooltip to display the date in a specific format and
      // use a custom formatter to display the numbers with commas and two decimal places.
      //#################
      x: {
        format: "dd/MM/yy",
      },
      y: {
        formatter: function (value) {
          return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }
      }
    },
  };

  // #################
  // Define the series data. Each series represents a different data set to be plotted on the chart.
  // The data values are in the hundreds of thousands.
  //#################
  const series = [
    {
      name: "Type 1",
      data: [310000.00, 400000.00, 280000.00, 510000.00, 420000.00, 1090000.00, 1000000.00, 850000.00, 950000.00, 750000.00, 650000.00, 900000.00],
    },
    {
      name: "Type 2",
      data: [110000.00, 320000.00, 450000.00, 320000.00, 340000.00, 520000.00, 410000.00, 670000.00, 580000.00, 430000.00, 390000.00, 540000.00],
    },
    {
      name: "Type 3",
      data: [230000.00, 290000.00, 370000.00, 550000.00, 290000.00, 630000.00, 900000.00, 800000.00, 700000.00, 600000.00, 500000.00, 400000.00],
    },
  ];

  // #################
  // Render the chart component with the defined options and series data.
  // The Chart component from react-apexcharts is used to render the area chart.
  //#################
  return (
    <div id="chart">
      <Chart options={options} series={series} type="area" height={350} />
    </div>
  );
};

export default DashboardAreaChart;
