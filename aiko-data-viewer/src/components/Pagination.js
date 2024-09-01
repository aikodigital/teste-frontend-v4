import React from 'react'

import s from './Pagination.module.css'

export function Pagination({ currentPage, totalPages, handlePageChange }) {
  return (
    <div className={s.pagination}>
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
