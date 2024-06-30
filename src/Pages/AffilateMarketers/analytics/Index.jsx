import React from "react";
import ExpenseManagementDashboardChart from "./ExpenseManagementDashboardChart";
import ExpenseManagementTable from "./ExpenseManagementTables";
import "./Index.css";
import ExpenseManagementCards from "./ExpenseManagementCards";
import ExpenseManagementDashboardChartColumn from "./ExpenseManagementDashboardChartColumn";
import ExpenseManagementDashboardHeatmap from "./ExpenseManagementDashboardHeatmap";
import ExpenseManagerRadialBar from "./ExpenseManagerRadialBar";
import ExpenseManagerScatterCharts from "./ExpenseManagerScatterCharts";

const ExpenseIndex = () => {
  return (
    <div className="expense-index-prime-div">
      <div>
        <ExpenseManagementCards />
      </div>
      <div className="expense-index-first-div">
        <div className="expense-index-second-div">
          <div className="expense-index-third-div">
            <ExpenseManagementDashboardChart />
          </div>
          <div className="expense-index-third-div">
            <ExpenseManagerScatterCharts />
          </div>
        </div>
        <br />
        <div className="expense-index-second-div">
          <div className="expense-index-third-div">
            <ExpenseManagementDashboardChartColumn />
          </div>
          <div className="expense-index-third-div">
            <ExpenseManagerRadialBar />
          </div>
        </div>
        <div className="expense-index-second-div">
          <ExpenseManagementTable />
        </div>
      </div>
      <div className="expense-index-first-div"></div>
    </div>
  );
};

export default ExpenseIndex;
