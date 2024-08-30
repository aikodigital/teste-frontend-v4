import React from 'react'
import equipmentModel from '../data/equipmentModel.json'
import equipmentState from '../data/equipmentState.json'

export function Filters({ filters, handleFilterChange }) {
  return (
    <div className='filters'>
      <input
        type='text'
        name='name'
        placeholder='Filtrar por nome'
        value={filters.name}
        onChange={handleFilterChange}
      />
      <select name='model' value={filters.model} onChange={handleFilterChange}>
        <option value=''>Todos os Modelos</option>
        {equipmentModel.map((model) => (
          <option key={model.id} value={model.name}>
            {model.name}
          </option>
        ))}
      </select>
      <select name='status' value={filters.status} onChange={handleFilterChange}>
        <option value=''>Todos os Status</option>
        {equipmentState.map((status) => (
          <option key={status.id} value={status.name}>
            {status.name}
          </option>
        ))}
      </select>
      <input
        type='date'
        name='dateStart'
        placeholder='Filtrar por data'
        value={filters.dateStart}
        onChange={handleFilterChange}
      />
      <input
        type='date'
        name='dateEnd'
        placeholder='Filtrar por data'
        value={filters.dateEnd}
        onChange={handleFilterChange}
      />
    </div>
  )
}
