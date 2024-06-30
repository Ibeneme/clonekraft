import React, { useState } from "react";
import "./Index.css"; // Import the CSS file for styling
import { FaSearch, FaExclamationCircle } from "react-icons/fa"; // Import icons from react-icons/fa
import { initialData } from "./ExpenseData";

const ExpenseManagementTable = () => {
  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;

  const getBackgroundColor = (status) => {
    switch (status) {
      case "Approved":
        return "#008FFB12"; // Type 1 expense background color
      case "Pending":
        return "#00E39612"; // Type 2 expense background color
      case "Rejected":
        return "#FA0C7E12"; // Type 3 expense background color
      default:
        return "#ffffff"; // Default background color (if status not specified)
    }
  };

  const getTextColor = (status) => {
    switch (status) {
      case "Approved":
        return "#008FFB"; // Type 1 expense text color
      case "Pending":
        return "#00E396"; // Type 2 expense text color
      case "Rejected":
        return "#FA0C7E"; // Type 3 expense text color
      default:
        return "#000000"; // Default text color (if type not specified)
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Filter data based on search term
  const filteredData = currentItems.filter((item) =>
    Object.values(item).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset pagination to first page when search term changes
  };

  return (
    <div className="container">
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      {filteredData.length === 0 && (
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
      {filteredData.length > 0 && (
        <>
          <table className="expense-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Approver</th>
                <th>Status</th>
                <th>Employee</th>
                <th>Activity Date</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item.id}>
                  <td>
                    <span
                      className="expense-id"
                      style={{
                        backgroundColor: "#FA700C12", // Default background color for ID
                        color: "#FA700C", // Default text color for ID
                        fontSize: "14px",
                        padding: "12px 16px",
                        borderRadius: "14px",
                        fontWeight: "bold",
                      }}
                    >
                      {item.id}
                    </span>
                  </td>
                  <td>{item.approver}</td>
                  <td>
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
                  </td>
                  <td>{item.employee}</td>
                  <td>{item.date}</td>
                  <td>{`Type ${item.type} Expense`}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            {Array.from({ length: Math.ceil(data.length / itemsPerPage) }).map(
              (_, index) => (
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
              )
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ExpenseManagementTable;
