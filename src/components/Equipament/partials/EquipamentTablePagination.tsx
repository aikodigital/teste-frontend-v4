import React from "react";
import { FiChevronRight, FiChevronLeft, FiChevronsLeft, FiChevronsRight } from "react-icons/fi";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex bg-gray-900 rounded-b-xl items-center justify-end p-4 w-full space-x-2">
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className={`flex items-center justify-center rounded-full transition duration-150 ${
          currentPage === 1
            ? "bg-gray-800 text-white cursor-not-allowed"
            : "bg-indigo-500 text-white hover:bg-indigo-600"
        }`}
      >
        <FiChevronsLeft size={20} />
      </button>

      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`flex items-center justify-center rounded-full transition duration-150 ${
          currentPage === 1
            ? "bg-gray-800 text-gray-500 cursor-not-allowed"
            : "bg-indigo-500 text-white hover:bg-indigo-600"
        }`}
      >
        <FiChevronLeft size={20} />
      </button>

      <div className="flex items-center justify-center space-x-2">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={`w-10 h-10 flex items-center justify-center rounded-full transition duration-150 ${
              currentPage === number
                ? "bg-indigo-500 text-white"
                : "bg-indigo-800 text-white hover:bg-indigo-600"
            }`}
          >
            {number}<FiChevronRight />
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`flex items-center justify-center rounded-full transition duration-150 ${
          currentPage === totalPages
            ? "bg-gray-900 text-gray-500 cursor-not-allowed"
            : "bg-indigo-800 text-white hover:bg-indigo-600"
        }`}
      >
        <FiChevronRight size={20} />
      </button>

      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className={`flex items-center justify-center rounded-full transition duration-150 ${
          currentPage === totalPages
            ? "bg-gray-900 text-gray-500 cursor-not-allowed"
            : "bg-indigo-800 text-white hover:bg-indigo-600"
        }`}
      >
        <FiChevronsRight size={20} />
      </button>
    </div>
  );
};

export default Pagination;
