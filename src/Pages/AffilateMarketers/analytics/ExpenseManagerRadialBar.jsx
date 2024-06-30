import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { initialData } from "./ExpenseData";

const ExpenseManagerRadialBar = () => {
  const [series, setSeries] = useState([0, 0, 0]);

  useEffect(() => {
    // Calculate counts for Type 1, Type 2, and Type 3 expenses
    const type1Count = initialData.filter((item) => item.type === 1).length;
    const type2Count = initialData.filter((item) => item.type === 2).length;
    const type3Count = initialData.filter((item) => item.type === 3).length;

    // Update series with calculated counts
    setSeries([type1Count, type2Count, type3Count]);
  }, [initialData]);

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
              return initialData.length; // Total count of all expenses
            },
          },
        },
      },
    },
    labels: ["Type 1", "Type 2", "Type 3"], // Labels for the radial bars
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

export default ExpenseManagerRadialBar;
