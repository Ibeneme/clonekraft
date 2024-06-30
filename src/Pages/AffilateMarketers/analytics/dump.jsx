<div className="expense-container">
<div className="expense-dashboard">
  <div className="chart-container">
    <h6>Sample Dashboard bars</h6>
    <div id="column-chart">
      <Chart
        options={columnOptions}
        series={columnSeries}
        type="bar"
        height={350}
      />
    </div>
  </div>
  <div className="chart-container">
    <h6>Sample Dashboard Chart</h6>
    <div id="area-chart">
      <Chart
        options={areaOptions}
        series={areaSeries}
        type="area"
        height={350}
      />
    </div>
  </div>
</div>

<div className="container-dashboard-ib">
  <div className="search-input-container">
    <input
      type="text"
      placeholder="Search..."
      value={searchTerm}
      onChange={handleSearchChange}
      className="search-input"
    />
  </div>

  {data?.length === 0 && (
    <div
      style={{
        height: 200,
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        marginTop: 48,
        borderRadius: 24,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h4>No User refered Yet</h4>
    </div>
  )}
  {filteredData?.length === 0 && data?.length !== 0 && (
    <div className="no-items-found">
      <div className="no-items-icon-container">
        <FaExclamationCircle className="no-items-icon" />
      </div>
      <p className="no-items-message">
        No items found with{" "}
        <span className="search-term">"{searchTerm}"</span>.
      </p>
    </div>
  )}
  {filteredData?.length > 0 && (
    <>
      <table
        className="expense-table"
        style={{ marginTop: 48, borderRadius: 24 }}
      >
        <thead>
          <tr>
            <th>Refered User</th>
            <th>Total Orders</th>
            <th> Order Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.id}>
              <td>
                <span className="expense-table-hide">
                  Refered User:{" "}
                </span>
                {item?.username} - {item?.email}
              </td>
              <td>
                <span
                  style={{
                    backgroundColor: getBackgroundColorDeduction(
                      item?.deduction
                    ),
                    color: getTextColorDeduction(item?.deduction),
                    fontSize: "12px",
                    padding: "10px 14px",
                    borderRadius: "14px",
                    borderRadius: "14px",
                    fontWeight: "bold",
                    display: "inline-block",
                    //width: "fit-width",
                  }}
                >
                  <span className="expense-table-hide">
                    Total Orders:{" "}
                  </span>
                  {formatMoney(item.totalOrders || "0")}{" "}
                </span>
              </td>
              <td>
                <span className="expense-table-hide">
                  Order Status:{" "}
                </span>
                {item?.ordersLog?.status}
              </td>
              <td>
                <span className="expense-table-hide">
                  Expected Net Salary:{" "}
                </span>
                {formatMoney(item.expected_net_salary || "0")}
              </td>
              <td>
                <span className="expense-table-hide">
                  Expected Gross Salary:{" "}
                </span>
                {formatMoney(item.expected_gross_salary || "0")}
              </td>
              <td>
                <span
                  style={{
                    backgroundColor: getBackgroundColor(
                      item.typeoneexpenseonleave
                    ),
                    color: getTextColor(item.typeoneexpenseonleave),
                    fontSize: "12px",
                    padding: "10px 14px",
                    borderRadius: "14px",
                    borderRadius: "14px",
                    fontWeight: "bold",
                    display: "inline-block",
                    //width: "fit-width",
                  }}
                >
                  <span className="expense-table-hide">
                    Type One Expense on Leave:{" "}
                  </span>
                  {formatMoney(item.typeoneexpenseonleave || "0")}
                </span>
              </td>
              <td>
                <span
                  style={{
                    backgroundColor: getBackgroundColor(
                      item.typetwoexpenseonleave
                    ),
                    color: getTextColor(item.typetwoexpenseonleave),
                    fontSize: "12px",
                    padding: "10px 14px",
                    borderRadius: "14px",
                    borderRadius: "14px",
                    fontWeight: "bold",
                    display: "inline-block",
                    //width: "fit-width",
                  }}
                >
                  <span className="expense-table-hide">
                    Type Two Expense on Leave:{" "}
                  </span>

                  {formatMoney(item.typetwoexpenseonleave || "0")}
                </span>
              </td>

              <td>
                <span
                  style={{
                    backgroundColor: getBackgroundColor(
                      item.typethreeexpenseonleave
                    ),
                    color: getTextColor(item.typethreeexpenseonleave),
                    fontSize: "12px",
                    padding: "10px 14px",
                    borderRadius: "14px",
                    borderRadius: "14px",
                    fontWeight: "bold",
                    display: "inline-block",
                    //width: "fit-width",
                  }}
                >
                  <span className="expense-table-hide">
                    Type Three Expense on Leave:{" "}
                  </span>
                  {}
                  {formatMoney(item.typethreeexpenseonleave || "0")}
                </span>
              </td>

              <td>
                <span
                  style={{
                    backgroundColor: getBackgroundColorpayCount(
                      item.count_payslips
                    ),
                    color: getTextColorpayCount(item.count_payslips),
                    fontSize: "12px",
                    padding: "10px 14px",
                    borderRadius: "14px",
                    borderRadius: "14px",
                    fontWeight: "bold",
                    display: "inline-block",
                    //width: "fit-width",
                  }}
                >
                  <span className="expense-table-hide">
                    Count PaySlips:{" "}
                  </span>
                  {item.count_payslips || "0"}{" "}
                </span>
              </td>
              {/* <td>
              <span
                className="expense-status"
                style={{
                  backgroundColor: getBackgroundColor(item.status),
                  color: getTextColor(item.status),
                  fontSize: "14px",
                  padding: "12px 16px",
                  borderRadius: "14px",
                  fontWeight: "bold",
                }}
              >
                {item.status}
              </span>
            </td> */}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({
          length: Math.ceil(data.length / itemsPerPage),
        }).map((_, index) => (
          <button
            key={index}
            className={`pagination-button ${
              index + 1 === currentPage ? "active" : ""
            }`}
            onClick={() => paginate(index + 1)}
            style={{
              padding: 16,
              marginRight: 8,
              marginTop: 32,
              backgroundColor:
                index + 1 === currentPage ? "#830CFA" : "#830CFA16",
              color: index + 1 === currentPage ? "#ffffff" : "#830CFA",
              border: "none",
              fontWeight: 900,
              borderRadius: 12,
              fontSize: 14,
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </>
  )}
</div>
</div>