import React, { useState, useEffect } from 'react'

import s from './MapFilters.module.css'

export function MapFilters({ setDateFilter, setStatusFilter, setModelFilter, removeFilters }) {
  const [localStatusFilter, setLocalStatusFilter] = useState('')
  const [localModelFilter, setLocalModelFilter] = useState('')
  const [localDateFilter, setLocalDateFilter] = useState('')

  useEffect(() => {
    setLocalStatusFilter('')
    setLocalModelFilter('')
    setLocalDateFilter('')
  }, [removeFilters])

  const handleClearFilters = () => {
    setDateFilter('')
    setStatusFilter('')
    setModelFilter('')
    setLocalStatusFilter('')
    setLocalModelFilter('')
    setLocalDateFilter('')
  }

  return (
    <div className={s.filters}>
      <div className={s.filterWrapper}>
        <label className={s.label} htmlFor='statusFilter'>
          Status:
        </label>
        <select
          id='statusFilter'
          className={s.selectInput}
          value={localStatusFilter}
          onChange={(e) => {
            setLocalStatusFilter(e.target.value)
            setStatusFilter(e.target.value)
          }}
        >
          <option value=''>Todos</option>
          <option value='Operando'>Operando</option>
          <option value='Parado'>Parado</option>
          <option value='Manutenção'>Manutenção</option>
        </select>
      </div>

      <div className={s.filterWrapper}>
        <label className={s.label} htmlFor='modelFilter'>
          Modelo:
        </label>
        <select
          id='modelFilter'
          className={s.selectInput}
          value={localModelFilter}
          onChange={(e) => {
            setLocalModelFilter(e.target.value)
            setModelFilter(e.target.value)
          }}
        >
          <option value=''>Todos</option>
          <option value='Caminhão de carga'>Caminhão de carga</option>
          <option value='Harvester'>Harvester</option>
          <option value='Garra traçadora'>Garra traçadora</option>
        </select>
      </div>

      <div className={s.filterWrapper}>
        <label className={s.label} htmlFor='dateFilter'>
          Data:
        </label>
        <input
          type='date'
          id='dateFilter'
          className={s.dateInput}
          value={localDateFilter}
          onChange={(e) => {
            setLocalDateFilter(e.target.value)
            setDateFilter(e.target.value)
          }}
        />
      </div>

      <button className={s.resetFilters} onClick={handleClearFilters}>
        Limpar filtros
      </button>
    </div>
  )
}
