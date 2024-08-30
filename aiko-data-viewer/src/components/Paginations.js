import React from 'react'

export function Pagination({ currentPage, totalPages, handlePageChange }) {
  return (
    <div>
      <button disabled={currentPage <= 1} onClick={() => handlePageChange(currentPage - 1)}>
        Anterior
      </button>
      <input
        type='number'
        min={1}
        max={totalPages}
        value={currentPage}
        onChange={(e) => handlePageChange(e.target.value)}
      />
      <button
        disabled={currentPage >= totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Próximo
      </button>
    </div>
  )
}
