import React from "react";
import "./Pagination.scss";
import { GoArrowRight } from "react-icons/go";
import { GoArrowLeft } from "react-icons/go";

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  // Handle page change
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  return (
    <div className="pagination">
      {/* Previous Button */}
      <button
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
        className={`pagination-button ${currentPage === 1 ? "disabled" : ""}`}
      >
        <GoArrowLeft />
      </button>

      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          className={`pagination-num ${
            currentPage === index + 1 ? "active" : ""
          }`}
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
        className={`pagination-button ${
          currentPage === totalPages ? "disabled" : ""
        }`}
      >
        <GoArrowRight />
      </button>
    </div>
  );
};

export default Pagination;
