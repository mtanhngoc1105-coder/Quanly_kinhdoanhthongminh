import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import './Pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const createPageNumbers = () => {
    const pages = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) pages.push('start-ellipsis');
    }

    for (let index = startPage; index <= endPage; index += 1) {
      pages.push(index);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pages.push('end-ellipsis');
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = createPageNumbers();

  return (
    <div className="pagination-wrapper" style={{ marginTop: '48px', marginBottom: '32px' }}>
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination-button"
      >
        <FiChevronLeft />
      </button>

      {pageNumbers.map((page) =>
        page === 'start-ellipsis' || page === 'end-ellipsis' ? (
          <div key={page} className="pagination-ellipsis">...</div>
        ) : (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={`pagination-button ${page === currentPage ? 'active' : ''}`}
          >
            {page}
          </button>
        )
      )}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="pagination-button"
      >
        <FiChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
