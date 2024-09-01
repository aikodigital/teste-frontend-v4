import { useState } from 'react'

export function useMapFilters() {
  const [statusFilter, setStatusFilter] = useState('')
  const [modelFilter, setModelFilter] = useState('')
  const [dateFilter, setDateFilter] = useState('')

  return {
    statusFilter,
    modelFilter,
    dateFilter,
    setStatusFilter,
    setModelFilter,
    setDateFilter,
  }
}
