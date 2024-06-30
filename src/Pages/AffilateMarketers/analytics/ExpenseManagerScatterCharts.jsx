import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { initialData } from "./ExpenseData"; // Assuming initialData is correctly structured

const ExpenseManagerScatterCharts = () => {
  const [series, setSeries] = useState([]);
  const [options] = useState({
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
      const type1Data = initialData.filter((item) => item.type === 1).map((item) => ({
        x: new Date(item.date).getTime(),
        y: Math.floor(Math.random() * 50) + 10,
      }));

      const type2Data = initialData.filter((item) => item.type === 2).map((item) => ({
        x: new Date(item.date).getTime(),
        y: Math.floor(Math.random() * 50) + 10,
      }));

      const type3Data = initialData.filter((item) => item.type === 3).map((item) => ({
        x: new Date(item.date).getTime(),
        y: Math.floor(Math.random() * 50) + 10,
      }));

      return [
        { name: "Type 1 Expenses", data: type1Data },
        { name: "Type 2 Expenses", data: type2Data },
        { name: "Type 3 Expenses", data: type3Data },
      ];
    };

    setSeries(generateScatterData());
  }, []);

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={options} series={series} type="scatter" height={350} />
      </div>
    </div>
  );
};

export default ExpenseManagerScatterCharts;
