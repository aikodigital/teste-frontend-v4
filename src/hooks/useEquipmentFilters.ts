import { useState } from 'react'

export const useEquipmentFilters = () => {
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [modelFilter, setModelFilter] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState<string>('')

  return {
    statusFilter,
    setStatusFilter,
    modelFilter,
    setModelFilter,
    searchTerm,
    setSearchTerm,
  }
}
